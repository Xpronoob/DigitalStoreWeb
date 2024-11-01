import { useDarkMode } from '@/hooks/useDarkMode';
import { Link } from 'react-router-dom';

function Navigation() {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <div className='dark:bg-slate-900 dark:text-gray-200 '>
      <button onClick={toggleTheme}>{theme === 'dark' ? '🌙' : '🌞'}</button>

      <Link
        to='/'
        className='text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
      >
        Home
      </Link>
      <Link
        to='login'
        className='text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
      >
        Login
      </Link>
      <Link
        to='register'
        className='text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
      >
        Register
      </Link>
    </div>
  );
}

export default Navigation;
