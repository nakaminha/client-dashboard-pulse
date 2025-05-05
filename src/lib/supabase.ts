
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

// Tipo para transações financeiras
export type TransacaoSupabase = {
  id: string;
  cliente_id: string;
  valor: number;
  tipo: 'entrada' | 'saida';
  descricao: string;
  data: string;
  created_at?: string;
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
    try {
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
    } catch (error) {
      console.error(`Erro ao buscar cliente ${id}:`, error);
      return null;
    }
  },
  
  async create(cliente: ClienteSupabase) {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .insert([cliente])
        .select();
        
      if (error) {
        console.error('Erro ao criar cliente:', error);
        throw error;
      }
      
      return data[0] as ClienteSupabase;
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
  },
  
  async update(id: string, cliente: Partial<ClienteSupabase>) {
    try {
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
    } catch (error) {
      console.error(`Erro ao atualizar cliente ${id}:`, error);
      throw error;
    }
  },
  
  async delete(id: string) {
    try {
      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error(`Erro ao excluir cliente ${id}:`, error);
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error(`Erro ao excluir cliente ${id}:`, error);
      throw error;
    }
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
    try {
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
    } catch (error) {
      console.error(`Erro ao buscar plano ${id}:`, error);
      return null;
    }
  },
  
  async create(plano: PlanoSupabase) {
    try {
      const { data, error } = await supabase
        .from('planos')
        .insert([plano])
        .select();
        
      if (error) {
        console.error('Erro ao criar plano:', error);
        throw error;
      }
      
      return data[0] as PlanoSupabase;
    } catch (error) {
      console.error('Erro ao criar plano:', error);
      throw error;
    }
  },
  
  async update(id: string, plano: Partial<PlanoSupabase>) {
    try {
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
    } catch (error) {
      console.error(`Erro ao atualizar plano ${id}:`, error);
      throw error;
    }
  },
  
  async delete(id: string) {
    try {
      const { error } = await supabase
        .from('planos')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error(`Erro ao excluir plano ${id}:`, error);
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error(`Erro ao excluir plano ${id}:`, error);
      throw error;
    }
  }
};

// Serviço para transações financeiras
export const transacoesService = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('transacoes')
        .select('*')
        .order('data', { ascending: false });
        
      if (error) {
        console.error('Erro ao buscar transações:', error);
        return [];
      }
      
      return data as TransacaoSupabase[];
    } catch (error) {
      console.error('Erro na operação getAll de transações:', error);
      return [];
    }
  },
  
  // Obter resumo financeiro do mês atual
  async getResumoMensal(mes: number, ano: number) {
    try {
      const primeiroDia = new Date(ano, mes, 1).toISOString().split('T')[0];
      const ultimoDia = new Date(ano, mes + 1, 0).toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('transacoes')
        .select('*')
        .gte('data', primeiroDia)
        .lte('data', ultimoDia);
        
      if (error) {
        console.error(`Erro ao buscar transações do mês ${mes}/${ano}:`, error);
        return {
          totalEntradas: 0,
          totalSaidas: 0,
          saldoFinal: 0,
          transacoes: []
        };
      }
      
      const transacoes = data as TransacaoSupabase[];
      const totalEntradas = transacoes
        .filter(t => t.tipo === 'entrada')
        .reduce((acc, t) => acc + t.valor, 0);
        
      const totalSaidas = transacoes
        .filter(t => t.tipo === 'saida')
        .reduce((acc, t) => acc + t.valor, 0);
        
      return {
        totalEntradas,
        totalSaidas,
        saldoFinal: totalEntradas - totalSaidas,
        transacoes
      };
    } catch (error) {
      console.error(`Erro ao buscar resumo mensal:`, error);
      return {
        totalEntradas: 0,
        totalSaidas: 0,
        saldoFinal: 0,
        transacoes: []
      };
    }
  },
  
  // Buscar histórico de faturamento por mês
  async getHistoricoMensal(quantidadeMeses: number = 12) {
    try {
      const hoje = new Date();
      const historicoMensal = [];
      
      for (let i = 0; i < quantidadeMeses; i++) {
        const mes = hoje.getMonth() - i;
        const ano = hoje.getFullYear() + Math.floor(mes / 12);
        const mesAjustado = ((mes % 12) + 12) % 12;
        
        const { totalEntradas } = await this.getResumoMensal(mesAjustado, ano);
        
        const nomeMes = new Date(ano, mesAjustado, 1).toLocaleDateString('pt-BR', { month: 'long' });
        
        historicoMensal.push({
          mes: mesAjustado,
          ano,
          nomeMes: nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1),
          totalFaturado: totalEntradas
        });
      }
      
      return historicoMensal;
    } catch (error) {
      console.error('Erro ao buscar histórico mensal:', error);
      return [];
    }
  }
};
