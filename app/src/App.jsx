import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/shared/ErrorBoundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/shared/Loading";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/auth/Register";

// Lazy imports
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const ToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({
    default: module.ToastContainer,
  }))
);
const NotFound = lazy(() => import("./components/shared/NotFound"));

// Public pages
const ComingSoon = lazy(() => import("./components/ComingSoon"));
const Login = lazy(() => import("./pages/auth/Login"));
// const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
// Protected pages
const Logout = lazy(() => import("./pages/auth/Logout"));
const UserVerification = lazy(() =>
  import("./pages/dashboard/UserVerification")
);
const VerDocumentInput = lazy(() => import("./pages/dashboard/VerDocumentInput"));
const SingleUserVerification = lazy(() => import("./pages/dashboard/SingleVerPage"));


function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <Router>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public routes */}
              <Route element={<AuthLayout />}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
              </Route>

            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<ComingSoon />} />
              {/* <Route path="profile" element={<ComingSoon />} /> */}
              <Route path="user-verification" element={<UserVerification />} />
              <Route path="ver-document-input" element={<VerDocumentInput />} />
              <Route path="user-verification/:user_uuid" element={<SingleUserVerification />} />
              <Route path="logout" element={<Logout />} />
            </Route>


              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <ToastContainer />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
