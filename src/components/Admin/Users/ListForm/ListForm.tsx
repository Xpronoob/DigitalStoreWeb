import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userModel } from '@/models/role.models';
import { UserService } from '@/services/Admin/user.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const getUsers = async () => {
  try {
    const response = await UserService.getAll();
    return response.users;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const ListForm = () => {
  const [customError, setCustomError] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const query = useQuery({ queryKey: ['/admin/users'], queryFn: getUsers });

  const mutation = useMutation({
    mutationFn: (id: number) => UserService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/admin/users'] });
    },
    onError: (error: any) => {
      setCustomError(error.response?.data?.message || 'Ha ocurrido un error');
    }
  });

  const deleteUser = (id: number) => {
    mutation.mutate(id);
  };

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error: {query.error.message}</div>;

  return (
    <>
      <div>Users List</div>
      {query?.data?.map((user: userModel) => (
        <div key={user.user_id} className='p-2'>
          <p>{user.first_name}</p>
          <p>{user.last_name}</p>
          <p>{user.email}</p>
          <p>{user.active ? 'Active' : 'Inactive'}</p>
          <button
            onClick={() => navigate(`/admin/users/edit/${user.user_id}`)}
            className='p-1'
          >
            Editar
          </button>
          <button onClick={() => deleteUser(user.user_id!)} className='p-1'>
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
