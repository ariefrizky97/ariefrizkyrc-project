import { Database, Compass } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-sm text-slate-500">
            <p className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Stayloka</span> ·{" "}
                    {new Date().getFullYear()}
                </p>
                <p className="flex items-center gap-2">
                    <Database size={16} aria-hidden="true" />
                    Demo frontend
                </p>
            </div>
        </footer>
    );
}
