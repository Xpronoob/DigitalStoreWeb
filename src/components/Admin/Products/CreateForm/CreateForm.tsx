import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormValues,
  schema
} from '@/components/Admin/Products/CreateForm/createFormModel';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/ui/InputForm';
import { useMutation } from '@tanstack/react-query';
import { ProductService } from '@/services/Admin/product.service';

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
      category_id: 0,
      product_options_id: 0,
      product_name: '',
      price: 0,
      active: false,
      description: '',
      stock: 0,
      img: ''
    }
  });

  const mutation = useMutation({
    mutationFn: (newProduct: FormValues) => ProductService.create(newProduct),
    onSuccess: (data) => {
      // setUser(data.data);
      // navigate('/admin/users/:data.user_id');
    },
    onError: (error: any) => {
      setCustomError(error.response?.data?.message || 'Ha ocurrido un error');
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    formData.price = Number(formData.price);
    formData.stock = Number(formData.stock);
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm<FormValues>
        fieldKey='category_id'
        control={control}
        label='Category'
        type='number'
        error={errors.category_id}
      />

      <InputForm<FormValues>
        fieldKey='product_options_id'
        control={control}
        label='Product Type'
        type='number'
        error={errors.product_options_id}
      />

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
        Submit
      </button>

      {mutation.isPending && <p>Cargando...</p>}
      {customError && !mutation.isSuccess && <p>{customError}</p>}
      {mutation.isSuccess && <p>Producto creado con éxito!</p>}
    </form>
  );
};

export default CreateForm;
