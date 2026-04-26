import type { MMKV } from 'react-native-mmkv';
import { createMMKV } from 'react-native-mmkv';
import type { IStorageService } from './types';

const ENCRYPTION_KEY = 'kloudi-mmkv-encryption-key-v1';

class MMKVStorage implements IStorageService {
  private instance: MMKV;

  constructor() {
    this.instance = createMMKV({
      id: 'kloudi-encrypted-storage',
      encryptionKey: ENCRYPTION_KEY,
    });
  }

  getString(key: string): string | undefined {
    return this.instance.getString(key);
  }

  setString(key: string, value: string): void {
    this.instance.set(key, value);
  }

  getJSON<T>(key: string): T | undefined {
    const raw = this.instance.getString(key);
    if (raw === undefined) {
      return undefined;
    }
    try {
      return JSON.parse(raw) as T;
    } catch {
      return undefined;
    }
  }

  setJSON<T>(key: string, value: T): void {
    this.instance.set(key, JSON.stringify(value));
  }

  delete(key: string): void {
    this.instance.remove(key);
  }

  clearAll(): void {
    this.instance.clearAll();
  }

  contains(key: string): boolean {
    return this.instance.contains(key);
  }
}

export const createStorage = (): IStorageService => new MMKVStorage();
