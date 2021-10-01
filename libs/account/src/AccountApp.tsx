import { Route, Routes } from 'react-router-dom';
import { LayoutWithTopbarContainer } from '@energyweb/zero-ui-core';
import { DashboardPage } from './pages';

export const AccountApp = () => {
  return (
    <LayoutWithTopbarContainer bgColor='#f6f3f9'>
      <Routes>
        <Route
          path={'dashboard'}
          element={<DashboardPage />}
        />
      </Routes>
    </LayoutWithTopbarContainer>
  );
};
