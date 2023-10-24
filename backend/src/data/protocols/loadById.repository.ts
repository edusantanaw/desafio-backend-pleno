export interface ILoadByIdRepository<Out> {
  loadById: (id: string) => Promise<Out | null>;
}
