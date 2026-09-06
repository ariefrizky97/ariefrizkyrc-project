import { Outlet, Navigate } from "react-router";
import AppLayout from "../components/AppLayout";

export default function BaseLayout() {
    if (!localStorage.access_token) return <Navigate to="/login" replace />;

    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    );
}
