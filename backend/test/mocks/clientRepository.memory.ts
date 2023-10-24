import { Client } from "../../src/domain/entities/client.entity";

export class ClientRepositoryInMemory {
  items: Client[] = [];
  client: Client | null = null;
  emailInput: string | null = null;
  loadByIdInput: string | undefined;
  deletedInput: string | undefined;
  loadInput?: IPagination;
  loadRes: any = {};

  public async create(data: Client) {
    this.client = data;
    this.items.push(data);
    return data;
  }

  public async loadByEmail(email: string) {
    this.emailInput = email;
    const item = this.items.filter((i) => i.email === email);
    if (item.length > 0) return item[0];
    return null;
  }

  public async loadById(id: string) {
    this.loadByIdInput = id;
    const item = this.items.find((i) => i.id === id);
    return item ?? null;
  }

  public async delete(id: string) {
    this.deletedInput = id;
  }

  public async load(data: IPagination) {
    this.loadInput = data;
    return this.loadRes;
  }
}
