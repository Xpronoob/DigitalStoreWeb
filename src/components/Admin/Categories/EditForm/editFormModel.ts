import { z } from 'zod';

export const schema = z.object({
  category_name: z.string().optional(),
  img: z.string().optional(),
  active: z.boolean().optional()
});

export type FormValues = z.infer<typeof schema>;
