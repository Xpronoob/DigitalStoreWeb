import { useUserStore } from '@/states/userStore.states';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  roles: string[];
}

export const RoleGuard = ({ roles }: Props) => {
  const userState = useUserStore((state) => state.user);

  return userState?.roles?.some((role) => roles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate replace to={'/login'} />
  );
};

export default RoleGuard;
