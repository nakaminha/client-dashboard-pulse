
import { createClient } from '@supabase/supabase-js';

// Inicializa o cliente Supabase usando as variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a proper client if URL is available, otherwise use a mock client
export const supabase = supabaseUrl 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({ 
          data: [], 
          error: { message: 'Supabase não configurado' },
          eq: () => ({
            data: [], 
            error: { message: 'Supabase não configurado' },
            select: () => ({ data: [], error: { message: 'Supabase não configurado' } }),
            single: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
          }),
          gte: () => ({
            data: [], 
            error: { message: 'Supabase não configurado' },
            lte: () => ({ data: [], error: { message: 'Supabase não configurado' } }),
          }),
          lte: () => ({ data: [], error: { message: 'Supabase não configurado' } }),
          order: () => ({ data: [], error: { message: 'Supabase não configurado' } }),
        }),
        insert: () => ({ 
          data: null, 
          error: { message: 'Supabase não configurado' },
          select: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
        }),
        update: () => ({ 
          data: null, 
          error: { message: 'Supabase não configurado' },
          eq: () => ({
            data: null, 
            error: { message: 'Supabase não configurado' },
            select: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
          }),
        }),
        delete: () => ({ 
          error: { message: 'Supabase não configurado' },
          eq: () => ({ error: { message: 'Supabase não configurado' } }),
        }),
        eq: () => ({ 
          data: null, 
          error: { message: 'Supabase não configurado' },
          select: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
          single: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
        }),
        single: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
      }),
      auth: {
        signInWithPassword: () => Promise.resolve({
          data: { 
            user: { 
              id: 'mock-user-id',
              email: 'mock@example.com',
            },
            session: {
              user: {
                id: 'mock-user-id',
                email: 'mock@example.com'
              }
            }
          }, 
          error: null
        }),
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
        onAuthStateChange: (callback) => { 
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
