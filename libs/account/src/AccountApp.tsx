import { Route, Routes } from 'react-router-dom';
import { DashboardPage, SettingsPage } from './pages';

export const AccountApp = () => {
  return (
    <Routes>
      <Route path={'dashboard'} element={<DashboardPage />} />
      <Route path={'settings'} element={<SettingsPage />} />
    </Routes>
  );
};
