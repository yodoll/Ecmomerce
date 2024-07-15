import { useRoutes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import ProductsDetail from "./pages/ProductsDetail";
import SignIn from "./pages/SingIn";
import SignUp from "./pages/SignUp";
import Aboutus from "./components/Aboutus";
import Blog from "./components/Blog";
import Cart from "./pages/Cart";
import AdminLayout from "./layouts/AdminLayouts";
import AdminProductList from "./pages/admin/product/list";
import AdminAddProduct from "./pages/admin/product/add";
import AdminEditProduct from "./pages/admin/product/edit";
import ClientLayout from "./layouts/ClientLayouts";


const routeConfig = [
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            { path: "", element: <Homepage /> },
            { path: "aboutus", element: <Aboutus /> },
            { path: "cart", element: <Cart /> },
            { path: "blog", element: <Blog /> },
            { path: "products/:id", element: <ProductsDetail /> },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { path: "products", element: <AdminProductList /> },
            { path: "products/add", element: <AdminAddProduct /> },
            { path: "products/edit/:id", element: <AdminEditProduct /> },
        ],
    },
    {
        path: "/auth/register",
        element: <SignUp />,
    },
    {
        path: "/auth/login",
        element: <SignIn />,
    }
];

function App() {
    const routes = useRoutes(routeConfig);

    return <main>{routes}</main>;
}

export default App;
