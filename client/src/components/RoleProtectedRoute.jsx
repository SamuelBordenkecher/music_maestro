import { Navigate, Outlet, useOutletContext } from "react-router-dom";

function RoleProtectedRoute({ role }) {
  const { user } = useOutletContext();

  if (!user) {
      return <Navigate to='/auth' />;
  }
  if (role === "teacher" && !user.is_teacher) return <Navigate to="/" />;
  if (role === "student" && !user.is_student) return <Navigate to="/" />;

  return <Outlet />;
}

export default RoleProtectedRoute;