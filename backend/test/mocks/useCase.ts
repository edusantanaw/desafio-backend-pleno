export class UsecaseMock {
  input: any = null;
  throws: boolean = false;
  res: null | any = { id: "string" };
  public async execute(data: any) {
    this.input = data;
    if (this.throws) throw new Error("expected_error");
    return this.res;
  }
}
