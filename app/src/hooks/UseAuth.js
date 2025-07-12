import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

//create a hook to access the user context easily from any component
export const useUser = () => {
    return useContext(AuthContext);
}