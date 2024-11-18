import { useDarkMode } from '@/hooks/useDarkMode';
import { AuthService } from '@/services/auth.service';
import { ProductService } from '@/services/Public/product.service';
import { useCartStore } from '@/states/cartStore.states';
import { useUserStore } from '@/states/userStore.states';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

function Navigation({ toggleCart }: { toggleCart: () => void }) {
  const [theme, toggleTheme] = useDarkMode();

  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const cart = useCartStore((state) => state.items);

  const clearCart = useCartStore((state) => state.clearCart);
  const clearUser = useUserStore((state) => state.clearUser);

  const getCart = async () => {
    try {
      if (user?.accessToken) {
        const response = await ProductService.getCart();
        return response.cartItems;
      } else {
        return cart;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // todo: create endpoint for count cart items
  const cartQuery = useQuery({
    queryKey: ['/cart/getCart'],
    queryFn: getCart,
    enabled: !!user // Only fetch if the user is logged in
  });

  if (cartQuery.isLoading) return <div>Loading...</div>;
  if (cartQuery.isError) return <div>Error: {cartQuery.error.message}</div>;

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
      cartQuery.refetch();
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
        {cartQuery.data?.length > 0
          ? `(${cartQuery.data?.length})`
          : cart.length}
      </button>
    </div>
  );
}

export default Navigation;
