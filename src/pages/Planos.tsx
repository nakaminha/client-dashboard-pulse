
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { ChevronDown, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';

interface PlanoFormValues {
  nome: string;
  descricao: string;
  valor: string;
  tipoCobranca: string;
  status: string;
  solicitarUsuario: boolean;
  solicitarCpfCnpj: boolean;
  solicitarEndereco: boolean;
}

interface Plano extends PlanoFormValues {
  id: string;
}

const Planos = () => {
  const [criandoPlano, setCriandoPlano] = useState(false);
  const [planos, setPlanos] = useState<Plano[]>([]);

  const form = useForm<PlanoFormValues>({
    defaultValues: {
      nome: '',
      descricao: '',
      valor: '',
      tipoCobranca: 'Mensal',
      status: 'Ativar',
      solicitarUsuario: false,
      solicitarCpfCnpj: false,
      solicitarEndereco: false,
    },
  });

  const onSubmit = (data: PlanoFormValues) => {
    const novoPlano: Plano = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
    };
    
    setPlanos([...planos, novoPlano]);
    
    toast({
      title: "Plano criado",
      description: `O plano ${data.nome} foi criado com sucesso.`,
    });
    
    form.reset();
    setCriandoPlano(false);
  };

  if (criandoPlano) {
    return (
      <div className="space-y-6">
        <div className="bg-azul-600 text-white p-4 rounded-lg flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">CRIAR PLANO</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4">Informações do Plano</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="nome">Nome do Plano:</Label>
                        <Input 
                          id="nome" 
                          placeholder="Digite o nome do Plano" 
                          {...form.register('nome')}
                        />
                      </div>
                      <div>
                        <Label htmlFor="descricao">Descrição do Plano:</Label>
                        <Textarea 
                          id="descricao" 
                          placeholder="" 
                          className="min-h-[120px]" 
                          {...form.register('descricao')}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4">Valor do Plano:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="valor">Valor do Plano:</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500">R$</span>
                          </div>
                          <Input 
                            id="valor" 
                            type="text" 
                            className="pl-10" 
                            placeholder="0,00" 
                            {...form.register('valor')}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="tipoCobranca">Tipo de Cobrança:</Label>
                        <FormField
                          control={form.control}
                          name="tipoCobranca"
                          render={({ field }) => (
                            <FormItem>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Mensal">Mensal</SelectItem>
                                  <SelectItem value="Trimestral">Trimestral</SelectItem>
                                  <SelectItem value="Semestral">Semestral</SelectItem>
                                  <SelectItem value="Anual">Anual</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        Mensagens de Aviso
                      </div>
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                      É necessário ter algum template de mensagem criado na página <a href="#" className="text-blue-500 hover:underline">Templates WhatsApp</a>.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-md">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 border border-gray-300 rounded-full flex items-center justify-center">
                            <div className="h-2 w-2 bg-white rounded-full"></div>
                          </div>
                          <span className="font-medium text-sm">Mensagem Antes do vencimento:</span>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-md">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 border border-gray-300 rounded-full flex items-center justify-center">
                            <div className="h-2 w-2 bg-white rounded-full"></div>
                          </div>
                          <span className="font-medium text-sm">Mensagem após o vencimento:</span>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-md">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 border border-gray-300 rounded-full flex items-center justify-center">
                            <div className="h-2 w-2 bg-white rounded-full"></div>
                          </div>
                          <span className="font-medium text-sm">Mensagem dia do vencimento:</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </Form>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Configuração do Plano</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="status">Status do Plano:</Label>
                    <Form {...form}>
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Ativar">Ativar</SelectItem>
                                <SelectItem value="Inativo">Inativo</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </Form>
                  </div>
                  
                  <div className="flex items-start space-x-2 pt-4">
                    <Checkbox 
                      id="solicitarUsuario" 
                      checked={form.watch('solicitarUsuario')}
                      onCheckedChange={(checked) => 
                        form.setValue('solicitarUsuario', Boolean(checked))
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="solicitarUsuario" className="font-medium">
                        Solicitar Usuário
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Caso demarque essa opção, o usuário será criado automaticamente no checkout do cadastro do plano.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox 
                      id="solicitarCpfCnpj" 
                      checked={form.watch('solicitarCpfCnpj')}
                      onCheckedChange={(checked) => 
                        form.setValue('solicitarCpfCnpj', Boolean(checked))
                      }
                    />
                    <Label htmlFor="solicitarCpfCnpj" className="font-medium">
                      Solicitar CPF/CNPJ no Checkout
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox 
                      id="solicitarEndereco" 
                      checked={form.watch('solicitarEndereco')}
                      onCheckedChange={(checked) => 
                        form.setValue('solicitarEndereco', Boolean(checked))
                      }
                    />
                    <Label htmlFor="solicitarEndereco" className="font-medium">
                      Solicitar Endereço no Checkout
                    </Label>
                  </div>
                  
                  <Button 
                    type="button" 
                    onClick={form.handleSubmit(onSubmit)}
                    className="w-full mt-6 bg-azul-600 hover:bg-azul-700"
                  >
                    Criar Plano
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Planos</h1>
        <p className="text-gray-500 dark:text-gray-400">Gerenciamento de planos e assinaturas.</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Pesquisar" className="w-[250px] pl-8" />
        </div>
        
        <Button 
          onClick={() => setCriandoPlano(true)}
          className="bg-azul-600 hover:bg-azul-700"
        >
          Criar Plano
        </Button>
      </div>
      
      {planos.length > 0 ? (
        <div className="space-y-4">
          {planos.map((plano) => (
            <Card key={plano.id}>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{plano.nome}</h3>
                  <p className="text-sm text-gray-500">{plano.descricao}</p>
                  <p className="text-sm font-semibold mt-1">R$ {plano.valor} / {plano.tipoCobranca}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Editar</Button>
                  <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                    Deletar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center h-64">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-16 h-16 text-gray-400 mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <h2 className="text-xl font-medium">Nenhum plano cadastrado</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
              Você ainda não criou nenhum plano. Clique em "Criar Plano" para começar.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Planos;
