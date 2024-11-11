import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductService } from '@/services/Admin/product.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { productModel } from '@/models/product.models';

const getProduct = async () => {
  try {
    const response = await ProductService.getAll();
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
    queryKey: ['/admin/products'],
    queryFn: getProduct
  });

  const mutation = useMutation({
    mutationFn: (id: number) => ProductService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/admin/products'] });
    },
    onError: (error: any) => {
      setCustomError(error.response?.data?.message || 'Ha ocurrido un error');
    }
  });

  const deleteProduct = (id: number) => {
    mutation.mutate(id);
  };

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error: {query.error.message}</div>;

  return (
    <>
      <div>Products List</div>
      {query?.data?.map((products: productModel) => (
        <div key={products.product_id} className='p-2'>
          <p>Category: {products.category_id}</p>
          <p>Type: {products.product_options_id}</p>

          <p>Name: {products.product_name}</p>
          <p>Description: {products.description}</p>
          <p>Status: {products.active ? 'Active' : 'Inactive'}</p>
          <p>Price: {products.price}</p>
          <p>Stock: {products.stock}</p>
          <p>Image: {products.img}</p>

          <button
            onClick={() =>
              navigate(`/admin/products/edit/${products.product_id}`)
            }
            className='p-1'
          >
            Editar
          </button>
          <button
            onClick={() => deleteProduct(products.product_id!)}
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
