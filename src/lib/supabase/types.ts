
// Tipos para as tabelas do Supabase
export type ClienteSupabase = {
  id: string;
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
  id: string;
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
