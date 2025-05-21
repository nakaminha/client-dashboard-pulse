
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  User,
  UserRole,
  initializeDefaultAdmin,
  getCurrentUser,
  authenticateUser,
  registerUser,
  logoutUser,
  updateUserRole,
  updateUserProfile,
  changePassword
} from '@/lib/auth/authStorage';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAuthorized: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  updateProfile: (nome: string, email: string) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  updateRole: (userId: string, role: UserRole) => Promise<void>;
};

// Criando o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialAuthCheckDone, setInitialAuthCheckDone] = useState(false);
  const navigate = useNavigate();

  // Verifica se o usuário está autorizado (qualquer cargo exceto 'pendente')
  const isAuthorized = user?.role !== 'pendente';

  // Login function
  const login = async (email: string, senha: string) => {
    try {
      // Autenticar usuário usando localStorage
      const authenticatedUser = authenticateUser(email, senha);
      setUser(authenticatedUser);
      
      // Redireciona com base no cargo do usuário
      if (authenticatedUser.role === 'pendente') {
        navigate('/acesso-pendente');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  // Register function
  const register = async (nome: string, email: string, senha: string) => {
    try {
      registerUser(nome, email, senha);
      toast.success('Registro realizado com sucesso! Aguarde aprovação para acessar o sistema.');
      navigate('/login');
    } catch (error: any) {
      console.error('Erro no registro:', error);
      toast.error(error.message || 'Erro ao registrar usuário');
      throw error;
    }
  };

  // Atualizar perfil
  const updateProfile = async (nome: string, email: string) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
      
      updateUserProfile(user.id, nome, email);
      
      // Atualizar estado do usuário no contexto
      setUser(prevUser => {
        if (!prevUser) return null;
        return { ...prevUser, nome, email };
      });
      
      toast.success('Perfil atualizado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error(error.message || 'Erro ao atualizar perfil');
      throw error;
    }
  };

  // Alterar senha
  const updatePassword = async (oldPassword: string, newPassword: string) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');
      
      changePassword(user.id, oldPassword, newPassword);
      toast.success('Senha alterada com sucesso!');
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      toast.error(error.message || 'Erro ao alterar senha');
      throw error;
    }
  };

  // Atualizar cargo de usuário (função admin)
  const updateRole = async (userId: string, role: UserRole) => {
    try {
      if (!user || user.role !== 'admin') {
        throw new Error('Permissão negada. Apenas administradores podem alterar cargos.');
      }
      
      updateUserRole(userId, role);
      toast.success('Cargo do usuário atualizado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao atualizar cargo:', error);
      toast.error(error.message || 'Erro ao atualizar cargo de usuário');
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    logoutUser();
    setUser(null);
    toast.success('Logout realizado com sucesso');
    navigate('/login');
  };

  // Verificar sessão atual ao carregar a aplicação
  useEffect(() => {
    // Inicializar usuário admin se não existir
    initializeDefaultAdmin();
    
    // Verificar se há um usuário logado
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
      
      // Redirecionar usuário pendente para página específica se já estiver autenticado
      if (storedUser.role === 'pendente' && window.location.pathname !== '/acesso-pendente') {
        navigate('/acesso-pendente');
      }
    }
    
    setInitialAuthCheckDone(true);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAuthorized,
      login,
      logout,
      register,
      updateProfile,
      updatePassword,
      updateRole
    }}>
      {initialAuthCheckDone ? children : (
        <div className="h-screen w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-azul-600"></div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

// Hook para facilitar o acesso ao context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
