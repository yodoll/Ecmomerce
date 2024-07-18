import { Outlet } from "react-router-dom";
import Banner from "src/components/Banner";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import { CartProvider } from "src/context/Cart";

function ClientLayout() {
    return (
        <>
            <CartProvider>
                <Header />
                <main>
                    <Banner />
                    <Outlet />
                </main>
                <Footer />
            </CartProvider>
        </>
    );
}

export default ClientLayout;
