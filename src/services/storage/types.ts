export interface IStorageService {
  getString(key: string): string | undefined;
  setString(key: string, value: string): void;
  getJSON<T>(key: string): T | undefined;
  setJSON<T>(key: string, value: T): void;
  delete(key: string): void;
  clearAll(): void;
  contains(key: string): boolean;
}
