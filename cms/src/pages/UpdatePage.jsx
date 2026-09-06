import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { toastOptions } from "../constant/alert";
import LodgingForm from "../components/LodgingForm";

export default function UpdatePage({ hotels, saveHotels }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const hotel = hotels.find((item) => item.id === Number(id));

    function handleUpdate(e, form) {
        e.preventDefault();
        try {
            if (!form.name || !form.location || !Number.isFinite(form.price) || form.price < 1)
                throw new Error("Nama, lokasi, dan harga wajib valid.");
            saveHotels(
                hotels.map((item) => (item.id === Number(id) ? { ...item, ...form } : item)),
            );
            Swal.fire({
                ...toastOptions,
                icon: "success",
                titleText: "Penginapan berhasil diperbarui.",
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

    if (!hotel)
        return (
            <p>
                Penginapan tidak ditemukan.{" "}
                <Link to="/hotels" className="text-blue-700">
                    Kembali
                </Link>
            </p>
        );
    return (
        <LodgingForm
            key={id}
            nameProp="Edit penginapan"
            hotel={hotel}
            handleSubmit={handleUpdate}
        />
    );
}
