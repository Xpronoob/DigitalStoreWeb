import { z } from 'zod';

export const schema = z.object({
  product_name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  stock: z.number().optional(),
  img: z.string().optional(),
  active: z.boolean().optional()
});

export type FormValues = z.infer<typeof schema>;
