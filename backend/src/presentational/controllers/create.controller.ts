import { ISchemaValidator } from "../helpers/schemaValidator.helper";
import { BadRequest, Created, ExceptionError } from '../helpers/httpStatus.helper'; 
import { ICreateUsecase } from "../../domain/usecases/create";

export class CreateController<In, Out> implements IController<In> {
  constructor(
    private readonly schemaValidator: ISchemaValidator<In>,
    private readonly createUsecase: ICreateUsecase<In, Out>
  ) {}
  public async handle(data: In): Promise<IHttpStatus<unknown>> {
    try {
      const maybeSchemaValidateError = this.schemaValidator.isValid(data);
      if (maybeSchemaValidateError) return BadRequest(maybeSchemaValidateError);
      const createdData = await this.createUsecase.execute(data);
      return Created(createdData);
    } catch (error) {
      return ExceptionError(error);
    }
  }
}
