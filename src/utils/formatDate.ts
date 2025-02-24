export const formatDate = (date: Date): string => {
  const pad = (num: number): string => num.toString().padStart(2, '0'); // 두 자리 맞추기

  const year: number = date.getFullYear();
  const month: string = pad(date.getMonth() + 1); // getMonth()는 0부터 시작하므로 +1
  const day: string = pad(date.getDate());
  const hours: string = pad(date.getHours());
  const minutes: string = pad(date.getMinutes());
  const seconds: string = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
