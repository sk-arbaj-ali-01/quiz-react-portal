import Header from "../components/Layout/Header";
import { Outlet } from "react-router-dom";

function Layout(){
    return(
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Layout;