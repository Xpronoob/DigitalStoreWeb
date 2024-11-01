import { z } from 'zod';

export const schema = z.object({
  email: z
    .string({
      required_error: 'El nombre es obligatorio'
    })
    .email('Correo inválido')
    .min(1, 'El correo es obligatorio'),
  password: z
    .string({
      required_error: 'La contraseña es obligatoria'
    })
    .min(6, 'La contraseña debe de tener al menos 6 caracteres')
});

export type FormValues = z.infer<typeof schema>;
