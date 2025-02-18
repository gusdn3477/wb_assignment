export interface Company {
  id: number;
  name: string;
}

// 사용자 정보 타입
export interface AuthUser {
  id: number;
  email: string;
  name: string;
  company: Company;
}
