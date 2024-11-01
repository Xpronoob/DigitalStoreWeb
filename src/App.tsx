import { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import RoutesWithNotFound from './utils/RoutesWithNotFound.utility';

const Index = lazy(() => import('./pages/Public/Index/Index'));
const Login = lazy(() => import('./pages/Public/Login/Login'));
const Register = lazy(() => import('./pages/Public/Register/Register'));

function App() {
  return (
    <Suspense fallback={<>Cargando...</>}>
      <BrowserRouter>
        <RoutesWithNotFound>
          {/* PUBLIC */}
          <Route path='/' element={<PublicLayout />}>
            <Route index element={<Index />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
          </Route>
        </RoutesWithNotFound>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
