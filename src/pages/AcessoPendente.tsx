
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const AcessoPendente = () => {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-azul-50 to-azul-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-azul-800 mb-4">Acesso Pendente</h1>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Olá {user?.nome}, seu cadastro foi realizado com sucesso, mas seu acesso 
                está pendente de aprovação por um administrador.
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">
          Por favor, entre em contato pelo WhatsApp (85) 98570-4035 para solicitar 
          a aprovação do seu acesso.
        </p>
        
        <Button 
          onClick={logout} 
          className="w-full bg-azul-600 hover:bg-azul-700"
        >
          Voltar para Login
        </Button>
      </div>
    </div>
  );
};

export default AcessoPendente;
