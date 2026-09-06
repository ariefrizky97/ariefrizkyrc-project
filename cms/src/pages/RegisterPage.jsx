import { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toastOptions } from "../constant/alert";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleRegister(e) {
        e.preventDefault();
        Swal.fire({
            ...toastOptions,
            icon: "info",
            titleText: "Form valid. Akun belum dibuat karena backend belum tersedia.",
            timer: 4000,
        });
        setPassword("");
    }

    return (
        <section className="max-w-md">
            <h1 className="text-2xl font-bold">Form staff</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Latihan form register saja.
            </p>
            <form
                onSubmit={handleRegister}
                className="mt-5 space-y-4 rounded-lg border border-slate-200 bg-white p-5"
            >
                <label className="block text-sm font-medium">
                    Email
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full rounded border border-slate-300 p-2.5"
                    />
                </label>
                <label className="block text-sm font-medium">
                    Password contoh
                    <input
                        type="password"
                        autoComplete="new-password"
                        minLength={6}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full rounded border border-slate-300 p-2.5"
                    />
                </label>
                <div className="flex items-center gap-4">
                    <button className="cursor-pointer rounded bg-blue-600 px-4 py-2.5 text-sm font-medium text-white">
                        Coba form
                    </button>
                    <Link to="/hotels" className="text-sm text-slate-600">
                        Kembali
                    </Link>
                </div>
            </form>
        </section>
    );
}
