import { Suspense, useCallback, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import Sidebar from "../components/shared/Sidebar";
import ErrorFallback from "../components/shared/ErrorBoundary";
import Loading from "../components/shared/Loading";
import PropTypes from "prop-types";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleMenu = useCallback(() => setSidebarOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex lg:flex-col lg:w-[18%] flex-shrink-0 bg-white shadow-md"
        aria-label="Sidebar"
      >
        <div className="flex items-center px-4 py-5">
          <NavLink to="/dashboard" className="flex items-center gap-2">
            <img
              src="/logo192.png"
              alt="LinkAuto logo"
              className="w-6 h-6"
              width={24}
              height={24}
              loading="lazy"
              decoding="async"
            />
            <span className="text-lg font-bold text-primaryTextColor">
              LinkAuto
            </span>
          </NavLink>
        </div>
        <div className="flex-1 px-2 overflow-y-auto">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Sidebar open={true} />
          </ErrorBoundary>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={closeSidebar}
            aria-hidden="true"
          ></div>

          {/* Sidebar */}
          <aside
            className="relative z-50 w-64 p-4 bg-white shadow-lg"
            aria-label="Mobile Sidebar"
          >
            <div className="flex items-center justify-between mb-4">
              <NavLink to="/dashboard" className="flex items-center gap-2">
                <img
                  src="/logo192.png"
                  alt="LinkAuto logo"
                  className="w-6 h-6"
                  width={24}
                  height={24}
                  loading="lazy"
                  decoding="async"
                />
                <span className="text-lg font-bold text-primaryTextColor">
                  LinkAuto
                </span>
              </NavLink>
              <button
                onClick={closeSidebar}
                className="text-xl text-gray-600 hover:text-gray-900"
                aria-label="Close sidebar"
              >
                &times;
              </button>
            </div>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Sidebar open={true} />
            </ErrorBoundary>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header
          className="z-10 flex-shrink-0 p-4 shadow-sm"
          role="banner"
          aria-label="Navbar"
        >
          <Navbar toggleMenu={toggleMenu} />
        </header>

        <main
          className="flex-1 px-4 py-6 overflow-y-auto sm:px-6 lg:px-8"
          role="main"
          aria-label="Main Content"
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loading />}>
              {children || <Outlet />}
            </Suspense>
          </ErrorBoundary>
        </main>

        <footer
          className="flex-shrink-0 px-4 py-3 border-t border-gray-200"
          role="contentinfo"
          aria-label="Footer"
        >
          <Footer />
        </footer>
      </div>
    </div>
  );
};
DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
