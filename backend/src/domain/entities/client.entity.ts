import { Address } from "./address.entity";
import { randomUUID } from "node:crypto";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  deleted?: number;
  address: Address;
}

type data = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
};

export class ClientEntity {
  private id: string;
  private name: string;
  private email: string;
  private phone: string;
  private address: Address;

  constructor(data: data) {
    this.id = data?.id ?? randomUUID();
    this.name = data.name;
    this.phone = data.phone;
    this.email = data.email;
    this.address = data.address;
  }

  public get getClient() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      email: this.email,
      address: this.address,
    };
  }
}
