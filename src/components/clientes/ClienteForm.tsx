
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import FormField from './form/FormField';
import PhoneField from './form/PhoneField';
import SelectField from './form/SelectField';
import TextareaField from './form/TextareaField';
import ConditionalField from './form/ConditionalField';
import { ClienteFormProps, estadosIniciais, Cliente } from './form/ClienteFormTypes';

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

  const categoriaOptions = [
    { value: 'premium', label: 'Premium' },
    { value: 'regular', label: 'Regular' },
    { value: 'basico', label: 'Básico' }
  ];

  const notificacoesOptions = [
    { value: 'Nenhuma', label: 'Nenhuma' },
    { value: 'Email', label: 'Email' },
    { value: 'WhatsApp', label: 'WhatsApp' },
    { value: 'Ambos', label: 'Ambos' }
  ];

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
        <FormField
          id="nome"
          name="nome"
          label="Nome:"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        
        <FormField
          id="email"
          name="email"
          label="Email:"
          value={formData.email}
          onChange={handleChange}
          type="email"
          required
        />
        
        <FormField
          id="usuario"
          name="usuario"
          label="Usuário:"
          value={formData.usuario}
          onChange={handleChange}
          required
          rightAddon="Para acessar a Área do Cliente"
        />
        
        <FormField
          id="senha"
          name="senha"
          label="Senha:"
          value={formData.senha}
          onChange={handleChange}
          type="password"
          required
          rightAddon="Para acessar a Área do Cliente"
        />
        
        <PhoneField
          id="whatsapp"
          name="whatsapp"
          label="WhatsApp:"
          value={formData.whatsapp}
          onChange={handleChange}
        />
        
        <SelectField
          id="categoria"
          label="Determine a categoria deste cliente:"
          value={formData.categoria}
          onValueChange={(value) => handleSelectChange('categoria', value)}
          options={categoriaOptions}
          helpText="(Opcional)"
        />
        
        <SelectField
          id="enviarNotificacoes"
          label="Enviar Notificações de Vencimentos:"
          value={formData.enviarNotificacoes}
          onValueChange={(value) => handleSelectChange('enviarNotificacoes', value)}
          options={notificacoesOptions}
        />
        
        <FormField
          id="mac"
          name="mac"
          label="MAC:"
          value={formData.mac}
          onChange={handleChange}
          placeholder="Opcional"
          helpText="(Opcional)"
        />
      </div>
      
      <TextareaField
        id="notasCliente"
        name="notasCliente"
        label="Notas para o Cliente:"
        value={formData.notasCliente}
        onChange={handleChange}
        placeholder="Opcional"
        helpText="(Opcional)"
        description="A mensagem acima será exibida para o seu cliente na seção destinada a ele (Área do Cliente)."
      />
      
      <div className="space-y-4">
        <ConditionalField
          id="cpfCnpj"
          checkboxLabel="Deseja adicionar CPF/CNPJ?"
          fieldLabel="CPF/CNPJ"
          checked={formData.temCpfCnpj}
          onCheckedChange={(checked) => handleCheckboxChange('temCpfCnpj', checked)}
          value={formData.cpfCnpj}
          onChange={handleChange}
          name="cpfCnpj"
        />
        
        <ConditionalField
          id="endereco"
          checkboxLabel="Deseja adicionar endereço?"
          fieldLabel="Endereço"
          checked={formData.temEndereco}
          onCheckedChange={(checked) => handleCheckboxChange('temEndereco', checked)}
          value={formData.endereco}
          onChange={handleChange}
          name="endereco"
        />
      </div>
      
      <div className="flex justify-start pt-4">
        <Button type="submit" className="bg-azul-600 hover:bg-azul-700">
          Cadastrar Cliente
        </Button>
      </div>
    </form>
  );
};

export default ClienteForm;
