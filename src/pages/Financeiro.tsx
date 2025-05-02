
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import AnaliseFinanceira from '@/components/financeiro/AnaliseFinanceira';
import Extrato from '@/components/financeiro/Extrato';
import SupabaseWarning from '@/components/common/SupabaseWarning';

const Financeiro = () => {
  const [supabaseConfigured, setSupabaseConfigured] = useState(true);
  
  React.useEffect(() => {
    // Check if Supabase URL is configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    setSupabaseConfigured(!!supabaseUrl);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-purple-500 text-white p-6 rounded-lg flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
        </svg>
      </div>
      
      {!supabaseConfigured && (
        <SupabaseWarning message="Para visualizar dados financeiros, configure as variáveis de ambiente do Supabase." />
      )}
      
      <Tabs defaultValue="analise" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="analise">Análise Financeira</TabsTrigger>
          <TabsTrigger value="extrato">Extrato</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analise">
          <AnaliseFinanceira />
        </TabsContent>
        
        <TabsContent value="extrato">
          <Extrato />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Financeiro;
