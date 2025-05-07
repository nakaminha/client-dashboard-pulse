
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Filter, 
  History, 
  Bell, 
  Users,
  Ticket
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter
} from '@/components/ui/sheet';
import { 
  Collapsible, 
  CollapsibleTrigger, 
  CollapsibleContent 
} from '@/components/ui/collapsible';
import { toast } from '@/components/ui/sonner';

// Tipos de dados para o sistema de tickets
type StatusTicket = 'aberto' | 'em_atendimento' | 'resolvido' | 'fechado';
type PrioridadeTicket = 'baixa' | 'media' | 'alta' | 'urgente';
type Atendente = 'Daniel' | 'Rafaela' | 'Marcos' | 'Não atribuído';

interface Mensagem {
  id: string;
  texto: string;
  data: Date;
  autor: string;
  autorTipo: 'cliente' | 'atendente';
}

interface Ticket {
  id: string;
  assunto: string;
  cliente: string;
  status: StatusTicket;
  prioridade: PrioridadeTicket;
  dataCriacao: Date;
  dataAtualizacao: Date;
  atendente: Atendente;
  mensagens: Mensagem[];
  naoLidas: number;
}

// Dados de exemplo para tickets
const ticketsIniciais: Ticket[] = [
  {
    id: "T001",
    assunto: "Problema com renovação do plano",
    cliente: "Empresa ABC",
    status: "aberto",
    prioridade: "alta",
    dataCriacao: new Date(2025, 4, 5, 14, 30),
    dataAtualizacao: new Date(2025, 4, 5, 14, 30),
    atendente: "Não atribuído",
    mensagens: [
      {
        id: "M001",
        texto: "Olá, estou com problemas para renovar meu plano mensal. O sistema não está aceitando meu cartão de crédito.",
        data: new Date(2025, 4, 5, 14, 30),
        autor: "João Silva",
        autorTipo: "cliente"
      }
    ],
    naoLidas: 1
  },
  {
    id: "T002",
    assunto: "Dúvida sobre funcionalidades",
    cliente: "Consultoria XYZ",
    status: "em_atendimento",
    prioridade: "media",
    dataCriacao: new Date(2025, 4, 4, 10, 15),
    dataAtualizacao: new Date(2025, 4, 4, 16, 45),
    atendente: "Daniel",
    mensagens: [
      {
        id: "M002",
        texto: "Gostaria de saber se o sistema permite integração com o meu ERP atual.",
        data: new Date(2025, 4, 4, 10, 15),
        autor: "Maria Oliveira",
        autorTipo: "cliente"
      },
      {
        id: "M003",
        texto: "Olá Maria, sim, nosso sistema possui API que permite integração com diversos ERPs. Poderia me informar qual você utiliza?",
        data: new Date(2025, 4, 4, 16, 45),
        autor: "Daniel",
        autorTipo: "atendente"
      }
    ],
    naoLidas: 0
  },
  {
    id: "T003",
    assunto: "Solicitação de recursos",
    cliente: "Indústrias 123",
    status: "resolvido",
    prioridade: "baixa",
    dataCriacao: new Date(2025, 4, 1, 9, 0),
    dataAtualizacao: new Date(2025, 4, 3, 11, 20),
    atendente: "Rafaela",
    mensagens: [
      {
        id: "M004",
        texto: "Seria possível adicionar um relatório específico para acompanhamento de metas?",
        data: new Date(2025, 4, 1, 9, 0),
        autor: "Carlos Mendes",
        autorTipo: "cliente"
      },
      {
        id: "M005",
        texto: "Bom dia Carlos, claro que sim! Já adicionamos essa sugestão ao nosso roadmap.",
        data: new Date(2025, 4, 1, 14, 30),
        autor: "Rafaela",
        autorTipo: "atendente"
      },
      {
        id: "M006",
        texto: "Obrigado pela atenção! Aguardo ansiosamente por essa nova funcionalidade.",
        data: new Date(2025, 4, 2, 8, 45),
        autor: "Carlos Mendes",
        autorTipo: "cliente"
      },
      {
        id: "M007",
        texto: "Implementamos o recurso solicitado. Já está disponível na versão mais recente do sistema.",
        data: new Date(2025, 4, 3, 11, 20),
        autor: "Rafaela",
        autorTipo: "atendente"
      }
    ],
    naoLidas: 0
  }
];

