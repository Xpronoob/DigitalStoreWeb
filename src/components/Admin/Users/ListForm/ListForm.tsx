import {
  useQuery
  // useMutation,
  // useQueryClient,
  // QueryClient,
  // QueryClientProvider
} from '@tanstack/react-query';

// import { useQuery as useAxios } from '../../../hooks/useQuery';
// import { userModel } from '@/models/user.models';
import { AxiosAdapter } from '@/lib/axios.adapter';
import { userModel } from '@/models/user.models';

const getUsers = async ({ queryKey }: { queryKey: string[] }) => {
  const url = queryKey[0];
  try {
    const response = await AxiosAdapter.getRequest(url);
    // console.log(response.users);
    return response.users;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const ListForm = () => {
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
          <p>{user.active}</p>
        </div>
      ))}
    </>
  );
};

export default ListForm;
