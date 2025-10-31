/** biome-ignore-all assist/source/organizeImports: <"explanation"> */
import { Navigate, Outlet } from "react-router";
import { useAuth } from "./auth-context";
import { toast } from "sonner";

export function PrivateRoute() {
    const { isAuthenticated, signOut } = useAuth();

    const expirationDate = new Date("2025-10-31T18:18:52.295Z");
    const now = new Date();

    if (expirationDate < now) {
        toast.error("Token expirado. Faça login novamente!", {
            position: 'top-center',
            style: {
                background: '#b30000',
                color: '#fff',
                border: '1px solid #b30000',
            },
        })
        signOut()
        return <Navigate to="/login" />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
