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
const HomeLayout = lazy(() => import("./layouts/HomeLayout"));
const ToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({
    default: module.ToastContainer,
  }))
);
const NotFound = lazy(() => import("./components/shared/NotFound"));
const SingleCar = lazy(() => import("./pages/dashboard/SingleCar"));
const SingleCarPage = lazy(() => import("./pages/dashboard/SingleCarPage"));
const SingleCarDetails = lazy(() => import("./pages/dashboard/SingleCarDetails"));

// Public pages
const HomePage = lazy(() => import("./components/HomePage"));
const ComingSoon = lazy(() => import("./components/ComingSoon"));
const Login = lazy(() => import("./pages/auth/Login"));
// const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword")); 
// Protected pages
const Logout = lazy(() => import("./pages/auth/Logout"));
const UserVerification = lazy(() =>
  import("./pages/dashboard/UserVerification")
);



const CarListing = lazy(() => import("./pages/listings/CarListing"));
const CarUploadForm = lazy(()=>import("./components/form/CarUploadForm"));
const VerDocumentInput = lazy(() => import("./pages/dashboard/VerDocumentInput"));
const SingleUserVerification = lazy(() => import("./pages/dashboard/SingleVerPage"));



function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <Router>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Home layout with public routes */}
              <Route path="/" element={<HomeLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/carlisting" element = {<CarListing/>}/>
              </Route>
              {/* Public routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
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
              <Route path="car-listing" element={<CarListing />} />
              <Route path="upload" element={<CarUploadForm />} />
              <Route path="logout" element={<Logout />} />
              <Route path="single-car" element={<SingleCar />} />
              <Route path="single-car-page" element={<SingleCarPage />} />
              <Route path="single-car-details" element={<SingleCarDetails />} />
            </Route>


              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<ComingSoon />} />
                {/* <Route path="profile" element={<ComingSoon />} /> */}
                <Route
                  path="user-verification"
                  element={<UserVerification />}
                />
                <Route
                  path="ver-document-input"
                  element={<VerDocumentInput />}
                />
                <Route
                  path="user-verification/:user_uuid"
                  element={<SingleUserVerification />}
                />
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
