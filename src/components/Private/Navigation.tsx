import { useDarkMode } from '@/hooks/useDarkMode';
import { AuthService } from '@/services/auth.service';
import { useCartStore } from '@/states/cartStore.states';
import { useUserStore } from '@/states/userStore.states';
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const [theme, toggleTheme] = useDarkMode();

  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const cart = useCartStore((state) => state.items);

  const clearUser = useUserStore((state) => state.clearUser);
  const clearCart = useCartStore((state) => state.clearCart);

  const onLogout = () => {
    AuthService.getLogout().then(() => {
      clearUser();
      clearCart();
      localStorage.removeItem('user-auth');
      localStorage.removeItem('cart-items');
      useUserStore.persist.clearStorage();
      useCartStore.persist.clearStorage();
      navigate('/login');
    });
  };

  return (
    <div className='dark:bg-slate-900 dark:text-gray-200 '>
      <button onClick={toggleTheme}>{theme === 'dark' ? '🌙' : '🌞'}</button>
      <Link
        to='/'
        className='text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
      >
        Home
      </Link>
      {!user ? (
        <>
          <Link
            to='/login'
            className='text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
          >
            Login
          </Link>
          <Link
            to='/register'
            className='text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
          >
            Register
          </Link>
        </>
      ) : (
        <>
          <Link
            to='/private/profile'
            className='text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
          >
            Profile
          </Link>
          <button onClick={onLogout}>Logout</button>
        </>
      )}

      {user?.roles?.includes('admin') && (
        <Link
          to='/admin'
          className='text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
        >
          Admin
        </Link>
      )}
    </div>
  );
}

export default Navigation;
