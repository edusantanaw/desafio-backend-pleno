import { UsecaseMock } from "../../../test/mocks/useCase";
import { LoadWithPaginationController } from "./loadWithPagination.controller";

function makeSut() {
  const useCase = new UsecaseMock();
  const loadWithPagination = new LoadWithPaginationController(useCase);
  return { loadWithPagination, useCase };
}

describe("LoadWithPaginationController", () => {
  test("should call loadWithPaginationUsecase with correct values", async () => {
    const { loadWithPagination, useCase } = makeSut();
    await loadWithPagination.handle({ limit: "10", offset: "0" });
    expect(useCase.input).toEqual({ limit: 10, offset: 0 });
  });

  test("should return an status Ok and all items", async () => {
    const { loadWithPagination, useCase } = makeSut();
    const res = { data: [1] };
    useCase.res = res;
    const response = await loadWithPagination.handle({
      limit: "10",
      offset: "0",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(res);
  });

  test("should return an exception error if an expected_error happen", async () => {
    const { loadWithPagination, useCase } = makeSut();
    useCase.throws = true
    const response = await loadWithPagination.handle({
      limit: "10",
      offset: "0",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("expected_error");
  });
});
