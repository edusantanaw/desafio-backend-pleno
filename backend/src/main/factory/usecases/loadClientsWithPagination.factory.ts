import { LoadWithPaginationUsecase } from "../../../data/usecases/loadWithPagination.usecase";
import { ClientRepository } from "../../../infra/repositories/client.repository";

export function loadClientsWithPaginationFactory() {
  return new LoadWithPaginationUsecase(new ClientRepository(), "clients");
}
