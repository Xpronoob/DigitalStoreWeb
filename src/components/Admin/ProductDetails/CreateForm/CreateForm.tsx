import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormValues,
  schema
} from '@/components/Admin/ProductDetails/CreateForm/createFormModel';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/ui/InputForm';
import { useMutation } from '@tanstack/react-query';
import { ProductDetailsService } from '@/services/Admin/productDetails.service';

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
      details_name: '',
      description: '',
      price: 0,
      quantity: 0,
      active: false,
      color: '',
      size: '',
      storage: '',
      devices: ''
    }
  });

  const mutation = useMutation({
    mutationFn: (newProductDetails: FormValues) =>
      ProductDetailsService.create(newProductDetails),
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
        fieldKey='product_id'
        control={control}
        label='Product'
        type='number'
        error={errors.product_id}
      />

      <InputForm<FormValues>
        fieldKey='details_name'
        control={control}
        label='Product Detail'
        type='text'
        error={errors.details_name}
      />

      <InputForm<FormValues>
        fieldKey='description'
        control={control}
        label='Product Description'
        type='text'
        error={errors.description}
      />

      <InputForm<FormValues>
        fieldKey='price'
        control={control}
        label='Price'
        type='number'
        error={errors.price}
      />

      <InputForm<FormValues>
        fieldKey='quantity'
        control={control}
        label='Quantity'
        type='number'
        error={errors.quantity}
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
        type='text'
        error={errors.color}
      />

      <InputForm<FormValues>
        fieldKey='size'
        control={control}
        label='Size'
        type='text'
        error={errors.size}
      />

      <InputForm<FormValues>
        fieldKey='storage'
        control={control}
        label='Storage'
        type='text'
        error={errors.storage}
      />

      <InputForm<FormValues>
        fieldKey='devices'
        control={control}
        label='Devices'
        type='text'
        error={errors.devices}
      />

      <button type='submit' disabled={mutation.isPending}>
        Submit
      </button>

      {mutation.isPending && <p>Cargando...</p>}
      {customError && !mutation.isSuccess && <p>{customError}</p>}
      {mutation.isSuccess && <p>Detalle del producto creado con éxito!</p>}
    </form>
  );
};

export default CreateForm;
