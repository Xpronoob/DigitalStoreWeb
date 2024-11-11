import { z } from 'zod';

export const schema = z.object({
  product_id: z
    .number({
      required_error: 'El producto es obligatorio'
    })
    .int(),
  detail_name: z.string({
    required_error: 'El nombre del detalle del producto es obligatorio'
  }),
  description: z.string().optional(),
  price: z.number({
    required_error: 'El precio del detalle del producto es obligatorio'
  }),
  quantity: z.number().optional(),
  active: z.boolean({
    required_error: 'El estado del detalle del producto es obligatorio'
  }),
  color: z.string().optional(),
  size: z.string().optional(),
  storage: z.string().optional(),
  devices: z.string().optional()
});

export type FormValues = z.infer<typeof schema>;
