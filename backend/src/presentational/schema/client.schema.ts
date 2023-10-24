import * as z from "zod";

export const ClientSchema = z.object({
  name: z.string({ required_error: "name is required!" }),
  email: z
    .string({ required_error: "email is required!" })
    .email({ message: "email is invalid!" }),
  phone: z.string({ required_error: "phone is required!" }),
  cep: z.string({ required_error: "cep is required!" }),
});

