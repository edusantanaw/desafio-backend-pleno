import {
  ILoadWithPaginationUsecase,
  PaginationResponse,
} from "../../domain/usecases/loadWithPagination";
import dotenv from "../../main/config/dotenv";

interface ILoadWithPaginationRepository<Params extends IPagination, Result> {
  load: (data: Params) => Promise<{ total: number; data: Result[] }>;
}

dotenv();

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;

export class LoadWithPaginationUsecase<T extends IPagination, RESULT>
  implements ILoadWithPaginationUsecase<T>
{
  constructor(
    private readonly clientRepository: ILoadWithPaginationRepository<T, RESULT>,
    private readonly route: string
  ) {}
  public async execute(data: T): Promise<PaginationResponse> {
    const queryInfos = this.getQuery(data);
    const queryResult = await this.clientRepository.load(queryInfos);
    return {
      count: queryResult.total,
      previous: this.getPreviousPage(queryInfos),
      next: this.getNextPage(queryInfos, queryResult.data),
      results: queryResult.data,
    };
  }

  private getPreviousPage(data: IPagination) {
    if (data.offset === 0) return null;
    let offset = data.offset - data.limit;
    return `${BASE_URL}:${PORT}/api/v1/${this.route}?limit=${
      data.limit
    }&offset=${offset < 0 ? 0 : offset}`;
  }

  private getNextPage(data: IPagination, res: RESULT[]) {
    if (res.length < data.limit) return null;
    return `${BASE_URL}:${PORT}/api/v1/${this.route}?limit=${
      data.limit
    }&offset=${data.offset + data.limit}`;
  }

  private getQuery(data: T) {
    if (!data.limit) data.limit = 10;
    if (!data.offset) data.offset = 0;
    if (data.limit > 100) {
      return {
        ...data,
        limit: 100,
      };
    }
    return data;
  }
}
