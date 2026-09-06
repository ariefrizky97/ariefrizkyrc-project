import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toastOptions } from "../constant/alert";
import baseUrl from "../constant/url";
import { seedCategories } from "../data/categories";

export default function CategoryPage({ hotels }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        async function fetchCategories() {
            try {
                const { data } = await axios.get(`${baseUrl}/categories.json`, {
                    signal: controller.signal,
                });
                if (!Array.isArray(data)) throw new Error("Format kategori tidak valid.");
                setCategories(data);
            } catch (error) {
                if (axios.isCancel(error)) return;
                console.error(error);
                setCategories(seedCategories);
                Swal.fire({
                    ...toastOptions,
                    icon: "info",
                    titleText: "Kategori cadangan ditampilkan.",
                    timer: 3000,
                });
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }
        fetchCategories();
        return () => controller.abort();
    }, []);

    return (
        <section className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-950">
                Kategori penginapan
            </h1>
            <p className="mt-2 text-sm text-slate-500">
                Daftar kategori dibaca.
            </p>
            {loading ? (
                <p role="status" className="mt-5">
                    Memuat kategori...
                </p>
            ) : (
                <table className="mt-6 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left text-sm shadow-sm">
                    <thead className="bg-slate-100">
                        <tr>
                            <th scope="col" className="p-4">
                                Kategori
                            </th>
                            <th scope="col" className="p-4">
                                Jumlah penginapan CMS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id} className="border-t border-slate-200">
                                <td className="p-4">{category.name}</td>
                                <td className="p-4">
                                    {
                                        hotels.filter((hotel) => hotel.category === category.name)
                                            .length
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}
