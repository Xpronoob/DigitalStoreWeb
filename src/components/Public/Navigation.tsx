import { useDarkMode } from '@/hooks/useDarkMode';
import { AuthService } from '@/services/auth.service';
import { useCartStore } from '@/states/cartStore.states';
import { useUserStore } from '@/states/userStore.states';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

function Navigation({ toggleCart }: { toggleCart: () => void }) {
  const [theme, toggleTheme] = useDarkMode();

  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const cartStore = useCartStore();

  const clearCart = useCartStore((state) => state.clearCart);
  const clearUser = useUserStore((state) => state.clearUser);

  const { items } = cartStore;

  const queryClient = useQueryClient();

  const onLogout = async () => {
    try {
      await AuthService.getLogout();
    } catch (error) {
      console.error('Error in logout:', error);
    } finally {
      clearUser();
      clearCart();
      localStorage.removeItem('user-auth');
      localStorage.removeItem('cart-items');
      await useUserStore.persist.clearStorage();
      await useCartStore.persist.clearStorage();
      await queryClient.invalidateQueries({ queryKey: ['/cart/getCart'] });

      navigate('/login');
    }
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
      <button onClick={toggleCart} className='btn-cart'>
        🛒
        {items?.length > 0 ? `(${items.length})` : `(0)`}
      </button>
    </div>
  );
}

export default Navigation;
