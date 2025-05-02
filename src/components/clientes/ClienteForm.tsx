
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import type { Cliente } from './ClientesList';

interface ClienteFormProps {
  cliente?: Cliente | null;
  onSalvar: (cliente: Cliente) => void;
}

const estadosIniciais = {
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
  temEndereco: false,
  plano: 'BÁSICO',
  vencimento: ''
};

const ClienteForm = ({ cliente, onSalvar }: ClienteFormProps) => {
  const [formData, setFormData] = useState<Cliente>(estadosIniciais);

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    } else {
      setFormData(estadosIniciais);
    }
  }, [cliente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSalvar(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-start mb-4">
        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2 text-gray-500"
          onClick={() => window.history.back()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Voltar
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome:</Label>
          <Input
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="usuario">Usuário:</Label>
          <div className="relative">
            <Input
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              required
            />
            <span className="text-xs text-gray-500 absolute right-3 top-3">Para acessar a Área do Cliente</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="senha">Senha:</Label>
          <div className="relative">
            <Input
              id="senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              required
            />
            <span className="text-xs text-gray-500 absolute right-3 top-3">Para acessar a Área do Cliente</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp:</Label>
          <div className="flex">
            <div className="w-20 flex items-center justify-center border rounded-l-md bg-gray-50">
              <span className="text-sm text-gray-500 flex items-center">
                <img src="https://flagsapi.com/BR/flat/24.png" alt="Brasil" className="mr-1" /> +55
              </span>
            </div>
            <Input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              className="rounded-l-none"
              placeholder="11 96123-4567"
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="categoria">
            Determine a categoria deste cliente:
            <span className="ml-2 text-xs text-gray-500">(Opcional)</span>
          </Label>
          <Select 
            value={formData.categoria} 
            onValueChange={(value) => handleSelectChange('categoria', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="regular">Regular</SelectItem>
              <SelectItem value="basico">Básico</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="plano">Plano:</Label>
          <Select 
            value={formData.plano || 'BÁSICO'} 
            onValueChange={(value) => handleSelectChange('plano', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o plano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BÁSICO">Básico</SelectItem>
              <SelectItem value="PADRÃO">Padrão</SelectItem>
              <SelectItem value="PREMIUM">Premium</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vencimento">Data de Vencimento:</Label>
          <Input
            id="vencimento"
            name="vencimento"
            type="text"
            placeholder="DD/MM/AAAA"
            value={formData.vencimento || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="enviarNotificacoes">Enviar Notificações de Vencimentos:</Label>
          <Select 
            value={formData.enviarNotificacoes} 
            onValueChange={(value) => handleSelectChange('enviarNotificacoes', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nenhuma">Nenhuma</SelectItem>
              <SelectItem value="Email">Email</SelectItem>
              <SelectItem value="WhatsApp">WhatsApp</SelectItem>
              <SelectItem value="Ambos">Ambos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mac">
            MAC:
            <span className="ml-2 text-xs text-gray-500">(Opcional)</span>
          </Label>
          <Input
            id="mac"
            name="mac"
            placeholder="Opcional"
            value={formData.mac}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notasCliente">
          Notas para o Cliente:
          <span className="ml-2 text-xs text-gray-500">(Opcional)</span>
        </Label>
        <Textarea
          id="notasCliente"
          name="notasCliente"
          placeholder="Opcional"
          value={formData.notasCliente}
          onChange={handleChange}
          className="min-h-[120px]"
        />
        <p className="text-xs text-gray-500">A mensagem acima será exibida para o seu cliente na seção destinada a ele (Área do Cliente).</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="cpfCnpj" 
            checked={formData.temCpfCnpj} 
            onCheckedChange={(checked) => handleCheckboxChange('temCpfCnpj', checked as boolean)}
          />
          <label
            htmlFor="cpfCnpj"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Deseja adicionar CPF/CNPJ?
          </label>
        </div>
        
        {formData.temCpfCnpj && (
          <div className="pl-6">
            <Label htmlFor="cpfCnpj">CPF/CNPJ:</Label>
            <Input
              id="cpfCnpjValue"
              name="cpfCnpj"
              value={formData.cpfCnpj}
              onChange={handleChange}
            />
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="endereco" 
            checked={formData.temEndereco} 
            onCheckedChange={(checked) => handleCheckboxChange('temEndereco', checked as boolean)}
          />
          <label
            htmlFor="endereco"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Deseja adicionar endereço?
          </label>
        </div>
        
        {formData.temEndereco && (
          <div className="pl-6">
            <Label htmlFor="endereco">Endereço:</Label>
            <Input
              id="enderecoValue"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-start pt-4">
        <Button type="submit" className="bg-azul-600 hover:bg-azul-700">
          {cliente ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
        </Button>
      </div>
    </form>
  );
};

export default ClienteForm;
