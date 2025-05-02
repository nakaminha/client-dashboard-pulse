import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { FileText, Plus, Search, Upload, Download } from 'lucide-react';
import ClientesFilters from './ClientesFilters';
import ClientesTable from './ClientesTable';
import ClientesPagination from './ClientesPagination';
import ClienteForm from './ClienteForm';
import { clientesService, ClienteSupabase } from '@/lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Updated to align with ClienteSupabase type
export type Cliente = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  usuario: string;
  senha: string;
  whatsapp: string;
  categoria: string;
  mac: string;
  notasCliente: string;
  enviarNotificacoes: string;
  cpfCnpj: string;
  endereco: string;
  temCpfCnpj: boolean;
  temEndereco: boolean;
  plano?: string | null;
  vencimento?: string | null;
  created_at?: string;
  updated_at?: string;
};

const ClientesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clienteParaEditar, setClienteParaEditar] = useState<Cliente | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(25);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todos');
  const [planoSelecionado, setPlanoSelecionado] = useState('todos');
  
  const queryClient = useQueryClient();
  
  // Buscar clientes do Supabase
  const { data: clientesData = [], isLoading, isError } = useQuery({
    queryKey: ['clientes'],
    queryFn: clientesService.getAll
  });
  
  // Mutation para adicionar cliente
  const adicionarClienteMutation = useMutation({
    mutationFn: (cliente: ClienteSupabase) => clientesService.create(cliente),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      toast.success('Cliente adicionado com sucesso!');
      setDialogOpen(false);
    },
    onError: (error) => {
      toast.error('Erro ao adicionar cliente');
      console.error(error);
    }
  });
  
  // Mutation para atualizar cliente
  const atualizarClienteMutation = useMutation({
    mutationFn: ({ id, cliente }: { id: string, cliente: Partial<ClienteSupabase> }) => 
      clientesService.update(id, cliente),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      toast.success('Cliente atualizado com sucesso!');
      setDialogOpen(false);
    },
    onError: (error) => {
      toast.error('Erro ao atualizar cliente');
      console.error(error);
    }
  });
  
  // Mutation para excluir cliente
  const excluirClienteMutation = useMutation({
    mutationFn: (id: string) => clientesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
      toast.success('Cliente removido com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao remover cliente');
      console.error(error);
    }
  });
  
  // Ensure all clients have required properties
  const clientesFormatados: Cliente[] = clientesData.map(cliente => ({
    ...cliente,
    id: cliente.id || `temp-${Date.now()}`,
    plano: cliente.plano || undefined,
    vencimento: cliente.vencimento || undefined
  }));

  const filteredClientes = clientesFormatados.filter(cliente => {
    const matchesSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cliente.telefone.includes(searchTerm);
    
    const matchesCategoria = categoriaSelecionada === 'todos' || cliente.categoria === categoriaSelecionada;
    const matchesPlano = planoSelecionado === 'todos' || cliente.plano === planoSelecionado;
    
    return matchesSearch && matchesCategoria && matchesPlano;
  });

  const totalRegistros = filteredClientes.length;
  const totalPaginas = Math.ceil(totalRegistros / itensPorPagina);
  const indiceFinal = paginaAtual * itensPorPagina;
  const indiceInicial = indiceFinal - itensPorPagina;
  const clientesPaginados = filteredClientes.slice(indiceInicial, indiceFinal);

  const handleSalvarCliente = (cliente: Cliente) => {
    if (cliente.id) {
      // Atualizar cliente existente
      const { id, ...dadosCliente } = cliente;
      atualizarClienteMutation.mutate({ id, cliente: dadosCliente });
    } else {
      // Adicionar novo cliente
      adicionarClienteMutation.mutate(cliente as ClienteSupabase);
    }
  };

  const handleExcluirCliente = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      excluirClienteMutation.mutate(id);
    }
  };

  const handleEditarCliente = (cliente: Cliente) => {
    setClienteParaEditar(cliente);
    setDialogOpen(true);
  };

  const handleAdicionarCliente = () => {
    setClienteParaEditar(null);
    setDialogOpen(true);
  };

  const handleChangePagina = (pagina: number) => {
    setPaginaAtual(pagina);
  };

  const handleChangeItensPorPagina = (itens: number) => {
    setItensPorPagina(itens);
    setPaginaAtual(1);
  };

  return (
    <div className="space-y-4">
      {isLoading && <div className="text-center p-4">Carregando clientes...</div>}
      
      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          Erro ao carregar clientes. Por favor, tente novamente mais tarde.
        </div>
      )}
      
      <div className="flex flex-col space-y-4">
        <ClientesFilters 
          categoriaSelecionada={categoriaSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
          planoSelecionado={planoSelecionado}
          setPlanoSelecionado={setPlanoSelecionado}
        />
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Mostrar</span>
            <select 
              className="border rounded px-2 py-1 text-sm"
              value={itensPorPagina}
              onChange={(e) => handleChangeItensPorPagina(Number(e.target.value))}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="text-sm text-gray-500">registros</span>
          </div>
          
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              className="pl-9"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Importar
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button className="bg-purple-500 hover:bg-purple-600" onClick={handleAdicionarCliente}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Cliente
          </Button>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {clienteParaEditar ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
              </DialogTitle>
            </DialogHeader>
            <ClienteForm 
              cliente={clienteParaEditar} 
              onSalvar={handleSalvarCliente} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <ClientesTable
        clientes={clientesPaginados}
        onEdit={handleEditarCliente}
        onDelete={handleExcluirCliente}
      />
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          Mostrando {indiceInicial + 1} a {Math.min(indiceFinal, totalRegistros)} de {totalRegistros} entradas (filtrado de {clientesFormatados.length} entradas totais)
        </div>
        
        <ClientesPagination 
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          onChange={handleChangePagina}
        />
      </div>
    </div>
  );
};

export default ClientesList;
