
export interface Cliente {
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
  plano?: string;
  vencimento?: string;
}

export const estadosIniciais = {
  id: '',
  nome: '',
  email: '',
  telefone: '',
  empresa: '',
  status: 'Ativo' as 'Ativo' | 'Inativo' | 'Pendente',
  usuario: '',
  senha: '',
  whatsapp: '',
  categoria: '',
  mac: '',
  notasCliente: '',
  enviarNotificacoes: 'Nenhuma',
  cpfCnpj: '',
  endereco: '',
  temCpfCnpj: false,
  temEndereco: false
};

export interface ClienteFormProps {
  cliente?: Cliente | null;
  onSalvar: (cliente: Cliente) => void;
}
