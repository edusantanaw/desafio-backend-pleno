import { Client } from "../entities/client.entity";

export interface ICreateClientUsecase {
  execute: (data: ICreateClientData) => Promise<Client>;
}

export type ICreateClientData = {
  name: string;
  email: string;
  phone: string;
  cep: string;
};
