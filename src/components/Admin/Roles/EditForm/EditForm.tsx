import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/ui/InputForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { FormValues, schema } from './editFormModel';
import { RoleService } from '@/services/Admin/role.service';
import { typeMapper } from '../../../../utils/typeMapper';

const EditForm = () => {
  const { id } = useParams<{ id: string }>();
  const [customError, setCustomError] = useState('');

  const {
    data: role,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['/admin/roles', id],
    queryFn: () => RoleService.getById(id!),
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
      role_name: ''
    }
  });

  useEffect(() => {
    if (role) {
      reset(typeMapper(role));
    }
  }, [role, reset]);

  const mutation = useMutation({
    mutationFn: (updatedRole: FormValues) =>
      RoleService.update(id!, updatedRole),
    onSuccess: () => {
      // navigate(`/admin/roles/${id}`);
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
        fieldKey='role_name'
        control={control}
        label='Role Name'
        type='text'
        error={errors.role_name}
        // disabled={true}
      />
      <button type='submit' disabled={mutation.isPending}>
        {mutation.isPending ? 'Actualizando...' : 'Actualizar'}
      </button>

      {customError && <p>{customError}</p>}
      {mutation.isSuccess && <p>Role actualizado con éxito!</p>}
    </form>
  );
};

export default EditForm;
