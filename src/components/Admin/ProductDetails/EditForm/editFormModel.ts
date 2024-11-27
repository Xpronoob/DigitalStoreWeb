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
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => file?.size! || 0 <= 100 * 1024 * 1024,
      'El tamaño del archivo no puede exceder los 100 MB'
    ),
  devices: z.string().optional()
});

export type FormValues = z.infer<typeof schema>;
