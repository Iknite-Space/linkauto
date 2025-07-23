import { Outlet } from "react-router-dom"

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <header>
            {/* the header component comes here */}
            <h2>header here</h2>
        </header>
        <main className="flex-grow p-6">
            <Outlet />
        </main>

        <footer>
            {/* the footer component comes here */}
            <p>footer here</p>
        </footer>
    </div>
  )
}

export default HomeLayout