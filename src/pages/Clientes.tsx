
import ClientesList from '@/components/clientes/ClientesList';

const Clientes = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gerenciar Clientes</h1>
        <p className="text-gray-500">Visualize, adicione, edite e remova os clientes do sistema.</p>
      </div>
      
      <ClientesList />
    </div>
  );
};

export default Clientes;
