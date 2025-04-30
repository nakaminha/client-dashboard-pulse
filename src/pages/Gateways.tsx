
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Gateways = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gateways</h1>
        <p className="text-gray-500 dark:text-gray-400">Configuração de gateways de pagamento.</p>
      </div>
      
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center h-64">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-16 h-16 text-gray-400 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <h2 className="text-xl font-medium">Página em Construção</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
            Em breve você poderá configurar e gerenciar gateways de pagamento nesta página.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Gateways;
