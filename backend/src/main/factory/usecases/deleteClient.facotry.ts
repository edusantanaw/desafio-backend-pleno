import { DeleteClientUsecase } from "../../../data/usecases/deleteClient.usecase";
import { ClientRepository } from "../../../infra/repositories/client.repository";

export function deleteClientUsecaseFactory() {
  const clientRepository = new ClientRepository();
  return new DeleteClientUsecase(clientRepository);
}
