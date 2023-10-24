import { LoadByIdUsecase } from "../../../data/usecases/loadById.usecase";
import { ClientRepository } from "../../../infra/repositories/client.repository";

export function loadClientByIdUsecaseFactory() {
  const clientRepository = new ClientRepository();
  return new LoadByIdUsecase(clientRepository);
}
