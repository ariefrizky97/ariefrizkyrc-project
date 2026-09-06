import { useState } from "react";
import {
    BedDouble,
    CalendarDays,
    Car,
    MapPin,
    Minus,
    Plane,
    Plus,
    Search,
    TicketPercent,
    Users,
} from "lucide-react";

export default function SearchPanel({ searchText, onSearchTextChange, onSearch }) {
    const [guests, setGuests] = useState(2);

    function handleSubmit(e) {
        e.preventDefault();
        onSearch(searchText);
        document.getElementById("penginapan")?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="mt-9 overflow-hidden rounded-3xl border border-white/30 bg-white text-slate-900 shadow-2xl shadow-blue-950/30">
            <div className="flex gap-1 overflow-x-auto border-b border-slate-200 px-4 pt-3 sm:px-6">
                <button
                    type="button"
                    className="flex min-w-max items-center gap-2 border-b-3 border-blue-600 px-4 py-4 font-semibold text-blue-700"
                >
                    <BedDouble size={21} />
                    Penginapan
                </button>
                <button
                    type="button"
                    disabled
                    title="Segera hadir"
                    className="flex min-w-max items-center gap-2 px-4 py-4 font-semibold text-slate-400"
                >
                    <Plane size={20} />
                    Penerbangan
                </button>
                <button
                    type="button"
                    disabled
                    title="Segera hadir"
                    className="flex min-w-max items-center gap-2 px-4 py-4 font-semibold text-slate-400"
                >
                    <Car size={20} />
                    Mobil
                </button>
                <button
                    type="button"
                    disabled
                    title="Segera hadir"
                    className="flex min-w-max items-center gap-2 px-4 py-4 font-semibold text-slate-400"
                >
                    <TicketPercent size={20} />
                    Paket
                </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr_1fr_auto]">
                    <label className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-300 px-4 py-3 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
                        <MapPin className="shrink-0 text-blue-600" />
                        <span className="min-w-0 flex-1">
                            <small className="block font-medium text-slate-500">Tujuan</small>
                            <input
                                type="search"
                                value={searchText}
                                onChange={(e) => onSearchTextChange(e.target.value)}
                                placeholder="Nama hotel atau lokasi"
                                aria-label="Cari nama hotel atau lokasi"
                                className="mt-0.5 w-full font-medium outline-none placeholder:font-normal"
                            />
                        </span>
                    </label>
                    <label className="flex items-center gap-3 rounded-xl border border-slate-300 px-4 py-3 focus-within:border-blue-600">
                        <CalendarDays className="shrink-0 text-blue-600" />
                        <span className="min-w-0 flex-1">
                            <small className="block font-medium text-slate-500">Check-in</small>
                            <input
                                type="date"
                                aria-label="Tanggal check-in"
                                className="w-full font-medium outline-none"
                            />
                        </span>
                    </label>
                    <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-4 py-3">
                        <Users className="shrink-0 text-blue-600" />
                        <span className="min-w-0 flex-1">
                            <small className="block font-medium text-slate-500">Tamu</small>
                            <strong className="whitespace-nowrap">{guests} tamu, 1 kamar</strong>
                        </span>
                        <div className="flex gap-1">
                            <button
                                type="button"
                                onClick={() => setGuests(Math.max(1, guests - 1))}
                                aria-label="Kurangi tamu"
                                className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-blue-700 hover:bg-blue-50"
                            >
                                <Minus size={15} />
                            </button>
                            <button
                                type="button"
                                onClick={() => setGuests(Math.min(8, guests + 1))}
                                aria-label="Tambah tamu"
                                className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-blue-700 hover:bg-blue-50"
                            >
                                <Plus size={15} />
                            </button>
                        </div>
                    </div>
                    <button className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">
                        <Search size={20} />
                        Cari
                    </button>
                </div>
            </form>
        </div>
    );
}
