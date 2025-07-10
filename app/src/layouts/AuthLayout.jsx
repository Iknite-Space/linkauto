import {Outlet} from "react-router-dom";
import PropTypes from "prop-types";
const AuthLayout = ({children}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {children || <Outlet />}
    </div>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node,
}
export default AuthLayout