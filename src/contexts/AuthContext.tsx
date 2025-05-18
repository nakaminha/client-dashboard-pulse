
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
      // Para ambiente de desenvolvimento sem Supabase configurado
      if (!import.meta.env.VITE_SUPABASE_URL) {
        console.log('Ambiente de desenvolvimento: usando login simulado');
        
        // Simula um login bem-sucedido com usuário administrador
        const mockUser: User = {
          id: 'mock-user-id',
          nome: 'Usuário de Teste',
          email: email,
          role: 'admin', // Simula um usuário com acesso completo
        };
        
        setUser(mockUser);
        toast.success('Login realizado com sucesso (modo simulação)!');
        navigate('/');
        return;
      }

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
      
      // Redireciona com base no cargo do usuário
      if (userData.role === 'pendente') {
        navigate('/acesso-pendente');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      console.error('Erro de login:', error);
      toast.error(error.message || 'Erro ao fazer login. Tente novamente.');
    }
  };

  const register = async (nome: string, email: string, senha: string) => {
    try {
      // Para ambiente de desenvolvimento sem Supabase configurado
      if (!import.meta.env.VITE_SUPABASE_URL) {
        console.log('Ambiente de desenvolvimento: usando registro simulado');
        toast.success('Registro realizado com sucesso! Aguarde aprovação para acessar o sistema.');
        navigate('/login');
        return;
      }

      // 1. Verificar se o email já está em uso na autenticação do Supabase
      try {
        const { error: authCheckError } = await supabase.auth.signInWithPassword({
          email,
          password: 'senha_temporaria_para_verificacao',
        });
  
        // Se não houver erro de credenciais inválidas, significa que o email existe
        if (!authCheckError) {
          // Fazer logout para limpar a sessão criada pela verificação
          await supabase.auth.signOut();
          throw new Error('Este email já está registrado');
        }
      } catch (err: any) {
        // Se o erro não for de credenciais inválidas, é provável que o email já exista
        if (err.message !== 'Invalid login credentials' && err.message !== 'Este email já está registrado') {
          console.log('Erro na verificação de email:', err);
          // Não vamos lançar erro aqui, pois pode ser apenas uma falha na verificação
        }
        if (err.message === 'Este email já está registrado') {
          throw err;
        }
      }

      // 2. Verificar se o email já está em uso na tabela perfis
      const { data: existingProfiles, error: profileCheckError } = await supabase
        .from('perfis')
        .select('email')
        .eq('email', email);

      if (profileCheckError) {
        console.error('Erro ao verificar email:', profileCheckError);
        throw new Error('Erro ao verificar disponibilidade do email');
      }

      if (existingProfiles && existingProfiles.length > 0) {
        throw new Error('Este email já está em uso');
      }

      // 3. Criar o usuário na autenticação Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            nome,
          }
        }
      });

      if (error) throw error;

      // 4. Garantir que temos um ID de usuário antes de criar o perfil
      if (!data?.user?.id) {
        throw new Error('Erro ao criar usuário: ID não retornado');
      }

      // 5. Adicionar perfil do usuário na tabela perfis com cargo inicial 'pendente'
      const { error: profileError } = await supabase
        .from('perfis')
        .insert({
          id: data.user.id,
          nome,
          email,
          role: 'pendente',
          created_at: new Date().toISOString()
        });

      if (profileError) {
        console.error('Erro ao criar perfil:', profileError);
        throw new Error('Erro ao criar perfil de usuário');
      }

      toast.success('Registro realizado com sucesso! Aguarde aprovação para acessar o sistema.');
      navigate('/login');
    } catch (error: any) {
      console.error('Erro de registro:', error);
      toast.error(error.message || 'Erro ao registrar. Tente novamente.');
    }
  };

  const logout = async () => {
    // Para ambiente de desenvolvimento sem Supabase configurado
    if (!import.meta.env.VITE_SUPABASE_URL) {
      setUser(null);
      toast.success('Logout realizado com sucesso (modo simulação)');
      navigate('/login');
      return;
    }

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
      // Para ambiente de desenvolvimento sem Supabase configurado
      if (!import.meta.env.VITE_SUPABASE_URL) {
        console.log('Ambiente de desenvolvimento: sem verificação de sessão');
        return;
      }

      try {
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData?.session) {
          const { data: profileData, error: profileError } = await supabase
            .from('perfis')
            .select('*')
            .eq('id', sessionData.session.user.id)
            .single();
  
          if (profileError) {
            console.error('Erro ao buscar perfil:', profileError);
            return;
          }
  
          if (profileData) {
            const userData: User = {
              id: sessionData.session.user.id,
              nome: profileData.nome || sessionData.session.user.email?.split('@')[0] || 'Usuário',
              email: sessionData.session.user.email || '',
              role: profileData.role || 'pendente',
            };
            
            setUser(userData);
            
            // Redirecionar usuário pendente para página específica se já estiver autenticado
            if (userData.role === 'pendente' && window.location.pathname !== '/acesso-pendente') {
              navigate('/acesso-pendente');
            }
          }
        }
      } catch (err) {
        console.error('Erro ao verificar sessão:', err);
      }
    };

    checkSession();

    // Para ambiente de desenvolvimento sem Supabase configurado
    if (!import.meta.env.VITE_SUPABASE_URL) {
      return () => {};
    }

    // Configura listener para mudança de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('perfis')
            .select('*')
            .eq('id', session.user.id)
            .single();
  
          if (profileError) {
            console.error('Erro ao buscar perfil:', profileError);
            return;
          }
  
          if (profileData) {
            setUser({
              id: session.user.id,
              nome: profileData.nome || session.user.email?.split('@')[0] || 'Usuário',
              email: session.user.email || '',
              role: profileData.role || 'pendente',
            });
          }
        } catch (err) {
          console.error('Erro ao processar mudança de autenticação:', err);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [navigate]);

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
