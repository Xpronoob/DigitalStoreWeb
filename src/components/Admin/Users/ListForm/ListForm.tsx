import { useQuery } from '@tanstack/react-query';
import { userModel } from '@/models/user.models';
import { UserService } from '@/services/Admin/user.service';
import { useNavigate } from 'react-router-dom';

const getUsers = async () => {
  try {
    const response = await UserService.getAll();
    // console.log(response.users);
    return response.users;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const ListForm = () => {
  const navigate = useNavigate();
  const query = useQuery({ queryKey: ['/admin/users'], queryFn: getUsers });

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
          <button onClick={() => navigate(`/admin/users/edit/${user.user_id}`)}>
            Editar
          </button>
        </div>
      ))}
    </>
  );
};

export default ListForm;
