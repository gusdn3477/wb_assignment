import { Company } from '@/types';
import { create } from 'zustand';

interface MyInfoState {
  id: number;
  email: string;
  name: string;
  company: Company;
}

interface MyInfoAction {
  setId: (id: number) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setCompany: (company: Company) => void;
}

export const useMyInfoStore = create<MyInfoState & MyInfoAction>((set) => ({
  id: 0,
  email: '',
  name: '',
  company: { id: 0, name: '' },

  setId: (id: number) => set({ id }),
  setName: (name: string) => set({ name }),
  setEmail: (email: string) => set({ email }),
  setCompany: (company: Company) => set({ company }),
}));
