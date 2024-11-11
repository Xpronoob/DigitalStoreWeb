import { z } from 'zod';

export const schema = z.object({
  category_id: z
    .number({
      required_error: 'La categoría es obligatoria'
    })
    .int(),
  product_options_id: z.number({
    required_error: 'El tipo de producto es obligatorio'
  }),
  product_name: z.string({
    required_error: 'El nombre es obligatorio'
  }),
  description: z.string().optional(),
  price: z.number({ required_error: 'El precio es obligatorio' }),
  stock: z.number().optional(),
  img: z.string().optional(),
  active: z.boolean({ required_error: 'El estado es obligatorio' })
});

export type FormValues = z.infer<typeof schema>;
