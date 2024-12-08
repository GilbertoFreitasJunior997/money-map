import { z, ZodSchema } from "zod";

export type UseZodFormOptions<TSchema extends ZodSchema> = {
  schema: TSchema;
  defaultValues?: z.infer<TSchema>;
};
