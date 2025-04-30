
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ClientesPaginationProps {
  paginaAtual: number;
  totalPaginas: number;
  onChange: (pagina: number) => void;
}

const ClientesPagination = ({ paginaAtual, totalPaginas, onChange }: ClientesPaginationProps) => {
  const irParaPaginaAnterior = () => {
    if (paginaAtual > 1) {
      onChange(paginaAtual - 1);
    }
  };

  const irParaProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      onChange(paginaAtual + 1);
    }
  };

  const gerarPaginas = () => {
    const paginas = [];
    const mostrarMaxPaginas = 5;
    
    let inicio = Math.max(1, paginaAtual - 2);
    let fim = Math.min(totalPaginas, inicio + mostrarMaxPaginas - 1);
    
    if (fim - inicio + 1 < mostrarMaxPaginas) {
      inicio = Math.max(1, fim - mostrarMaxPaginas + 1);
    }
    
    for (let i = inicio; i <= fim; i++) {
      paginas.push(i);
    }
    
    return paginas;
  };

  if (totalPaginas <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={irParaPaginaAnterior}
            disabled={paginaAtual === 1}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>
        </PaginationItem>
        
        {gerarPaginas().map(pagina => (
          <PaginationItem key={pagina}>
            <PaginationLink 
              isActive={paginaAtual === pagina}
              onClick={() => onChange(pagina)}
              className={`cursor-pointer ${
                paginaAtual === pagina ? 'bg-purple-500 text-white hover:bg-purple-600' : ''
              }`}
            >
              {pagina}
            </PaginationLink>
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={irParaProximaPagina}
            disabled={paginaAtual === totalPaginas}
            className="gap-1"
          >
            Próximo
            <ArrowRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ClientesPagination;
