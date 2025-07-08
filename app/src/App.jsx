import {Suspense,lazy} from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/shared/ErrorBoundary";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'

//lazy imports

//layouts and other shared c
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const ToastContainer = lazy(() => import("react-toastify").then(module => ({ default: module.ToastContainer })));
const Loading = lazy(() => import("./components/shared/Loading"));
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
          </Routes>
        </Suspense>
        <ToastContainer />
      </Router>
    </ErrorBoundary>

  );
}

export default App;

