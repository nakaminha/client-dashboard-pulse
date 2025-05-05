
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Check, MessageSquare, Clock, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Whatsapp = () => {
  const { toast } = useToast();
  const [renovacaoAtiva, setRenovacaoAtiva] = useState(false);
  const [chatbotAtivo, setChatbotAtivo] = useState(false);
  const [diasAntecedencia, setDiasAntecedencia] = useState(3);
  const [mensagemRenovacao, setMensagemRenovacao] = useState(
    'Olá, {nome}! Seu plano {plano} vence em {dias} dias. Clique aqui para renovar: {link}'
  );
  const [mensagemBemVindo, setMensagemBemVindo] = useState(
    'Olá! Bem-vindo ao atendimento automático. Como posso ajudar?'
  );

  const handleSaveRenovacao = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de renovação foram salvas com sucesso.",
    });
  };

  const handleSaveChatbot = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações do chatbot foram salvas com sucesso.",
    });
  };

  const handleTesteRenovacao = () => {
    toast({
      title: "Mensagem de teste enviada",
      description: "Uma mensagem de teste foi enviada para seu número.",
    });
  };

  const handleTesteChatbot = () => {
    toast({
      title: "Chatbot testado",
      description: "Você pode testar o chatbot no WhatsApp (21) 98765-4321.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-500 text-white p-6 rounded-lg flex items-center justify-between">
        <div className="flex items-center">
          <MessageSquare className="w-8 h-8 mr-3" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">WhatsApp</h1>
            <p className="text-gray-100">Automação e comunicação com clientes via WhatsApp</p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="renovacao" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="renovacao">Renovação Automática</TabsTrigger>
          <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
        </TabsList>
        
        <TabsContent value="renovacao">
          <Card>
            <CardHeader>
              <CardTitle>Lembrete de Renovação de Plano</CardTitle>
              <CardDescription>
                Configure mensagens automáticas para lembrar seus clientes sobre a renovação do plano.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="renovacao-ativa" 
                  checked={renovacaoAtiva}
                  onCheckedChange={setRenovacaoAtiva}
                />
                <Label htmlFor="renovacao-ativa">Ativar lembretes automáticos</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dias-antecedencia">Dias de antecedência</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="dias-antecedencia" 
                    type="number" 
                    min={1} 
                    max={30} 
                    value={diasAntecedencia}
                    onChange={(e) => setDiasAntecedencia(Number(e.target.value))}
                  />
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">dias antes do vencimento</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mensagem-renovacao">Mensagem de renovação</Label>
                <Textarea 
                  id="mensagem-renovacao" 
                  placeholder="Mensagem para o cliente..." 
                  value={mensagemRenovacao}
                  onChange={(e) => setMensagemRenovacao(e.target.value)}
                  rows={4}
                />
                <div className="text-sm text-gray-500 flex flex-col space-y-1">
                  <span>Variáveis disponíveis:</span>
                  <span><code>{"{nome}"}</code> - Nome do cliente</span>
                  <span><code>{"{plano}"}</code> - Nome do plano</span>
                  <span><code>{"{dias}"}</code> - Dias restantes</span>
                  <span><code>{"{link}"}</code> - Link de pagamento</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleTesteRenovacao}>
                Enviar mensagem de teste
              </Button>
              <Button onClick={handleSaveRenovacao}>
                <Check className="mr-2 h-4 w-4" /> Salvar configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="chatbot">
          <Card>
            <CardHeader>
              <CardTitle>Respostas Automáticas (Chatbot)</CardTitle>
              <CardDescription>
                Configure respostas automáticas para perguntas frequentes dos seus clientes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="chatbot-ativo" 
                  checked={chatbotAtivo}
                  onCheckedChange={setChatbotAtivo}
                />
                <Label htmlFor="chatbot-ativo">Ativar respostas automáticas</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mensagem-boas-vindas">Mensagem de boas-vindas</Label>
                <Textarea 
                  id="mensagem-boas-vindas" 
                  placeholder="Mensagem inicial..." 
                  value={mensagemBemVindo}
                  onChange={(e) => setMensagemBemVindo(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="font-medium mb-2">Respostas automáticas configuradas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start p-2 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                    <div>
                      <p className="font-medium">Como renovar meu plano?</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Você pode renovar seu plano acessando sua conta...</p>
                    </div>
                    <Button variant="ghost" size="sm">Editar</Button>
                  </div>
                  <div className="flex justify-between items-start p-2 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                    <div>
                      <p className="font-medium">Horário de atendimento</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Nosso horário de atendimento é de segunda a sexta...</p>
                    </div>
                    <Button variant="ghost" size="sm">Editar</Button>
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    <Calendar className="mr-2 h-4 w-4" /> Adicionar nova resposta
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleTesteChatbot}>
                Testar chatbot
              </Button>
              <Button onClick={handleSaveChatbot}>
                <Check className="mr-2 h-4 w-4" /> Salvar configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Whatsapp;
