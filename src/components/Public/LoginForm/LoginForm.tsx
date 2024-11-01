import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValues, schema } from './loginFormModel';
import InputForm from '@/components/ui/InputForm';

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm<FormValues>
        fieldKey='email'
        control={control}
        label='Email'
        type='email'
        error={errors.email}
      />
      <InputForm<FormValues>
        fieldKey='password'
        control={control}
        label='Password'
        type='password'
        error={errors.password}
      />
      <button type='submit'> Submit</button>
    </form>
  );
};

export default LoginForm;
