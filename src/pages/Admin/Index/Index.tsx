import { Link } from 'react-router-dom';

function AdminIndex() {
  return (
    <>
      <div>Admin Index</div>
      <Link to='/admin/users'>List</Link>
      <Link to='/admin/users/create'>Create</Link>
    </>
  );
}
export default AdminIndex;
