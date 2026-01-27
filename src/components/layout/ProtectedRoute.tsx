import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
    requireAdmin?: boolean;
}

export function ProtectedRoute({ requireAdmin = false }: ProtectedRouteProps) {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && !user?.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
