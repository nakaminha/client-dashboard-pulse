
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { UserRound, KeyRound, ShieldCheck, Settings2, BellRing } from 'lucide-react';

const MinhaConta = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  
  // Form para dados pessoais
  const userForm = useForm({
    defaultValues: {
      nome: user?.nome || '',
      email: user?.email || '',
      telefone: '(00) 00000-0000', // Exemplo - seria preenchido com dados reais
    }
  });

  // Form para senha
  const senhaForm = useForm({
    defaultValues: {
      senhaAtual: '',
      novaSenha: '',
      confirmarSenha: '',
    }
  });

  // Lidar com a submissão do formulário de dados pessoais
  const handleUserUpdate = (data: any) => {
    toast.promise(
      // Simulando uma chamada de API
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Atualizando informações...',
        success: () => {
          setEditMode(false);
          return 'Informações atualizadas com sucesso!';
        },
        error: 'Erro ao atualizar informações.',
      }
    );
  };

  // Lidar com a submissão do formulário de senha
  const handlePasswordUpdate = (data: any) => {
    if (data.novaSenha !== data.confirmarSenha) {
      toast.error('As senhas não coincidem.');
      return;
    }

    toast.promise(
      // Simulando uma chamada de API
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Atualizando senha...',
        success: () => {
          senhaForm.reset();
          return 'Senha atualizada com sucesso!';
        },
        error: 'Erro ao atualizar senha.',
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Minha Conta</h1>
        <p className="text-gray-500 dark:text-gray-400">Gerencie suas informações pessoais e preferências.</p>
      </div>
      
      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="perfil" className="flex items-center gap-2">
            <UserRound className="h-4 w-4" />
            <span className="hidden md:inline">Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            <span className="hidden md:inline">Segurança</span>
          </TabsTrigger>
          <TabsTrigger value="preferencias" className="flex items-center gap-2">
            <Settings2 className="h-4 w-4" />
            <span className="hidden md:inline">Preferências</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Conteúdo da aba de Perfil */}
        <TabsContent value="perfil" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize suas informações de perfil.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" alt={user?.nome} />
                  <AvatarFallback className="text-2xl bg-azul-100 text-azul-700 dark:bg-azul-800 dark:text-azul-300">
                    {user?.nome?.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h3 className="font-medium text-lg">{user?.nome}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <p className="text-sm text-muted-foreground mt-1">{user?.role === 'admin' ? 'Administrador' : 'Usuário'}</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Alterar foto
                  </Button>
                </div>
              </div>
              
              <form onSubmit={userForm.handleSubmit(handleUserUpdate)} className="space-y-4">
                {editMode ? (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome completo</Label>
                        <Input 
                          id="nome" 
                          {...userForm.register('nome')}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          disabled
                          {...userForm.register('email')}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input 
                          id="telefone" 
                          {...userForm.register('telefone')}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setEditMode(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit">Salvar alterações</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome completo</Label>
                        <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded">{user?.nome}</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded">{user?.email}</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <p className="p-2 bg-gray-50 dark:bg-gray-800 rounded">(00) 00000-0000</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        type="button" 
                        onClick={() => setEditMode(true)}
                      >
                        Editar informações
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Conteúdo da aba de Segurança */}
        <TabsContent value="seguranca" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alteração de Senha</CardTitle>
              <CardDescription>Mantenha sua conta segura atualizando sua senha regularmente.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={senhaForm.handleSubmit(handlePasswordUpdate)} className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="senhaAtual">Senha atual</Label>
                    <Input 
                      id="senhaAtual" 
                      type="password"
                      {...senhaForm.register('senhaAtual')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="novaSenha">Nova senha</Label>
                    <Input 
                      id="novaSenha" 
                      type="password"
                      {...senhaForm.register('novaSenha')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmarSenha">Confirmar senha</Label>
                    <Input 
                      id="confirmarSenha" 
                      type="password"
                      {...senhaForm.register('confirmarSenha')}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Atualizar senha</Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>Configurações adicionais de segurança para sua conta.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-azul-600" />
                  <div>
                    <p className="font-medium">Autenticação de dois fatores</p>
                    <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança à sua conta.</p>
                  </div>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Conteúdo da aba de Preferências */}
        <TabsContent value="preferencias" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>Configurações de notificações e alertas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <BellRing className="h-5 w-5 text-azul-600" />
                  <div>
                    <p className="font-medium">Notificações por email</p>
                    <p className="text-sm text-muted-foreground">Receba atualizações importantes por email.</p>
                  </div>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MinhaConta;
