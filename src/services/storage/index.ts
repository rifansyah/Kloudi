import { createStorage } from './MMKVStorage';

export type { IStorageService } from './types';

const Storage = createStorage();
export default Storage;
