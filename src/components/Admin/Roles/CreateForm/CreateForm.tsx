import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormValues,
  schema
} from '@/components/Admin/Roles/CreateForm/createFormModel';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/ui/InputForm';
import { useMutation } from '@tanstack/react-query';
import { RoleService } from '@/services/Admin/role.service';

const CreateForm = () => {
  const [customError, setCustomError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      role_name: ''
    }
  });

  const mutation = useMutation({
    mutationFn: (newRole: FormValues) => RoleService.create(newRole),
    onSuccess: (data) => {
      // setUser(data.data);
      // navigate('/admin/users/:data.user_id');
    },
    onError: (error: any) => {
      setCustomError(error.response?.data?.message || 'Ha ocurrido un error');
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm<FormValues>
        fieldKey='role_name'
        control={control}
        label='Role Name'
        type='text'
        error={errors.role_name}
      />

      <button type='submit' disabled={mutation.isPending}>
        Submit
      </button>

      {mutation.isPending && <p>Cargando...</p>}
      {customError && <p>{customError}</p>}
      {mutation.isSuccess && <p>Role creado con éxito!</p>}
    </form>
  );
};

export default CreateForm;
