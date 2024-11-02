import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValues, schema } from './registerFormModel';
import InputForm from '@/components/ui/InputForm';
import { AuthService } from '@/services/auth.service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/states/userStore.states';

const RegisterForm = () => {
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
    AuthService.postRegister(data)
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
      <InputForm<FormValues>
        fieldKey='confirmPassword'
        control={control}
        label='Confirm Password'
        type='password'
        error={errors.confirmPassword}
      />
      <InputForm<FormValues>
        fieldKey='first_name'
        control={control}
        label='First Name'
        type='text'
        error={errors.first_name}
      />
      <InputForm<FormValues>
        fieldKey='last_name'
        control={control}
        label='Last Name'
        type='text'
        error={errors.last_name}
      />
      <InputForm<FormValues>
        fieldKey='phone_number'
        control={control}
        label='Phone Number'
        type='text'
        error={errors.phone_number}
      />
      <InputForm<FormValues>
        fieldKey='img'
        control={control}
        label='User Image'
        type='text'
        error={errors.img}
      />
      <button type='submit'> Submit</button>
      {customError && <p>{customError}</p>}
    </form>
  );
};

export default RegisterForm;
