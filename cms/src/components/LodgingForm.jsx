import { useEffect, useState } from "react";
import { Link } from "react-router";
import { emptyHotelForm } from "../data/hotels";
import { seedCategories } from "../data/categories";

export default function LodgingForm({ nameProp, handleSubmit, hotel }) {
    const [form, setForm] = useState({ ...emptyHotelForm });

    useEffect(() => {
        if (hotel) {
            setForm({
                name: hotel.name ?? "",
                location: hotel.location ?? "",
                category: hotel.category ?? "Hotel",
                price: hotel.price?.toString() ?? "",
                status: hotel.status ?? "Aktif",
                image: hotel.image ?? "",
                description: hotel.description ?? "",
            });
        }
    }, [hotel]);

    function handleForm(e, fieldName) {
        setForm((old) => ({ ...old, [fieldName]: e.target.value }));
    }

    function onSubmit(e) {
        e.preventDefault();
        const payload = {
            ...form,
            name: form.name.trim(),
            location: form.location.trim(),
            price: Number(form.price),
            image: form.image.trim(),
            description: form.description.trim(),
        };
        handleSubmit(e, payload);
    }

    return (
        <section className="max-w-3xl">
            <Link to="/hotels" className="text-sm text-blue-700">
                ← Kembali
            </Link>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-blue-950">
                {nameProp}
            </h1>
            <form
                onSubmit={onSubmit}
                className="mt-6 space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
                <label className="block text-sm font-medium">
                    Nama penginapan
                    <input
                        required
                        value={form.name}
                        onChange={(e) => handleForm(e, "name")}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-blue-600 focus:bg-white"
                    />
                </label>
                <label className="block text-sm font-medium">
                    Lokasi
                    <input
                        required
                        value={form.location}
                        onChange={(e) => handleForm(e, "location")}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-blue-600 focus:bg-white"
                    />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium">
                        Kategori
                        <select
                            value={form.category}
                            onChange={(e) => handleForm(e, "category")}
                            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-blue-600 focus:bg-white"
                        >
                            {seedCategories.map((category) => (
                                <option key={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </label>
                    <label className="block text-sm font-medium">
                        Harga per malam (Rp)
                        <input
                            type="number"
                            min="1"
                            step="1"
                            required
                            value={form.price}
                            onChange={(e) => handleForm(e, "price")}
                            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-blue-600 focus:bg-white"
                        />
                    </label>
                </div>
                <label className="block text-sm font-medium">
                    URL gambar
                    <input
                        type="url"
                        required
                        value={form.image}
                        onChange={(e) => handleForm(e, "image")}
                        placeholder="https://..."
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-blue-600 focus:bg-white"
                    />
                </label>
                <label className="block text-sm font-medium">
                    Deskripsi
                    <textarea
                        rows={3}
                        value={form.description}
                        onChange={(e) => handleForm(e, "description")}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-blue-600 focus:bg-white"
                    />
                </label>
                <label className="block text-sm font-medium">
                    Status
                    <select
                        value={form.status}
                        onChange={(e) => handleForm(e, "status")}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-blue-600 focus:bg-white"
                    >
                        <option>Aktif</option>
                        <option>Draft</option>
                    </select>
                </label>
                <div className="flex items-center gap-4 pt-2">
                    <button className="cursor-pointer rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800">
                        Simpan
                    </button>
                    <Link to="/hotels" className="text-sm text-slate-600">
                        Batal
                    </Link>
                </div>
            </form>
        </section>
    );
}
