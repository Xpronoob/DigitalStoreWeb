import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormValues,
  schema
} from '@/components/Admin/Categories/CreateForm/createFormModel';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/ui/InputForm';
import { useMutation } from '@tanstack/react-query';
import { CategoryService } from '@/services/Admin/category.service';

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
      category_name: '',
      img: '',
      active: false
    }
  });

  const mutation = useMutation({
    mutationFn: (newCategory: FormValues) =>
      CategoryService.create(newCategory),
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
        fieldKey='category_name'
        control={control}
        label='Category Name'
        type='text'
        error={errors.category_name}
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
        Submit
      </button>

      {mutation.isPending && <p>Cargando...</p>}
      {customError && <p>{customError}</p>}
      {mutation.isSuccess && <p>Categoría creada con éxito!</p>}
    </form>
  );
};

export default CreateForm;
