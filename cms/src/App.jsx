import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import BaseLayout from "./layout/BaseLayout";
import { STORAGE_KEYS } from "./constant/storageKeys";
import { seedHotels } from "./data/hotels";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import UpdatePage from "./pages/UpdatePage";
import UploadImagePage from "./pages/UploadImagePage";
import CategoryPage from "./pages/CategoryPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
    const [hotels, setHotels] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.hotels));
            return Array.isArray(saved) ? saved : seedHotels;
        } catch {
            return seedHotels;
        }
    });

    function saveHotels(nextHotels) {
        localStorage.setItem(STORAGE_KEYS.hotels, JSON.stringify(nextHotels));
        setHotels(nextHotels);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<BaseLayout />}>
                    <Route path="/" element={<DashboardPage hotels={hotels} />} />
                    <Route path="/home" element={<Navigate to="/" replace />} />
                    <Route
                        path="/hotels"
                        element={<HomePage hotels={hotels} saveHotels={saveHotels} />}
                    />
                    <Route
                        path="/add"
                        element={<AddPage hotels={hotels} saveHotels={saveHotels} />}
                    />
                    <Route
                        path="/edit/:id"
                        element={<UpdatePage hotels={hotels} saveHotels={saveHotels} />}
                    />
                    <Route
                        path="/hotels/:id/image"
                        element={<UploadImagePage hotels={hotels} saveHotels={saveHotels} />}
                    />
                    <Route path="/categories" element={<CategoryPage hotels={hotels} />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/hotels/new" element={<Navigate to="/add" replace />} />
                    <Route
                        path="/hotels/:id/edit"
                        element={<UpdatePage hotels={hotels} saveHotels={saveHotels} />}
                    />
                    <Route path="/staff/new" element={<Navigate to="/register" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
