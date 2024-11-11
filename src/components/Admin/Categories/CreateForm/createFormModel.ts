import { z } from 'zod';

export const schema = z.object({
  category_name: z
    .string({
      required_error: 'El nombre es obligatorio'
    })
    .min(1, 'El nombre es obligatorio'),
  img: z.string().optional(),
  active: z.boolean({ required_error: 'El estado es obligatorio' })
});

export type FormValues = z.infer<typeof schema>;
