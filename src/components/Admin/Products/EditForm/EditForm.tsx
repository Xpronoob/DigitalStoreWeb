import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/ui/InputForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { FormValues, schema } from './editFormModel';
import { ProductService } from '@/services/Admin/product.service';
import { toNumberFields } from '../../../../utils/toNumberFields';

const EditForm = () => {
  const { id } = useParams<{ id: string }>();
  const [customError, setCustomError] = useState('');

  const {
    data: products,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['/admin/products', id],
    queryFn: () => ProductService.getById(id!),
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
      product_name: '',
      price: 0,
      active: false,
      description: '',
      stock: 0,
      img: ''
    }
  });

  useEffect(() => {
    if (products) {
      reset(toNumberFields(products));
    }
  }, [products, reset]);

  const mutation = useMutation({
    mutationFn: (updatedProduct: FormValues) =>
      ProductService.update(id!, updatedProduct),
    onSuccess: () => {
      // navigate(`/admin/products/${id}`);
    },
    onError: (error: any) => {
      setCustomError(error.response?.data?.message || 'Ha ocurrido un error');
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    mutation.mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error al cargar el producto.</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm<FormValues>
        fieldKey='product_name'
        control={control}
        label='Product Name'
        type='text'
        error={errors.product_name}
      />

      <InputForm<FormValues>
        fieldKey='active'
        control={control}
        label='Status'
        type='checkbox'
        error={errors.active}
      />

      <InputForm<FormValues>
        fieldKey='description'
        control={control}
        label='Descripción'
        type='text'
        error={errors.description}
      />

      <InputForm<FormValues>
        fieldKey='price'
        control={control}
        label='Precio'
        type='number'
        error={errors.price}
      />

      <InputForm<FormValues>
        fieldKey='stock'
        control={control}
        label='Stock'
        type='number'
        error={errors.stock}
      />

      <InputForm<FormValues>
        fieldKey='img'
        control={control}
        label='Image'
        type='text'
        error={errors.img}
      />
      <button type='submit' disabled={mutation.isPending}>
        {mutation.isPending ? 'Actualizando...' : 'Actualizar'}
      </button>
      {customError && <p>{customError}</p>}
      {mutation.isSuccess && <p>Producto actualizado con éxito!</p>}
    </form>
  );
};

export default EditForm;
