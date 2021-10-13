import { Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages';

export const AccountApp = () => {
  return (
    <Routes>
      <Route
        path={'dashboard'}
        element={<DashboardPage />}
      />
    </Routes>
  );
};
