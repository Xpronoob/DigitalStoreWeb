import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RoleService } from '@/services/Admin/role.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { roleModel } from '@/models/role.models';

const getRoles = async () => {
  try {
    const response = await RoleService.getAll();
    return response.roles;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const ListForm = () => {
  const [customError, setCustomError] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const query = useQuery({ queryKey: ['/admin/roles'], queryFn: getRoles });

  const mutation = useMutation({
    mutationFn: (id: number) => RoleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/admin/roles'] });
    },
    onError: (error: any) => {
      setCustomError(error.response?.data?.message || 'Ha ocurrido un error');
    }
  });

  const deleteRole = (id: number) => {
    mutation.mutate(id);
  };

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error: {query.error.message}</div>;

  return (
    <>
      <div>Roles List</div>
      {query?.data?.map((role: roleModel) => (
        <div key={role.role_id} className='p-2'>
          <p>{role.role_name}</p>
          {/* <p>{role.active ? 'Active' : 'Inactive'}</p> */}
          <button
            onClick={() => navigate(`/admin/roles/edit/${role.role_id}`)}
            className='p-1'
          >
            Editar
          </button>
          <button onClick={() => deleteRole(role.role_id!)} className='p-1'>
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
