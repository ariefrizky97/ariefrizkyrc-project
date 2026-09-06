import { NavLink, useLocation } from "react-router";
import { BedDouble, CircleHelp, Compass, Globe2, House, Menu, ArrowUpRight } from "lucide-react";

export default function Navbar() {
    const { pathname, hash } = useLocation();
    const links = [
        { to: "/", label: "Beranda", Icon: House, active: pathname === "/" && !hash },
        {
            to: "/#penginapan",
            label: "Penginapan",
            Icon: BedDouble,
            active: hash === "#penginapan" || pathname.startsWith("/hotel/"),
        },
        { to: "/#bantuan", label: "Bantuan", Icon: CircleHelp, active: hash === "#bantuan" },
    ];

    return (
        <header className="sticky top-0 z-30 border-b border-blue-100 bg-white/95 shadow-sm backdrop-blur-xl">
            <nav
                aria-label="Navigasi utama"
                className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4"
            >
                <NavLink
                    to="/"
                    aria-label="Stayloka beranda"
                    className="flex shrink-0 items-center gap-2.5"
                >
                    <img
                        src={`${import.meta.env.BASE_URL}public/data/logo.png`}
                        alt="Stayloka"
                        className="h-18 w-auto object-contain"
                    />
                </NavLink>
                <div className="hidden items-center gap-1 md:flex">
                    {links.map(({ to, label, Icon, active }) => (
                        <NavLink
                            key={to}
                            to={to}
                            aria-current={active ? "location" : false}
                            className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"}`}
                        >
                            <Icon size={17} aria-hidden="true" />
                            {label}
                        </NavLink>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <span className="hidden items-center gap-2 border-l border-slate-200 pl-5 text-sm font-medium text-slate-500 lg:flex">
                        <Globe2 size={17} aria-hidden="true" />
                        ID · IDR
                    </span>
                    <NavLink
                        to="/#penginapan"
                        className="hidden items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 sm:flex"
                    >
                        Cari penginapan
                        <ArrowUpRight size={17} aria-hidden="true" />
                    </NavLink>
                    <details className="group relative md:hidden">
                        <summary
                            aria-label="Buka menu navigasi"
                            className="flex size-11 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-blue-50 marker:hidden [&::-webkit-details-marker]:hidden"
                        >
                            <Menu size={22} aria-hidden="true" />
                        </summary>
                        <div className="absolute top-14 right-0 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                            {links.map(({ to, label, Icon, active }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    aria-current={active ? "location" : false}
                                    onClick={(e) => {
                                        e.currentTarget.closest("details").open = false;
                                    }}
                                    className={`flex items-center gap-3 rounded-xl p-3 text-sm font-semibold ${active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
                                >
                                    <Icon size={18} aria-hidden="true" />
                                    {label}
                                </NavLink>
                            ))}
                            <p className="mt-2 flex items-center gap-3 border-t border-slate-100 p-3 text-sm text-slate-500">
                                <Globe2 size={18} aria-hidden="true" />
                                Indonesia · IDR
                            </p>
                        </div>
                    </details>
                </div>
            </nav>
        </header>
    );
}
