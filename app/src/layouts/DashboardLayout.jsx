import Navbar from "../components/shared/Navbar"
import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
  //handle toggle menu
  const toggleMenu = () => {
    // Logic to toggle the sidebar menu
    console.log("Menu toggled")
  }
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="w-full p-4 ">
        <Navbar toggleMenu={toggleMenu}/>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout