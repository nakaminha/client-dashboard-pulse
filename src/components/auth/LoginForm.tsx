
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSimulationMode, setIsSimulationMode] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se está em modo de simulação
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1');
    const isLovableProject = window.location.hostname.includes('lovableproject');
    
    setIsSimulationMode(!supabaseUrl || isLocalhost || isLovableProject);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !senha) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, senha, isSimulationMode);
      
      if (isSimulationMode) {
        toast.success('Login simulado realizado com sucesso!');
        // Redirecionar após um pequeno atraso para mostrar o toast
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        toast.success('Login realizado com sucesso!');
      }
    } catch (error: any) {
      console.error('Erro no login:', error);
      
      if (isSimulationMode) {
        // Em modo de simulação, mostrar mensagem mas continuar com login simulado
        toast.warning('Usando modo de simulação para continuar mesmo com erro de conexão');
        
        // Forçar login simulado apesar do erro
        try {
          await login(email, senha, true);
          toast.success('Login simulado realizado com sucesso!');
          
          // Redirecionar após um pequeno atraso
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } catch (innerError) {
          console.error('Erro no login simulado:', innerError);
          toast.error('Erro ao simular login. Tente novamente.');
        }
      } else if (error.message?.includes('fetch') || error.name === 'AuthRetryableFetchError') {
        toast.error('Erro de conexão com o servidor. Verifique sua internet ou tente novamente mais tarde.');
      } else {
        // Outros erros de credenciais
        toast.error(error.message || 'Falha ao realizar login. Verifique suas credenciais.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Portal Admin</CardTitle>
        <CardDescription className="text-center">
          Entre com suas credenciais para acessar
          {isSimulationMode && (
            <div className="mt-2 text-amber-500 text-xs font-semibold rounded-md bg-amber-50 p-1">
              MODO DE SIMULAÇÃO ATIVO - Qualquer credencial irá funcionar
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="senha">Senha</Label>
              <Link to="/recuperar-senha" className="text-xs text-azul-600 hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="senha"
                type={showPassword ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            type="submit"
            className="w-full bg-azul-600 hover:bg-azul-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : 
              'Entrar'
            }
          </Button>
          <div className="text-center w-full pt-2">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-azul-600 hover:underline">
                Registre-se
              </Link>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
