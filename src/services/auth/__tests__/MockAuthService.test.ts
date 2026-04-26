import type { IStorageService } from '@services/storage';
import { MockAuthService } from '../mockAuthService';

jest.mock('@utils/async', () => ({
  delay: jest.fn().mockResolvedValue(undefined),
}));

describe('MockAuthService', () => {
  let mockStorage: jest.Mocked<IStorageService>;
  let authService: MockAuthService;

  beforeEach(() => {
    mockStorage = {
      getJSON: jest.fn().mockReturnValue(undefined),
      setJSON: jest.fn(),
      delete: jest.fn(),
      getString: jest.fn(),
      setString: jest.fn(),
      contains: jest.fn(),
      clearAll: jest.fn(),
    };
    authService = new MockAuthService(mockStorage);
  });

  describe('signup', () => {
    it('returns user without password on success', async () => {
      const user = await authService.signup('John', 'john@example.com', 'pass123');

      expect(user).toEqual({
        id: expect.any(String),
        name: 'John',
        email: 'john@example.com',
      });
      expect(user).not.toHaveProperty('password');
    });

    it('persists new user to storage', async () => {
      await authService.signup('John', 'john@example.com', 'pass123');

      expect(mockStorage.setJSON).toHaveBeenCalledWith(
        'users_db',
        expect.objectContaining({
          'john@example.com': expect.objectContaining({
            name: 'John',
            email: 'john@example.com',
            password: 'pass123',
          }),
        }),
      );
    });

    it('throws when email already registered', async () => {
      const existing = { id: '1', name: 'Jane', email: 'jane@example.com', password: 'pass' };
      mockStorage.getJSON.mockReturnValue({ 'jane@example.com': existing });
      const service = new MockAuthService(mockStorage);

      await expect(service.signup('Jane2', 'jane@example.com', 'other')).rejects.toThrow(
        'Email already registered',
      );
    });
  });

  describe('login', () => {
    it('returns user without password on valid credentials', async () => {
      const stored = { id: '1', name: 'John', email: 'john@example.com', password: 'pass123' };
      mockStorage.getJSON.mockReturnValue({ 'john@example.com': stored });
      const service = new MockAuthService(mockStorage);

      const user = await service.login('john@example.com', 'pass123');

      expect(user).toEqual({ id: '1', name: 'John', email: 'john@example.com' });
      expect(user).not.toHaveProperty('password');
    });

    it('throws on wrong password', async () => {
      const stored = { id: '1', name: 'John', email: 'john@example.com', password: 'pass123' };
      mockStorage.getJSON.mockReturnValue({ 'john@example.com': stored });
      const service = new MockAuthService(mockStorage);

      await expect(service.login('john@example.com', 'wrongpass')).rejects.toThrow(
        'Invalid email or password',
      );
    });

    it('throws on unknown email', async () => {
      await expect(authService.login('nobody@example.com', 'pass')).rejects.toThrow(
        'Invalid email or password',
      );
    });
  });
});
