import { Navigate, Outlet, useOutletContext } from "react-router-dom";

function ProtectedRoute() {
    const { user } = useOutletContext();

    if (!user) {
        return <Navigate to="/auth" />;
    }
    return <Outlet />
}
export default ProtectedRoute