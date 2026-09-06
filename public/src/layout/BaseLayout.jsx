import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BaseLayout() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
        else window.scrollTo(0, 0);
    }, [pathname, hash]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}
