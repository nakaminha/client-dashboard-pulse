
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type User = {
  id: string;
  nome: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Em uma aplicação real, você deve validar com um backend
  const login = async (email: string, senha: string) => {
    try {
      // Simulando uma chamada de API com um atraso
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Credenciais mockadas para teste
      if (email === 'admin@exemplo.com' && senha === 'senha123') {
        const userData: User = {
          id: '1',
          nome: 'Administrador',
          email: 'admin@exemplo.com',
        };
        
        setUser(userData);
        
        // Salvar no localStorage para persistir o login
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast.success('Login realizado com sucesso!');
        navigate('/');
      } else {
        toast.error('Email ou senha incorretos');
      }
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.');
      console.error('Erro de login:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logout realizado com sucesso');
    navigate('/login');
  };

  // Verificar se o usuário já está logado (ao carregar a aplicação)
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao recuperar usuário:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
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
