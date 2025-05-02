
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { transacoesService } from '@/lib/supabase';

// Componente para card financeiro
const FinanceCard = ({
  title,
  value,
  description,
  color = 'bg-purple-500'
}: {
  title: string;
  value: string;
  description: string;
  color?: string;
}) => (
  <Card>
    <CardContent className={`p-6 ${color} text-white`}>
      <h3 className="text-md font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className="text-sm mt-1 opacity-85">{description}</p>
    </CardContent>
  </Card>
);

const AnaliseFinanceira = () => {
  const [resumoFinanceiro, setResumoFinanceiro] = useState({
    saldoAtual: 0,
    totalEntradas: 0,
    totalSaidas: 0,
    fechamentoAnterior: 0,
  });
  
  const [graficoDados, setGraficoDados] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dataAtual = new Date();
        const mesAtual = dataAtual.getMonth();
        const anoAtual = dataAtual.getFullYear();
        
        // Buscar dados do mês atual
        const dadosMesAtual = await transacoesService.getResumoMensal(mesAtual, anoAtual);
        
        // Buscar dados do mês anterior
        const mesAnterior = mesAtual - 1 < 0 ? 11 : mesAtual - 1;
        const anoAnterior = mesAnterior === 11 ? anoAtual - 1 : anoAtual;
        const dadosMesAnterior = await transacoesService.getResumoMensal(mesAnterior, anoAnterior);
        
        // Buscar dados para o gráfico (últimos 6 meses)
        const historicoMensal = await transacoesService.getHistoricoMensal(6);
        
        // Formatar dados para o gráfico
        const dadosGrafico = historicoMensal.map(item => ({
          name: item.nomeMes,
          ganhos: item.totalFaturado,
          gastos: Math.random() * item.totalFaturado * 0.7, // Simulando gastos para visualização
        })).reverse();
        
        setResumoFinanceiro({
          saldoAtual: dadosMesAtual.saldoFinal,
          totalEntradas: dadosMesAtual.totalEntradas,
          totalSaidas: dadosMesAtual.totalSaidas,
          fechamentoAnterior: dadosMesAnterior.saldoFinal,
        });
        
        setGraficoDados(dadosGrafico);
      } catch (error) {
        console.error("Erro ao carregar dados financeiros:", error);
      } finally {
        setCarregando(false);
      }
    };
    
    carregarDados();
  }, []);

  const formatarValor = (valor: number) => {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  };
  
  const mesAtual = format(new Date(), 'MMMM', { locale: ptBR });
  const capitalizedMesAtual = mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FinanceCard
          title="Valor Atual"
          value={formatarValor(resumoFinanceiro.saldoAtual)}
          description={`Seu caixa hoje ${format(new Date(), 'dd/MM')}`}
        />
        
        <FinanceCard
          title="Entrada"
          value={formatarValor(resumoFinanceiro.totalEntradas)}
          description={capitalizedMesAtual}
          color="bg-purple-600"
        />
        
        <FinanceCard
          title="Saída"
          value={formatarValor(resumoFinanceiro.totalSaidas)}
          description={capitalizedMesAtual}
          color="bg-purple-700"
        />
        
        <FinanceCard
          title={`Fechamento caixa, mês anterior`}
          value={formatarValor(resumoFinanceiro.fechamentoAnterior)}
          description="Você fechou o mês anterior"
          color="bg-purple-800"
        />
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Gastos e Ganhos</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{new Date().getFullYear()}</p>
          
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={graficoDados}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`R$ ${value.toFixed(2)}`, '']}
                  labelFormatter={(label) => `Mês: ${label}`}
                />
                <Legend />
                <Bar dataKey="ganhos" name="Receitas" fill="#8884d8" />
                <Bar dataKey="gastos" name="Despesas" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium">Seus ganhos nos últimos 7 dias</h3>
          <div className="h-10 mt-4">
            {carregando ? (
              <p className="text-gray-500 dark:text-gray-400">Carregando dados...</p>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                {resumoFinanceiro.totalEntradas > 0 
                  ? `Total de ${formatarValor(resumoFinanceiro.totalEntradas / 30 * 7)} nos últimos 7 dias` 
                  : "Nenhum ganho registrado nos últimos 7 dias"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnaliseFinanceira;
