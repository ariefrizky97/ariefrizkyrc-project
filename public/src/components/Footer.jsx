import { NavLink } from "react-router";
import {
  ArrowUp,
  ArrowUpRight,
  BedDouble,
  Camera,
  CircleHelp,
  Compass,
  Heart,
  MapPin,
  Globe2,
  Music2,
  Play,
} from "lucide-react";

export default function Footer() {
  return (
    <footer id="bantuan" className="scroll-mt-24 bg-blue-950 text-white">
      <div className="mx-auto max-w-6xl px-5 pt-12 pb-6">
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-[1.2fr_0.7fr_1.2fr]">
          <div>
            <NavLink
              to="/"
              aria-label="Stayloka beranda"
              className="inline-flex items-center gap-3"
            >
            <img
                src={`${import.meta.env.BASE_URL}data/logo.png`}
                alt="Stayloka"
                className="h-18 w-auto object-contain"
            />
            </NavLink>
            <p className="mt-5 max-w-xs text-sm leading-7 text-blue-200">
              Dari singgah sejenak hingga liburan panjang, temukan tempat
              istirahat pilihanmu.
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-blue-200">
              <MapPin size={16} aria-hidden="true" />
              Jelajahi penginapan di Indonesia
            </p>
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-white">
                Follow kami
              </p>
              <div className="flex gap-2">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Buka Instagram"
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 text-blue-100 hover:bg-white/10 hover:text-white"
                >
                  <Camera size={18} />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Buka YouTube"
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 text-blue-100 hover:bg-white/10 hover:text-white"
                >
                  <Play size={18} />
                </a>
                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Buka TikTok"
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 text-blue-100 hover:bg-white/10 hover:text-white"
                >
                  <Music2 size={18} />
                </a>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-5 text-sm font-semibold tracking-wide">
              Jelajahi Stayloka
            </h2>
            <div className="space-y-4 text-sm text-blue-200">
              <NavLink
                to="/"
                className="flex items-center gap-2 hover:text-white"
              >
                <Compass size={16} aria-hidden="true" />
                Beranda
                <ArrowUpRight
                  size={14}
                  className="ml-auto"
                  aria-hidden="true"
                />
              </NavLink>
              <NavLink
                to="/#penginapan"
                className="flex items-center gap-2 hover:text-white"
              >
                <BedDouble size={16} aria-hidden="true" />
                Pilihan penginapan
                <ArrowUpRight
                  size={14}
                  className="ml-auto"
                  aria-hidden="true"
                />
              </NavLink>
              <p className="flex items-start gap-2 leading-6">
                <Heart size={16} className="mt-1 shrink-0" aria-hidden="true" />
                Simpan favorit lewat ikon hati pada kartu.
              </p>
            </div>
          </div>
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide">
              <CircleHelp
                size={18}
                className="text-sky-300"
                aria-hidden="true"
              />
              Bantuan singkat
            </h2>
            <details className="group border-b border-white/15 py-3">
              <summary className="cursor-pointer text-sm font-medium">
                Apakah sudah bisa memesan?
              </summary>
              <p className="mt-3 text-sm leading-6 text-blue-200">
                Belum. Stayloka ini adalah proyek latihan frontend GC2.
              </p>
            </details>
            <details className="group border-b border-white/15 py-3">
              <summary className="cursor-pointer text-sm font-medium">
                Di mana favorit saya tersimpan?
              </summary>
              <p className="mt-3 text-sm leading-6 text-blue-200">
                Buka daftar penginapan dan centang
                “Hanya favorit” untuk melihatnya.
              </p>
            </details>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5 pt-6 text-sm text-blue-200">
          <p>
            © {new Date().getFullYear()} Stayloka · Frontend by ariefrizkyrc
          </p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <Globe2 size={16} aria-hidden="true" />
              Indonesia · IDR
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Kembali ke atas"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
            >
              <ArrowUp size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
