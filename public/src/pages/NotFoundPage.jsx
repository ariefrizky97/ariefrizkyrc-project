import { Link } from "react-router";

export default function NotFoundPage() {
    return (
        <main className="mx-auto max-w-6xl px-5 py-24 text-center">
            <h1 className="text-3xl font-bold">Halaman tidak ditemukan</h1>
            <p className="mt-3 text-slate-500">
                Alamat atau penginapan yang Anda buka tidak tersedia.
            </p>
            <Link to="/" className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white">
                Kembali ke beranda
            </Link>
        </main>
    );
}
