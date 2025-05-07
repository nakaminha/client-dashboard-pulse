
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

type UserRole = 'pendente' | 'usuario' | 'premium' | 'admin';

type User = {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAuthorized: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  register: (nome: string, email: string, senha: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Verifica se o usuário está autorizado (qualquer cargo exceto 'pendente')
  const isAuthorized = user?.role !== 'pendente';

  const login = async (email: string, senha: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) throw error;

      // Após login bem sucedido, buscar perfil do usuário para obter o cargo
      const { data: profileData, error: profileError } = await supabase
        .from('perfis')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('Erro ao buscar perfil:', profileError);
        toast.error('Erro ao buscar informações do perfil');
        return;
      }

      const userData: User = {
        id: data.user.id,
        nome: profileData.nome || data.user.email?.split('@')[0] || 'Usuário',
        email: data.user.email || '',
        role: profileData.role || 'pendente',
      };
      
      setUser(userData);
      
      toast.success('Login realizado com sucesso!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login. Tente novamente.');
      console.error('Erro de login:', error);
    }
  };

  const register = async (nome: string, email: string, senha: string) => {
    try {
      // 1. Criar o usuário na autenticação Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            nome,
          },
        }
      });

      if (error) throw error;

      // 2. Adicionar perfil do usuário na tabela perfis com cargo inicial 'pendente'
      if (data.user) {
        const { error: profileError } = await supabase
          .from('perfis')
          .insert({
            id: data.user.id,
            nome,
            email,
            role: 'pendente' as UserRole,
          });

        if (profileError) {
          console.error('Erro ao criar perfil:', profileError);
          throw new Error('Erro ao criar perfil de usuário');
        }
      }

      toast.success('Registro realizado com sucesso! Aguarde aprovação para acessar o sistema.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao registrar. Tente novamente.');
      console.error('Erro de registro:', error);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Erro ao fazer logout:', error);
      toast.error('Erro ao fazer logout');
      return;
    }
    
    setUser(null);
    toast.success('Logout realizado com sucesso');
    navigate('/login');
  };

  // Verificar sessão atual ao carregar a aplicação
  useEffect(() => {
    const checkSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (sessionData?.session) {
        const { data: profileData, error: profileError } = await supabase
          .from('perfis')
          .select('*')
          .eq('id', sessionData.session.user.id)
          .single();

        if (!profileError && profileData) {
          setUser({
            id: sessionData.session.user.id,
            nome: profileData.nome || sessionData.session.user.email?.split('@')[0] || 'Usuário',
            email: sessionData.session.user.email || '',
            role: profileData.role || 'pendente',
          });
        }
      }
    };

    checkSession();

    // Configura listener para mudança de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { data: profileData, error: profileError } = await supabase
          .from('perfis')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (!profileError && profileData) {
          setUser({
            id: session.user.id,
            nome: profileData.nome || session.user.email?.split('@')[0] || 'Usuário',
            email: session.user.email || '',
            role: profileData.role || 'pendente',
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAuthorized,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
