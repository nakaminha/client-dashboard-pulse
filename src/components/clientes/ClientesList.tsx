
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import ClienteForm from './ClienteForm';

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
}

const clientes: Cliente[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao.silva@exemplo.com',
    telefone: '(11) 98765-4321',
    empresa: 'Tech Solutions',
    status: 'Ativo',
  },
  {
    id: '2',
    nome: 'Maria Oliveira',
    email: 'maria.oliveira@exemplo.com',
    telefone: '(21) 98765-4321',
    empresa: 'Design Studio',
    status: 'Ativo',
  },
  {
    id: '3',
    nome: 'Carlos Pereira',
    email: 'carlos.pereira@exemplo.com',
    telefone: '(31) 98765-4321',
    empresa: 'Marketing Group',
    status: 'Inativo',
  },
  {
    id: '4',
    nome: 'Ana Santos',
    email: 'ana.santos@exemplo.com',
    telefone: '(41) 98765-4321',
    empresa: 'Sales Corp',
    status: 'Pendente',
  },
  {
    id: '5',
    nome: 'Pedro Costa',
    email: 'pedro.costa@exemplo.com',
    telefone: '(51) 98765-4321',
    empresa: 'Finance Ltd',
    status: 'Ativo',
  },
];

const ClientesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientesData, setClientesData] = useState<Cliente[]>(clientes);
  const [clienteParaEditar, setClienteParaEditar] = useState<Cliente | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const filteredClientes = clientesData.filter(cliente => 
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="relative max-w-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <Input
            className="pl-9 max-w-xs"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-azul-600 hover:bg-azul-700" onClick={handleAdicionarCliente}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
                <path d="M12 11v6" />
                <path d="M9 14h6" />
              </svg>
              Adicionar Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
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

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Telefone</TableHead>
              <TableHead className="hidden md:table-cell">Empresa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClientes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  Nenhum cliente encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredClientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium">{cliente.nome}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{cliente.telefone}</TableCell>
                  <TableCell className="hidden md:table-cell">{cliente.empresa}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      cliente.status === 'Ativo' ? 'bg-green-100 text-green-800' : 
                      cliente.status === 'Inativo' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cliente.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditarCliente(cliente)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        </svg>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleExcluirCliente(cliente.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClientesList;
