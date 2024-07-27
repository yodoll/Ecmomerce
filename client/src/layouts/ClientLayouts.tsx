import { Outlet } from "react-router-dom";
import Banner from "src/components/Banner";
import Footer from "src/components/Footer";
import Header from "src/components/Header";

function ClientLayout() {
    return (
        <>
            <Header />
            <main>
                <Banner />
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default ClientLayout;
