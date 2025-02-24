import { useEffect, useState } from 'react';
import { AuthUser } from '@/types';
import { useMyInfoStore } from '@/store/MyInfoStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const setId = useMyInfoStore((state) => state.setId);
  const setName = useMyInfoStore((state) => state.setName);
  const setEmail = useMyInfoStore((state) => state.setEmail);
  const setCompany = useMyInfoStore((state) => state.setCompany);

  const getMyInfo = () => {
    setLoading(true);
    // TODO: API 연동 필요
    const data: AuthUser = {
      id: 1000,
      name: '홍길동',
      email: 'abc@abc.co.kr',
      company: {
        id: 1000,
        name: '와이즈버즈',
      },
    };
    setId(data.id);
    setName(data.name);
    setEmail(data.email);
    setCompany(data.company);

    setLoading(false);
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  if (loading) return <div>loading...</div>;
  return <>{children}</>;
}
