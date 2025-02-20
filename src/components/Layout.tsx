import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { options } from '../data/options';
import Select from './Select';

const ROLE = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  VIEWER: 'viewer',
} as const;

const NAV_PATH = {
  COMPAIGNS: 'campaigns',
  USERS: 'users',
} as const;

type RoleType = (typeof ROLE)[keyof typeof ROLE];

const navItems = [
  {
    id: 1,
    value: '캠페인',
    path: NAV_PATH.COMPAIGNS,
  },
  {
    id: 2,
    value: '사용자',
    path: NAV_PATH.USERS,
  },
];

export default function Layout() {
  const { role } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname.split('/')[2];

  const handleSelectChange = (value: string) => {
    navigate(`/${value}/${NAV_PATH.COMPAIGNS}`);
  };

  const handleCategoryClick = (path: string) => {
    const newPath = location.pathname.replace(/\/(campaigns|users)\b/, `/${path}`);
    navigate(newPath);
  };

  const getNavItems = () => {
    if (role === ROLE.ADMIN) {
      return [...navItems];
    }
    return navItems.filter((item) => item.path === NAV_PATH.COMPAIGNS);
  };
  return (
    <>
      <header className="flex h-[60px] w-full items-center justify-between bg-blue-400 px-2 text-white">
        <div className="flex h-full flex-1 items-center">
          <h1>Wisebirds</h1>
          <ul className="ml-2 flex h-full">
            {getNavItems().map((item) => (
              <li
                key={item.id}
                onClick={() => handleCategoryClick(item.path)}
                className={`w-16 justify-center ${item.path === currentPage ? 'bg-blue-700' : ''} flex items-center`}
              >
                {item.value}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-1 justify-end">
          <ul className="flex items-center">
            <li>abc@abc.co.kr</li>
            <li className="ml-4">
              <Select options={options} defaultValue={role} onChange={handleSelectChange} />
            </li>
          </ul>
        </div>
      </header>
      <div className="flex-1 p-2">
        <Outlet />
      </div>
    </>
  );
}
