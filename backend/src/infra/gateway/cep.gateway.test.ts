import { Address } from "../../domain/entities/address.entity";
import { ICacheRepository } from "../repositories/cache";
import { ApiCepReponse, IApiCepService } from "../service/apiCep.service";
import { IViaCepApiService, ViaCepReponse } from "../service/viaCep.service";
import { CepGateway } from "./cep.gateway";

class CacheMock implements ICacheRepository<Address> {
  items: Address[] = [];
  keyInput: string | null = null;
  getItemRes: Address | null = null;
  setKey: string | null = null;
  setData: Address | null = null;
  public async getItem(key: string): Promise<Address | null> {
    this.keyInput = key;
    return this.getItemRes;
  }

  public async setItem(key: string, data: Address): Promise<string | null> {
    this.setKey = key;
    this.setData = data;
    return JSON.stringify(data);
  }
}

class ApiServiceMock implements IApiCepService {
  cepInput: string | null = null;
  cepRes: ApiCepReponse | null = null;
  public async loadByCep(cep: string): Promise<ApiCepReponse | null> {
    this.cepInput = cep;
    return this.cepRes;
  }
}
class ViaCepServiceMock implements IViaCepApiService {
  cepInput: string | null = null;
  cepRes: ViaCepReponse | null = null;
  public async loadByCep(cep: string): Promise<ViaCepReponse | null> {
    this.cepInput = cep;
    return this.cepRes;
  }
}

function makeSut() {
  const cacheRepository = new CacheMock();
  const apiServiceMock = new ApiServiceMock();
  const viaCepServiceMock = new ViaCepServiceMock();
  const cepGateway = new CepGateway(
    apiServiceMock,
    viaCepServiceMock,
    cacheRepository
  );
  return { cepGateway, cacheRepository, apiServiceMock, viaCepServiceMock };
}
const viaCep: ViaCepReponse = {
  cep: "123",
  bairro: "123",
  complemento: "123",
  ddd: "123",
  gia: "123",
  ibge: "123",
  localidade: "123",
  logradouro: "123",
  siafi: "123",
  uf: "123",
};

const apiCep = {
  address: "123",
  city: "123",
  code: "123",
  district: "123",
  state: "123",
  status: "123",
};

describe("cepGateway", () => {
  test("should call cacheRepositoy with correct value", async () => {
    const { cacheRepository, cepGateway } = makeSut();
    await cepGateway.loadByCep("123");
    expect(cacheRepository.keyInput).toBe("123");
  });

  test("should return addess if cached is found", async () => {
    const { cacheRepository, cepGateway } = makeSut();
    cacheRepository.getItemRes = { cep: "123" } as Address;
    const res = await cepGateway.loadByCep("123");
    expect(res).toEqual({ cep: "123" });
  });

  test("should call viaCep service if no cached is found ", async () => {
    const { cepGateway, viaCepServiceMock } = makeSut();
    viaCepServiceMock.cepRes = viaCep;
    await cepGateway.loadByCep("123");
    expect(viaCepServiceMock.cepInput).toBe("123");
  });

  test("should call apiCep service if viaCep failed ", async () => {
    const { apiServiceMock, cepGateway } = makeSut();
    await cepGateway.loadByCep("123");
    expect(apiServiceMock.cepInput).toBe("123");
  });

  test("should call cached input if via cep is found ", async () => {
    const { viaCepServiceMock, cepGateway, cacheRepository } = makeSut();
    viaCepServiceMock.cepRes = viaCep;
    const data = {
      cep: "123",
      city: "123",
      neighborhood: "123",
      state: "123",
      street: "123",
    } as Address;
    const response = await cepGateway.loadByCep("123");
    expect(cacheRepository.setKey).toBe("123");
    expect(cacheRepository.setData).toEqual(data);
    expect(response).toEqual(data);
  });
  test("should call cached input if api cep is found ", async () => {
    const { apiServiceMock, cepGateway, cacheRepository } = makeSut();
    apiServiceMock.cepRes = apiCep;
    const data = {
      cep: "123",
      city: "123",
      neighborhood: "123",
      state: "123",
      street: "123",
    } as Address;
    const response = await cepGateway.loadByCep("123");
    expect(cacheRepository.setKey).toBe("123");
    expect(cacheRepository.setData).toEqual(data);
    expect(response).toEqual(data);
  });

  test("should return null if no cep is found", async () => {
    const { cepGateway } = makeSut();
    const response = await cepGateway.loadByCep("123");
    expect(response).toBe(null);
  });
});
