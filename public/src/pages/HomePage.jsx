import { useEffect, useState } from "react";
import {
    Building2,
    ChevronLeft,
    ChevronRight,
    MessageSquareText,
    Search,
    ShieldCheck,
    Sparkles,
    X,
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { toastOptions } from "../constant/alert";
import baseUrl from "../constant/url";
import { STORAGE_KEYS } from "../constant/storageKeys";
import hotelBackup from "../../public/data/hotels.json";
import SearchPanel from "../components/SearchPanel";
import HotelCard from "../components/HotelCard";

export default function HomePage() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [onlyFavourites, setOnlyFavourites] = useState(false);
    const [favourites, setFavourites] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.favourites));
            return Array.isArray(saved) ? saved : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        const controller = new AbortController();
        async function fetchHotels() {
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
                    titleText: "Katalog cadangan ditampilkan.",
                    timer: 3000,
                });
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }
        fetchHotels();
        return () => controller.abort();
    }, []);

    function toggleFavourite(id) {
        const next = favourites.includes(id)
            ? favourites.filter((item) => item !== id)
            : [...favourites, id];
        try {
            localStorage.setItem(STORAGE_KEYS.favourites, JSON.stringify(next));
            setFavourites(next);
            Swal.fire({
                ...toastOptions,
                icon: "success",
                titleText: "Daftar favorit diperbarui.",
                timer: 2000,
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                ...toastOptions,
                icon: "error",
                titleText: "Favorit tidak bisa disimpan di browser.",
                timer: 3000,
            });
        }
    }

    function handleSearch(value) {
        const keyword = value.trim();
        setSearchText(keyword);
        setQuery(keyword);
        setPage(1);
    }

    function resetSearchAndFilters() {
        setSearchText("");
        setQuery("");
        setCategory("");
        setPrice("");
        setSort("");
        setOnlyFavourites(false);
        setPage(1);
    }

    const filteredHotels = hotels.filter(
        (hotel) =>
            `${hotel.name} ${hotel.location}`.toLowerCase().includes(query.toLowerCase()) &&
            (!category || hotel.category === category) &&
            (!price || hotel.price <= Number(price)) &&
            (!onlyFavourites || favourites.includes(hotel.id)),
    );
    if (sort === "lowest") filteredHotels.sort((a, b) => a.price - b.price);
    if (sort === "highest") filteredHotels.sort((a, b) => b.price - a.price);
    if (sort === "rating") filteredHotels.sort((a, b) => b.rating - a.rating);
    const totalPages = Math.max(1, Math.ceil(filteredHotels.length / 6));
    const currentPage = Math.min(page, totalPages);
    const visibleHotels = filteredHotels.slice((currentPage - 1) * 6, currentPage * 6);
    const heroPoster = hotelBackup[0].image;

    return (
        <main>
            <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-blue-950">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={heroPoster}
                    aria-hidden="true"
                    className="absolute inset-0 -z-20 h-full w-full object-cover"
                >
                </video>
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,25,66,.96)_0%,rgba(7,38,96,.76)_48%,rgba(7,25,66,.25)_100%)]" />
                <div className="mx-auto w-full max-w-6xl px-5 py-16 md:py-20">
                    <p className="mb-4 flex items-center gap-2 text-sm font-bold tracking-[.18em] text-amber-200">
                        <Sparkles size={17} />
                        JELAJAHI INDONESIA
                    </p>
                    <h1 className="max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight text-white md:text-6xl">
                        Menginap nyaman,
                        <br />
                        liburan jadi berkesan.
                    </h1>
                    <p className="mt-5 max-w-xl text-lg leading-8 text-blue-100">
                        Temukan Hotel, Vila, dan Resort pilihan untuk perjalanan Anda berikutnya.
                    </p>
                    <SearchPanel
                        searchText={searchText}
                        onSearchTextChange={setSearchText}
                        onSearch={handleSearch}
                    />
                </div>
            </section>

            <section className="border-b border-blue-100 bg-blue-50">
                <div className="mx-auto grid max-w-6xl gap-4 px-5 py-5 text-sm font-semibold text-blue-950 sm:grid-cols-3">
                    <p className="flex items-center gap-3">
                        <span className="rounded-full bg-white p-2.5 text-blue-600 shadow-sm">
                            <ShieldCheck size={20} />
                        </span>
                        Favorit tersimpan di browser
                    </p>
                    <p className="flex items-center gap-3">
                        <span className="rounded-full bg-white p-2.5 text-blue-600 shadow-sm">
                            <Building2 size={20} />
                        </span>
                        12 pilihan penginapan
                    </p>
                    <p className="flex items-center gap-3">
                        <span className="rounded-full bg-white p-2.5 text-blue-600 shadow-sm">
                            <MessageSquareText size={20} />
                        </span>
                        Bantuan singkat tersedia
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-5 pt-14">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-bold tracking-widest text-blue-600">
                            DESTINASI POPULER
                        </p>
                        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950">
                            Inspirasi perjalanan berikutnya
                        </h2>
                    </div>
                    <a
                        href="#penginapan"
                        className="hidden font-semibold text-blue-700 hover:underline sm:block"
                    >
                        Lihat semua
                    </a>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-3">
                    {[hotelBackup[0], hotelBackup[2], hotelBackup[5]].map((hotel) => (
                        <button
                            key={hotel.id}
                            type="button"
                            onClick={() => {
                                handleSearch(hotel.location.split(",")[0]);
                                document
                                    .getElementById("penginapan")
                                    ?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="group relative h-64 cursor-pointer overflow-hidden rounded-3xl text-left shadow-lg"
                        >
                            <img
                                src={hotel.image}
                                alt=""
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                            <span className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent" />
                            <span className="absolute right-5 bottom-5 left-5 text-white">
                                <strong className="block text-xl">{hotel.location}</strong>
                                <small className="mt-1 block text-blue-100">
                                    Lihat pilihan penginapan
                                </small>
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            <section id="penginapan" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-16">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-bold tracking-widest text-blue-600">
                            PILIHAN UNTUK ANDA
                        </p>
                        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950">
                            Temukan penginapan favorit
                        </h2>
                        <p className="mt-2 text-slate-500">
                            {query
                                ? `Hasil pencarian untuk “${query}”`
                                : "Pilihan nyaman di berbagai destinasi Indonesia."}
                        </p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                        {filteredHotels.length} ditemukan
                    </span>
                </div>

                <div className="my-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch(searchText);
                        }}
                        className="mb-4 flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row"
                        role="search"
                    >
                        <label className="relative flex-1">
                            <span className="sr-only">Cari nama hotel atau lokasi</span>
                            <Search
                                size={20}
                                aria-hidden="true"
                                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Cari nama hotel atau lokasi..."
                                className="w-full rounded-xl border border-slate-300 py-3 pr-11 pl-12 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                            {(searchText || query) && (
                                <button
                                    type="button"
                                    onClick={() => handleSearch("")}
                                    aria-label="Hapus pencarian"
                                    className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </label>
                        <button
                            type="submit"
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
                        >
                            <Search size={19} />
                            Cari penginapan
                        </button>
                    </form>
                    <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
                        {["", "Hotel", "Vila", "Resort", "Apartemen"].map((name) => (
                            <button
                                key={name || "Semua"}
                                onClick={() => {
                                    setCategory(name);
                                    setPage(1);
                                }}
                                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${category === name ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}
                            >
                                {name || "Semua"}
                            </button>
                        ))}
                    </div>
                    <div className="grid gap-4 pt-4 sm:grid-cols-3">
                        <label className="text-sm font-medium text-slate-600">
                            Harga maksimum
                            <select
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                    setPage(1);
                                }}
                                className="mt-1.5 w-full rounded-xl border border-slate-300 p-3 outline-blue-600"
                            >
                                <option value="">Semua harga</option>
                                <option value="1000000">Rp 1.000.000</option>
                                <option value="1500000">Rp 1.500.000</option>
                                <option value="2000000">Rp 2.000.000</option>
                            </select>
                        </label>
                        <label className="text-sm font-medium text-slate-600">
                            Urutkan
                            <select
                                value={sort}
                                onChange={(e) => {
                                    setSort(e.target.value);
                                    setPage(1);
                                }}
                                className="mt-1.5 w-full rounded-xl border border-slate-300 p-3 outline-blue-600"
                            >
                                <option value="">Rekomendasi</option>
                                <option value="lowest">Harga terendah</option>
                                <option value="highest">Harga tertinggi</option>
                                <option value="rating">Rating tertinggi</option>
                            </select>
                        </label>
                        <label className="flex items-center gap-3 rounded-xl bg-rose-50 px-4 text-sm font-semibold text-rose-700">
                            <input
                                type="checkbox"
                                checked={onlyFavourites}
                                onChange={(e) => {
                                    setOnlyFavourites(e.target.checked);
                                    setPage(1);
                                }}
                                className="size-4 accent-rose-600"
                            />
                            Hanya hotel favorit
                        </label>
                    </div>
                </div>

                {loading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="status">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-96 animate-pulse rounded-2xl bg-slate-200"
                            />
                        ))}
                    </div>
                ) : visibleHotels.length ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleHotels.map((hotel) => (
                            <HotelCard
                                key={hotel.id}
                                hotel={hotel}
                                favourite={favourites.includes(hotel.id)}
                                onToggleFavourite={toggleFavourite}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                        <Building2 size={38} className="mx-auto text-blue-600" />
                        <h3 className="mt-4 text-xl font-bold">Penginapan tidak ditemukan</h3>
                        <p className="mt-2 text-slate-500">
                            Coba ubah kata pencarian atau pilihan filter.
                        </p>
                        <button
                            onClick={resetSearchAndFilters}
                            className="mt-5 cursor-pointer font-semibold text-blue-700"
                        >
                            Reset pencarian dan filter
                        </button>
                    </div>
                )}

                <nav
                    className="mt-10 flex items-center justify-center gap-2"
                    aria-label="Navigasi halaman"
                >
                    <button
                        onClick={() => setPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Halaman sebelumnya"
                        className="flex size-10 cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white disabled:cursor-default disabled:opacity-40"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
                        <button
                            key={item}
                            onClick={() => setPage(item)}
                            aria-current={item === currentPage ? "page" : undefined}
                            className={`size-10 cursor-pointer rounded-xl font-semibold ${item === currentPage ? "bg-blue-700 text-white" : "border border-slate-300 bg-white text-slate-600"}`}
                        >
                            {item}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Halaman berikutnya"
                        className="flex size-10 cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white disabled:cursor-default disabled:opacity-40"
                    >
                        <ChevronRight size={18} />
                    </button>
                </nav>
            </section>

            <section className="mx-auto max-w-6xl px-5 pb-16">
                <div className="overflow-hidden rounded-3xl bg-[linear-gradient(120deg,#102a68,#0753c7)] px-7 py-10 text-white shadow-xl md:flex md:items-center md:justify-between md:px-12">
                    <div>
                        <p className="text-sm font-bold tracking-widest text-blue-200">
                            RENCANAKAN PERJALANAN
                        </p>
                        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold">
                            Simpan pilihan favorit, lalu bandingkan penginapan dengan lebih mudah.
                        </h2>
                        <p className="mt-3 text-blue-100">
                            Favorit tersimpan pada browser ini tanpa memerlukan akun.
                        </p>
                    </div>
                    <a
                        href="#penginapan"
                        className="mt-7 inline-block shrink-0 rounded-xl bg-white px-6 py-3 font-bold text-blue-700 md:mt-0"
                    >
                        Mulai jelajahi
                    </a>
                </div>
            </section>
        </main>
    );
}
