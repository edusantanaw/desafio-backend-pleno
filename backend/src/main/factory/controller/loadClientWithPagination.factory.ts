import { LoadWithPaginationController } from "../../../presentational/controllers/loadWithPagination.controller";
import { loadClientsWithPaginationFactory } from "../usecases/loadClientsWithPagination.factory";

export function loadClientWithPaginationController() {
  return new LoadWithPaginationController(loadClientsWithPaginationFactory());
}
