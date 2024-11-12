import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/ui/InputForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { FormValues, schema } from './editFormModel';
import { ProductDetailsService } from '@/services/Admin/productDetails.service';
import { typeMapper } from '@/utils/typeMapper';

const EditForm = () => {
  const { id } = useParams<{ id: string }>();
  const [customError, setCustomError] = useState('');

  const {
    data: productDetails,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['/admin/productDetails', id],
    queryFn: () => ProductDetailsService.getById(id!),
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
      detail_name: '',
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

  useEffect(() => {
    if (productDetails) {
      reset(typeMapper(productDetails));
    }
  }, [productDetails, reset]);

  const mutation = useMutation({
    mutationFn: (updatedProductDetails: FormValues) =>
      ProductDetailsService.update(id!, updatedProductDetails),
    onSuccess: () => {
      // navigate(`/admin/productDetails/${id}`);
    },
    onError: (error: any) => {
      setCustomError(error.response?.data?.message || 'Ha ocurrido un error');
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    mutation.mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error al cargar el detalle del producto.</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm<FormValues>
        fieldKey='product_id'
        control={control}
        label='Product'
        type='number'
        error={errors.product_id}
        disabled={true}
      />

      <InputForm<FormValues>
        fieldKey='detail_name'
        control={control}
        label='Product Detail'
        type='text'
        error={errors.detail_name}
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
        {mutation.isPending ? 'Actualizando...' : 'Actualizar'}
      </button>
      {customError && <p>{customError}</p>}
      {mutation.isSuccess && <p>Detalle del producto actualizado con éxito!</p>}
    </form>
  );
};

export default EditForm;
