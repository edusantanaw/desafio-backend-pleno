import { Client, ClientEntity } from "../../domain/entities/client.entity";
import ClientModel from "../schemas/client.schema";

interface filters extends IPagination {
  name?: string;
}

export class ClientRepository {
  public async loadByEmail(email: string) {
    const item = await ClientModel.findOne({ email: email });
    return item;
  }

  public async create(data: Client) {
    const item = new ClientModel(data);
    await item.save();
    return item;
  }

  public async loadById(id: string) {
    const item = await ClientModel.findOne({ id, deleted: 0 }).select(
      "-_id -__v"
    );
    return item;
  }

  public async load(data: filters) {
    let nameFilter = data.name
      ? { name: { $regex: data.name, $options: "i" }, deleted: 0 }
      : { deleted: 0 };
    const items = await ClientModel.find(nameFilter)
      .select("id name -_id")
      .skip(data.offset)
      .limit(data.limit);
    const total = await ClientModel.count(nameFilter);
    return {
      total,
      data: items,
    };
  }

  public async delete(id: string) {
    const client = await ClientModel.findOne({ id });
    client!.deleted = 1;
    const updatedClient = new ClientModel(client);
    updatedClient.save();
  }
}
