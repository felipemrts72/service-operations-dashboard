import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import TvDashboard from './pages/TvDashboard';
import CreateService from './pages/CreateService/CreateService';
import UpdateService from './pages/UpdateService';
import Login from './pages/Login';
import ProtectedRoute from './auth/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* default */}
        <Route path="/" element={<Navigate to="/tv" replace />} />

        {/* login */}
        <Route path="/login" element={<Login />} />

        {/* tv - qualquer usuário logado */}
        <Route
          path="/tv"
          element={
            <ProtectedRoute>
              <TvDashboard />
            </ProtectedRoute>
          }
        />

        {/* admin only */}
        <Route
          path="/create"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CreateService />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UpdateService />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
