export const formatDateToKorean = (date: Date): string => {
  // 한국 시간대 오프셋 (UTC+9)
  const koreanOffset = 9 * 60; // 9시간을 분으로 변환
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const koreanTime = new Date(utc + koreanOffset * 60000);

  const year = koreanTime.getFullYear();
  const month = String(koreanTime.getMonth() + 1).padStart(2, "0");
  const day = String(koreanTime.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
