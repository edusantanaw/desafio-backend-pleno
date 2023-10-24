import { Address } from "../../domain/entities/address.entity";

export interface IAddressService {
  loadByCep: (cep: string) => Promise<Address | null>;
}
