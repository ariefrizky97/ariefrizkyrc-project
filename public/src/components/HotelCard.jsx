import { Link } from "react-router";
import { Heart, MapPin, Star } from "lucide-react";

export default function HotelCard({ hotel, favourite, onToggleFavourite }) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative overflow-hidden">
                <Link to={`/hotel/${hotel.id}`}>
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        loading="lazy"
                        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                </Link>
                <span className="absolute bottom-3 left-3 rounded-full bg-blue-950/85 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    {hotel.category}
                </span>
                <button
                    type="button"
                    onClick={() => onToggleFavourite(hotel.id)}
                    aria-label={`${favourite ? "Hapus" : "Simpan"} ${hotel.name} ${favourite ? "dari" : "ke"} favorit`}
                    aria-pressed={favourite}
                    className="absolute top-3 right-3 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white text-rose-600 shadow-md transition hover:scale-105"
                >
                    <Heart size={20} fill={favourite ? "currentColor" : "none"} />
                </button>
            </div>
            <div className="p-5">
                <p className="flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin size={15} />
                    {hotel.location}
                </p>
                <Link
                    to={`/hotel/${hotel.id}`}
                    className="mt-2 line-clamp-2 block min-h-14 text-lg font-bold leading-7 text-slate-900 hover:text-blue-700"
                >
                    {hotel.name}
                </Link>
                <p className="mt-2 flex items-center gap-1.5 text-sm">
                    <span className="flex items-center gap-1 rounded-md bg-blue-700 px-2 py-1 font-bold text-white">
                        <Star size={13} fill="currentColor" />
                        {hotel.rating}
                    </span>
                    <span className="text-slate-500">({hotel.reviews} ulasan)</span>
                </p>
                <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                    <p>
                        <span className="block text-xl font-extrabold text-blue-950">
                            Rp {Number(hotel.price).toLocaleString("id-ID")}
                        </span>
                        <span className="text-xs text-slate-500">per kamar / malam</span>
                    </p>
                    <Link
                        to={`/hotel/${hotel.id}`}
                        className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 hover:bg-blue-100"
                    >
                        Lihat
                    </Link>
                </div>
            </div>
        </article>
    );
}
