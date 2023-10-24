import { LoadByidController } from "../../../presentational/controllers/loadById.controller";
import { loadClientByIdUsecaseFactory } from "../usecases/loadClientById.factory";

export function loadClientByIdControllerFactory() {
  return new LoadByidController(loadClientByIdUsecaseFactory());
}