const ChatSuporte = () => {
  const [tickets, setTickets] = useState<Ticket[]>(ticketsIniciais);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [filtroCliente, setFiltroCliente] = useState<string>("");
  const [ticketAtual, setTicketAtual] = useState<Ticket | null>(null);
  const [novaMensagem, setNovaMensagem] = useState<string>("");
  const [filtroPrioridade, setFiltroPrioridade] = useState<string>("todos");
  const [filtroAtendente, setFiltroAtendente] = useState<string>("todos");
  const [filtroAvancado, setFiltroAvancado] = useState<boolean>(false);
  const [novoTicket, setNovoTicket] = useState({
    assunto: "",
    cliente: "",
    prioridade: "media" as PrioridadeTicket,
    mensagem: ""
  });
  const [dialogAberto, setDialogAberto] = useState(false);

  // Função para filtrar tickets baseado nos filtros selecionados
  const filtrarTickets = () => {
    return tickets.filter(ticket => {
      const matchStatus = filtroStatus === 'todos' || ticket.status === filtroStatus;
      const matchCliente = filtroCliente === '' || 
        ticket.cliente.toLowerCase().includes(filtroCliente.toLowerCase());
      const matchPrioridade = filtroPrioridade === 'todos' || ticket.prioridade === filtroPrioridade;
      const matchAtendente = filtroAtendente === 'todos' || ticket.atendente === filtroAtendente;
      
      return matchStatus && matchCliente && matchPrioridade && matchAtendente;
    });
  };

  // Função para formatar data em formato legível
  const formatarData = (data: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  };

  // Função para adicionar nova mensagem ao ticket atual
  const enviarMensagem = () => {
    if (!novaMensagem.trim() || !ticketAtual) return;

    const novaMensagemObj: Mensagem = {
      id: `M${Math.floor(Math.random() * 10000)}`,
      texto: novaMensagem,
      data: new Date(),
      autor: "Atendente",
      autorTipo: "atendente"
    };

    const ticketAtualizado: Ticket = {
      ...ticketAtual,
      mensagens: [...ticketAtual.mensagens, novaMensagemObj],
      dataAtualizacao: new Date(),
      status: ticketAtual.status === 'aberto' ? 'em_atendimento' : ticketAtual.status
    };

    setTickets(tickets.map(t => 
      t.id === ticketAtual.id ? ticketAtualizado : t
    ));
    
    setTicketAtual(ticketAtualizado);
    setNovaMensagem("");

    toast.success("Mensagem enviada com sucesso");
  };

  // Função para criar um novo ticket
  const criarNovoTicket = () => {
    if (!novoTicket.assunto || !novoTicket.cliente || !novoTicket.mensagem) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    const novoTicketCompleto: Ticket = {
      id: `T${Math.floor(Math.random() * 10000)}`,
      assunto: novoTicket.assunto,
      cliente: novoTicket.cliente,
      status: 'aberto',
      prioridade: novoTicket.prioridade,
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
      atendente: 'Não atribuído',
      mensagens: [
        {
          id: `M${Math.floor(Math.random() * 10000)}`,
          texto: novoTicket.mensagem,
          data: new Date(),
          autor: novoTicket.cliente,
          autorTipo: "cliente"
        }
      ],
      naoLidas: 1
    };

    setTickets([novoTicketCompleto, ...tickets]);
    setDialogAberto(false);
    setNovoTicket({
      assunto: "",
      cliente: "",
      prioridade: "media",
      mensagem: ""
    });

    toast.success("Novo ticket criado com sucesso");
  };

  // Função para mudar o status do ticket atual
  const mudarStatusTicket = (novoStatus: StatusTicket) => {
    if (!ticketAtual) return;

    const ticketAtualizado: Ticket = {
      ...ticketAtual,
      status: novoStatus,
      dataAtualizacao: new Date()
    };

    setTickets(tickets.map(t => 
      t.id === ticketAtual.id ? ticketAtualizado : t
    ));
    
    setTicketAtual(ticketAtualizado);
    toast.success(`Status alterado para ${traduzirStatus(novoStatus)}`);
  };

  // Função para transferir o ticket para outro atendente
  const transferirTicket = (novoAtendente: Atendente) => {
    if (!ticketAtual) return;

    const ticketAtualizado: Ticket = {
      ...ticketAtual,
      atendente: novoAtendente,
      dataAtualizacao: new Date(),
      mensagens: [
        ...ticketAtual.mensagens,
        {
          id: `M${Math.floor(Math.random() * 10000)}`,
          texto: `Ticket transferido para ${novoAtendente}`,
          data: new Date(),
          autor: "Sistema",
          autorTipo: "atendente"
        }
      ]
    };

    setTickets(tickets.map(t => 
      t.id === ticketAtual.id ? ticketAtualizado : t
    ));
    
    setTicketAtual(ticketAtualizado);
    toast.success(`Ticket transferido para ${novoAtendente}`);
  };

  // Função para traduzir status
  const traduzirStatus = (status: StatusTicket): string => {
    const statusMap = {
      aberto: 'Aberto',
      em_atendimento: 'Em Atendimento',
      resolvido: 'Resolvido',
      fechado: 'Fechado'
    };
    return statusMap[status];
  };

  // Função para traduzir prioridade
  const traduzirPrioridade = (prioridade: PrioridadeTicket): string => {
    const prioridadeMap = {
      baixa: 'Baixa',
      media: 'Média',
      alta: 'Alta',
      urgente: 'Urgente'
    };
    return prioridadeMap[prioridade];
  };

  // Função para obter cor da badge de prioridade
  const corPrioridade = (prioridade: PrioridadeTicket): string => {
    const corMap = {
      baixa: 'bg-green-500',
      media: 'bg-blue-500',
      alta: 'bg-amber-500',
      urgente: 'bg-red-500'
    };
    return corMap[prioridade];
  };

  // Função para abrir um ticket
  const abrirTicket = (ticket: Ticket) => {
    // Marcar mensagens como lidas
    const ticketAtualizado: Ticket = {
      ...ticket,
      naoLidas: 0
    };
    
    setTickets(tickets.map(t => 
      t.id === ticket.id ? ticketAtualizado : t
    ));
    
    setTicketAtual(ticketAtualizado);
  };

  const ticketsFiltrados = filtrarTickets();
  const totalNaoLidas = tickets.reduce((total, ticket) => total + ticket.naoLidas, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Chat de Suporte</h1>
          <p className="text-gray-500 dark:text-gray-400">Atendimento e suporte ao cliente.</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
            <DialogTrigger asChild>
              <Button>
                <Ticket className="mr-2 h-4 w-4" />
                Novo Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Criar Novo Ticket</DialogTitle>
                <DialogDescription>
                  Preencha as informações para abrir um novo ticket de suporte.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="assunto" className="text-right">
                    Assunto
                  </label>
                  <Input
                    id="assunto"
                    className="col-span-3"
                    value={novoTicket.assunto}
                    onChange={(e) => setNovoTicket({...novoTicket, assunto: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="cliente" className="text-right">
                    Cliente
                  </label>
                  <Input
                    id="cliente"
                    className="col-span-3"
                    value={novoTicket.cliente}
                    onChange={(e) => setNovoTicket({...novoTicket, cliente: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="prioridade" className="text-right">
                    Prioridade
                  </label>
                  <select
                    id="prioridade"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={novoTicket.prioridade}
                    onChange={(e) => setNovoTicket({...novoTicket, prioridade: e.target.value as PrioridadeTicket})}
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="mensagem" className="text-right">
                    Mensagem
                  </label>
                  <Textarea
                    id="mensagem"
                    className="col-span-3"
                    rows={5}
                    value={novoTicket.mensagem}
                    onChange={(e) => setNovoTicket({...novoTicket, mensagem: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogAberto(false)}>
                  Cancelar
                </Button>
                <Button onClick={criarNovoTicket}>
                  Criar Ticket
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" className="relative">
            <Bell className="h-5 w-5" />
            {totalNaoLidas > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {totalNaoLidas}
              </span>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Painel de tickets */}
        <Card className="col-span-4 overflow-hidden flex flex-col">
          <CardHeader className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <CardTitle>Tickets</CardTitle>
              <Collapsible 
                open={filtroAvancado}
                onOpenChange={setFiltroAvancado}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <div className="flex items-center space-x-2 mb-2">
                  <Input
                    placeholder="Filtrar por cliente..."
                    value={filtroCliente}
                    onChange={(e) => setFiltroCliente(e.target.value)}
                    className="flex-1"
                  />
                  <select
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value)}
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="todos">Status</option>
                    <option value="aberto">Aberto</option>
                    <option value="em_atendimento">Em atendimento</option>
                    <option value="resolvido">Resolvido</option>
                    <option value="fechado">Fechado</option>
                  </select>
                </div>
                <CollapsibleContent className="space-y-2">
                  <div className="flex space-x-2">
                    <select
                      value={filtroPrioridade}
                      onChange={(e) => setFiltroPrioridade(e.target.value)}
                      className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm flex-1"
                    >
                      <option value="todos">Prioridade</option>
                      <option value="baixa">Baixa</option>
                      <option value="media">Média</option>
                      <option value="alta">Alta</option>
                      <option value="urgente">Urgente</option>
                    </select>
                    <select
                      value={filtroAtendente}
                      onChange={(e) => setFiltroAtendente(e.target.value)}
                      className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm flex-1"
                    >
                      <option value="todos">Atendente</option>
                      <option value="Não atribuído">Não atribuído</option>
                      <option value="Daniel">Daniel</option>
                      <option value="Rafaela">Rafaela</option>
                      <option value="Marcos">Marcos</option>
                    </select>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-auto flex-grow">
            {ticketsFiltrados.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500">
                Nenhum ticket encontrado com os filtros selecionados.
              </div>
            ) : (
              <div className="divide-y">
                {ticketsFiltrados.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      ticketAtual?.id === ticket.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                    }`}
                    onClick={() => abrirTicket(ticket)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">
                        {ticket.assunto}
                        {ticket.naoLidas > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {ticket.naoLidas} novas
                          </Badge>
                        )}
                      </h3>
                      <Badge className={`${corPrioridade(ticket.prioridade)} hover:${corPrioridade(ticket.prioridade)}`}>
                        {traduzirPrioridade(ticket.prioridade)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {ticket.cliente} · ID: {ticket.id}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>{traduzirStatus(ticket.status)}</span>
                      <span>{formatarData(ticket.dataAtualizacao)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Painel de chat */}
        <Card className="col-span-8 flex flex-col">
          {!ticketAtual ? (
            <div className="flex-grow flex flex-col items-center justify-center p-6">
              <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-xl font-medium">Selecione um ticket</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
                Escolha um ticket à esquerda para visualizar e responder.
              </p>
            </div>
          ) : (
            <>
              <CardHeader className="p-4 border-b">
                <div className="flex justify-between">
                  <div>
                    <CardTitle>{ticketAtual.assunto}</CardTitle>
                    <CardDescription>
                      Cliente: {ticketAtual.cliente} · ID: {ticketAtual.id}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${corPrioridade(ticketAtual.prioridade)} hover:${corPrioridade(ticketAtual.prioridade)}`}>
                      {traduzirPrioridade(ticketAtual.prioridade)}
                    </Badge>
                    <Badge variant={ticketAtual.status === 'aberto' ? 'destructive' : 
                                   ticketAtual.status === 'em_atendimento' ? 'default' : 
                                   'outline'}>
                      {traduzirStatus(ticketAtual.status)}
                    </Badge>

                    {/* Menu de ações do ticket */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Ações
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Ações do Ticket</SheetTitle>
                          <SheetDescription>
                            Gerencie o status e atribuições deste ticket.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-4">
                          <div className="mb-4">
                            <h3 className="text-sm font-medium mb-2">Alterar Status</h3>
                            <div className="flex flex-col space-y-2">
                              <Button 
                                variant={ticketAtual.status === 'aberto' ? 'default' : 'outline'} 
                                onClick={() => mudarStatusTicket('aberto')}
                                className="justify-start"
                              >
                                Aberto
                              </Button>
                              <Button 
                                variant={ticketAtual.status === 'em_atendimento' ? 'default' : 'outline'} 
                                onClick={() => mudarStatusTicket('em_atendimento')}
                                className="justify-start"
                              >
                                Em Atendimento
                              </Button>
                              <Button 
                                variant={ticketAtual.status === 'resolvido' ? 'default' : 'outline'} 
                                onClick={() => mudarStatusTicket('resolvido')}
                                className="justify-start"
                              >
                                Resolvido
                              </Button>
                              <Button 
                                variant={ticketAtual.status === 'fechado' ? 'default' : 'outline'} 
                                onClick={() => mudarStatusTicket('fechado')}
                                className="justify-start"
                              >
                                Fechado
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium mb-2">Transferir para</h3>
                            <div className="flex flex-col space-y-2">
                              <Button 
                                variant={ticketAtual.atendente === 'Daniel' ? 'default' : 'outline'} 
                                onClick={() => transferirTicket('Daniel')}
                                className="justify-start"
                              >
                                Daniel
                              </Button>
                              <Button 
                                variant={ticketAtual.atendente === 'Rafaela' ? 'default' : 'outline'} 
                                onClick={() => transferirTicket('Rafaela')}
                                className="justify-start"
                              >
                                Rafaela
                              </Button>
                              <Button 
                                variant={ticketAtual.atendente === 'Marcos' ? 'default' : 'outline'} 
                                onClick={() => transferirTicket('Marcos')}
                                className="justify-start"
                              >
                                Marcos
                              </Button>
                            </div>
                          </div>
                        </div>
                        <SheetFooter>
                          <div className="text-xs text-gray-500">
                            <p>Criado em: {formatarData(ticketAtual.dataCriacao)}</p>
                            <p>Última atualização: {formatarData(ticketAtual.dataAtualizacao)}</p>
                            <p>Atendente atual: {ticketAtual.atendente}</p>
                          </div>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-0 overflow-y-auto">
                <div className="flex flex-col gap-4 p-4">
                  {ticketAtual.mensagens.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.autorTipo === 'cliente' ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.autorTipo === 'cliente'
                            ? 'bg-gray-100 dark:bg-gray-800'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        <div className="text-sm mb-1 font-medium">
                          {msg.autor}
                        </div>
                        <div className="break-words">{msg.texto}</div>
                        <div className="text-xs mt-1 text-right opacity-70">
                          {formatarData(msg.data)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <div className="flex w-full gap-2">
                  <Textarea 
                    placeholder="Digite sua mensagem..." 
                    className="flex-grow"
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        enviarMensagem();
                      }
                    }}
                  />
                  <Button onClick={enviarMensagem}>Enviar</Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      </div>

      {/* Histórico e Estatísticas */}
      <Tabs defaultValue="historico" className="w-full">
        <TabsList>
          <TabsTrigger value="historico">
            <History className="h-4 w-4 mr-2" />
            Histórico
          </TabsTrigger>
          <TabsTrigger value="estatisticas">
            <Users className="h-4 w-4 mr-2" />
            Atendentes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="historico" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Atendimentos</CardTitle>
              <CardDescription>
                Visualize todos os atendimentos concluídos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Assunto</TableHead>
                    <TableHead>Atendente</TableHead>
                    <TableHead>Abertura</TableHead>
                    <TableHead>Encerramento</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets
                    .filter(ticket => ticket.status === 'resolvido' || ticket.status === 'fechado')
                    .map((ticket) => (
                      <TableRow key={ticket.id} onClick={() => abrirTicket(ticket)} className="cursor-pointer">
                        <TableCell>{ticket.id}</TableCell>
                        <TableCell>{ticket.cliente}</TableCell>
                        <TableCell>{ticket.assunto}</TableCell>
                        <TableCell>{ticket.atendente}</TableCell>
                        <TableCell>{formatarData(ticket.dataCriacao)}</TableCell>
                        <TableCell>{formatarData(ticket.dataAtualizacao)}</TableCell>
                        <TableCell>
                          <Badge variant={ticket.status === 'resolvido' ? 'outline' : 'secondary'}>
                            {traduzirStatus(ticket.status)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="estatisticas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho dos Atendentes</CardTitle>
              <CardDescription>
                Estatísticas e métricas de atendimento por atendente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Atendente</TableHead>
                    <TableHead>Tickets Abertos</TableHead>
                    <TableHead>Tickets Resolvidos</TableHead>
                    <TableHead>Tempo Médio de Resposta</TableHead>
                    <TableHead>Satisfação do Cliente</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Daniel</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>15 min</TableCell>
                    <TableCell>98%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rafaela</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>8 min</TableCell>
                    <TableCell>100%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Marcos</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>22 min</TableCell>
                    <TableCell>95%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatSuporte;
