import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toastOptions } from "../constant/alert";
import LodgingForm from "../components/LodgingForm";

export default function AddPage({ hotels, saveHotels }) {
    const navigate = useNavigate();

    function handleSubmit(e, form) {
        e.preventDefault();
        try {
            if (!form.name || !form.location || !Number.isFinite(form.price) || form.price < 1)
                throw new Error("Nama, lokasi, dan harga wajib valid.");
            const id = Math.max(0, ...hotels.map((hotel) => hotel.id)) + 1;
            saveHotels([...hotels, { ...form, id }]);
            Swal.fire({
                ...toastOptions,
                icon: "success",
                titleText: "Penginapan berhasil ditambahkan.",
                timer: 2500,
            });
            navigate("/hotels");
        } catch (error) {
            console.error(error);
            Swal.fire({
                ...toastOptions,
                icon: "error",
                titleText: `Gagal menyimpan: ${error.message}`,
                timer: 3000,
            });
        }
    }

    return <LodgingForm nameProp="Tambah penginapan" handleSubmit={handleSubmit} />;
}
