import { ClientEntity } from "../../domain/entities/client.entity";
import {
  ICreateClientData,
  ICreateClientUsecase,
} from "../../domain/usecases/createClient";
import { AlreadyExistsError } from "../../utils/errors/alreadyExists.error";
import { NotFoundError } from "../../utils/errors/notFound.error";
import { IAddressService } from "../protocols/addressService.service";
import { IClientRepository } from "../protocols/createClient.repository";

export class CreateClientUsecase implements ICreateClientUsecase {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly addressService: IAddressService
  ) {}
  public async execute(data: ICreateClientData): Promise<any> {
    const verifyEmailAlreadyUsed = await this.clientRepository.loadByEmail(
      data.email
    );
    if (verifyEmailAlreadyUsed) throw new AlreadyExistsError("email");
    const address = await this.addressService.loadByCep(data.cep);
    if (!address) throw new NotFoundError("address");
    const client = new ClientEntity({ ...data, address: address });
    const createClient = await this.clientRepository.create(client.getClient);
    return createClient;
  }
}
