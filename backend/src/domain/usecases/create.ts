export interface ICreateUsecase<In, Out> {
  execute: (data: In) => Promise<Out>;
}
