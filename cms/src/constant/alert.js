import Swal from "sweetalert2";
export const toastOptions = {
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    showCloseButton: true,
    closeButtonAriaLabel: "Tutup notifikasi",
    timer: 3500,
    timerProgressBar: true,
    width: "min(24rem, calc(100vw - 2rem))",
    customClass: {
        popup: "!rounded-2xl !border !border-slate-200 !shadow-xl !font-sans",
        title: "!text-sm !font-semibold !text-slate-800",
        timerProgressBar: "!bg-blue-600",
    },
    didOpen(popup) {
        popup.addEventListener("mouseenter", () => Swal.stopTimer());
        popup.addEventListener("mouseleave", () => Swal.resumeTimer());
        popup.addEventListener("focusin", () => Swal.stopTimer());
        popup.addEventListener("focusout", () => Swal.resumeTimer());
    },
};
