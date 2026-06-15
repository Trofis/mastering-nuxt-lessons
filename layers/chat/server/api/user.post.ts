import { createUserSchema } from "../schemas/user.schema";
import { pipeBody } from "../utils/validation";

export default defineEventHandler(async (event) => {
  // Pipe body data
  const data = await pipeBody(createUserSchema, event);

  return data;
});
