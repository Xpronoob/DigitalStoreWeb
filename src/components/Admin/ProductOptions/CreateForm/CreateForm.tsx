import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormValues,
  schema
} from '@/components/Admin/ProductOptions/CreateForm/createFormModel';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/ui/InputForm';
import { useMutation } from '@tanstack/react-query';
import { ProductOptionService } from '@/services/Admin/productOptions.service';

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
      product_options_name: '',
      active: false,
      color: false,
      size: false,
      storage: false,
      devices: false
    }
  });

  const mutation = useMutation({
    mutationFn: (newProductOptions: FormValues) =>
      ProductOptionService.create(newProductOptions),
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
        fieldKey='product_options_name'
        control={control}
        label='Product Type Name'
        type='text'
        error={errors.product_options_name}
      />

      <InputForm<FormValues>
        fieldKey='active'
        control={control}
        label='Status'
        type='checkbox'
        error={errors.active}
      />

      <InputForm<FormValues>
        fieldKey='color'
        control={control}
        label='Color'
        type='checkbox'
        error={errors.color}
      />

      <InputForm<FormValues>
        fieldKey='size'
        control={control}
        label='Size'
        type='checkbox'
        error={errors.size}
      />

      <InputForm<FormValues>
        fieldKey='storage'
        control={control}
        label='Storage'
        type='checkbox'
        error={errors.storage}
      />

      <InputForm<FormValues>
        fieldKey='devices'
        control={control}
        label='Devices'
        type='checkbox'
        error={errors.devices}
      />

      <button type='submit' disabled={mutation.isPending}>
        Submit
      </button>

      {mutation.isPending && <p>Cargando...</p>}
      {customError && !mutation.isSuccess && <p>{customError}</p>}
      {mutation.isSuccess && <p>Tipo de producto creado con éxito!</p>}
    </form>
  );
};

export default CreateForm;
