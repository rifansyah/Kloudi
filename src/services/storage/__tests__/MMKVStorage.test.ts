import { createMMKV } from 'react-native-mmkv';
import { createStorage } from '../MMKVStorage';

jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(),
}));

describe('MMKVStorage', () => {
  let storage: ReturnType<typeof createStorage>;
  let mockMMKV: {
    getString: jest.Mock;
    set: jest.Mock;
    remove: jest.Mock;
    clearAll: jest.Mock;
    contains: jest.Mock;
  };

  beforeEach(() => {
    mockMMKV = {
      getString: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
      clearAll: jest.fn(),
      contains: jest.fn(),
    };
    (createMMKV as jest.Mock).mockReturnValue(mockMMKV);
    storage = createStorage();
  });

  describe('getString', () => {
    it('returns value when key exists', () => {
      mockMMKV.getString.mockReturnValue('dark');
      expect(storage.getString('theme_mode')).toBe('dark');
    });

    it('returns undefined when key missing', () => {
      mockMMKV.getString.mockReturnValue(undefined);
      expect(storage.getString('theme_mode')).toBeUndefined();
    });
  });

  describe('setString', () => {
    it('delegates to MMKV set', () => {
      storage.setString('theme_mode', 'dark');
      expect(mockMMKV.set).toHaveBeenCalledWith('theme_mode', 'dark');
    });
  });

  describe('getJSON', () => {
    it('deserializes JSON value', () => {
      const value = { lang: 'en' };
      mockMMKV.getString.mockReturnValue(JSON.stringify(value));
      expect(storage.getJSON('app_settings')).toEqual(value);
    });

    it('returns undefined when key missing', () => {
      mockMMKV.getString.mockReturnValue(undefined);
      expect(storage.getJSON('app_settings')).toBeUndefined();
    });

    it('returns undefined on malformed JSON', () => {
      mockMMKV.getString.mockReturnValue('{invalid json');
      expect(storage.getJSON('app_settings')).toBeUndefined();
    });
  });

  describe('setJSON', () => {
    it('serializes value to JSON string', () => {
      const value = { lang: 'en' };
      storage.setJSON('app_settings', value);
      expect(mockMMKV.set).toHaveBeenCalledWith('app_settings', JSON.stringify(value));
    });
  });

  describe('delete', () => {
    it('delegates to MMKV remove', () => {
      storage.delete('theme_mode');
      expect(mockMMKV.remove).toHaveBeenCalledWith('theme_mode');
    });
  });

  describe('clearAll', () => {
    it('delegates to MMKV clearAll', () => {
      storage.clearAll();
      expect(mockMMKV.clearAll).toHaveBeenCalled();
    });
  });

  describe('contains', () => {
    it('returns true when key exists', () => {
      mockMMKV.contains.mockReturnValue(true);
      expect(storage.contains('theme_mode')).toBe(true);
    });

    it('returns false when key absent', () => {
      mockMMKV.contains.mockReturnValue(false);
      expect(storage.contains('theme_mode')).toBe(false);
    });
  });
});
