
import { createClient } from '@supabase/supabase-js';

// Inicializa o cliente Supabase usando as variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Mock do cliente Supabase para desenvolvimento local
const mockSupabaseClient = {
  from: () => ({
    select: () => ({ 
      data: [], 
      error: null,
      eq: () => ({
        data: [], 
        error: null,
        select: () => ({ data: [], error: null }),
        single: () => ({ data: null, error: null }),
      }),
      gte: () => ({
        data: [], 
        error: null,
        lte: () => ({ data: [], error: null }),
      }),
      lte: () => ({ data: [], error: null }),
      order: () => ({ data: [], error: null }),
    }),
    insert: () => ({ 
      data: null, 
      error: null,
      select: () => ({ data: null, error: null }),
    }),
    update: () => ({ 
      data: null, 
      error: null,
      eq: () => ({
        data: null, 
        error: null,
        select: () => ({ data: null, error: null }),
      }),
    }),
    delete: () => ({ 
      error: null,
      eq: () => ({ error: null }),
    }),
    eq: () => ({ 
      data: null, 
      error: null,
      select: () => ({ data: null, error: null }),
      single: () => ({ data: null, error: null }),
    }),
    single: () => ({ data: null, error: null }),
  }),
  auth: {
    signInWithPassword: (credentials: { email: string, password: string }) => {
      console.log("Mock login simulado com:", credentials.email);
      // Simula um login bem-sucedido para qualquer credencial
      return Promise.resolve({
        data: { 
          user: { 
            id: 'mock-user-id',
            email: credentials.email,
          },
          session: {
            user: {
              id: 'mock-user-id',
              email: credentials.email
            }
          }
        }, 
        error: null
      });
    },
    signUp: () => Promise.resolve({ 
      data: { user: { id: 'mock-user-id', email: 'mock@example.com' } }, 
      error: null 
    }),
    signOut: () => Promise.resolve({ error: null }),
    getSession: () => Promise.resolve({ 
      data: { 
        session: { 
          user: { 
            id: 'mock-user-id',
            email: 'mock@example.com' 
          } 
        } 
      }, 
      error: null 
    }),
    onAuthStateChange: (callback: any) => { 
      callback('SIGNED_IN', { 
        user: { 
          id: 'mock-user-id',
          email: 'mock@example.com' 
        }
      });
      return { 
        data: { subscription: { unsubscribe: () => {} } }, 
        error: null 
      };
    }
  }
};

// Determinar se estamos em modo de simulação
const isSimulationMode = !supabaseUrl || !supabaseAnonKey || window.location.hostname.includes('lovableproject');

// Escolher qual cliente usar baseado no modo
let supabaseClient: any;

if (isSimulationMode) {
  console.log("Usando cliente Supabase simulado (modo de desenvolvimento/simulação)");
  supabaseClient = mockSupabaseClient;
} else {
  try {
    console.log("Conectando ao Supabase real com URL:", supabaseUrl);
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error("Erro ao inicializar Supabase real, usando mock:", error);
    supabaseClient = mockSupabaseClient;
  }
}

export const supabase = supabaseClient;
