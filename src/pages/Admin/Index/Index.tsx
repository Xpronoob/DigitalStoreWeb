import { Link } from 'react-router-dom';

function AdminIndex() {
  return (
    <>
      <h2 className='text-lg font-bold'> Users </h2>
      <div className='flex gap-1 p-1'>
        <Link to='/admin/users'>List</Link>
        <Link to='/admin/users/create'>Create</Link>
      </div>
      <h2 className='text-lg font-bold'> Roles </h2>
      <div className='flex gap-1 p-1'>
        <Link to='/admin/roles'>List</Link>
        <Link to='/admin/roles/create'>Create</Link>
      </div>
      <h2 className='text-lg font-bold'> Categories </h2>
      <div className='flex gap-1 p-1'>
        <Link to='/admin/categories'>List</Link>
        <Link to='/admin/categories/create'>Create</Link>
      </div>
      <h2 className='text-lg font-bold'> Product Types </h2>
      <div className='flex gap-1 p-1'>
        <Link to='/admin/productOptions'>List</Link>
        <Link to='/admin/productOptions/create'>Create</Link>
      </div>
      <h2 className='text-lg font-bold'> Products </h2>
      <div className='flex gap-1 p-1'>
        <Link to='/admin/products'>List</Link>
        <Link to='/admin/products/create'>Create</Link>
      </div>
      <h2 className='text-lg font-bold'> Product Details </h2>
      <div className='flex gap-1 p-1'>
        <Link to='/admin/productDetails'>List</Link>
        <Link to='/admin/productDetails/create'>Create</Link>
      </div>
    </>
  );
}
export default AdminIndex;
