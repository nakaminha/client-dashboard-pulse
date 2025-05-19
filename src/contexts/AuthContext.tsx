
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
  login: (email: string, senha: string, forceSimulation?: boolean) => Promise<void>;
  logout: () => void;
  register: (nome: string, email: string, senha: string) => Promise<void>;
};

// Criando o contexto com um valor padrão undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialAuthCheckDone, setInitialAuthCheckDone] = useState(false);
  // useNavigate só pode ser usado dentro de componentes que estão dentro do BrowserRouter
  const navigate = useNavigate();

  // Verifica se o usuário está autorizado (qualquer cargo exceto 'pendente')
  const isAuthorized = user?.role !== 'pendente';

  // Login function
  const login = async (email: string, senha: string, forceSimulation = false) => {
    try {
      // Para ambiente de desenvolvimento sem Supabase configurado ou falhas de conexão
      const isDevMode = !import.meta.env.VITE_SUPABASE_URL || forceSimulation;
      
      if (isDevMode) {
        console.log('Ambiente de desenvolvimento ou modo de simulação ativado: usando login simulado');
        
        // Simula um atraso para dar feedback visual ao usuário
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Simula um login bem-sucedido com usuário administrador
        const mockUser: User = {
          id: 'mock-user-id',
          nome: 'Usuário de Teste',
          email: email,
          role: 'admin', // Simula um usuário com acesso completo
        };
        
        setUser(mockUser);
        
        // Redireciona para a página inicial após login bem-sucedido
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
        throw new Error('Erro ao buscar informações do perfil');
      }

      const userData: User = {
        id: data.user.id,
        nome: profileData.nome || data.user.email?.split('@')[0] || 'Usuário',
        email: data.user.email || '',
        role: profileData.role || 'pendente',
      };
      
      setUser(userData);
      
      // Redireciona com base no cargo do usuário
      if (userData.role === 'pendente') {
        navigate('/acesso-pendente');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      // Detectar problemas de rede
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.error('Erro de conexão:', error);
        throw new Error('Erro de conexão com o servidor. Verifique sua internet.');
      }
      console.error('Erro no login:', error);
      throw error;
    }
  };

  // Register function
  const register = async (nome: string, email: string, senha: string) => {
    // Para ambiente de desenvolvimento sem Supabase configurado
    if (!import.meta.env.VITE_SUPABASE_URL) {
      console.log('Ambiente de desenvolvimento: usando registro simulado');
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success('Registro realizado com sucesso! Aguarde aprovação para acessar o sistema.');
      navigate('/login');
      return;
    }

    try {
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
      console.error('Erro no registro:', error);
      
      if (error.message?.includes('fetch')) {
        toast.error('Erro de conexão com o servidor. Verifique sua internet.');
      } else {
        toast.error(error.message || 'Erro ao registrar usuário');
      }
      
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    // Para ambiente de desenvolvimento sem Supabase configurado
    if (!import.meta.env.VITE_SUPABASE_URL) {
      setUser(null);
      toast.success('Logout realizado com sucesso (modo simulação)');
      navigate('/login');
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Erro ao fazer logout:', error);
        toast.error('Erro ao fazer logout');
        return;
      }
      
      setUser(null);
      toast.success('Logout realizado com sucesso');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao processar logout:', error);
      // Em caso de falha de conexão, forçar logout
      setUser(null);
      toast.warning('Logout forçado devido a erro de conexão');
      navigate('/login');
    }
  };

  // Verificar sessão atual ao carregar a aplicação
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Para ambiente de desenvolvimento sem Supabase configurado
        if (!import.meta.env.VITE_SUPABASE_URL) {
          console.log('Ambiente de desenvolvimento: sem verificação de sessão');
          setInitialAuthCheckDone(true);
          return;
        }

        console.log('Verificando sessão do usuário...');
        const { data: sessionData, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erro ao verificar sessão:', error);
          setInitialAuthCheckDone(true);
          return;
        }
        
        if (sessionData?.session) {
          try {
            const { data: profileData, error: profileError } = await supabase
              .from('perfis')
              .select('*')
              .eq('id', sessionData.session.user.id)
              .single();
    
            if (profileError) {
              console.error('Erro ao buscar perfil:', profileError);
              setInitialAuthCheckDone(true);
              return;
            }
    
            if (profileData) {
              const userData: User = {
                id: sessionData.session.user.id,
                nome: profileData.nome || sessionData.session.user.email?.split('@')[0] || 'Usuário',
                email: sessionData.session.user.email || '',
                role: profileData.role || 'pendente',
              };
              
              console.log('Usuário autenticado:', userData);
              setUser(userData);
              
              // Redirecionar usuário pendente para página específica se já estiver autenticado
              if (userData.role === 'pendente' && window.location.pathname !== '/acesso-pendente') {
                navigate('/acesso-pendente');
              }
            }
          } catch (fetchError) {
            console.error('Erro ao buscar dados do perfil:', fetchError);
          }
        }
      } catch (err) {
        console.error('Erro geral ao verificar sessão:', err);
      } finally {
        setInitialAuthCheckDone(true);
      }
    };

    checkSession();

    // Configura listener para mudança de autenticação (apenas em ambiente não dev)
    let authListener: { data?: { subscription: { unsubscribe: () => void } } } = {};
    
    if (import.meta.env.VITE_SUPABASE_URL) {
      try {
        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            try {
              const { data: profileData, error: profileError } = await supabase
                .from('perfis')
                .select('*')
                .eq('id', session.user.id)
                .single();
      
              if (profileError) {
                console.error('Erro ao buscar perfil durante mudança de auth:', profileError);
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
        
        authListener = listener;
      } catch (error) {
        console.error('Erro ao configurar listener de autenticação:', error);
      }
    }

    return () => {
      if (authListener?.data?.subscription) {
        authListener.data.subscription.unsubscribe();
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
