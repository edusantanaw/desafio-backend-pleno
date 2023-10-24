interface IController<In> {
  handle: (data: In) => Promise<IHttpStatus<unknown>>;
}
