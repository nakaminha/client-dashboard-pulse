
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Financeiro = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
        <p className="text-gray-500 dark:text-gray-400">Gerenciamento financeiro e transações.</p>
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h2 className="text-xl font-medium">Página em Construção</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
            Estamos trabalhando para trazer recursos financeiros completos para você.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financeiro;
