import { Navigate, Outlet, useOutletContext } from "react-router-dom";

function ProtectedRoute() {
    const { user, setUser } = useOutletContext();
    if (!user) {
        return <Navigate to="/auth" />;
    }
    return <Outlet context={{user}} />
}
export default ProtectedRoute