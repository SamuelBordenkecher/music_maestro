import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import MyProfilePage from "./pages/MyProfilePage.jsx";
import TeacherProfilePage from "./pages/TeacherProfilePage.jsx";
import StudentProfilePage from "./pages/StudentProfilePage.jsx";
import LessonFormPage from "./pages/LessonFormPage.jsx";
import LessonsPage from "./pages/LessonPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleProtectedRoute from "./components/RoleProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage/>,
    children: [
      {index: true, element: <HomePage />},
      {path: "/auth", element: <AuthPage />},
      {path: "/teachers/:id", element: <TeacherProfilePage />},

      {
        element: <ProtectedRoute />,
        children: [
            {path: "/myprofile", element: <MyProfilePage />},

            {
                element: <RoleProtectedRoute role="teacher" />,
                children: [
                    {path: '/students/:id', element: <StudentProfilePage />},
                    {path: "/lessons/new", element: <LessonFormPage />},
                    {path: "/lessons/:id/edit", element: <LessonFormPage />},
                ],
            },
            {
                element: <RoleProtectedRoute role="student" />,
                children: [
                    {path: "lessons/:id", element: <LessonsPage />},
                ]
            },
        ],
    }],
  },
]);

export default router;
