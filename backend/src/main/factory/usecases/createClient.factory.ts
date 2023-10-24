import { CreateClientUsecase } from "../../../data/usecases/createClient.usecase";
import { ClientRepository } from "../../../infra/repositories/client.repository";
import { cepServiceGatewayFactory } from "../gateway/cepServiceGateway.factory";

export function createClientUsecaseFactory() {
  const clientRepository = new ClientRepository();
  const addressService = cepServiceGatewayFactory();
  return new CreateClientUsecase(clientRepository, addressService);
}
