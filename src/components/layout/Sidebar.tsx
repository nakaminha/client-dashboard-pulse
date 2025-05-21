
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart, 
  Users, 
  CreditCard,
  Settings,
  User,
  FileSpreadsheet,
  MessageCircle,
  Phone,
  ClipboardList,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-3 text-lg font-semibold tracking-tight">
          Dashboard
        </h2>
        <div className="space-y-1">
          <Link
            to="/"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-all hover:text-zinc-900",
              pathname === "/" && "bg-zinc-100 text-zinc-900"
            )}
          >
            <BarChart className="h-5 w-5" />
            <span className="text-sm font-medium">Visão geral</span>
          </Link>
          {isAdmin && (
            <Link
              to="/gerenciar-usuarios"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-all hover:text-zinc-900",
                pathname === "/gerenciar-usuarios" && "bg-zinc-100 text-zinc-900"
              )}
            >
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Gerenciar Usuários</span>
            </Link>
          )}
        </div>
      </div>
      
      {/* Botão de logout no final do sidebar */}
      <div className="px-3 py-2 mt-auto">
        <div className="space-y-1">
          <button
            onClick={logout}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-all hover:text-zinc-900 hover:bg-zinc-100"
            )}
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Sair da Conta</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
