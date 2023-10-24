import { IDeleteUsecase } from "../../domain/usecases/delete";
import { BadRequest, ExceptionError, Ok } from "../helpers/httpStatus.helper";

export class DeleteController {
    constructor(private readonly deleteUsecase: IDeleteUsecase) {}
    public async handle({ id }: { id: string }) {
      try {
        if (!id) return BadRequest("id is required!");
        const deleteMessage = await this.deleteUsecase.execute(id);
        return Ok(deleteMessage);
      } catch (error) {
        return ExceptionError(error);
      }
    }
  }