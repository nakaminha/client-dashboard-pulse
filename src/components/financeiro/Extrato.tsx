
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { transacoesService } from '@/lib/supabase';
import { format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MesItem {
  valor: string;
  nome: string;
  totalFaturado: number;
  mes: number;
  ano: number;
}

const Extrato = () => {
  const [meses, setMeses] = useState<MesItem[]>([]);
  const [mesSelecionado, setMesSelecionado] = useState<string>('');
  const [transacoes, setTransacoes] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  
  useEffect(() => {
    const carregarHistorico = async () => {
      try {
        setCarregando(true);
        
        // Buscar histórico dos últimos 12 meses
        const historico = await transacoesService.getHistoricoMensal(12);
        
        // Formatar meses para o select
        const mesesFormatados = historico.map((item) => {
          const dataRef = new Date(item.ano, item.mes, 1);
          const mesFormatado = format(dataRef, 'MMMM', { locale: ptBR });
          const valorSelect = `${item.mes}-${item.ano}`;
          
          return {
            valor: valorSelect,
            nome: `${mesFormatado.charAt(0).toUpperCase() + mesFormatado.slice(1)} de ${item.ano}`,
            totalFaturado: item.totalFaturado,
            mes: item.mes,
            ano: item.ano,
          };
        });
        
        setMeses(mesesFormatados);
        
        // Selecionar o mês atual por padrão
        if (mesesFormatados.length > 0) {
          setMesSelecionado(mesesFormatados[0].valor);
          
          // Carregar transações do mês selecionado
          await carregarTransacoesMes(
            mesesFormatados[0].mes,
            mesesFormatados[0].ano
          );
        }
      } catch (error) {
        console.error('Erro ao carregar histórico de meses:', error);
      } finally {
        setCarregando(false);
      }
    };
    
    carregarHistorico();
  }, []);
  
  const carregarTransacoesMes = async (mes: number, ano: number) => {
    try {
      setCarregando(true);
      const resumo = await transacoesService.getResumoMensal(mes, ano);
      setTransacoes(resumo.transacoes);
    } catch (error) {
      console.error('Erro ao carregar transações do mês:', error);
      setTransacoes([]);
    } finally {
      setCarregando(false);
    }
  };
  
  const handleChangeMes = (valor: string) => {
    setMesSelecionado(valor);
    
    const [mes, ano] = valor.split('-').map(Number);
    carregarTransacoesMes(mes, ano);
  };
  
  const mesAtual = meses.find(m => m.valor === mesSelecionado);
  
  // Formatar valor monetário
  const formatarValor = (valor: number) => {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <h2 className="text-xl font-medium">Extrato Financeiro</h2>
            
            <Select
              value={mesSelecionado}
              onValueChange={handleChangeMes}
            >
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="Selecione um mês" />
              </SelectTrigger>
              <SelectContent>
                {meses.map((mes) => (
                  <SelectItem key={mes.valor} value={mes.valor}>
                    {mes.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {mesAtual && (
            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-lg">{mesAtual.nome}</h3>
              <p className="text-2xl font-bold mt-2">{formatarValor(mesAtual.totalFaturado)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Total faturado no mês
              </p>
            </div>
          )}
          
          {carregando ? (
            <p className="text-center py-8 text-gray-500">Carregando transações...</p>
          ) : transacoes.length > 0 ? (
            <div className="space-y-4 mt-4">
              <h3 className="font-medium">Transações do mês</h3>
              
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {transacoes.map((transacao) => (
                      <tr key={transacao.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {format(new Date(transacao.data), 'dd/MM/yyyy')}
                        </td>
                        <td className="px-6 py-4 text-sm">{transacao.descricao}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs ${
                            transacao.tipo === 'entrada' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {transacao.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                          transacao.tipo === 'entrada' 
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {formatarValor(transacao.valor)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhuma transação encontrada para este mês.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Extrato;
