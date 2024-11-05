import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/ui/InputForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserService } from '@/services/Admin/user.service';
import { useParams } from 'react-router-dom';
import { FormValues, schema } from './editFormModel';

const EditForm = () => {
  const { id } = useParams<{ id: string }>();
  const [customError, setCustomError] = useState('');

  const {
    data: user,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['/admin/users', id],
    queryFn: () => UserService.getById(id!),
    enabled: !!id
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      active: false,
      first_name: '',
      last_name: '',
      phone_number: '',
      img: ''
    }
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const mutation = useMutation({
    mutationFn: (updatedUser: FormValues) =>
      UserService.update(id!, updatedUser),
    onSuccess: () => {
      // navigate(`/admin/users/${id}`);
    },
    onError: (error: any) => {
      setCustomError(error.response?.data?.message || 'Ha ocurrido un error');
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    mutation.mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error al cargar el usuario.</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm<FormValues>
        fieldKey='email'
        control={control}
        label='Email'
        type='email'
        error={errors.email}
        disabled={true}
      />
      {/* <InputForm<FormValues>
        fieldKey='password'
        control={control}
        label='Password'
        type='password'
        error={errors.password}
      /> */}
      <InputForm<FormValues>
        fieldKey='active'
        control={control}
        label='Status'
        type='checkbox'
        error={errors.active}
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
      <button type='submit' disabled={mutation.isPending}>
        {mutation.isPending ? 'Actualizando...' : 'Actualizar'}
      </button>

      {customError && <p>{customError}</p>}
      {mutation.isSuccess && <p>Usuario actualizado con éxito!</p>}
    </form>
  );
};

export default EditForm;
