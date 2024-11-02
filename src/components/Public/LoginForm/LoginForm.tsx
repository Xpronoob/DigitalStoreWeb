import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValues, schema } from './loginFormModel';
import InputForm from '@/components/ui/InputForm';
import { AuthService } from '@/services/auth.service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/states/userStore.states';

const LoginForm = () => {
  const [customError, setCustomError] = useState('');

  const navigate = useNavigate();

  const setUser = useUserStore((state) => state.setUser);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    AuthService.postLogin(data)
      .then((response) => {
        setUser(response.user);
        navigate('/');
      })
      .catch((err) => {
        setCustomError(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <>
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
      {customError && <p>{customError}</p>}
    </>
  );
};

export default LoginForm;
