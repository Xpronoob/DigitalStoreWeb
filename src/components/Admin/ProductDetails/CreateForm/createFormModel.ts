import { z } from 'zod';

export const schema = z.object({
  product_id: z
    .number({
      required_error: 'El producto es obligatorio'
    })
    .int(),
  details_name: z.string({
    required_error: 'El nombre del detalle del producto es obligatorio'
  }),
  description: z.string().optional(),
  price: z.number({
    required_error: 'El precio del detalle del producto es obligatorio'
  }),
  quantity: z.number().optional(),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => file?.size! || 0 <= 100 * 1024 * 1024,
      'El tamaño del archivo no puede exceder los 100 MB'
    ),
  active: z.boolean({
    required_error: 'El estado del detalle del producto es obligatorio'
  }),
  color: z.string().optional(),
  size: z.string().optional(),
  storage: z.string().optional(),
  devices: z.string().optional()
});

export type FormValues = z.infer<typeof schema>;
