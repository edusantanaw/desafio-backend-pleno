export interface IDeleteRepository<T> {
  loadById: (id: string) => Promise<T | null>;
  delete: (id: string) => Promise<void>;
}
