
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Import, Export, Plus, Search } from 'lucide-react';
import ClientesFilters from './ClientesFilters';
import ClientesTable from './ClientesTable';
import ClientesPagination from './ClientesPagination';
import ClienteForm from './ClienteForm';

export interface Cliente {
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
  plano?: string;
  vencimento?: string;
}

const clientes: Cliente[] = [
  {
    id: '1',
    nome: 'Isaac',
    email: 'cloverstreamings@gmail.com',
    telefone: '5585985704035',
    empresa: 'Clover',
    status: 'Ativo',
    usuario: 'isaac',
    senha: 'senha123',
    whatsapp: '5585985704035',
    categoria: 'basic',
    mac: '',
    notasCliente: '',
    enviarNotificacoes: 'Email',
    cpfCnpj: '',
    endereco: '',
    temCpfCnpj: false,
    temEndereco: false,
    plano: 'BÁSICO',
    vencimento: '05/03/2025'
  },
];

const ClientesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientesData, setClientesData] = useState<Cliente[]>(clientes);
  const [clienteParaEditar, setClienteParaEditar] = useState<Cliente | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(25);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [planoSelecionado, setPlanoSelecionado] = useState('');
  
  const filteredClientes = clientesData.filter(cliente => {
    const matchesSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cliente.telefone.includes(searchTerm);
    
    const matchesCategoria = categoriaSelecionada === '' || cliente.categoria === categoriaSelecionada;
    const matchesPlano = planoSelecionado === '' || cliente.plano === planoSelecionado;
    
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
      setClientesData(prev => 
        prev.map(c => c.id === cliente.id ? cliente : c)
      );
      toast.success('Cliente atualizado com sucesso!');
    } else {
      // Adicionar novo cliente
      const novoCliente = {
        ...cliente,
        id: Math.random().toString(36).substring(2, 9),
      };
      setClientesData(prev => [novoCliente, ...prev]);
      toast.success('Cliente adicionado com sucesso!');
    }
    setDialogOpen(false);
    setClienteParaEditar(null);
  };

  const handleExcluirCliente = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      setClientesData(prev => prev.filter(cliente => cliente.id !== id));
      toast.success('Cliente removido com sucesso!');
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
          <Import className="h-4 w-4" />
          Importar
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Export className="h-4 w-4" />
          Exportar
        </Button>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button className="bg-purple-500 hover:bg-purple-600" onClick={handleAdicionarCliente}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Cliente
          </Button>
          <Dialog.Content className="sm:max-w-4xl">
            <Dialog.Header>
              <Dialog.Title>
                {clienteParaEditar ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
              </Dialog.Title>
            </Dialog.Header>
            <ClienteForm 
              cliente={clienteParaEditar} 
              onSalvar={handleSalvarCliente} 
            />
          </Dialog.Content>
        </Dialog>
      </div>

      <ClientesTable
        clientes={clientesPaginados}
        onEdit={handleEditarCliente}
        onDelete={handleExcluirCliente}
      />
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          Mostrando {indiceInicial + 1} a {Math.min(indiceFinal, totalRegistros)} de {totalRegistros} entradas (filtrado de {clientesData.length} entradas totais)
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
