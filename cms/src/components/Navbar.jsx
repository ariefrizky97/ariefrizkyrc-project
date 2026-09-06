import { NavLink, useNavigate } from "react-router";
import { BedDouble, Compass, Layers3, LogOut, UserRoundPlus } from "lucide-react";
import Swal from "sweetalert2";
import { toastOptions } from "../constant/alert";

export default function Navbar() {
    const navigate = useNavigate();
    const links = [
        { to: "/home", label: "Penginapan", Icon: BedDouble },
        { to: "/categories", label: "Kategori", Icon: Layers3 },
        { to: "/register", label: "Form staf", Icon: UserRoundPlus },
    ];

    function handleLogout() {
        localStorage.removeItem("access_token");
        navigate("/login", { replace: true });
        Swal.fire({ ...toastOptions, icon: "success", titleText: "Berhasil keluar dari CMS." });
    }

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
            <nav
                aria-label="Navigasi CMS"
                className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-5 py-4"
            >
                <NavLink to="/home" className="mr-auto flex items-center gap-2.5">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-blue-700 text-white">
                        <Compass size={25} aria-hidden="true" />
                    </span>
                    <span className="text-xl font-extrabold tracking-tight text-blue-950">
                        stayloka<span className="text-blue-600">.</span>
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold tracking-wide text-slate-500">
                        CMS
                    </span>
                </NavLink>
                <div className="order-3 flex w-full flex-wrap items-center gap-1 border-t border-slate-100 pt-3 sm:order-none sm:w-auto sm:border-0 sm:pt-0">
                    {links.map(({ to, label, Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${isActive ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-blue-700"}`
                            }
                        >
                            <Icon size={17} aria-hidden="true" />
                            {label}
                        </NavLink>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                    <LogOut size={17} aria-hidden="true" />
                    Logout
                </button>
            </nav>
        </header>
    );
}
