import type { IStorageService } from "@services/storage";
import type { IUsersRepository, StoredUser } from "./types";

const STORAGE_KEY = "users_db";

// Repository layer that simulates a database for user data.
export class UsersRepository implements IUsersRepository {
  private users: Map<string, StoredUser>;

  constructor(private storage: IStorageService) {
    this.users = new Map();
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored =
      this.storage.getJSON<Record<string, StoredUser>>(STORAGE_KEY);
    if (stored) {
      this.users = new Map(Object.entries(stored));
    }
  }

  private saveToStorage(): void {
    const obj = Object.fromEntries(this.users);
    this.storage.setJSON(STORAGE_KEY, obj);
  }

  createUser(user: StoredUser): void {
    this.users.set(user.email, user);
    this.saveToStorage();
  }

  findByEmail(email: string): StoredUser | undefined {
    return this.users.get(email);
  }

  deleteByEmail(email: string): void {
    this.users.delete(email);
    this.saveToStorage();
  }

  clearAll(): void {
    this.users.clear();
    this.storage.delete(STORAGE_KEY);
  }
}
