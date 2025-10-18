import { apiInstance } from "../api";

type ReqGetPopularTag = {
  query: {
    limit?: number;
  };
};

type ResGetPopularTag = {
  id: number; // 태그 ID
  name: string; // 태그 이름
  usageCount: number; // 사용 횟수
  createdAt: Date; // 생성일시
  updatedAt: Date; // 수정일시
}[];

export const getPopularTag = async (req: ReqGetPopularTag) => {
  const result = await apiInstance.get<ResGetPopularTag>("/tag/popular", {
    params: req.query,
  });
  return result.data;
};
