
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const DashboardLayout = () => {
  const { isAuthenticated, isAuthorized, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!isAuthorized) {
      navigate('/acesso-pendente');
    }
  }, [isAuthenticated, isAuthorized, navigate]);

  // Não renderiza nada enquanto está redirecionando
  if (!isAuthenticated || !isAuthorized) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
