import { Outlet } from "react-router-dom"
import HomeFooter from "../components/shared/HomeFooter"

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <header>
            {/* the header component comes here */}
            <h2>header here</h2>
        </header>
        <main className="flex-grow px-6 md:px-20">
            <Outlet />
        </main>

        <footer className="px-6 py-10 md:px-20">
            <HomeFooter />
        </footer>
    </div>
  )
}

export default HomeLayout