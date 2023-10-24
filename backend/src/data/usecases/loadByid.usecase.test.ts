import { ClientRepositoryInMemory } from "../../../test/mocks/clientRepository.memory";
import { LoadByIdUsecase } from "./loadById.usecase";

function makeSut() {
  const clientRepository = new ClientRepositoryInMemory();
  const loadByIdUsecase = new LoadByIdUsecase(clientRepository);
  return {
    clientRepository,
    loadByIdUsecase,
  };
}

describe("LoadByIdUsecase", () => {
  test("Should call repository with correct value", async () => {
    const { clientRepository, loadByIdUsecase } = makeSut();
    await loadByIdUsecase.execute("1234");
    expect(clientRepository.loadByIdInput).toBe("1234");
  });

  test("Should return null no one item are not found", async () => {
    const { loadByIdUsecase } = makeSut();
    const response = await loadByIdUsecase.execute("1234");
    expect(response).toBe(null);
  });

  test("Should return item if is found", async () => {
    const { loadByIdUsecase, clientRepository } = makeSut();
    clientRepository.items = [{ id: "1234" } as any];
    const response = await loadByIdUsecase.execute("1234");
    expect(response).toEqual({ id: "1234" });
  });
});
