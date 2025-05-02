
import { useState, useEffect } from 'react';
import ClientesList from '@/components/clientes/ClientesList';
import SupabaseWarning from '@/components/common/SupabaseWarning';

const Clientes = () => {
  const [supabaseConfigured, setSupabaseConfigured] = useState(true);
  
  useEffect(() => {
    // Check if Supabase URL is configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    setSupabaseConfigured(!!supabaseUrl);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-purple-500 text-white p-6 rounded-lg flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gerenciador de Clientes</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
      
      {!supabaseConfigured && (
        <SupabaseWarning message="Para gerenciar clientes, configure as variáveis de ambiente do Supabase." />
      )}
      
      <ClientesList />
    </div>
  );
};

export default Clientes;
