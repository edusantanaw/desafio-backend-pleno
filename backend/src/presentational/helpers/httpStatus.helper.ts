function HttpStatus<T>(status: number, body: T): IHttpStatus<T> {
  return {
    statusCode: status,
    body,
  };
}

function ExceptionError(error: unknown) {
  const { message } = error as Error;
  return HttpStatus(400, message);
}

const Ok = <T>(body: T) => HttpStatus(200, body);
const Created = <T>(body: T) => HttpStatus(201, body);
const NotFound = () => HttpStatus(404, "not found");
const BadRequest = <T>(body: T) => HttpStatus(400, body);
const ServerError = () => HttpStatus(500, "Internal server error!");

export {
  HttpStatus,
  Ok,
  Created,
  NotFound,
  BadRequest,
  ExceptionError,
  ServerError,
};
