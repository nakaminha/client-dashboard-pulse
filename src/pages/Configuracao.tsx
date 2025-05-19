
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Settings, 
  Bell, 
  ShieldCheck, 
  Globe, 
  Database, 
  CloudCog,
  Moon,
  Sun,
  Languages
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  RadioGroup,
  RadioGroupItem
} from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

const Configuracao = () => {
  const { theme, toggleTheme } = useTheme();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isDatabaseBackupOpen, setIsDatabaseBackupOpen] = useState(false);

  // Form para configurações gerais
  const generalForm = useForm({
    defaultValues: {
      systemName: 'Sistema de Gestão',
      language: 'pt-BR',
      dateFormat: 'DD/MM/YYYY'
    }
  });

  // Form para notificações
  const notificationsForm = useForm({
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      activityReports: 'weekly'
    }
  });

  // Função para salvar configurações gerais
  const handleGeneralSave = (data: any) => {
    toast.success('Configurações gerais salvas com sucesso!');
    console.log('Configurações gerais:', data);
  };

  // Função para salvar configurações de notificação
  const handleNotificationsSave = (data: any) => {
    toast.success('Configurações de notificações salvas com sucesso!');
    console.log('Configurações de notificações:', data);
  };

  // Função para exportar dados
  const handleExportData = () => {
    toast.success('Exportação de dados iniciada. Você receberá um email quando estiver pronto.');
  };

  // Função para fazer backup do banco de dados
  const handleDatabaseBackup = () => {
    setIsDatabaseBackupOpen(false);
    toast.success('Backup do banco de dados iniciado.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configuração</h1>
        <p className="text-gray-500 dark:text-gray-400">Personalize o sistema de acordo com suas necessidades.</p>
      </div>
      
      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="geral" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Geral</span>
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="aparencia" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span className="hidden md:inline">Aparência</span>
          </TabsTrigger>
          <TabsTrigger value="integracao" className="flex items-center gap-2">
            <CloudCog className="h-4 w-4" />
            <span className="hidden md:inline">Integrações</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Configurações Gerais */}
        <TabsContent value="geral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Sistema</CardTitle>
              <CardDescription>Personalize as configurações básicas do sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(handleGeneralSave)} className="space-y-4">
                  <FormField
                    control={generalForm.control}
                    name="systemName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Sistema</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome exibido em todo o sistema" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={generalForm.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Idioma</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              {...field}
                            >
                              <option value="pt-BR">Português (Brasil)</option>
                              <option value="en-US">English (US)</option>
                              <option value="es-ES">Español</option>
                            </select>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={generalForm.control}
                    name="dateFormat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Formato de Data</FormLabel>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="DD/MM/YYYY" id="dateFormat1" />
                              <Label htmlFor="dateFormat1">DD/MM/YYYY (31/12/2023)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="MM/DD/YYYY" id="dateFormat2" />
                              <Label htmlFor="dateFormat2">MM/DD/YYYY (12/31/2023)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="YYYY-MM-DD" id="dateFormat3" />
                              <Label htmlFor="dateFormat3">YYYY-MM-DD (2023-12-31)</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit">Salvar Configurações</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dados e Armazenamento</CardTitle>
              <CardDescription>Gerencie seus dados e configure opções de armazenamento.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="text-sm font-medium">Exportar Dados</h4>
                    <p className="text-sm text-muted-foreground">
                      Faça o download de todos os seus dados em formato CSV
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleExportData}>
                    Exportar
                  </Button>
                </div>
                
                <Dialog>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h4 className="text-sm font-medium">Limpar Cache</h4>
                      <p className="text-sm text-muted-foreground">
                        Limpe todos os dados armazenados localmente
                      </p>
                    </div>
                    <DialogTrigger asChild>
                      <Button variant="outline">Limpar Cache</Button>
                    </DialogTrigger>
                  </div>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tem certeza que deseja limpar o cache?</DialogTitle>
                      <DialogDescription>
                        Esta ação irá remover todos os dados armazenados localmente e pode afetar o desempenho inicial do sistema.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {}}>Cancelar</Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => {
                          toast.success("Cache limpo com sucesso!");
                        }}
                      >
                        Limpar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Drawer open={isDatabaseBackupOpen} onOpenChange={setIsDatabaseBackupOpen}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Backup do Banco de Dados</h4>
                      <p className="text-sm text-muted-foreground">
                        Faça um backup completo do banco de dados
                      </p>
                    </div>
                    <DrawerTrigger asChild>
                      <Button variant="outline" onClick={() => setIsDatabaseBackupOpen(true)}>
                        Fazer Backup
                      </Button>
                    </DrawerTrigger>
                  </div>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Backup do Banco de Dados</DrawerTitle>
                      <DrawerDescription>
                        Selecione as opções de backup abaixo:
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="backup-1" checked />
                        <Label htmlFor="backup-1">Dados de clientes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="backup-2" checked />
                        <Label htmlFor="backup-2">Dados financeiros</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="backup-3" checked />
                        <Label htmlFor="backup-3">Configurações do sistema</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="backup-4" />
                        <Label htmlFor="backup-4">Logs e histórico</Label>
                      </div>
                    </div>
                    <DrawerFooter>
                      <Button onClick={handleDatabaseBackup}>Iniciar Backup</Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configurações de Notificações */}
        <TabsContent value="notificacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>Gerencie como e quando você recebe notificações.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationsForm}>
                <form onSubmit={notificationsForm.handleSubmit(handleNotificationsSave)} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h4 className="text-sm font-medium">Notificações por Email</h4>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações por email
                        </p>
                      </div>
                      <FormField
                        control={notificationsForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h4 className="text-sm font-medium">Notificações por SMS</h4>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações por SMS
                        </p>
                      </div>
                      <FormField
                        control={notificationsForm.control}
                        name="smsNotifications"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h4 className="text-sm font-medium">Notificações Push</h4>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações push no navegador
                        </p>
                      </div>
                      <FormField
                        control={notificationsForm.control}
                        name="pushNotifications"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={notificationsForm.control}
                      name="activityReports"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relatórios de Atividade</FormLabel>
                          <FormControl>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              {...field}
                            >
                              <option value="daily">Diariamente</option>
                              <option value="weekly">Semanalmente</option>
                              <option value="monthly">Mensalmente</option>
                              <option value="never">Nunca</option>
                            </select>
                          </FormControl>
                          <FormDescription>
                            Frequência de recebimento dos relatórios de atividade
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Salvar Preferências</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configurações de Aparência */}
        <TabsContent value="aparencia" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>Personalize a aparência do sistema.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h4 className="text-sm font-medium">Tema</h4>
                  <p className="text-sm text-muted-foreground">
                    Escolha entre tema claro ou escuro
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  <Switch 
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                  />
                  <Moon className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="w-full"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="text-sm font-medium">Opções Avançadas</h4>
                    <p className="text-sm text-muted-foreground">
                      Configurações avançadas de aparência
                    </p>
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {isOpen ? "Ocultar" : "Mostrar"} opções
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Tamanho da Fonte</Label>
                    <select 
                      id="fontSize"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      <option value="small">Pequeno</option>
                      <option value="medium" selected>Médio</option>
                      <option value="large">Grande</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="colorScheme">Esquema de Cores</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant="outline" 
                        className="h-20 w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700"
                      >
                        Azul
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 w-full bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700"
                      >
                        Roxo
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
                      >
                        Verde
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Densidade</Label>
                    <RadioGroup defaultValue="comfortable" className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="density1" />
                        <Label htmlFor="density1">Compacta</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="density2" />
                        <Label htmlFor="density2">Confortável</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="spacious" id="density3" />
                        <Label htmlFor="density3">Espaçada</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <div className="flex justify-end">
                <Button>Salvar Aparência</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configurações de Integração */}
        <TabsContent value="integracao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrações</CardTitle>
              <CardDescription>Configure integrações com outras plataformas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <svg className="h-6 w-6" fill="#25D366" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M20.111 3.888C17.981 1.757 15.119 0.55 12.054 0.549C5.732 0.549 0.547 5.732 0.547 12.05C0.547 14.11 1.12 16.117 2.194 17.855L0.5 23.451L6.222 21.779C7.89 22.755 9.812 23.267 11.773 23.269H11.776H11.774C18.095 23.269 23.26 18.086 23.261 11.767C23.262 8.714 22.059 5.837 20.111 3.888ZM12.054 21.337H12.052C10.292 21.336 8.568 20.849 7.086 19.926L6.729 19.708L3.221 20.697L4.225 17.281L3.987 16.909C2.971 15.377 2.442 13.533 2.442 11.629C2.442 6.819 6.597 2.738 12.055 2.738C14.591 2.738 16.962 3.743 18.704 5.486C20.446 7.228 21.499 9.677 21.498 12.321C21.496 17.133 17.26 21.337 12.054 21.337ZM17.525 14.57C17.231 14.424 15.763 13.704 15.493 13.603C15.225 13.501 15.034 13.455 14.82 13.747C14.622 14.04 14.05 14.714 13.894 14.904C13.734 15.098 13.551 15.127 13.256 14.981C11.632 14.168 10.588 13.525 9.541 11.697C9.258 11.2 9.877 11.236 10.452 10.088C10.554 9.876 10.501 9.686 10.423 9.539C10.345 9.392 9.733 7.924 9.495 7.334C9.264 6.759 9.028 6.836 8.858 6.826C8.7 6.817 8.51 6.816 8.32 6.816C8.13 6.816 7.815 6.893 7.547 7.187C7.279 7.482 6.513 8.202 6.513 9.67C6.513 11.139 7.588 12.558 7.74 12.747C7.895 12.937 9.71 15.757 12.515 17.056C14.179 17.854 14.818 17.957 15.638 17.814C16.142 17.729 17.318 17.095 17.556 16.402C17.793 15.709 17.793 15.119 17.716 14.991C17.64 14.862 17.45 14.788 17.156 14.643L17.525 14.57Z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium">WhatsApp Business</h4>
                      <p className="text-sm text-muted-foreground">
                        Integração com WhatsApp Business API
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <svg className="h-6 w-6" viewBox="0 0 48 48" fill="none">
                      <path d="M41 24C41 33.3888 33.3888 41 24 41C14.6112 41 7 33.3888 7 24C7 14.6112 14.6112 7 24 7C33.3888 7 41 14.6112 41 24Z" fill="#2684FF"/>
                      <path d="M24.0002 15.4501C19.2864 15.4501 15.4502 19.2863 15.4502 24.0001C15.4502 28.7139 19.2864 32.5501 24.0002 32.5501C28.714 32.5501 32.5502 28.7139 32.5502 24.0001C32.5502 19.2863 28.714 15.4501 24.0002 15.4501ZM24.0002 26.9501C22.2602 26.9501 20.8502 25.5401 20.8502 23.8001C20.8502 22.0601 22.2602 20.6501 24.0002 20.6501C25.7402 20.6501 27.1502 22.0601 27.1502 23.8001C27.1502 25.5401 25.7402 26.9501 24.0002 26.9501Z" fill="white"/>
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium">Jira</h4>
                      <p className="text-sm text-muted-foreground">
                        Integração com Jira para gestão de tarefas
                      </p>
                    </div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#0088CC">
                      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.75 8.3l-1.79 8.44c-.12.56-.45.7-.91.43l-2.55-1.87-1.23 1.18c-.14.13-.25.25-.51.25l.18-2.5 4.55-4.1c.2-.17-.04-.28-.3-.11L8.46 13.96l-2.44-.79c-.53-.16-.54-.53.11-.78l9.53-3.65c.43-.19.82.11.64.66z"/>
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium">Telegram</h4>
                      <p className="text-sm text-muted-foreground">
                        Integração com Telegram para notificações
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <span className="mr-2">+</span> Adicionar Nova Integração
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuracao;

