import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Compass, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import Swal from "sweetalert2";
import { toastOptions } from "../constant/alert";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    if (localStorage.access_token) return <Navigate to="/" replace />;

    function handleLogin(e) {
        e.preventDefault();
        try {
            if (email.trim() !== "admin@stayloka.com" || password !== "admin123") {
                throw new Error("Email atau password demo tidak sesuai.");
            }
            localStorage.setItem("access_token", "demo-token-stayloka");
            Swal.fire({
                ...toastOptions,
                icon: "success",
                titleText: "Login demo berhasil.",
                timer: 2500,
            });
            navigate("/", { replace: true });
        } catch (error) {
            console.error(error);
            Swal.fire({ ...toastOptions, icon: "error", titleText: error.message, timer: 3000 });
        }
    }

    return (
        <main className="grid min-h-screen bg-white font-sans text-slate-900 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="relative hidden overflow-hidden bg-blue-950 p-14 text-white lg:flex lg:flex-col lg:justify-between">
                <div className="absolute -top-36 -right-20 size-96 rounded-full bg-blue-600/30 blur-3xl" />
                <div className="absolute -bottom-36 -left-20 size-96 rounded-full bg-sky-400/20 blur-3xl" />
                <div className="relative flex items-center gap-3">
                 <img
                        src={`${import.meta.env.BASE_URL}data/logo.png`}
                        alt="Stayloka"
                        className="h-20 w-auto object-contain"
                    />
                </div>
                <div className="relative max-w-xl">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
                        <ShieldCheck size={17} />
                        Partner Center
                    </span>
                    <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight">
                        Kelola properti dalam satu tempat.
                    </h1>
                    <p className="mt-5 text-lg leading-8 text-blue-200">
                        Pantau daftar penginapan, kategori, gambar, dan data staf dari CMS Stayloka.
                    </p>
                </div>
                <p className="relative text-sm text-blue-300">
                    Demo frontend GC02
                </p>
            </section>
            <section className="flex items-center justify-center px-5 py-12">
                <div className="w-full max-w-md">
                <div className="mb-8 flex items-center gap-3 lg:hidden">
                <img
                        src={`${import.meta.env.BASE_URL}public/data/logo.png`}
                        alt="Stayloka"
                        className="h-9 w-auto object-contain"
                    />
                </div>
                    <p className="text-sm font-bold tracking-widest text-blue-600">CMS STAYLOKA</p>
                    <h2 className="mt-2 text-3xl font-extrabold text-blue-950">
                        Selamat datang kembali
                    </h2>
                    <p className="mt-3 text-slate-500">Masuk untuk mengelola data penginapan.</p>
                    <form onSubmit={handleLogin} className="mt-8 space-y-5">
                        <label className="block text-sm font-semibold text-slate-700">
                            Email
                            <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-300 px-4 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
                                <Mail size={19} className="text-slate-400" />
                                <input
                                    type="email"
                                    autoComplete="username"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@stayloka.com"
                                    className="w-full py-3.5 outline-none"
                                />
                            </span>
                        </label>
                        <label className="block text-sm font-semibold text-slate-700">
                            Password
                            <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-300 px-4 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
                                <LockKeyhole size={19} className="text-slate-400" />
                                <input
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan password"
                                    className="w-full py-3.5 outline-none"
                                />
                            </span>
                        </label>
                        <button className="w-full cursor-pointer rounded-xl bg-blue-700 px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800">
                            Masuk ke CMS
                        </button>
                    </form>
                    <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-7 text-blue-900">
                        <strong>Akunnya ya :</strong>
                        <br />
                        admin@stayloka.com · admin123
                        <br />
                    </div>
                </div>
            </section>
        </main>
    );
}
