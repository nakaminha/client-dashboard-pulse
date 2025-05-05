
import { supabase } from './config';
import { PlanoSupabase } from './types';

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
