import { ZodObject } from "zod";

export interface ISchemaValidator<T> {
  isValid: (data: T) => string | null;
}

export class SchemaValidator<T> implements ISchemaValidator<T> {
  private schema: ZodObject<any>;
  constructor(schema: ZodObject<any>) {
    this.schema = schema;
  }

  public isValid(data: T) {
    const isSchemaValid = this.schema.safeParse(data);
    if (isSchemaValid.success) {
      return null;
    }
    return isSchemaValid.error.errors[0].message;
  }
}
