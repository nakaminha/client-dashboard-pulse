
import ClientesList from '@/components/clientes/ClientesList';
import { ArrowUpRight } from 'lucide-react';

const Clientes = () => {
  return (
    <div className="space-y-6">
      <div className="bg-purple-500 text-white p-6 rounded-lg flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gerenciador de Clientes</h1>
        <ArrowUpRight className="ml-2 h-6 w-6" />
      </div>
      
      <ClientesList />
    </div>
  );
};

export default Clientes;
