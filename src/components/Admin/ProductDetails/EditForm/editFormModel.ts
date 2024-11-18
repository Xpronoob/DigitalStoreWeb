import { z } from 'zod';

export const schema = z.object({
  product_id: z.number().int().optional(),
  details_name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  active: z.boolean().optional(),
  color: z.string().optional(),
  size: z.string().optional(),
  storage: z.string().optional(),
  devices: z.string().optional()
});

export type FormValues = z.infer<typeof schema>;
