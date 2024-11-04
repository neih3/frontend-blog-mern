import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import DetailPage from "../pages/DetailPage/DetailPage";
import ProfilePage from "../pages/ProfilePage";
import UpdatePage from "../pages/UpdatePage";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import EditDashBoard from "../pages/EditDashBoard";
import EditPage from "../pages/EditPage/EditPage";

function ProtectedRoute() {
  // Capitalized the component name
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function RejectedRoute() {
  // Capitalized the component name
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

function useRouterElement() {
  const routeElement = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/dashboard/user/:id",
      element: <EditDashBoard />,
    },
    {
      path: "forgot-password",
      element: <ForgetPassword />,
    },
    {
      path: "/password-reset/:token",
      element: <ResetPassword />,
    },
    {
      path: "/detail/:id",
      element: <DetailPage />,
    },
    { path: "/:id", element: <HomePage></HomePage> },
    {
      path: "",
      element: <RejectedRoute />, // Updated to use the capitalized name
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },

        {
          path: "/register",
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: "",
      element: <ProtectedRoute />, // Apply the ProtectedRoute for authenticated access
      children: [
        {
          path: "/editBlog",
          element: <EditPage />,
        },
        {
          path: "/updateBlog/:id",
          element: <UpdatePage></UpdatePage>,
        },
        {
          path: "/profile",
          element: <ProfilePage></ProfilePage>,
        },
      ],
    },
  ]);
  return routeElement;
}

export default useRouterElement;
