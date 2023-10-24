export type PaginationResponse = {
  count: number;
  previous: string | null;
  next: string | null;
  results: any[];
};

export interface ILoadWithPaginationUsecase<T extends IPagination> {
  execute: (data: T) => Promise<PaginationResponse>;
}
