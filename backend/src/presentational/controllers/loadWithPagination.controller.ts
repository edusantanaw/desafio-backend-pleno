import { ILoadWithPaginationUsecase } from "../../domain/usecases/loadWithPagination";
import { ExceptionError, Ok } from "../helpers/httpStatus.helper";

interface Pagination {
  limit: string;
  offset: string
}

export class LoadWithPaginationController<In extends Pagination> {
  constructor(
    private readonly loadWithPaginationUsecase: ILoadWithPaginationUsecase<IPagination>
  ) {}
  public async handle(data: In) {
    try {
      const items = await this.loadWithPaginationUsecase.execute({
        ...data,
        limit: Number(data.limit ),
        offset: Number(data.offset),
      });
      return Ok(items);
    } catch (error) {
      return ExceptionError(error);
    }
  }
}
