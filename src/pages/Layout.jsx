import Header from "../components/Layout/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function Layout(){
    return(
        <>
            <Header />
            <Toaster position="top-right" reverseOrder={false} />
            <Outlet />
        </>
    )
}

export default Layout;