import { useUserStore } from '@/states/userStore.states';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  privateValidation: boolean;
}

export const AuthGuard = ({ privateValidation }: Props) => {
  const userState = useUserStore((state) => state.user);
  return userState ? (
    privateValidation ? (
      <Outlet />
    ) : (
      <Navigate replace to={'/register'} />
    )
  ) : (
    <Navigate replace to={'/login'} />
  );
};

export default AuthGuard;
