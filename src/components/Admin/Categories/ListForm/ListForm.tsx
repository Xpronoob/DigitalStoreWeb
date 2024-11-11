import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CategoryService } from '@/services/Admin/category.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { categoryModel } from '@/models/category.models';

const getCategories = async () => {
  try {
    const response = await CategoryService.getAll();
    return response.categories;
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
    queryKey: ['/admin/categories'],
    queryFn: getCategories
  });

  const mutation = useMutation({
    mutationFn: (id: number) => CategoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/admin/categories'] });
    },
    onError: (error: any) => {
      setCustomError(error.response?.data?.message || 'Ha ocurrido un error');
    }
  });

  const deleteCategory = (id: number) => {
    mutation.mutate(id);
  };

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error: {query.error.message}</div>;

  return (
    <>
      <div>Categories List</div>
      {query?.data?.map((category: categoryModel) => (
        <div key={category.category_id} className='p-2'>
          <p>{category.category_name}</p>
          {/* <p>{category.active ? 'Active' : 'Inactive'}</p> */}
          <button
            onClick={() =>
              navigate(`/admin/categories/edit/${category.category_id}`)
            }
            className='p-1'
          >
            Editar
          </button>
          <button
            onClick={() => deleteCategory(category.category_id!)}
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
