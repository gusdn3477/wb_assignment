import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import CampaignManagament from './pages/CampaignManagament';
import UserManagement from './pages/UserManagement';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/admin/campaigns" />} />
          <Route path="/:role" element={<PrivateRoute />}>
            <Route path="campaigns" element={<CampaignManagament />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
