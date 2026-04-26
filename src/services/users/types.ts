export interface User {
  id: string;
  name: string;
  email: string;
}

export interface StoredUser extends User {
  password: string;
}

export interface IUsersRepository {
  createUser(user: StoredUser): void;
  findByEmail(email: string): StoredUser | undefined;
  deleteByEmail(email: string): void;
  clearAll(): void;
}
