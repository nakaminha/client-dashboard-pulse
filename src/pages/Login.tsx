
import LoginForm from '@/components/auth/LoginForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar para dashboard se já estiver autenticado
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-50 to-azul-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-azul-800">Portal Administrativo</h1>
          <p className="text-azul-600 mt-2">Gerencie seus clientes e dados</p>
        </div>
        <LoginForm />
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Use admin@exemplo.com / senha123 para entrar</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
