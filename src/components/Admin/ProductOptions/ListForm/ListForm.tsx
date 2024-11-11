import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductOptionService } from '@/services/Admin/productOptions.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { productOptionsModel } from '@/models/product-options.models';

const getProductOptions = async () => {
  try {
    const response = await ProductOptionService.getAll();
    return response.products;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const ListForm = () => {
  const [customError, setCustomError] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ['/admin/productOptions'],
    queryFn: getProductOptions
  });

  const mutation = useMutation({
    mutationFn: (id: number) => ProductOptionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/admin/productOptions'] });
    },
    onError: (error: any) => {
      setCustomError(error.response?.data?.message || 'Ha ocurrido un error');
    }
  });

  const deleteProductOptions = (id: number) => {
    mutation.mutate(id);
  };

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error: {query.error.message}</div>;

  return (
    <>
      <div>ProductOptions List</div>
      {query?.data?.map((productOptions: productOptionsModel) => (
        <div key={productOptions.product_options_id} className='p-2'>
          <p>Name: {productOptions.product_options_name}</p>
          <p>Status: {productOptions.active ? 'Active' : 'Inactive'}</p>
          <p>Color: {productOptions.color ? 'Active' : 'Inactive'}</p>
          <p>Size: {productOptions.size ? 'Active' : 'Inactive'}</p>
          <p>Storage: {productOptions.storage ? 'Active' : 'Inactive'}</p>
          <p>Devices: {productOptions.devices ? 'Active' : 'Inactive'}</p>

          <button
            onClick={() =>
              navigate(
                `/admin/productOptions/edit/${productOptions.product_options_id}`
              )
            }
            className='p-1'
          >
            Editar
          </button>
          <button
            onClick={() =>
              deleteProductOptions(productOptions.product_options_id!)
            }
            className='p-1'
          >
            Eliminar
          </button>
        </div>
      ))}
      <div>
        {customError && <span className='text-red-500'>{customError}</span>}
      </div>
    </>
  );
};

export default ListForm;
