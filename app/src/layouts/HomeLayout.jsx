import { Outlet } from "react-router-dom"
import HomeFooter from "../components/shared/HomeFooter"
import Navbar from "../components/NavBar"

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
        <header >
          {/* the header component comes here */}
          <Navbar /> 
        </header>
        <main className="flex-grow">
            <Outlet />
        </main>

        <footer className="py-10 bg-gray-100 lg:px-7 md:px-20">
            <HomeFooter />
        </footer>
    </div>
  )
}

export default HomeLayout