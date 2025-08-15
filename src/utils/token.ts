/**
 * 쿠키에서 accessToken을 가져오는 함수
 * @returns accessToken 문자열 또는 null
 */
export function getAccessToken(): string | null {
  return getCookie("accessToken");
}

/**
 * 쿠키에서 refreshToken을 가져오는 함수
 * @returns refreshToken 문자열 또는 null
 */
export function getRefreshToken(): string | null {
  return getCookie("refreshToken");
}

/**
 * 쿠키에서 특정 이름의 값을 가져오는 헬퍼 함수
 * @param name 쿠키 이름
 * @returns 쿠키 값 또는 null
 */
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

/**
 * 쿠키에 토큰을 설정하는 함수
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @param days 만료일수 (기본값: 7일)
 */
export function setCookie(name: string, value: string, days: number = 7): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
}

/**
 * 쿠키에서 토큰을 제거하는 함수
 * @param name 쿠키 이름
 */
export function removeCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

/**
 * accessToken을 쿠키에 설정
 * @param token accessToken
 * @param days 만료일수 (기본값: 1일)
 */
export function setAccessToken(token: string, days: number = 1): void {
  setCookie("accessToken", token, days);
}

/**
 * refreshToken을 쿠키에 설정
 * @param token refreshToken
 * @param days 만료일수 (기본값: 7일)
 */
export function setRefreshToken(token: string, days: number = 7): void {
  setCookie("refreshToken", token, days);
}

/**
 * 모든 인증 토큰을 제거
 */
export function clearAuthTokens(): void {
  removeCookie("accessToken");
  removeCookie("refreshToken");
}

/**
 * 토큰이 유효한지 확인 (null이 아닌지)
 * @returns boolean
 */
export function hasValidTokens(): boolean {
  return !!(getAccessToken() && getRefreshToken());
}
