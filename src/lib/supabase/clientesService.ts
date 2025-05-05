
import { supabase } from './config';
import { ClienteSupabase } from './types';

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
