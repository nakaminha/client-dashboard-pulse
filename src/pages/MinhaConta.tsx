
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const MinhaConta = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Minha Conta</h1>
        <p className="text-gray-500 dark:text-gray-400">Gerenciamento da sua conta e perfil.</p>
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h2 className="text-xl font-medium">Página em Construção</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
            Em breve você poderá gerenciar seu perfil e preferências nesta página.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MinhaConta;
