import { useState } from "react";
import { Link } from "react-router";
import { BedDouble, Plus } from "lucide-react";
import Swal from "sweetalert2";
import { toastOptions } from "../constant/alert";
import HotelTable from "../components/HotelTable";

export default function HomePage({ hotels, saveHotels }) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const filteredHotels = hotels.filter((hotel) =>
        `${hotel.name} ${hotel.location}`.toLowerCase().includes(search.toLowerCase()),
    );
    const totalPages = Math.max(1, Math.ceil(filteredHotels.length / 5));
    const currentPage = Math.min(page, totalPages);
    const visibleHotels = filteredHotels.slice((currentPage - 1) * 5, currentPage * 5);

    async function handleDelete(id) {
        const hotel = hotels.find((item) => item.id === id);
        if (!hotel) return;
        const result = await Swal.fire({
            titleText: "Hapus penginapan?",
            text: `${hotel.name} akan dihapus dari data lokal. apakah kamu yakin?`,
            icon: "warning",
            position: "top-end",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#475569",
            focusCancel: true,
            width: "min(28rem, calc(100vw - 2rem))",
            customClass: { popup: "!rounded-2xl !font-sans", title: "!text-xl" },
        });
        if (!result.isConfirmed) return;
        try {
            saveHotels(hotels.filter((item) => item.id !== id));
            Swal.fire({
                ...toastOptions,
                icon: "success",
                titleText: "Penginapan berhasil dihapus.",
                timer: 2500,
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                ...toastOptions,
                icon: "error",
                titleText: "Gagal menyimpan perubahan di browser.",
                timer: 3000,
            });
        }
    }

    return (
        <>
            <div className="rounded-3xl bg-[linear-gradient(120deg,#102a68,#0753c7)] p-6 text-white shadow-lg md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-bold tracking-widest text-blue-200">
                            MANAJEMEN PROPERTI
                        </p>
                        <h1 className="mt-2 flex items-center gap-3 text-3xl font-extrabold">
                            <BedDouble />
                            Daftar penginapan
                        </h1>
                        <p className="mt-2 text-sm text-blue-100">
                            {hotels.length} penginapan dari stayloka
                        </p>
                    </div>
                    <Link
                        to="/add"
                        className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
                    >
                        <Plus size={18} /> Tambah penginapan
                    </Link>
                </div>
            </div>
            <label className="my-6 block max-w-sm text-sm">
                Cari nama atau lokasi
                <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    placeholder="Cari penginapan..."
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm outline-blue-600"
                />
            </label>
            <HotelTable hotels={visibleHotels} onDelete={handleDelete} />
            <div className="mt-5 flex items-center justify-between gap-3 text-sm">
                <p>
                    {filteredHotels.length} hasil · Halaman {currentPage} / {totalPages}
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="cursor-pointer rounded border border-slate-300 px-3 py-2 disabled:cursor-default disabled:opacity-40"
                    >
                        Sebelumnya
                    </button>
                    <button
                        onClick={() => setPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="cursor-pointer rounded border border-slate-300 px-3 py-2 disabled:cursor-default disabled:opacity-40"
                    >
                        Berikutnya
                    </button>
                </div>
            </div>
        </>
    );
}
