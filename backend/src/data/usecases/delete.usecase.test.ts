import { ClientRepositoryInMemory } from "../../../test/mocks/clientRepository.memory";
import { Client } from "../../domain/entities/client.entity";
import { NotFoundError } from "../../utils/errors/notFound.error";
import { DeleteClientUsecase } from "./deleteClient.usecase";

function makeSut() {
  const clientRepository = new ClientRepositoryInMemory();
  clientRepository.items = [{ id: "123" } as Client];
  const deleteClientUsecase = new DeleteClientUsecase(clientRepository);
  return { clientRepository, deleteClientUsecase };
}

describe("DeleteClientUsecase", () => {
  test("Should call clientRepository.loadById with correctValues", async () => {
    const { clientRepository, deleteClientUsecase } = makeSut();
    await deleteClientUsecase.execute("123");
    expect(clientRepository.loadByIdInput).toBe("123");
  });

  test("Should throw if client is not found", async () => {
    const { clientRepository, deleteClientUsecase } = makeSut();
    clientRepository.items = [];
    const response = deleteClientUsecase.execute("123");
    expect(response).rejects.toEqual(new NotFoundError("client"));
  });

  test("Should call delete method with correct value", async () => {
    const { clientRepository, deleteClientUsecase } = makeSut();
    await deleteClientUsecase.execute("123");
    expect(clientRepository.deletedInput).toBe("123");
  });

  test("Should return an message if client is deleted", async () => {
    const { deleteClientUsecase } = makeSut();
    const response = await deleteClientUsecase.execute("123");
    expect(response).toEqual({ message: "Client deleted successfully" });
  });
});
