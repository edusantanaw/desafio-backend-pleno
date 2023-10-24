import { ILoadByIdUsecase } from "../../domain/usecases/loadById";
import { ILoadByIdRepository } from "../protocols/loadById.repository";

export class LoadByIdUsecase<Out> implements ILoadByIdUsecase<Out> {
  constructor(private readonly repository: ILoadByIdRepository<Out>) {}
  public async execute(id: string): Promise<Out | null> {
    const item = await this.repository.loadById(id);
    if (!item) return null;
    return item;
  }
}
