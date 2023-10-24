export interface IDeleteUsecase {
  execute: (id: string) => Promise<{ message: string }>;
}
