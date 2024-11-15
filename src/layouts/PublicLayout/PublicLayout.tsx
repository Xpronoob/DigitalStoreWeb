import { useState } from 'react';
import Navigation from '@/components/Public/Navigation';
import { Outlet } from 'react-router-dom';
import ShoppingCart from '@/components/Public/ShoppingCart/ShoppingCart';

function PublicLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <>
      <Navigation toggleCart={toggleCart} />
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-200'>
        <Outlet />
      </div>
      {isCartOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-40'
          onClick={toggleCart}
        ></div>
      )}
      <ShoppingCart isCartOpen={isCartOpen} toggleCart={toggleCart} />
    </>
  );
}

export default PublicLayout;
