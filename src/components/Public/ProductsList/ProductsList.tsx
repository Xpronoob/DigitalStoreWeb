import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { productModel } from '@/models/product.models';
import { ProductService } from '@/services/Public/product.service';

const getAllProducts = async () => {
  try {
    const response = await ProductService.getAllProducts();
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const ProductList = () => {
  // const [customError, setCustomError] = useState('');
  // const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const query = useQuery({
    queryKey: ['/shop/getAllProducts'],
    queryFn: getAllProducts
  });

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error: {query.error.message}</div>;

  return (
    <>
      <div>Products List</div>
      {query?.data?.map((products: productModel) => (
        <div key={products.product_id} className='p-2'>
          <p>Category: {products.categories?.category_name}</p>
          <p>Name: {products.product_name}</p>
          <p>Description: {products.description}</p>
          <p>Price: {products.price}</p>
          <p>Stock: {products.stock}</p>
          <p>Image: {products.img}</p>
        </div>
      ))}
      <div>
        {/* {customError && <span className='text-red-500'>{customError}</span>} */}
      </div>
    </>
  );
};

export default ProductList;
