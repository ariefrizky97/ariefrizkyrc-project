import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, BedDouble, MapPin, ShieldCheck, Sparkles, Star, Wifi } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { toastOptions } from "../constant/alert";
import baseUrl from "../constant/url";
import hotelBackup from "../../public/data/hotels.json";
import NotFoundPage from "./NotFoundPage";

export default function DetailPage() {
    const { id } = useParams();
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        async function fetchDetail() {
            try {
                const { data } = await axios.get(`${baseUrl}/hotels.json`, {
                    signal: controller.signal,
                });
                if (!Array.isArray(data)) throw new Error("Format katalog tidak valid.");
                setHotels(data);
            } catch (error) {
                if (axios.isCancel(error)) return;
                console.error(error);
                setHotels(hotelBackup);
                Swal.fire({
                    ...toastOptions,
                    icon: "info",
                    titleText: "Detail dari katalog cadangan ditampilkan.",
                    timer: 3000,
                });
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }
        fetchDetail();
        return () => controller.abort();
    }, [id]);

    if (loading)
        return (
            <main className="mx-auto max-w-6xl px-5 py-12" role="status">
                Memuat detail...
            </main>
        );
    const hotel = hotels.find((item) => item.id === Number(id));
    if (!hotel) return <NotFoundPage />;

    return (
        <main className="bg-slate-50">
            <section className="mx-auto max-w-6xl px-5 pt-8">
                <Link
                    to="/#penginapan"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
                >
                    <ArrowLeft size={17} />
                    Kembali ke penginapan
                </Link>
                <div className="mt-6 grid gap-3 overflow-hidden rounded-3xl md:grid-cols-[2fr_1fr]">
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="h-80 w-full object-cover md:h-[480px]"
                    />
                    <div className="hidden gap-3 md:grid">
                        <img
                            src={hotelBackup[(hotel.id + 1) % hotelBackup.length].image}
                            alt=""
                            className="h-[234px] w-full object-cover"
                        />
                        <img
                            src={hotelBackup[(hotel.id + 4) % hotelBackup.length].image}
                            alt=""
                            className="h-[234px] w-full object-cover"
                        />
                    </div>
                </div>
            </section>
            <section className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[1fr_360px]">
                <div>
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-blue-100 px-3 py-1.5 text-sm font-bold text-blue-700">
                            {hotel.category}
                        </span>
                        <span className="flex items-center gap-1 text-sm font-semibold text-slate-600">
                            <Star size={16} className="text-amber-500" fill="currentColor" />
                            {hotel.rating} · {hotel.reviews} ulasan demo
                        </span>
                    </div>
                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-blue-950 md:text-5xl">
                        {hotel.name}
                    </h1>
                    <p className="mt-3 flex items-center gap-2 text-slate-500">
                        <MapPin size={18} className="text-blue-600" />
                        {hotel.location}
                    </p>
                    <div className="my-8 h-px bg-slate-200" />
                    <h2 className="text-2xl font-bold text-blue-950">Tentang penginapan</h2>
                    <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                        {hotel.description}
                    </p>
                    <h2 className="mt-9 text-2xl font-bold text-blue-950">Fasilitas populer</h2>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <p className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                            <Wifi className="text-blue-600" />
                            Wi-Fi di area umum
                        </p>
                        <p className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                            <BedDouble className="text-blue-600" />
                            Kamar nyaman
                        </p>
                        <p className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                            <ShieldCheck className="text-blue-600" />
                            Informasi transparan
                        </p>
                        <p className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                            <Sparkles className="text-blue-600" />
                            Area terawat
                        </p>
                    </div>
                    <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                        Foto, fasilitas, harga, dan ulasan merupakan data contoh untuk latihan
                        frontend.
                    </p>
                </div>
                <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 lg:sticky lg:top-28">
                    <p className="text-sm font-medium text-slate-500">Mulai dari</p>
                    <p className="mt-1 text-3xl font-extrabold text-blue-950">
                        Rp {Number(hotel.price).toLocaleString("id-ID")}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">per kamar / malam</p>
                    <div className="my-5 h-px bg-slate-100" />
                    <label className="block text-sm font-semibold text-slate-700">
                        Tanggal menginap
                        <input
                            type="date"
                            className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal outline-blue-600"
                        />
                    </label>
                    <label className="mt-4 block text-sm font-semibold text-slate-700">
                        Jumlah tamu
                        <select className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal outline-blue-600">
                            <option>2 tamu, 1 kamar</option>
                            <option>1 tamu, 1 kamar</option>
                            <option>4 tamu, 2 kamar</option>
                        </select>
                    </label>
                    <button
                        type="button"
                        disabled
                        className="mt-5 w-full rounded-xl bg-blue-700 px-5 py-3.5 font-bold text-white opacity-70"
                    >
                        Pemesanan belum tersedia
                    </button>
                    <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                        Tidak ada pembayaran yang diproses.
                    </p>
                </aside>
            </section>
        </main>
    );
}
