import { AuthUser } from '@/types';
import API from './API';

export const AuthRepository = {
  async getMyInfo(): Promise<AuthUser | null> {
    try {
      const response = await API.get('/api/auth/me');
      return response.data;
    } catch {
      return null;
    }
  },
};
