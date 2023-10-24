import { Client } from "../../domain/entities/client.entity";
import { IDeleteUsecase } from "../../domain/usecases/delete";
import { NotFoundError } from "../../utils/errors/notFound.error";
import { IDeleteRepository } from "../protocols/delete.repository";

export class DeleteClientUsecase implements IDeleteUsecase {
  constructor(private readonly clientRepository: IDeleteRepository<Client>) {}
  public async execute(id: string): Promise<{ message: string }> {
    const client = await this.clientRepository.loadById(id);
    if (!client) throw new NotFoundError("client");
    await this.clientRepository.delete(id);
    return { message: "Client deleted successfully" };
  }
}
