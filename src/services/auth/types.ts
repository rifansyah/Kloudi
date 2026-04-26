import type { User } from "@services/users";

export interface IAuthService {
  login(email: string, password: string): Promise<User>;
  signup(name: string, email: string, password: string): Promise<User>;
}
