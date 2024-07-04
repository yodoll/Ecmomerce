import { useRoutes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import ProductsDetail from "./pages/ProductsDetail";
import SignIn from "./pages/SingIn";
import SignUp from "./pages/SignUp";
import Aboutus from "./components/Aboutus";
import Blog from "./components/Blog";
import Cart from "./pages/Cart";
import AdminLayouts from "./layouts/AdminLayouts";
import AdminProductList from "./pages/admin/product/list";
import AdminAddProduct from "./pages/admin/product/add";
import AdminEditProduct from "./pages/admin/product/edit";

const routeConfig = [
  {
    path: "/",
    element: <Homepage />,
  },
  { path: "/aboutus", element: <Aboutus /> },
  { path: "/cart", element: <Cart /> },
  { path: "/blog", element: <Blog /> },
  {path: "/admin", element: <AdminLayouts></AdminLayouts>, children: [
    {path: "products", element: <AdminProductList></AdminProductList>},
    {path: "products/add", element: <AdminAddProduct></AdminAddProduct>},
    {path: "products/edit/:id", element: <AdminEditProduct></AdminEditProduct>},
  ]},
  { path: "/product/:id", element: <ProductsDetail /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
];

function App() {
  const routes = useRoutes(routeConfig);

  return <main>{routes}</main>;
}

export default App;