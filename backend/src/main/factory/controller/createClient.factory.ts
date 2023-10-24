import { CreateController } from "../../../presentational/controllers/create.controller";
import { SchemaValidator } from "../../../presentational/helpers/schemaValidator.helper";
import { ClientSchema } from "../../../presentational/schema/client.schema";
import { createClientUsecaseFactory } from "../usecases/createClient.factory";

export function createClientControllerFactory() {
  const schemaValidator = new SchemaValidator(ClientSchema);
  const clientUsecase = createClientUsecaseFactory();
  return new CreateController(schemaValidator, clientUsecase);
}
