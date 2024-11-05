import { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import RoutesWithNotFound from './utils/RoutesWithNotFound.utility';
import { AuthGuard } from './guards/auth.guard';
import RoleGuard from './guards/role.guard';
import EditForm from './components/Admin/Users/EditForm/EditForm';

// LAYOUTS
const PublicLayout = lazy(() => import('./layouts/PublicLayout/PublicLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout/AdminLayout'));
const PrivateLayout = lazy(
  () => import('./layouts/PrivateLayout/PrivateLayout')
);

// PUBLIC
const PublicIndex = lazy(() => import('./pages/Public/Index/Index'));
const Login = lazy(() => import('./pages/Public/Login/Login'));
const Register = lazy(() => import('./pages/Public/Register/Register'));

// PRIVATE
const PrivateIndex = lazy(() => import('./pages/Private/Index/Index'));
const Profile = lazy(() => import('./pages/Private/Profile/Profile'));

// ADMIN
const AdminIndex = lazy(() => import('./pages/Admin/Index/Index'));
const AdminUsers = lazy(() => import('./pages/Admin/Users/Users'));
const AdminCreateUser = lazy(() => import('./pages/Admin/Users/Create'));

function App() {
  return (
    <Suspense fallback={<>Cargando...</>}>
      <BrowserRouter>
        <RoutesWithNotFound>
          {/* PUBLIC */}
          <Route path='/' element={<PublicLayout />}>
            <Route index element={<PublicIndex />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
          </Route>
          {/* AUTHENTICATED */}
          <Route element={<AuthGuard privateValidation={true} />}>
            <Route path='/private' element={<PrivateLayout />}>
              <Route index element={<PrivateIndex />} />
              <Route path={'/private/profile'} element={<Profile />} />
            </Route>
          </Route>

          {/* ADMIN */}
          <Route element={<RoleGuard roles={['dev', 'admin']} />}>
            <Route path={'/admin'} element={<AdminLayout />}>
              <Route index element={<AdminIndex />} />
              {/* ADMIN USERS */}
              <Route element={<RoleGuard roles={['admin_users']} />}>
                <Route path={'/admin/users'} element={<AdminUsers />} />
                <Route
                  path={'/admin/users/create'}
                  element={<AdminCreateUser />}
                />
                <Route path='/admin/users/edit/:id' element={<EditForm />} />
              </Route>
            </Route>
            {/* <Route path={'/admin/*'} element={<h1>Admin</h1>} /> */}
          </Route>
        </RoutesWithNotFound>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
