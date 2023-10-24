import client from "../../main/config/cachDb";

export interface ICacheRepository<T> {
  getItem: (key: string) => Promise<T | null>;
  setItem: (key: string, data: T) => Promise<string | null>;
}

export class CacheRepository<T> implements ICacheRepository<T> {
  public async getItem(key: string) {
    const cachedItem = await client.get(key);
    if (cachedItem) return JSON.parse(cachedItem) as T;
    return null;
  }

  public async setItem(key: string, data: T) {
    const cached = await client.set(key, JSON.stringify(data));
    return cached;
  }
}
