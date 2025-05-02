
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface SupabaseWarningProps {
  message?: string;
}

const SupabaseWarning: React.FC<SupabaseWarningProps> = ({ 
  message = "Para usar este aplicativo corretamente, configure as variáveis de ambiente do Supabase."
}) => {
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Configuração do Supabase Necessária</AlertTitle>
      <AlertDescription>
        {message}
        <p className="mt-2">
          Você precisa definir <code>VITE_SUPABASE_URL</code> e <code>VITE_SUPABASE_ANON_KEY</code> 
          em suas variáveis de ambiente.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default SupabaseWarning;
