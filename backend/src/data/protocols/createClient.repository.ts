import { Client } from "../../domain/entities/client.entity";

export interface IClientRepository {
  create: (data: Client) => Promise<Client>;
  loadByEmail: (email: string) => Promise<Client | null>;
}
