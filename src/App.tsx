import { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import RoutesWithNotFound from './utils/RoutesWithNotFound.utility';
import { AuthGuard } from './guards/auth.guard';
import RoleGuard from './guards/role.guard';
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import Checkout from './components/Public/Checkout/Checkout';

// const PublicLayout = lazy(() => import('./layouts/PublicLayout/PublicLayout'));
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

//ADMIN USERS
const AdminUsers = lazy(() => import('./pages/Admin/Users/Users'));
const AdminCreateUser = lazy(() => import('./pages/Admin/Users/Create'));
const EditUserForm = lazy(
  () => import('./components/Admin/Users/EditForm/EditForm')
);

//ADMIN ROLES
const AdminRoles = lazy(() => import('./pages/Admin/Roles/Roles'));
const AdminCreateRole = lazy(() => import('./pages/Admin/Roles/Create'));
const EditRoleForm = lazy(
  () => import('./components/Admin/Roles/EditForm/EditForm')
);

//ADMIN CATEGORIES
const AdminCategories = lazy(
  () => import('./pages/Admin/Categories/Categories')
);
const AdminCreateCategory = lazy(
  () => import('./pages/Admin/Categories/Create')
);
const EditCategoryForm = lazy(
  () => import('./components/Admin/Categories/EditForm/EditForm')
);

//ADMIN PRODUCT OPTIONS
const AdminProductOptions = lazy(
  () => import('./pages/Admin/ProductOptions/ProductOptions')
);
const AdminCreateProductOptions = lazy(
  () => import('./pages/Admin/ProductOptions/Create')
);
const EditProductOptionsForm = lazy(
  () => import('./components/Admin/ProductOptions/EditForm/EditForm')
);

//ADMIN PRODUCTS
const AdminProducts = lazy(() => import('./pages/Admin/Products/Products'));
const AdminCreateProduct = lazy(() => import('./pages/Admin/Products/Create'));
const EditProductsForm = lazy(
  () => import('./components/Admin/Products/EditForm/EditForm')
);

//ADMIN PRODUCT DETAILS
const AdminProductDetails = lazy(
  () => import('./pages/Admin/ProductDetails/ProductDetails')
);
const AdminCreateProductDetails = lazy(
  () => import('./pages/Admin/ProductDetails/Create')
);
const EditProductDetailsForm = lazy(
  () => import('./components/Admin/ProductDetails/EditForm/EditForm')
);

// CLIENT

// PRODUCTS
// getProductById
// getAllProducts
// getProductsByCategory

// CART ITEMS
// addProductToCart
// removeProductFromCart
// getCart

// Checkout
// Pay

// ORDERS
// createOrder
// getOrders
// getOrderById

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
            <Route path={'/checkout'} element={<Checkout />} />
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
              <Route
                element={<RoleGuard roles={['dev', 'admin', 'admin_users']} />}
              >
                <Route path={'/admin/users'} element={<AdminUsers />} />
                <Route
                  path={'/admin/users/create'}
                  element={<AdminCreateUser />}
                />
                <Route
                  path='/admin/users/edit/:id'
                  element={<EditUserForm />}
                />
              </Route>

              {/* ADMIN ROLES */}
              <Route
                element={<RoleGuard roles={['dev', 'admin', 'admin_roles']} />}
              >
                <Route path={'/admin/roles'} element={<AdminRoles />} />
                <Route
                  path={'/admin/roles/create'}
                  element={<AdminCreateRole />}
                />
                <Route
                  path='/admin/roles/edit/:id'
                  element={<EditRoleForm />}
                />
              </Route>

              {/* ADMIN CATEGORIES */}
              <Route
                element={
                  <RoleGuard roles={['dev', 'admin', 'admin_categories']} />
                }
              >
                <Route
                  path={'/admin/categories'}
                  element={<AdminCategories />}
                />
                <Route
                  path={'/admin/categories/create'}
                  element={<AdminCreateCategory />}
                />
                <Route
                  path='/admin/categories/edit/:id'
                  element={<EditCategoryForm />}
                />
              </Route>

              {/* ADMIN PRODUCT OPTIONS */}
              <Route
                element={
                  <RoleGuard
                    roles={['dev', 'admin', 'admin_product_options']}
                  />
                }
              >
                <Route
                  path={'/admin/productOptions'}
                  element={<AdminProductOptions />}
                />
                <Route
                  path={'/admin/productOptions/create'}
                  element={<AdminCreateProductOptions />}
                />
                <Route
                  path='/admin/productOptions/edit/:id'
                  element={<EditProductOptionsForm />}
                />
              </Route>

              {/* ADMIN PRODUCTS */}
              <Route
                element={
                  <RoleGuard roles={['dev', 'admin', 'admin_products']} />
                }
              >
                <Route path={'/admin/products'} element={<AdminProducts />} />
                <Route
                  path={'/admin/products/create'}
                  element={<AdminCreateProduct />}
                />
                <Route
                  path='/admin/products/edit/:id'
                  element={<EditProductsForm />}
                />
              </Route>

              {/* ADMIN PRODUCT DETAILS */}
              <Route
                element={
                  <RoleGuard
                    roles={['dev', 'admin', 'admin_product_details']}
                  />
                }
              >
                <Route
                  path={'/admin/productDetails'}
                  element={<AdminProductDetails />}
                />
                <Route
                  path={'/admin/productDetails/create'}
                  element={<AdminCreateProductDetails />}
                />
                <Route
                  path='/admin/productDetails/edit/:id'
                  element={<EditProductDetailsForm />}
                />
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
