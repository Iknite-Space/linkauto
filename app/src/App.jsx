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
const SingleCarPage = lazy(() => import("./pages/listings/SingleCarPage"));

// Public pages
const HomePage = lazy(() => import("./components/HomePage"));
const Login = lazy(() => import("./pages/auth/Login"));
// const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
// Protected pages
const Home = lazy(() => import("./pages/dashboard/Home"));
const Logout = lazy(() => import("./pages/auth/Logout"));
const UserVerification = lazy(() =>
  import("./pages/dashboard/VerifyUserTable")
);
const SingleUserVerPage = lazy(() =>
  import("./pages/dashboard/SingleUserVerPage")
);

const CarsVerification = lazy(() =>
  import("./pages/dashboard/CarsVerification")
);

const UploadedCars = lazy(() => import("./pages/dashboard/UploadedCars"));

const SingleCarVerPage = lazy(() =>
  import("./pages/dashboard/SingleCarVerPage")
);
const DiffPaymentPage = lazy(() => import("./pages/dashboard/DiffPaymentPage"));

const CarListing = lazy(() => import("./pages/listings/CarListing"));
const CarUploadForm = lazy(() => import("./components/form/CarUploadForm"));

const UserVerDocForm = lazy(() => import("./pages/dashboard/UserVerDocForm"));
const AllPayments = lazy(() => import("./pages/dashboard/AllPayments"));
const AllUsers = lazy(() => import("./pages/dashboard/AllUsers"));

const Payment = lazy(() => import("./pages/Payment"));
const CustomerPayment = lazy(() => import("./pages/dashboard/CustomerPayment"));
const CustomerReservations = lazy(() =>
  import("./pages/dashboard/CustomerReservations")
);

const Reservations = lazy(() => import("./pages/dashboard/Reservations"));

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
                <Route path="/carlisting" element={<CarListing />} />
                <Route path="/carlisting/car/:id" element={<SingleCarPage />} />
                <Route path="/payment" element={<Payment />} />
              </Route>
              {/* Public routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>

              {/* Protected dashboard routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Home />} />
                {/* <Route path="profile" element={<ComingSoon />} /> */}

                <Route
                  path="user-verification"
                  element={<UserVerification />}
                />
                <Route path="cars/upload" element={<CarUploadForm />} />
                <Route path="cars/all" element={<UploadedCars />} />
                <Route path="car-verification" element={<CarsVerification />} />
                <Route
                  path="car-verification/:car_uuid"
                  element={<SingleCarVerPage />}
                />
                <Route path="all-payments" element={<AllPayments />} />
                <Route path="users" element={<AllUsers />} />
                <Route
                  path="customer-reservations"
                  element={<CustomerReservations />}
                />
                <Route path="customer-payments" element={<CustomerPayment />} />
                <Route path="user-ver-doc-form" element={<UserVerDocForm />} />
                <Route path="diff-payment-page" element={<DiffPaymentPage />} />
                <Route
                  path="user-verification/:user_uuid"
                  element={<SingleUserVerPage />}
                />
                <Route path="reservations" element={<Reservations />} />
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
