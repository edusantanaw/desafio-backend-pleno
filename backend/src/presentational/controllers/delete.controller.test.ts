import { BadRequest } from "../helpers/httpStatus.helper";
import { DeleteController } from "./delete.controller";

class UsecaseMock {
  input: any = null;
  throws: boolean = false;
  res: null | any = { id: "string" };
  public async execute(id: string) {
    this.input = id;
    if (this.throws) throw new Error("expected_error");
    return this.res;
  }
}

function makeSut() {
  const useCase = new UsecaseMock();
  const deleteController = new DeleteController(useCase);
  return { useCase, deleteController };
}

describe("DeleteController", () => {
  test("should return an badRequest if id is not provided!", async () => {
    const { deleteController } = makeSut();
    const response = await deleteController.handle({ id: "" });
    expect(response).toEqual(BadRequest("id is required!"));
  });

  test("should call deleted usecase with correct value!", async () => {
    const { deleteController, useCase } = makeSut();
    await deleteController.handle({ id: "123" });
    expect(useCase.input).toBe("123");
  });

  test("should return an exeption error if an expected error happen!", async () => {
    const { deleteController, useCase } = makeSut();
    useCase.throws = true;
    const response = await deleteController.handle({ id: "123" });
    expect(response.body).toBe("expected_error");
    expect(response.statusCode).toBe(400);
  });

  test("should return status code 200 and and success message!", async () => {
    const { deleteController, useCase } = makeSut();
    useCase.res = { message: "deleted" };
    const response = await deleteController.handle({ id: "123" });
    expect(response.body).toEqual({ message: "deleted" });
    expect(response.statusCode).toBe(200);
  });
});
