interface IHttpStatus<T> {
  statusCode: number;
  body: T;
}
