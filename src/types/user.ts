export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  repeat_password: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  last_login_at: string; // ISO 8601 날짜 문자열
  edit?: string;
}

interface Sort {
  [key: string]: any;
}

// 페이징 정보 타입
interface Pagination {
  total_elements: number; // 모든 엘리먼트 숫자
  total_pages: number; // 전체 페이지 수
  last: boolean; // 마지막 페이지 여부
  number: number; // 현재 페이지 번호 (0부터 시작)
  size: number; // 페이지당 요소 개수
  sort: Sort; // 정렬 기준
  number_of_elements: number; // 조회된 요소 개수
  first: boolean; // 첫 번째 페이지 여부
  empty: boolean; // 데이터가 비어있는지 여부
}

export interface UserResponse extends Pagination {
  content: User[];
}
