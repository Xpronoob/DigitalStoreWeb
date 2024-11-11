import { z } from 'zod';

export const schema = z.object({
  product_options_name: z.string().optional(),
  active: z.boolean().optional(),
  color: z.boolean().optional(),
  size: z.boolean().optional(),
  storage: z.boolean().optional(),
  devices: z.boolean().optional()
});

export type FormValues = z.infer<typeof schema>;
