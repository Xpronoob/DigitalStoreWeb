import { z } from 'zod';

export const schema = z
  .object({
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
      .min(6, 'La contraseña debe de tener al menos 6 caracteres'),
    confirmPassword: z
      .string({
        required_error: 'La confirmación de contraseña es obligatoria'
      })
      .min(6, 'La confirmación debe tener al menos 6 caracteres'),
    active: z.boolean({ required_error: 'El estado es obligatorio' }),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    phone_number: z
      .string()
      .min(6, 'El número de teléfono es inválido')
      .optional(),
    img: z.string().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas son diferentes',
    path: ['confirmPassword']
  });

export type FormValues = z.infer<typeof schema>;
