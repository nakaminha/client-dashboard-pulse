
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart, 
  Users, 
  User,
  CreditCard,
  FileSpreadsheet,
  MessageCircle,
  Phone,
  ClipboardList,
  Settings,
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
          
          <Link
            to="/clientes"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-all hover:text-zinc-900",
              pathname === "/clientes" && "bg-zinc-100 text-zinc-900"
            )}
          >
            <Users className="h-5 w-5" />
            <span className="text-sm font-medium">Clientes</span>
          </Link>
          
          <Link
            to="/financeiro"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-all hover:text-zinc-900",
              pathname === "/financeiro" && "bg-zinc-100 text-zinc-900"
            )}
          >
            <CreditCard className="h-5 w-5" />
            <span className="text-sm font-medium">Financeiro</span>
          </Link>
          
          <Link
            to="/notas"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-all hover:text-zinc-900",
              pathname === "/notas" && "bg-zinc-100 text-zinc-900"
            )}
          >
            <FileSpreadsheet className="h-5 w-5" />
            <span className="text-sm font-medium">Notas</span>
          </Link>
          
          <Link
            to="/tarefas"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-all hover:text-zinc-900",
              pathname === "/tarefas" && "bg-zinc-100 text-zinc-900"
            )}
          >
            <ClipboardList className="h-5 w-5" />
            <span className="text-sm font-medium">Tarefas</span>
          </Link>
          
          <Link
            to="/whatsapp"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-all hover:text-zinc-900",
              pathname === "/whatsapp" && "bg-zinc-100 text-zinc-900"
            )}
          >
            <Phone className="h-5 w-5" />
            <span className="text-sm font-medium">Whatsapp</span>
          </Link>
          
          <Link
            to="/chat-suporte"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-all hover:text-zinc-900",
              pathname === "/chat-suporte" && "bg-zinc-100 text-zinc-900"
            )}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Chat Suporte</span>
          </Link>
          
          <Link
            to="/planos"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-all hover:text-zinc-900",
              pathname === "/planos" && "bg-zinc-100 text-zinc-900"
            )}
          >
            <CreditCard className="h-5 w-5" />
            <span className="text-sm font-medium">Planos</span>
          </Link>
          
          <Link
            to="/gateways"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-all hover:text-zinc-900",
              pathname === "/gateways" && "bg-zinc-100 text-zinc-900"
            )}
          >
            <CreditCard className="h-5 w-5" />
            <span className="text-sm font-medium">Gateways</span>
          </Link>
          
          <Link
            to="/configuracao"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-all hover:text-zinc-900",
              pathname === "/configuracao" && "bg-zinc-100 text-zinc-900"
            )}
          >
            <Settings className="h-5 w-5" />
            <span className="text-sm font-medium">Configuração</span>
          </Link>
          
          <Link
            to="/minha-conta"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-all hover:text-zinc-900",
              pathname === "/minha-conta" && "bg-zinc-100 text-zinc-900"
            )}
          >
            <User className="h-5 w-5" />
            <span className="text-sm font-medium">Minha Conta</span>
          </Link>
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
