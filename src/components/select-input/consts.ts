import { z } from "zod";

export const selectBaseItemSchema = z.object({
  id: z.number(),
  label: z.string(),
});
