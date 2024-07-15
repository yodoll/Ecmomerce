import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./context/Loading.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <LoadingProvider>
            <BrowserRouter>
                <App />
                <ToastContainer />
            </BrowserRouter>
        </LoadingProvider>
    </React.StrictMode>
);
