import { DeleteController } from "../../../presentational/controllers/delete.controller";
import { deleteClientUsecaseFactory } from "../usecases/deleteClient.facotry";

export function deleteClientControllerFactory() {
  return new DeleteController(deleteClientUsecaseFactory());
}
