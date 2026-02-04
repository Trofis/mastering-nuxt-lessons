import type { z, ZodObject } from "zod";
import type { H3Event } from "h3";

export const pipeBody = async <T extends ZodObject>(
  schema: T,
  event: H3Event,
): Promise<z.infer<T>> => {
  const result = await readValidatedBody(event, (body) =>
    schema.safeParse(body),
  );

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad request",
      message: "Invalid body",
      data: JSON.parse(result.error.message),
    });
  }

  return result.data;
};
