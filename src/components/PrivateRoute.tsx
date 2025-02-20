import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { NAV_PATH, ROLE } from '@/constants';

export default function PrivateRoute() {
  const { role } = useParams();
  const location = useLocation();
  const currentPage = location.pathname.split('/')[2];

  if (role !== ROLE.ADMIN && currentPage === NAV_PATH.USERS) {
    return <Navigate to={`/${role}/${NAV_PATH.COMPAIGNS}`} />;
  }
  return <Outlet />;
}
