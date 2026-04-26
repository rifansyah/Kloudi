import { User, UsersRepository } from "@services/users";
import { delay } from "@utils/async";
import type { IStorageService } from "@services/storage";
import type { IAuthService } from "./types";

/**
 * MockAuthService
 *
 * This is a mock implementation of the AuthService.
 * It simulates real API behavior (e.g. delay, validation) without making network requests.
 *
 * Can be replaced with a real API-based AuthService.
 */
export class MockAuthService implements IAuthService {
  private usersRepository: UsersRepository;

  constructor(storage: IStorageService) {
    this.usersRepository = new UsersRepository(storage);
  }

  async signup(name: string, email: string, password: string): Promise<User> {
    await delay(500);

    if (this.usersRepository.findByEmail(email)) {
      throw new Error("Email already registered");
    }

    const user = {
      id: Date.now().toString(36),
      name,
      email,
    };

    this.usersRepository.createUser({ ...user, password });

    return user;
  }

  async login(email: string, password: string): Promise<User> {
    await delay(500);

    const stored = this.usersRepository.findByEmail(email);

    if (!stored || stored.password !== password) {
      throw new Error("Invalid email or password");
    }

    return {
      id: stored.id,
      name: stored.name,
      email: stored.email,
    };
  }
}
