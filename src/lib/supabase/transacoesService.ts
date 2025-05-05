
import { supabase } from './config';
import { TransacaoSupabase } from './types';

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
