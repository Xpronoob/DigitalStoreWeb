import { z } from 'zod';

export const schema = z.object({
  email: z
    .string()
    .email('Correo inválido')
    .min(1, 'El correo es obligatorio')
    .optional(),
  password: z
    .string()
    .min(6, 'La contraseña debe de tener al menos 6 caracteres')
    .optional(),
  active: z.boolean().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone_number: z
    .string()
    .min(6, 'El número de teléfono es inválido')
    .optional(),
  img: z.string().optional()
});

export type FormValues = z.infer<typeof schema>;
