import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { toastOptions } from "../constant/alert";

export default function UploadImagePage({ hotels, saveHotels }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const hotel = hotels.find((item) => item.id === Number(id));
    const [preview, setPreview] = useState(hotel?.image ?? "");
    const [reading, setReading] = useState(false);

    function chooseImage(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (
            !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
            file.size > 1_500_000
        ) {
            Swal.fire({
                ...toastOptions,
                icon: "warning",
                titleText: "Gunakan JPG, PNG, atau WEBP maksimal 4 MB.",
                timer: 3000,
            });
            e.target.value = "";
            return;
        }
        setReading(true);
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
            setReading(false);
        };
        reader.onerror = () => {
            setReading(false);
            Swal.fire({
                ...toastOptions,
                icon: "error",
                titleText: "File tidak bisa dibaca.",
                timer: 3000,
            });
        };
        reader.readAsDataURL(file);
    }

    function handleSubmit(e) {
        e.preventDefault();
        try {
            saveHotels(
                hotels.map((item) => (item.id === hotel.id ? { ...item, image: preview } : item)),
            );
            Swal.fire({
                ...toastOptions,
                icon: "success",
                titleText: "Gambar disimpan.",
                timer: 2500,
            });
            navigate("/hotels");
        } catch (error) {
            console.error(error);
            Swal.fire({
                ...toastOptions,
                icon: "error",
                titleText:
                    "Gagal menyimpan gambar. Penyimpanan browser mungkin penuh; gunakan gambar lebih kecil.",
                timer: 4000,
            });
        }
    }

    if (!hotel)
        return (
            <p>
                Penginapan tidak ditemukan.{" "}
                <Link to="/hotels" className="text-blue-700">
                    Kembali
                </Link>
            </p>
        );

    return (
        <section className="max-w-xl">
            <Link to="/hotels" className="text-sm text-blue-700">
                ← Kembali
            </Link>
            <h1 className="mt-4 text-2xl font-bold">Ganti gambar</h1>
            <p className="mt-2 text-slate-500">{hotel.name}</p>
            <form
                onSubmit={handleSubmit}
                className="mt-5 space-y-4 rounded-lg border border-slate-200 bg-white p-5"
            >
                <img
                    src={preview}
                    alt={`Preview ${hotel.name}`}
                    className="h-56 w-full rounded object-cover"
                />
                <label className="block text-sm font-medium">
                    Pilih gambar (maksimal 4 MB)
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={chooseImage}
                        disabled={reading}
                        className="mt-2 block w-full text-sm file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-slate-100 file:px-4 file:py-2"
                    />
                </label>
                <p className="text-xs text-slate-500">
                    Ini penyimpanan lokal .
                </p>
                <button
                    disabled={!preview || reading}
                    className="cursor-pointer rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                >
                    {reading ? "Membaca file..." : "Simpan gambar"}
                </button>
            </form>
        </section>
    );
}
