import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  removeCookie,
  setAccessToken,
} from "@/utils/token";
import axios from "axios";

// 리프레시 토큰 요청 중복 방지를 위한 플래그
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (error: unknown) => void;
}> = [];

// 대기 중인 요청들을 처리하는 함수
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });

  failedQueue = [];
};

const loginUrl = import.meta.env.VITE_SERVICE_URL + "/auth/signin";

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

apiInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  } else {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      window.location.href = loginUrl;
    }
  }

  return config;
});

apiInstance.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 401) {
    const refreshToken = getRefreshToken();

    if (refreshToken) {
      // 이미 리프레시가 진행 중인 경우
      if (isRefreshing) {
        // 대기열에 추가하고 Promise 반환
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            error.config.headers.set("Authorization", `Bearer ${token}`);
            return apiInstance(error.config);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // 리프레시 시작
      isRefreshing = true;

      try {
        // 리프레시 토큰으로 새로운 액세스 토큰 요청
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "/auth/refresh",
          {
            refreshToken,
          }
        );

        const { accessToken: newAccessToken } = response.data;

        // 새로운 액세스 토큰 저장
        setAccessToken(newAccessToken);

        // 대기 중인 모든 요청들을 성공으로 처리
        processQueue(null, newAccessToken);

        // 원래 요청의 헤더에 새로운 토큰 설정
        error.config.headers.set("Authorization", `Bearer ${newAccessToken}`);

        // 새로운 토큰으로 원래 요청 재시도
        return apiInstance(error.config);
      } catch (refreshError) {
        // 리프레시 실패 시 대기 중인 모든 요청들을 실패로 처리
        processQueue(refreshError, null);

        // 리프레시 토큰도 만료된 경우 로그인 페이지로 이동
        clearAuthTokens();
        window.location.href = loginUrl;
        return Promise.reject(refreshError);
      } finally {
        // 리프레시 완료 (성공/실패 상관없이)
        isRefreshing = false;
      }
    } else {
      // 리프레시 토큰이 없는 경우 로그인 페이지로 이동
      removeCookie("accessToken");
      window.location.href = loginUrl;
      return Promise.reject(error);
    }
  }

  throw error;
});
