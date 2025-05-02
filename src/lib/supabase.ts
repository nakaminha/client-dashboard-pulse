
import { createClient } from '@supabase/supabase-js';

// Inicializa o cliente Supabase usando as variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para as tabelas do Supabase
export type ClienteSupabase = {
  id?: string;
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
  id?: string;
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
    const { data, error } = await supabase
      .from('clientes')
      .select('*');
      
    if (error) {
      console.error('Erro ao buscar clientes:', error);
      return [];
    }
    
    return data as ClienteSupabase[];
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
    const { data, error } = await supabase
      .from('planos')
      .select('*');
      
    if (error) {
      console.error('Erro ao buscar planos:', error);
      return [];
    }
    
    return data as PlanoSupabase[];
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
