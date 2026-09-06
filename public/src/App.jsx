import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "./layout/BaseLayout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<BaseLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/hotel/:id" element={<DetailPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
