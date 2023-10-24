export class AlreadyExistsError extends Error {
  constructor(item: string) {
    super(`${item} already exists!`);
  }
}
