
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Notas = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notas</h1>
        <p className="text-gray-500 dark:text-gray-400">Sistema de anotações e lembretes.</p>
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-xl font-medium">Página em Construção</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
            Em breve você poderá criar e gerenciar suas notas nesta página.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notas;
