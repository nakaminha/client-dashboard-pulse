
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import AcessoPendente from './pages/AcessoPendente';
import GerenciarUsuarios from './pages/GerenciarUsuarios';
import Clientes from "./pages/Clientes";
import NotFound from "./pages/NotFound";
import Financeiro from "./pages/Financeiro";
import Notas from "./pages/Notas";
import Tarefas from "./pages/Tarefas";
import Whatsapp from "./pages/Whatsapp";
import ChatSuporte from "./pages/ChatSuporte";
import Planos from "./pages/Planos";
import Configuracao from "./pages/Configuracao";
import MinhaConta from "./pages/MinhaConta";
import Gateways from "./pages/Gateways";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/acesso-pendente" element={<AcessoPendente />} />
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Index />} />
                <Route path="gerenciar-usuarios" element={<GerenciarUsuarios />} />
                <Route path="clientes" element={<Clientes />} />
                <Route path="financeiro" element={<Financeiro />} />
                <Route path="notas" element={<Notas />} />
                <Route path="tarefas" element={<Tarefas />} />
                <Route path="whatsapp" element={<Whatsapp />} />
                <Route path="chat-suporte" element={<ChatSuporte />} />
                <Route path="planos" element={<Planos />} />
                <Route path="configuracao" element={<Configuracao />} />
                <Route path="minha-conta" element={<MinhaConta />} />
                <Route path="gateways" element={<Gateways />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
