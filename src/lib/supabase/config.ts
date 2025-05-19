
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
      console.log("Mock login chamado com:", credentials.email);
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

// Try to create a proper client first, fall back to mock if fails or URL is missing
let supabaseClient: any;

try {
  // Create a proper client if URL is available
  if (supabaseUrl && supabaseAnonKey) {
    console.log("Tentando conectar ao Supabase com URL:", supabaseUrl);
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.log("Usando cliente Supabase simulado (URLs não encontradas)");
    supabaseClient = mockSupabaseClient;
  }
} catch (error) {
  console.error("Erro ao inicializar Supabase, usando mock:", error);
  supabaseClient = mockSupabaseClient;
}

export const supabase = supabaseClient;
