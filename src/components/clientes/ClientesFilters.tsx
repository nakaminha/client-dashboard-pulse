
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ClientesFiltersProps {
  categoriaSelecionada: string;
  setCategoriaSelecionada: (categoria: string) => void;
  planoSelecionado: string;
  setPlanoSelecionado: (plano: string) => void;
}

const ClientesFilters = ({
  categoriaSelecionada,
  setCategoriaSelecionada,
  planoSelecionado,
  setPlanoSelecionado
}: ClientesFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <p className="text-sm text-gray-500 mb-1">Filtrar por: <span className="text-xs">(será filtrado o último plano contratado)</span></p>
        <Select value={categoriaSelecionada} onValueChange={setCategoriaSelecionada}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Mostrar todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Mostrar todos</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="basic">Básico</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <p className="text-sm text-gray-500 mb-1">Mostrar por Categoria:</p>
        <Select value={categoriaSelecionada} onValueChange={setCategoriaSelecionada}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Mostrar todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Mostrar todos</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="basic">Básico</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <p className="text-sm text-gray-500 mb-1">Mostrar por Plano:</p>
        <Select value={planoSelecionado} onValueChange={setPlanoSelecionado}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Mostrar todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Mostrar todos</SelectItem>
            <SelectItem value="BÁSICO">Básico</SelectItem>
            <SelectItem value="PADRÃO">Padrão</SelectItem>
            <SelectItem value="PREMIUM">Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ClientesFilters;
