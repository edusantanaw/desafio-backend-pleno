import { ClientRepositoryInMemory } from "../../../test/mocks/clientRepository.memory";
import { Address } from "../../domain/entities/address.entity";
import { AlreadyExistsError } from "../../utils/errors/alreadyExists.error";
import { NotFoundError } from "../../utils/errors/notFound.error";
import { CreateClientUsecase } from "./createClient.usecase";

class AddressServiceMock {
  notFound: boolean = false;
  input: string | null = null;
  async loadByCep(cep: string): Promise<Address | null> {
    this.input = cep;
    if (this.notFound) return null;
    return {
      cep,
      city: "any",
      neighborhood: "any",
      state: "any",
      street: "any",
    };
  }
}

function makeSut() {
  const clientRepository = new ClientRepositoryInMemory();
  const addressService = new AddressServiceMock();
  const createClientUsecase = new CreateClientUsecase(
    clientRepository,
    addressService
  );
  return { createClientUsecase, clientRepository, addressService };
}

describe("CreateClientUsecase", () => {
  test("should call clientRepository.loadByEmail with correct values!", async () => {
    const { createClientUsecase, clientRepository } = makeSut();
    await createClientUsecase.execute({
      cep: "123456789",
      email: "email@email.com",
      name: "test",
      phone: "123456789",
    });
    expect(clientRepository.emailInput).toBe("email@email.com");
  });

  test("should throw if email already exists!", async () => {
    const { createClientUsecase, clientRepository } = makeSut();
    const client = {
      cep: "123456789",
      email: "exist_email@email.com",
      name: "test",
      phone: "123456789",
      id: "123",
    };
    const { cep, ...rest } = client;
    clientRepository.items = [
      {
        ...rest,
        address: {
          cep: "123456789",
          city: "sp",
          neighborhood: "sp",
          state: "sp",
          street: "sp",
        },
      },
    ];
    const response = createClientUsecase.execute(client);
    expect(response).rejects.toEqual(new AlreadyExistsError("email"));
  });

  test("should call addressService with correct value!", async () => {
    const { createClientUsecase, addressService } = makeSut();
    await createClientUsecase.execute({
      cep: "123456789",
      email: "exist_email@email.com",
      name: "test",
      phone: "123456789",
    });
    expect(addressService.input).toBe("123456789");
  });

  test("should throw if address id not found!", () => {
    const { createClientUsecase, addressService } = makeSut();
    addressService.notFound = true;
    const response = createClientUsecase.execute({
      cep: "123456789",
      email: "exist_email@email.com",
      name: "test",
      phone: "123456789",
    });
    expect(response).rejects.toEqual(new NotFoundError("address"));
  });

  test("should call clientRepository.create with correct values!", async () => {
    const { createClientUsecase, clientRepository } = makeSut();
    const client = {
      cep: "123456789",
      email: "exist_email@email.com",
      name: "test",
      phone: "123456789",
      id: "123",
    };
    const { cep, ...rest } = client;
    await createClientUsecase.execute(client);
    expect(clientRepository.client).toEqual({
      ...rest,
      address: {
        cep: client.cep,
        city: "any",
        neighborhood: "any",
        state: "any",
        street: "any",
      },
    });
  });

  test("should return an new client if is create with sucess!", async () => {
    const { createClientUsecase } = makeSut();
    const client = {
      cep: "123456789",
      email: "exist_email@email.com",
      name: "test",
      phone: "123456789",
      id: "123",
    };
    const { cep, ...rest } = client;
    const response = await createClientUsecase.execute(client);
    expect(response).toEqual({
      ...rest,
      address: {
        cep: client.cep,
        city: "any",
        neighborhood: "any",
        state: "any",
        street: "any",
      },
    });
  });
});
