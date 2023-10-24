import { IAddressService } from "../../data/protocols/addressService.service";
import { Address } from "../../domain/entities/address.entity";
import { ICacheRepository } from "../repositories/cache";
import { IApiCepService } from "../service/apiCep.service";
import { IViaCepApiService } from "../service/viaCep.service";

export class CepGateway implements IAddressService {
  constructor(
    private readonly apiCep: IApiCepService,
    private readonly viaCep: IViaCepApiService,
    private readonly cepCache: ICacheRepository<Address>
  ) {}

  public async loadByCep(cep: string): Promise<Address | null> {
    let maybeAddress = await this.cepCache.getItem(cep);
    if (maybeAddress) return maybeAddress;
    if (!maybeAddress) maybeAddress = await this.getViaCep(cep);
    if (!maybeAddress) maybeAddress = await this.getApiCep(cep);
    if (maybeAddress) await this.cepCache.setItem(cep, maybeAddress);
    return maybeAddress;
  }

  private async getApiCep(cep: string): Promise<Address | null> {
    const item = await this.apiCep.loadByCep(cep);
    if (!item) return null;
    return {
      cep,
      city: item.city,
      neighborhood: item.district,
      state: item.state,
      street: item.address,
    };
  }

  private async getViaCep(cep: string): Promise<Address | null> {
    const item = await this.viaCep.loadByCep(cep);
    if (!item) return null;
    return {
      cep,
      city: item.localidade,
      state: item.uf,
      neighborhood: item.bairro,
      street: item.logradouro,
    };
  }
}
