import { BedDouble, CheckCircle2, ChevronRight, Layers3, PencilLine, Plus } from "lucide-react";
import { Link } from "react-router";
import HotelTable from "../components/HotelTable";
import { seedCategories } from "../data/categories";

export default function DashboardPage({ hotels }) {
    const active = hotels.filter((hotel) => hotel.status === "Aktif").length;
    const draft = hotels.filter((hotel) => hotel.status === "Draft").length;
    const stats = [
        {
            label: "Total penginapan",
            value: hotels.length,
            note: "Data tersimpan",
            Icon: BedDouble,
            color: "bg-blue-100 text-blue-700",
        },
        {
            label: "Penginapan aktif",
            value: active,
            note: "Siap ditampilkan",
            Icon: CheckCircle2,
            color: "bg-emerald-100 text-emerald-700",
        },
        {
            label: "Masih draft",
            value: draft,
            note: "Perlu dilengkapi",
            Icon: PencilLine,
            color: "bg-amber-100 text-amber-700",
        },
        {
            label: "Total kategori",
            value: seedCategories.length,
            note: "Jenis penginapan",
            Icon: Layers3,
            color: "bg-violet-100 text-violet-700",
        },
    ];

    return (
        <>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-sm font-bold tracking-widest text-blue-600">RINGKASAN</p>
                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950">
                        Selamat datang 👋
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Pantau data properti Stayloka dari satu halaman.
                    </p>
                </div>
                <Link
                    to="/add"
                    className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800"
                >
                    <Plus size={19} />
                    Tambah properti
                </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ label, value, note, Icon, color }) => (
                    <article
                        key={label}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <span
                                className={`flex size-11 items-center justify-center rounded-xl ${color}`}
                            >
                                <Icon size={22} />
                            </span>
                            <span className="text-3xl font-extrabold text-blue-950">{value}</span>
                        </div>
                        <p className="mt-5 font-bold text-slate-800">{label}</p>
                        <p className="mt-1 text-sm text-slate-500">{note}</p>
                    </article>
                ))}
            </div>
            <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-bold text-blue-950">Properti terbaru</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Empat data penginapan pertama di browser ini.
                        </p>
                    </div>
                    <Link
                        to="/hotels"
                        className="flex items-center gap-1 text-sm font-bold text-blue-700 hover:underline"
                    >
                        Lihat semua
                        <ChevronRight size={17} />
                    </Link>
                </div>
                <HotelTable hotels={hotels.slice(0, 4)} compact />
            </section>
        </>
    );
}
