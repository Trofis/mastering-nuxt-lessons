import type { z, ZodSchema } from "zod";
import type { H3Event } from "h3";

export const validateBody = <T extends ZodSchema>(schema: T) => {
  return async (event: H3Event): Promise<z.infer<T>> => {
    let body;
    try {
      body = await readBody(event);
    } catch (error) {
      console.error(error);
      throw createError({
        statusCode: 400,
        message: "Invalid body",
      });
    }

    const result = schema.safeParse(body);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        message: "Validation failed",
        data: result.error,
      });
    }

    return result.data;
  };
};

export const validateQuery = <T extends ZodSchema>(schema: T) => {
  return (event: H3Event): z.infer<T> => {
    const query = getQuery(event);

    const result = schema.safeParse(query);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        message: "Invalid query parameters",
        data: result.error,
      });
    }

    return result.data;
  };
};
