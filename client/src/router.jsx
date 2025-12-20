import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthPage from "./pages/AuthPage";
import HomePage from "./components/HomePage";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { getUser } from "./services.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage/>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        element: <AuthPage />,
        index: true,
        loader: getUser
      }
    ],
  },
]);

export default router;
