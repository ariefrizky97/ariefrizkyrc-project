import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
    BedDouble,
    Building2,
    Compass,
    Layers3,
    LogOut,
    Menu,
    PlusCircle,
    UserRoundPlus,
    X,
} from "lucide-react";
import Swal from "sweetalert2";
import { toastOptions } from "../constant/alert";
import Footer from "./Footer";

export default function AppLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const menu = [
        { to: "/", label: "Dashboard", Icon: Building2, end: true },
        { to: "/hotels", label: "Penginapan", Icon: BedDouble },
        { to: "/add", label: "Tambah properti", Icon: PlusCircle },
        { to: "/categories", label: "Kategori", Icon: Layers3 },
        { to: "/register", label: "Tambah staf", Icon: UserRoundPlus },
    ];

    function handleLogout() {
        localStorage.removeItem("access_token");
        navigate("/login", { replace: true });
        Swal.fire({ ...toastOptions, icon: "success", titleText: "Berhasil keluar dari CMS." });
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {mobileOpen && (
                <button
                    aria-label="Tutup menu"
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 z-30 cursor-default bg-blue-950/50 lg:hidden"
                />
            )}
            <aside
                className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-blue-950 text-white shadow-2xl transition-transform lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
                <img
                    src={`${import.meta.env.BASE_URL}public/data/logo.png`}
                    alt="Stayloka"
                    className="h-20 w-auto object-contain"
                />

                    <button
                        onClick={() => setMobileOpen(false)}
                        aria-label="Tutup menu"
                        className="ml-auto cursor-pointer text-blue-200 lg:hidden"
                    >
                        <X />
                    </button>
                </div>
                <nav className="flex-1 space-y-1 overflow-y-auto p-4" aria-label="Menu CMS">
                    <p className="px-3 pb-2 pt-3 text-xs font-semibold tracking-[.18em] text-blue-400">
                        MENU UTAMA
                    </p>
                    {menu.map(({ to, label, Icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-white text-blue-950 shadow-md" : "text-blue-200 hover:bg-white/10 hover:text-white"}`
                            }
                        >
                            <Icon size={19} />
                            {label}
                        </NavLink>
                    ))}
                </nav>
                <div className="m-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-full bg-sky-300 font-bold text-blue-950">
                            AR
                        </span>
                        <span className="min-w-0 flex-1">
                            <strong className="block truncate text-sm">Arief Rizki</strong>
                            <small className="text-blue-300">Administrator</small>
                        </span>
                        <button
                            onClick={handleLogout}
                            title="Logout"
                            aria-label="Logout"
                            className="cursor-pointer rounded-lg p-2 text-blue-200 hover:bg-red-500/20 hover:text-red-200"
                        >
                            <LogOut size={19} />
                        </button>
                    </div>
                </div>
            </aside>
            <div className="flex min-h-screen flex-col lg:pl-72">
                <header className="sticky top-0 z-20 flex min-h-20 items-center border-b border-slate-200 bg-white/95 px-5 backdrop-blur lg:px-8">
                    <button
                        onClick={() => setMobileOpen(true)}
                        aria-label="Buka menu"
                        className="mr-4 flex size-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 lg:hidden"
                    >
                        <Menu />
                    </button>
                    <div>
                        <strong className="block text-slate-800">Stayloka Partner Center</strong>
                        <small className="text-slate-500">Kelola konten dan data penginapan</small>
                    </div>
                    <div className="ml-auto hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 sm:flex">
                        <span className="size-2 rounded-full bg-emerald-500" />
                        Demo Live CMS
                    </div>
                </header>
                <main className="w-full flex-1 p-5 lg:p-8">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
