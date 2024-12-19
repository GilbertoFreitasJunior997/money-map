import { ZodSchema, z } from "zod";

export type UseZodFormOptions<TSchema extends ZodSchema> = {
  schema: TSchema;
  defaultValues?: Partial<z.infer<TSchema>>;
};
