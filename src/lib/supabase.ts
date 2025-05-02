import { createClient } from '@supabase/supabase-js';

// Inicializa o cliente Supabase usando as variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a placeholder client if URL is not available
// This prevents the app from crashing during development
export const supabase = supabaseUrl 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({ data: [], error: { message: 'Supabase não configurado' } }),
        insert: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
        update: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
        delete: () => ({ error: { message: 'Supabase não configurado' } }),
        eq: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
        single: () => ({ data: null, error: { message: 'Supabase não configurado' } }),
      }),
    };

// Tipos para as tabelas do Supabase
export type ClienteSupabase = {
  id: string;  // Changed from optional to required to match Cliente type
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  usuario: string;
  senha: string;
  whatsapp: string;
  categoria: string;
  mac: string;
  notasCliente: string;
  enviarNotificacoes: string;
  cpfCnpj: string;
  endereco: string;
  temCpfCnpj: boolean;
  temEndereco: boolean;
  plano: string | null;
  vencimento: string | null;
  created_at?: string;
  updated_at?: string;
};

export type PlanoSupabase = {
  id: string;  // Changed from optional to required
  nome: string;
  descricao: string;
  valor: string;
  tipoCobranca: string;
  status: string;
  solicitarUsuario: boolean;
  solicitarCpfCnpj: boolean;
  solicitarEndereco: boolean;
  created_at?: string;
  updated_at?: string;
};

// Funções para manipulação de clientes
export const clientesService = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*');
        
      if (error) {
        console.error('Erro ao buscar clientes:', error);
        return [];
      }
      
      // Ensure all clients have an id
      return (data || []).map(cliente => ({
        ...cliente,
        id: cliente.id || `temp-${Date.now()}` // Ensure id exists
      })) as ClienteSupabase[];
    } catch (error) {
      console.error('Erro na operação getAll de clientes:', error);
      return [];
    }
  },
  
  async getById(id: string) {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error(`Erro ao buscar cliente ${id}:`, error);
      return null;
    }
    
    return data as ClienteSupabase;
  },
  
  async create(cliente: ClienteSupabase) {
    const { data, error } = await supabase
      .from('clientes')
      .insert([cliente])
      .select();
      
    if (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
    
    return data[0] as ClienteSupabase;
  },
  
  async update(id: string, cliente: Partial<ClienteSupabase>) {
    const { data, error } = await supabase
      .from('clientes')
      .update(cliente)
      .eq('id', id)
      .select();
      
    if (error) {
      console.error(`Erro ao atualizar cliente ${id}:`, error);
      throw error;
    }
    
    return data[0] as ClienteSupabase;
  },
  
  async delete(id: string) {
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error(`Erro ao excluir cliente ${id}:`, error);
      throw error;
    }
    
    return true;
  }
};

// Funções para manipulação de planos
export const planosService = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('planos')
        .select('*');
        
      if (error) {
        console.error('Erro ao buscar planos:', error);
        return [];
      }
      
      // Ensure all plans have an id
      return (data || []).map(plano => ({
        ...plano,
        id: plano.id || `temp-${Date.now()}` // Ensure id exists
      })) as PlanoSupabase[];
    } catch (error) {
      console.error('Erro na operação getAll de planos:', error);
      return [];
    }
  },
  
  async getById(id: string) {
    const { data, error } = await supabase
      .from('planos')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error(`Erro ao buscar plano ${id}:`, error);
      return null;
    }
    
    return data as PlanoSupabase;
  },
  
  async create(plano: PlanoSupabase) {
    const { data, error } = await supabase
      .from('planos')
      .insert([plano])
      .select();
      
    if (error) {
      console.error('Erro ao criar plano:', error);
      throw error;
    }
    
    return data[0] as PlanoSupabase;
  },
  
  async update(id: string, plano: Partial<PlanoSupabase>) {
    const { data, error } = await supabase
      .from('planos')
      .update(plano)
      .eq('id', id)
      .select();
      
    if (error) {
      console.error(`Erro ao atualizar plano ${id}:`, error);
      throw error;
    }
    
    return data[0] as PlanoSupabase;
  },
  
  async delete(id: string) {
    const { error } = await supabase
      .from('planos')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error(`Erro ao excluir plano ${id}:`, error);
      throw error;
    }
    
    return true;
  }
};
