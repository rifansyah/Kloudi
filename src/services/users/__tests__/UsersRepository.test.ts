import type { IStorageService } from '@services/storage';
import { UsersRepository } from '../UsersRepository';

describe('UsersRepository', () => {
  let mockStorage: jest.Mocked<IStorageService>;

  beforeEach(() => {
    mockStorage = {
      getJSON: jest.fn(),
      setJSON: jest.fn(),
      delete: jest.fn(),
      getString: jest.fn(),
      setString: jest.fn(),
      contains: jest.fn(),
      clearAll: jest.fn(),
    };
  });

  describe('initialization', () => {
    it('should load users from storage on instantiation', () => {
      const storedUsers = {
        'test@example.com': {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        },
      };
      mockStorage.getJSON.mockReturnValue(storedUsers);

      const repo = new UsersRepository(mockStorage);

      const user = repo.findByEmail('test@example.com');
      expect(user).toEqual(storedUsers['test@example.com']);
      expect(mockStorage.getJSON).toHaveBeenCalledWith('users_db');
    });

    it('should start with empty map if storage has no users', () => {
      mockStorage.getJSON.mockReturnValue(undefined);

      const repo = new UsersRepository(mockStorage);

      const user = repo.findByEmail('nonexistent@example.com');
      expect(user).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('should add user to map and persist to storage', () => {
      mockStorage.getJSON.mockReturnValue(undefined);
      const repo = new UsersRepository(mockStorage);

      const newUser = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'secret',
      };

      repo.createUser(newUser);

      const retrieved = repo.findByEmail('john@example.com');
      expect(retrieved).toEqual(newUser);
      expect(mockStorage.setJSON).toHaveBeenCalledWith('users_db', {
        'john@example.com': newUser,
      });
    });
  });

  describe('findByEmail', () => {
    it('should return user if email exists', () => {
      const user = {
        id: '1',
        name: 'Test',
        email: 'test@example.com',
        password: 'pass',
      };
      mockStorage.getJSON.mockReturnValue({ 'test@example.com': user });
      const repo = new UsersRepository(mockStorage);

      const found = repo.findByEmail('test@example.com');

      expect(found).toEqual(user);
    });

    it('should return undefined if email does not exist', () => {
      mockStorage.getJSON.mockReturnValue(undefined);
      const repo = new UsersRepository(mockStorage);

      const found = repo.findByEmail('nonexistent@example.com');

      expect(found).toBeUndefined();
    });
  });

  describe('deleteByEmail', () => {
    it('should remove user from map and persist to storage', () => {
      const user = {
        id: '1',
        name: 'Test',
        email: 'test@example.com',
        password: 'pass',
      };
      mockStorage.getJSON.mockReturnValue({ 'test@example.com': user });
      const repo = new UsersRepository(mockStorage);

      repo.deleteByEmail('test@example.com');

      const found = repo.findByEmail('test@example.com');
      expect(found).toBeUndefined();
      expect(mockStorage.setJSON).toHaveBeenCalledWith('users_db', {});
    });
  });

  describe('clearAll', () => {
    it('should clear all users and delete from storage', () => {
      const users = {
        'test1@example.com': {
          id: '1',
          name: 'Test 1',
          email: 'test1@example.com',
          password: 'pass1',
        },
        'test2@example.com': {
          id: '2',
          name: 'Test 2',
          email: 'test2@example.com',
          password: 'pass2',
        },
      };
      mockStorage.getJSON.mockReturnValue(users);
      const repo = new UsersRepository(mockStorage);

      repo.clearAll();

      expect(repo.findByEmail('test1@example.com')).toBeUndefined();
      expect(repo.findByEmail('test2@example.com')).toBeUndefined();
      expect(mockStorage.delete).toHaveBeenCalledWith('users_db');
    });
  });
});
