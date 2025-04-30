
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bem-vindo, {user?.nome || 'Usuário'}</h1>
        <p className="text-gray-500">Aqui está uma visão geral do portal administrativo.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total de Clientes" 
          value="254"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
          description="+12% em relação ao mês anterior"
        />
        <StatsCard 
          title="Novos Clientes" 
          value="12"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
          description="Nesta semana"
        />
        <StatsCard 
          title="Taxa de Retenção" 
          value="89%"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <path d="m5 12 7-7 7 7" />
              <path d="M12 19V5" />
            </svg>
          }
          description="+2% em relação ao mês anterior"
        />
        <StatsCard 
          title="Contratos Ativos" 
          value="187"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RecentActivity />
        
        <Card>
          <CardHeader className="text-lg font-medium">Datas Importantes</CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Reunião de Equipe</p>
                  <span className="text-xs text-azul-600 bg-azul-50 px-2 py-1 rounded-full">Hoje</span>
                </div>
                <p className="text-xs text-gray-500">14:00 - Sala de Reuniões</p>
              </div>
              
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Apresentação de Resultados</p>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">Amanhã</span>
                </div>
                <p className="text-xs text-gray-500">10:00 - Auditório</p>
              </div>
              
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Revisão de Contratos</p>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">26/04</span>
                </div>
                <p className="text-xs text-gray-500">09:00 - Departamento Jurídico</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
