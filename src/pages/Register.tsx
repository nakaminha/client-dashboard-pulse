
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
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
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-azul-800">Pk System</h1>
          <p className="text-azul-600 mt-2">Gerenciador de Clientes IPTV</p>
        </div>
        <RegisterForm />
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Faça sua solicitação via / WhatsApp (85) 98570-4035</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
