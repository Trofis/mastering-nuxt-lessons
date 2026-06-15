import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email("Not an email valid"),
  password: z.string("Password format incorrect").min(8),
  name: z.string("Name not valid").min(2).max(50),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
