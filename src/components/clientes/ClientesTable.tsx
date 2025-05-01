import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Eye, FileText } from 'lucide-react';
import type { Cliente } from './ClientesList';

interface ClientesTableProps {
  clientes: Cliente[];
  onEdit: (cliente: Cliente) => void;
  onDelete: (id: string) => void;
}

const ClientesTable = ({ clientes, onEdit, onDelete }: ClientesTableProps) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-medium text-center">#</TableHead>
            <TableHead className="font-medium">NOME</TableHead>
            <TableHead className="font-medium">ÚLTIMO PLANO CONTRATADO</TableHead>
            <TableHead className="font-medium">VENCIMENTO DO ÚLTIMO PLANO CONTRATADO</TableHead>
            <TableHead className="font-medium">CATEGORIA</TableHead>
            <TableHead className="font-medium text-center">AÇÕES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                Nenhum cliente encontrado
              </TableCell>
            </TableRow>
          ) : (
            clientes.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell className="text-center">
                  <div className="flex justify-center items-center w-8 h-8 bg-blue-600 text-white rounded-full">
                    {cliente.nome.charAt(0)}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{cliente.nome}</p>
                    <div className="text-xs text-gray-500">{cliente.email}</div>
                    <div className="text-xs text-gray-500">{cliente.telefone}</div>
                  </div>
                </TableCell>
                <TableCell>{cliente.plano || "BÁSICO"}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 rounded-md text-xs ${
                    cliente.vencimento ? "bg-red-100 text-red-800" : "bg-gray-100"
                  }`}>
                    {cliente.vencimento || "N/A"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="px-3 py-1 rounded-md text-xs bg-red-500 text-white">
                    MENSAL
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1 justify-center">
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver Cliente</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-purple-600" onClick={() => onEdit(cliente)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Faturas/Planos</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                      </svg>
                      <span className="sr-only">WhatsApp</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-amber-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                      </svg>
                      <span className="sr-only">Copiar</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600" onClick={() => onDelete(cliente.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientesTable;
