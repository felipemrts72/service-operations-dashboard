import { Navigate } from 'react-router-dom';
import React from 'react';

interface Props {
  children: React.ReactElement;
  allowedRoles?: Array<'admin' | 'viewer'>;
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role') as 'admin' | 'viewer' | null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/tv" replace />;
  }

  return children;
}
