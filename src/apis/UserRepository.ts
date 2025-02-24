import { CreateUserParams, PageParams, Result, UserResponse } from '@/types';
import qs from 'qs';
import API from './API';

export const UserRepository = {
  async getUsers({ page, size }: PageParams): Promise<UserResponse[]> {
    const queryString = qs.stringify({ page, size }, { skipNulls: true, addQueryPrefix: true });
    const response = await API.get(`/api/users${queryString}`);
    return response.data;
  },

  async create({ name, email, password, repeat_password }: CreateUserParams): Promise<Result> {
    const response = await API.post('/api/users', { name, email, password, repeat_password });
    return response.data;
  },

  async patch({ id, name }: { id: number; name: string }): Promise<Result> {
    const response = await API.patch(`/api/users/${id}`, { name });
    return response.data;
  },

  async checkEmailDuplicated({ email }: { email: string }): Promise<Result> {
    const response = await API.get(`/api/users/${email}/exists`);
    return response.data;
  },
};
