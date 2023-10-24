import { ICreateUsecase } from "../../domain/usecases/create";
import { BadRequest, Created } from "../helpers/httpStatus.helper";
import { ISchemaValidator } from "../helpers/schemaValidator.helper";
import { CreateController } from "./create.controller";

class SchemaValidatorMock<T> implements ISchemaValidator<T> {
  isSchemaValid: boolean = true;
  input: T | null = null;
  public isValid(data: T): string | null {
    this.input = data;
    if (!this.isSchemaValid) return "invalid";
    return null;
  }
}

class CreateUsecaseMock<In, Out> implements ICreateUsecase<In, Out> {
  input: In | null = null;
  shouldThrowErrorException: boolean = false;
  public async execute(data: In): Promise<Out> {
    this.input = data;
    if (this.shouldThrowErrorException) throw new Error("expected_error");
    return "out" as Out;
  }
}

function makeSut() {
  const schemaValidator = new SchemaValidatorMock();
  const createUsecase = new CreateUsecaseMock();
  const createController = new CreateController(schemaValidator, createUsecase);

  return { createController, schemaValidator, createUsecase };
}

describe("CreateController", () => {
  test("Should call schemaValidator with correct values", async () => {
    const { createController, schemaValidator } = makeSut();
    await createController.handle({ id: "string" });
    expect(schemaValidator.input).toEqual({ id: "string" });
  });

  test("Should return an badRequest if schema provided is invalid!", async () => {
    const { createController, schemaValidator } = makeSut();
    schemaValidator.isSchemaValid = false;
    const response = await createController.handle({ id: "string" });
    expect(response).toEqual(BadRequest("invalid"));
  });

  test("Should return an ExeptionError if exception is instanceof error", async () => {
    const { createController, createUsecase } = makeSut();
    createUsecase.shouldThrowErrorException = true;
    const response = await createController.handle({ id: "string" });
    expect(response.body).toBe("expected_error");
    expect(response.statusCode).toBe(400);
  });

  test("Should return Created if item is created with success", async () => {
    const { createController } = makeSut();
    const response = await createController.handle({ id: "id" });
    expect(response).toEqual(Created("out"));
  });
});
