import { ClientRepositoryInMemory } from "../../../test/mocks/clientRepository.memory";
import dotenv from "../../main/config/dotenv";
import { LoadWithPaginationUsecase } from "./loadWithPagination.usecase";

dotenv();

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const ROUTE = "clients"


function makeSut() {
  const clientRepo = new ClientRepositoryInMemory();
  const loadWithPagination = new LoadWithPaginationUsecase(
    clientRepo,
    ROUTE
  );
  return { clientRepo, loadWithPagination };
}

describe("LoadWithPaginationUsecase", () => {
  test("should return an limit of 100 items", async () => {
    const { clientRepo, loadWithPagination } = makeSut();
    clientRepo.loadRes = { total: 100, data: [1] };
    await loadWithPagination.execute({ limit: 101, offset: 0 });
    expect(clientRepo.loadInput).toEqual({ limit: 100, offset: 0 });
  });

  test("should change limit to 100 and offset to 0 if is not null", async () => {
    const { clientRepo, loadWithPagination } = makeSut();
    clientRepo.loadRes = { total: 10, data: [1] };
    await loadWithPagination.execute({ limit: 0, offset: 0 });
    expect(clientRepo.loadInput).toEqual({ limit: 10, offset: 0 });
  });

  test("should call repository with correct value", async () => {
    const { clientRepo, loadWithPagination } = makeSut();
    clientRepo.loadRes = { total: 10, data: [1] };
    await loadWithPagination.execute({ limit: 50, offset: 0 });
    expect(clientRepo.loadInput).toEqual({ limit: 50, offset: 0 });
  });

  test("should return previous page with null value if offset is 0", async () => {
    const { clientRepo, loadWithPagination } = makeSut();
    clientRepo.loadRes = { total: 10, data: [1] };
    const response = await loadWithPagination.execute({ limit: 10, offset: 0 });
    expect(response.previous).toBe(null);
  });

  test("should return next page with null value if the data is less than limit", async () => {
    const { clientRepo, loadWithPagination } = makeSut();
    clientRepo.loadRes = { total: 10, data: [1] };
    const response = await loadWithPagination.execute({ limit: 10, offset: 0 });
    expect(response.next).toBe(null);
  });

  test("should should return an previous page if offset is more than 0", async () => {
    const { clientRepo, loadWithPagination } = makeSut();
    clientRepo.loadRes = { total: 10, data: [1] };
    const response = await loadWithPagination.execute({ limit: 10, offset: 10 });
    expect(response.previous).toBe(`${BASE_URL}:${PORT}/api/v1/${ROUTE}?limit=10&offset=0`);
  });
  
  test("should should return 0 if offset is less than 0", async () => {
    const { clientRepo, loadWithPagination } = makeSut();
    clientRepo.loadRes = { total: 10, data: [1] };
    const response = await loadWithPagination.execute({ limit: 10, offset: -1 });
    expect(response.previous).toBe(`${BASE_URL}:${PORT}/api/v1/${ROUTE}?limit=10&offset=0`);
  });

  test("should should return an next page if res is equals limit", async () => {
    const { clientRepo, loadWithPagination } = makeSut();
    clientRepo.loadRes = { total: 2, data: [1] };
    const response = await loadWithPagination.execute({ limit: 1, offset: 0 });
    expect(response.next).toBe(`${BASE_URL}:${PORT}/api/v1/${ROUTE}?limit=1&offset=1`);
  });
  
  test("should should all data", async () => {
    const { clientRepo, loadWithPagination } = makeSut();
    clientRepo.loadRes = { total: 2, data: [1] };
    const response = await loadWithPagination.execute({ limit: 1, offset: 0 });
    expect(response.next).toBe(`${BASE_URL}:${PORT}/api/v1/${ROUTE}?limit=1&offset=1`);
    expect(response.previous).toBe(null);
    expect(response.count).toBe(2);
    expect(response.results).toEqual([1]);
  });
});
