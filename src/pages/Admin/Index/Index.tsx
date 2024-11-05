import { Link } from 'react-router-dom';

function AdminIndex() {
  return (
    <>
      <h2 className='text-lg font-bold'> Users </h2>
      <div className='flex gap-1 p-1'>
        <Link to='/admin/users'>List</Link>
        <Link to='/admin/users/create'>Create</Link>
      </div>
      <h2 className='text-lg font-bold'> Categories </h2>
      <h2 className='text-lg font-bold'> Products </h2>
    </>
  );
}
export default AdminIndex;
