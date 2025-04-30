
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ChatSuporte = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Chat de Suporte</h1>
        <p className="text-gray-500 dark:text-gray-400">Chat para suporte e atendimento ao cliente.</p>
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
          <h2 className="text-xl font-medium">Página em Construção</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
            Em breve você poderá atender seus clientes via chat nesta página.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSuporte;
