import { userModel } from '@/models/user.models';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/states/userStore.states';
import { useQuery } from '@/hooks/useQuery';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormValues,
  schema
} from '@/components/Admin/Users/CreateForm/createFormModel';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/ui/InputForm';

const CreateForm = () => {
  const [customError, setCustomError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const [bodyData, setBodyData] = useState<userModel | undefined>(undefined);

  const { data, loading, error } = useQuery<userModel>(
    '/admin/users',
    'POST',
    bodyData,
    isSubmitted
  );

  useEffect(() => {
    if (data) {
      // setUser(data);
      navigate('/admin/users');
    } else if (error) {
      setCustomError(error);
      console.log(error);
    }
  }, [data, error, setUser, navigate]);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  });

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    setBodyData(formData);
    setIsSubmitted(true);
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
        fieldKey='active'
        control={control}
        label='Status'
        type='checkbox'
        error={errors.active}
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
      {loading && <p>Cargando...</p>}
      {isSubmitted && customError && <p>{customError}</p>}
    </form>
  );
};

export default CreateForm;
