// NotFound.jsx
import { useLocation } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import AuthLayout from "../../layouts/AuthLayout";

const NotFound = () => {
  const { pathname } = useLocation();

  const isDashboard = pathname.startsWith("/dashboard");

  const content = (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-3xl font-bold text-red">404</h1>
      <p className="mt-2 text-lg text-gray-600">Page not found</p>
    </div>
  );

  return isDashboard ? (
    <DashboardLayout>{content}</DashboardLayout>
  ) : (
    <AuthLayout>{content}</AuthLayout>
  );
};

export default NotFound;
