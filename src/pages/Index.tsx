
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const Index = () => {
  const { user } = useAuth();
  
  const chartData = [
    { name: 'Jan', valor: 0 },
    { name: 'Fev', valor: 0 },
    { name: 'Mar', valor: 0 },
    { name: 'Abr', valor: 0 },
    { name: 'Mai', valor: 0.5 },
    { name: 'Jun', valor: 0.8 },
    { name: 'Jul', valor: 0.4 },
    { name: 'Ago', valor: 0.2 },
    { name: 'Set', valor: 0 },
    { name: 'Out', valor: 0 },
    { name: 'Nov', valor: 0 },
    { name: 'Dez', valor: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-azul-600 text-white p-6 rounded-lg relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20">
          <img src="/lovable-uploads/3b75d3b6-f448-4b70-9238-a733c8b55758.png" alt="Foguete" className="h-32" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Bem-Vindo(a) {user?.nome || 'clover streamings'}! 🎉</h1>
        
        <div className="mt-4 text-sm">
          <p>Data de vencimento do seu painel: <span className="font-medium">01/05/2025</span></p>
          <p className="flex items-center mt-1">
            Seu painel encontra-se: 
            <span className="ml-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">Ativo</span>
          </p>
        </div>
        
        <Button className="mt-4 bg-white text-azul-600 hover:bg-white/90">
          Minha Assinatura
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="col-span-1">
          <CardContent className="p-4">
            <div className="bg-green-100 w-8 h-8 rounded-lg flex items-center justify-center text-green-500 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Total de Cadastros:</h3>
            <p className="text-2xl font-semibold mt-1">0</p>
            <p className="text-xs text-green-500 flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Todos clientes
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardContent className="p-4">
            <div className="bg-blue-100 w-8 h-8 rounded-lg flex items-center justify-center text-blue-500 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Clientes Ativos:</h3>
            <p className="text-2xl font-semibold mt-1">0</p>
            <p className="text-xs text-green-500 flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Plano no hoje
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardContent className="p-4">
            <div className="bg-red-100 w-8 h-8 rounded-lg flex items-center justify-center text-red-500 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Clientes Inadimplentes:</h3>
            <p className="text-2xl font-semibold mt-1">0</p>
            <p className="text-xs text-red-500 flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Todos vencidos
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardContent className="p-4">
            <div className="bg-green-100 w-8 h-8 rounded-lg flex items-center justify-center text-green-500 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Faturas Pagas:</h3>
            <p className="text-2xl font-semibold mt-1">0</p>
            <p className="text-xs text-green-500 flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Clientes com vencimento futuro válido
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardContent className="p-4">
            <div className="bg-red-100 w-8 h-8 rounded-lg flex items-center justify-center text-red-500 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Faturas Vencidas:</h3>
            <p className="text-2xl font-semibold mt-1">0</p>
            <p className="text-xs text-red-500 flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Clientes vencidos
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardContent className="p-4">
            <div className="bg-amber-100 w-8 h-8 rounded-lg flex items-center justify-center text-amber-500 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Faturas Abertas:</h3>
            <p className="text-2xl font-semibold mt-1">0</p>
            <p className="text-xs text-amber-500 flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Pendentes e dentro do prazo
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="text-lg font-medium p-4 pb-0 flex justify-between items-center">
            <h3>Faturamento mês a mês (2025)</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  valor: {
                    label: "Valor",
                    theme: { light: "#9b87f5", dark: "#9b87f5" },
                  },
                }}
              >
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="valor" 
                    stroke="#9b87f5" 
                    fillOpacity={1} 
                    fill="url(#colorUv)" 
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Movimentado hoje:</h3>
                  <p className="text-2xl font-semibold mt-1 text-blue-600">R$ 0,00</p>
                </div>
                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M16 12h-6.5a2.5 2.5 0 0 0 0 5H16"/>
                    <path d="M16 17h-6.5a2.5 2.5 0 0 1 0-5H16"/>
                  </svg>
                </div>
              </div>
              <p className="text-xs text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Total de hoje
              </p>
              
              <hr className="my-6" />
              
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Ganhos de ontem:</h3>
                    <p className="text-md font-medium mt-1">28 de Abril</p>
                    <p className="text-xl font-semibold mt-1 text-blue-600">R$ 0,00</p>
                  </div>
                  <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-amber-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  <a href="#" className="text-blue-500 hover:underline">Ver gráfico completo</a>
                </p>
              </div>
              
              <hr className="my-6" />
              
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Ganhos deste mês:</h3>
                    <p className="text-md font-medium mt-1">Abril</p>
                    <p className="text-xl font-semibold mt-1 text-blue-600">R$ 0,00</p>
                  </div>
                  <div className="w-10 h-10">
                    <img src="/lovable-uploads/1005f1ca-5016-4bb3-b418-64360b69906a.png" alt="Troféu" className="w-full h-full object-contain" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  <a href="#" className="text-blue-500 hover:underline">Ver gráfico completo</a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
