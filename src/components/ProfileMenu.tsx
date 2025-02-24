import { useState, useRef, useEffect } from 'react';
import { Company } from '@/types';

interface ProfileMenuProps {
  name: string;
  email: string;
  company: Company;
}

const ProfileMenu = ({ name, email, company }: ProfileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 버튼 클릭 시 메뉴 위치 설정 및 열기
  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY, // 요소 아래에 배치
      left: rect.left + window.scrollX, // 요소의 왼쪽 정렬
    });
    setIsOpen(true);
  };

  // 메뉴 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button className="rounded-md px-2 py-2 text-white" onClick={openMenu}>
        {email}
      </button>

      {/* 메뉴 */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute w-40 rounded-lg border bg-white shadow-lg"
          style={{ top: `${position.top}px`, left: `${position.left}px` }}
        >
          <ul className="flex flex-col items-center justify-center py-2">
            <li className="cursor-pointer px-4 py-2 text-xl font-bold text-black">{name}</li>
            <li className="cursor-pointer px-4 py-2 text-black">{email}</li>
            <li className="cursor-pointer px-4 py-2 text-black">{company.name}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
