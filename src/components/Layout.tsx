import React from 'react';
import { options } from '../data/options';
import Select from './Select';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const handleSelectChange = (value: string) => {
    console.log('선택한 값:', value);
  };

  return (
    <>
      <header className="flex h-[48px] w-full items-center justify-between bg-blue-400 p-2 text-white">
        <div className="flex flex-1 items-center">
          <h1>wisebird</h1>
          <ul className="flex">
            <li>캠페인</li>
            <li>사용자</li>
          </ul>
        </div>
        <div className="flex flex-1 justify-end">
          <ul className="flex items-center">
            <li>abc@abc.co.kr</li>
            <li>
              <Select options={options} defaultValue="admin" onChange={handleSelectChange} />
            </li>
          </ul>
        </div>
      </header>
      {children}
    </>
  );
}
