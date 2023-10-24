import { ILoadByIdUsecase } from "../../domain/usecases/loadById";
import { BadRequest, ExceptionError, NotFound, Ok } from "../helpers/httpStatus.helper";

export class LoadByidController<Out> implements IController<{ id: string }> {
    constructor(private readonly loadByIdUsecase: ILoadByIdUsecase<Out>) {}
    public async handle({ id }: { id: string }): Promise<IHttpStatus<unknown>> {
      try {
        if (!id) return BadRequest("id is required");
        const item = await this.loadByIdUsecase.execute(id);
        if (!item) return NotFound();
        return Ok(item);
      } catch (error) {
        return ExceptionError(error);
      }
    }
  }