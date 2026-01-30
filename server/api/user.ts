import { createUserSchema } from "../schemas/user.schema";
import { validateBody } from "../utils/validation";

export default defineEventHandler(async (event) => {
  const data = await validateBody(createUserSchema)(event);

  return data;
});
