import { z } from 'zod';

export const schema = z.object({
  product_options_name: z.string({
    required_error: 'El nombre es obligatorio'
  }),
  active: z.boolean().optional(),
  color: z.boolean().optional(),
  size: z.boolean().optional(),
  storage: z.boolean().optional(),
  devices: z.boolean().optional()
});

export type FormValues = z.infer<typeof schema>;
