import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductDetailsService } from '@/services/Admin/productDetails.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { productDetailsModel } from '@/models/product-details.models';

const getProductDetails = async () => {
  try {
    const response = await ProductDetailsService.getAll();
    // console.log(response);
    return response.productDetails;
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
    queryKey: ['/admin/productDetails'],
    queryFn: getProductDetails
  });

  const mutation = useMutation({
    mutationFn: (id: number) => ProductDetailsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/admin/productDetails'] });
    },
    onError: (error: any) => {
      setCustomError(error.response?.data?.message || 'Ha ocurrido un error');
    }
  });

  const deleteProductDetails = (id: number) => {
    mutation.mutate(id);
  };

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error: {query.error.message}</div>;

  return (
    <>
      <div>ProductDetails List</div>
      {query?.data?.map((productDetails: productDetailsModel) => (
        <div key={productDetails.product_details_id} className='p-2'>
          <p>Product: {productDetails.product_id}</p>
          <p>Name: {productDetails.details_name}</p>
          <p>Description: {productDetails.description}</p>
          <p>Price: {productDetails.price}</p>
          <p>Quantity: {productDetails.quantity}</p>
          <p>Status: {productDetails.active ? 'Active' : 'Inactive'}</p>
          <p>Color: {productDetails.color}</p>
          <p>Size: {productDetails.size}</p>
          <p>Storage: {productDetails.storage}</p>
          <p>Devices: {`${productDetails.devices}`}</p>
          <p>Image: </p>
          <img className='max-w-44' src={productDetails.img}></img>

          <button
            onClick={() =>
              navigate(
                `/admin/productDetails/edit/${productDetails.product_details_id}`
              )
            }
            className='p-1'
          >
            Editar
          </button>
          <button
            onClick={() =>
              deleteProductDetails(productDetails.product_details_id!)
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
