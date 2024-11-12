import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";

import RegisterPage from "../pages/Auth/RegisterPage";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import DetailPage from "../pages/DetailPage/DetailPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import UpdatePage from "../pages/UpdatePage";
import ForgetPassword from "../pages/Auth/ForgetPassword";

import EditDashBoard from "../pages/EditDashBoard";
import EditPage from "../pages/EditPage/EditPage";
import { LoginPage } from "../pages/Auth/LoginPage";
import ResetPassword from "../pages/Auth/ResetPassword";
import Dashboard from "../pages/DashBoard/Dashboard";

// eslint-disable-next-line react-refresh/only-export-components
function ProtectedRoute() {
  // Capitalized the component name
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

// eslint-disable-next-line react-refresh/only-export-components
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
