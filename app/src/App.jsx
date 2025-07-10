import {Suspense,lazy} from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/shared/ErrorBoundary";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import Loading from "./components/shared/Loading";

//lazy imports

//layouts and other shared c
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const ToastContainer = lazy(() => import("react-toastify").then(module => ({ default: module.ToastContainer })));
const NotFound = lazy(() => import("./components/shared/NotFound"));

//public components/pages
const ComingSoon = lazy(() => import("./components/ComingSoon"));
const Login = lazy(() => import("./pages/auth/Login"));

//protected components

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* public routes */}
            <Route element={<AuthLayout />}>
              <Route path="/" element={<ComingSoon />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* protected */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Login />} />
            </Route>
          </Routes>
        </Suspense>
        <ToastContainer />
      </Router>
    </ErrorBoundary>

  );
}

export default App;

