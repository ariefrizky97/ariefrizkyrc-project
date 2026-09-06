import { Image, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";

export default function HotelTable({ hotels, onDelete, compact = false }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                        <th scope="col" className="p-4">
                            Penginapan
                        </th>
                        <th scope="col" className="p-4">
                            Kategori
                        </th>
                        <th scope="col" className="p-4">
                            Harga / malam
                        </th>
                        <th scope="col" className="p-4">
                            Status
                        </th>
                        {!compact && (
                            <th scope="col" className="p-4">
                                Aksi
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {hotels.map((hotel) => (
                        <tr
                            key={hotel.id}
                            className="border-b border-slate-100 transition hover:bg-blue-50/40 last:border-0"
                        >
                            <td className="p-4">
                                <div className="flex min-w-60 items-center gap-3">
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        className="h-14 w-18 rounded-xl object-cover"
                                    />
                                    <div>
                                        <p className="font-bold text-slate-800">{hotel.name}</p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {hotel.location}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4">
                                <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                                    {hotel.category}
                                </span>
                            </td>
                            <td className="p-4 whitespace-nowrap font-semibold text-slate-700">
                                Rp {Number(hotel.price).toLocaleString("id-ID")}
                            </td>
                            <td className="p-4">
                                <span
                                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${hotel.status === "Aktif" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                                >
                                    <span
                                        className={`size-1.5 rounded-full ${hotel.status === "Aktif" ? "bg-emerald-500" : "bg-amber-500"}`}
                                    />
                                    {hotel.status}
                                </span>
                            </td>
                            {!compact && (
                                <td className="p-4">
                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        <Link
                                            to={`/edit/${hotel.id}`}
                                            title="Edit"
                                            aria-label={`Edit ${hotel.name}`}
                                            className="rounded-lg border border-slate-200 p-2 text-blue-700 hover:bg-blue-50"
                                        >
                                            <Pencil size={16} />
                                        </Link>
                                        <Link
                                            to={`/hotels/${hotel.id}/image`}
                                            title="Ganti gambar"
                                            aria-label={`Ganti gambar ${hotel.name}`}
                                            className="rounded-lg border border-slate-200 p-2 text-violet-700 hover:bg-violet-50"
                                        >
                                            <Image size={16} />
                                        </Link>
                                        <button
                                            onClick={() => onDelete(hotel.id)}
                                            title="Hapus"
                                            aria-label={`Hapus ${hotel.name}`}
                                            className="cursor-pointer rounded-lg border border-slate-200 p-2 text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                    {!hotels.length && (
                        <tr>
                            <td
                                colSpan={compact ? 4 : 5}
                                className="p-10 text-center text-slate-500"
                            >
                                Tidak ada penginapan.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
