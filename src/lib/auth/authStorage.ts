
import { toast } from 'sonner';

export type UserRole = 'pendente' | 'usuario' | 'premium' | 'admin';

export interface User {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
}

export interface StoredUser extends User {
  senha: string;
}

const USERS_KEY = 'pk_system_users';
const CURRENT_USER_KEY = 'pk_system_current_user';

// Helper para gerar IDs únicos
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Carregar usuários do localStorage
export const getStoredUsers = (): StoredUser[] => {
  const usersStr = localStorage.getItem(USERS_KEY);
  return usersStr ? JSON.parse(usersStr) : [];
};

// Salvar usuários no localStorage
const saveUsers = (users: StoredUser[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Criar usuário admin padrão se não existir nenhum usuário
export const initializeDefaultAdmin = (): void => {
  const users = getStoredUsers();
  
  if (users.length === 0) {
    const adminUser: StoredUser = {
      id: generateId(),
      nome: 'Administrador',
      email: 'admin@exemplo.com',
      senha: 'admin123',
      role: 'admin',
    };
    
    saveUsers([adminUser]);
    toast.info('Usuário admin criado: admin@exemplo.com / senha: admin123');
  }
};

// Buscar usuário pelo email
export const findUserByEmail = (email: string): StoredUser | undefined => {
  return getStoredUsers().find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Registrar novo usuário
export const registerUser = (nome: string, email: string, senha: string): User => {
  const users = getStoredUsers();
  
  // Verificar se email já existe
  if (findUserByEmail(email)) {
    throw new Error('Este email já está registrado');
  }
  
  const newUser: StoredUser = {
    id: generateId(),
    nome,
    email,
    senha,
    role: 'pendente',  // Novos usuários começam como pendentes
  };
  
  users.push(newUser);
  saveUsers(users);
  
  // Retornar usuário sem a senha
  const { senha: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Autenticar usuário
export const authenticateUser = (email: string, senha: string): User => {
  const user = findUserByEmail(email);
  
  if (!user) {
    throw new Error('Email não registrado');
  }
  
  if (user.senha !== senha) {
    throw new Error('Senha incorreta');
  }
  
  // Salvar usuário atual no localStorage (sem senha)
  const { senha: _, ...userWithoutPassword } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  
  return userWithoutPassword;
};

// Obter usuário atual
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(CURRENT_USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

// Atualizar cargo do usuário (apenas admin pode fazer isso)
export const updateUserRole = (userId: string, newRole: UserRole): boolean => {
  const users = getStoredUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return false;
  
  users[userIndex].role = newRole;
  saveUsers(users);
  
  // Se for o usuário atual, atualizar também
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    currentUser.role = newRole;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  }
  
  return true;
};

// Atualizar dados do usuário
export const updateUserProfile = (userId: string, nome: string, email: string): boolean => {
  const users = getStoredUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return false;
  
  // Verificar se o novo email já está em uso por outro usuário
  const emailExists = users.some(u => u.id !== userId && u.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    throw new Error('Este email já está em uso por outro usuário');
  }
  
  users[userIndex].nome = nome;
  users[userIndex].email = email;
  saveUsers(users);
  
  // Se for o usuário atual, atualizar também
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    currentUser.nome = nome;
    currentUser.email = email;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  }
  
  return true;
};

// Alterar senha
export const changePassword = (userId: string, oldPassword: string, newPassword: string): boolean => {
  const users = getStoredUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return false;
  
  // Verificar senha atual
  if (users[userIndex].senha !== oldPassword) {
    throw new Error('Senha atual incorreta');
  }
  
  users[userIndex].senha = newPassword;
  saveUsers(users);
  
  return true;
};

// Logout
export const logoutUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
