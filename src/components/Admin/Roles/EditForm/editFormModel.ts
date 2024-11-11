import { z } from 'zod';

export const schema = z.object({
  role_name: z
    .string({
      required_error: 'El nombre es obligatorio'
    })
    .min(1, 'El nombre es obligatorio')
});

export type FormValues = z.infer<typeof schema>;
