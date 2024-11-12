import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/ui/InputForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { FormValues, schema } from './editFormModel';
import { CategoryService } from '@/services/Admin/category.service';
import { typeMapper } from '@/utils/typeMapper';

const EditForm = () => {
  const { id } = useParams<{ id: string }>();
  const [customError, setCustomError] = useState('');

  const {
    data: category,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['/admin/categories', id],
    queryFn: () => CategoryService.getById(id!),
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
      category_name: '',
      img: '',
      active: false
    }
  });

  useEffect(() => {
    if (category) {
      reset(typeMapper(category));
    }
  }, [category, reset]);

  const mutation = useMutation({
    mutationFn: (updatedCategory: FormValues) =>
      CategoryService.update(id!, updatedCategory),
    onSuccess: () => {
      // navigate(`/admin/categories/${id}`);
    },
    onError: (error: any) => {
      setCustomError(error.response?.data?.message || 'Ha ocurrido un error');
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    mutation.mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error al cargar la categoría.</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm<FormValues>
        fieldKey='category_name'
        control={control}
        label='Category Name'
        type='text'
        error={errors.category_name}
        // disabled={true}
      />
      <InputForm<FormValues>
        fieldKey='img'
        control={control}
        label='Image'
        type='text'
        error={errors.img}
        // disabled={true}
      />
      <InputForm<FormValues>
        fieldKey='active'
        control={control}
        label='Status'
        type='checkbox'
        error={errors.active}
        // disabled={true}
      />
      <button type='submit' disabled={mutation.isPending}>
        {mutation.isPending ? 'Actualizando...' : 'Actualizar'}
      </button>

      {customError && <p>{customError}</p>}
      {mutation.isSuccess && <p>Categoría actualizada con éxito!</p>}
    </form>
  );
};

export default EditForm;
