import axios from 'axios';

// Axios 인스턴스 생성
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 기본 URL
  headers: {
    'Content-Type': 'application/json', // 기본 헤더 설정
  },
});

export default API;
