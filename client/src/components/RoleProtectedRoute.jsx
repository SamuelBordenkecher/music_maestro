import { Navigate, Outlet} from "react-router-dom";

function RoleProtectedRoute({ user, role }) {
    if (!user) {
        return <Navigate to='/auth' />;
    }
  if (role === "teacher" && !user.is_teacher) return <Navigate to="/" />;
  if (role === "student" && !user.is_student) return <Navigate to="/" />;

  return <Outlet />;
}

export default RoleProtectedRoute;