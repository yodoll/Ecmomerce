import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer";
import Header from "src/components/Header";

function ClientLayout () {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default ClientLayout;