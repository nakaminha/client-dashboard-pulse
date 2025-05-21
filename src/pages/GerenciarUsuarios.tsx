
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getStoredUsers, StoredUser, UserRole } from '@/lib/auth/authStorage';
import { toast } from 'sonner';

const GerenciarUsuarios = () => {
  const { user, updateRole } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [loading, setLoading] = useState(false);

  // Buscar todos os usuários do localStorage
  const loadUsers = () => {
    const allUsers = getStoredUsers();
    // Remover as senhas para exibição
    const usersForDisplay = allUsers.map(({ senha, ...userWithoutPassword }) => ({
      ...userWithoutPassword,
      senha: '********' // Mascara a senha
    })) as StoredUser[];
    
    setUsers(usersForDisplay);
  };

  // Verificar se o usuário atual é admin
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'admin') {
      toast.error('Acesso negado. Esta página é restrita para administradores.');
      navigate('/');
      return;
    }
    
    loadUsers();
  }, [user, navigate]);

  // Função para alterar o status do usuário
  const handleChangeRole = async (userId: string, newRole: UserRole) => {
    setLoading(true);
    try {
      await updateRole(userId, newRole);
      loadUsers(); // Atualiza a lista após a alteração
      toast.success(`Status do usuário alterado para ${newRole} com sucesso!`);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao alterar o status do usuário');
    } finally {
      setLoading(false);
    }
  };

  // Renderizar o badge de acordo com o papel do usuário
  const renderRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'pendente':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case 'usuario':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Usuário</Badge>;
      case 'premium':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Premium</Badge>;
      case 'admin':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Admin</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Usuários</CardTitle>
          <CardDescription>
            Gerencie os acessos e permissões dos usuários do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Lista de todos os usuários cadastrados no sistema</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.nome}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{renderRoleBadge(user.role)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {user.role === 'pendente' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-green-100 hover:bg-green-200 text-green-800"
                          onClick={() => handleChangeRole(user.id, 'usuario')}
                          disabled={loading}
                        >
                          Aprovar
                        </Button>
                      )}
                      {user.role !== 'admin' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-purple-100 hover:bg-purple-200 text-purple-800"
                          onClick={() => handleChangeRole(user.id, 'premium')}
                          disabled={loading}
                        >
                          Premium
                        </Button>
                      )}
                      {user.role !== 'pendente' && user.role !== 'admin' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-red-100 hover:bg-red-200 text-red-800"
                          onClick={() => handleChangeRole(user.id, 'pendente')}
                          disabled={loading}
                        >
                          Bloquear
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    Nenhum usuário encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GerenciarUsuarios;
