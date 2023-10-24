import { UsecaseMock } from "../../../test/mocks/useCase";
import {
  BadRequest
} from "../helpers/httpStatus.helper";
import { LoadByidController } from "./loadById.controller";


function makeSut() {
  const useCase = new UsecaseMock();
  const loadByIdController = new LoadByidController(useCase);
  return { loadByIdController, useCase };
}

describe("LoadByIdController", () => {
  test("should return an badRequest if id is not provided", async () => {
    const { loadByIdController } = makeSut();
    const response = await loadByIdController.handle({ id: "" });
    expect(response).toEqual(BadRequest("id is required"));
  });

  test("should call loadByIdUsecase with correct value", async () => {
    const { loadByIdController, useCase } = makeSut();
    await loadByIdController.handle({ id: "1234" });
    expect(useCase.input).toBe("1234");
  });

  test("should return an exceptionError if usecases throws", async () => {
    const { loadByIdController, useCase } = makeSut();
    await loadByIdController.handle({ id: "1234" });
    expect(useCase.input).toBe("1234");
  });

  test("should return an notfound status if item is not found", async ()=> {
    const {loadByIdController, useCase} = makeSut()
    useCase.res = null
    const response = await loadByIdController.handle({id: "123"})
    expect(response.statusCode).toBe(404)
    expect(response.body).toBe("not found")
  })

  test("should return an exceptionError if usecases throws", async () => {
    const { loadByIdController, useCase } = makeSut();
    useCase.throws = true;
    const response = await loadByIdController.handle({ id: "1234" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("expected_error");
  });

  test("should return the item if is found", async () => {
    const { loadByIdController, useCase } = makeSut();
    useCase.res = { id: "1234" };
    const response = await loadByIdController.handle({ id: "1234" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: "1234" });
  });
});
