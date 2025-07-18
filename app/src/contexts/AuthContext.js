import { useState, useEffect, createContext } from "react";
import { auth } from "../services/firebase";
import api from "../services/axios";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Send request to your Go backend login endpoint
          const response = await api.post("/login", {
            email: user.email,
          });
  
          const userDetails = response.data.user;
  
          setCurrentUser({
            uuid: userDetails.uuid,
            email: userDetails.email,
            role: userDetails.role,
            lName: userDetails.lname,
            status: userDetails.account_status,
            // add other fields as needed
          });
        } catch (err) {
          console.error("Failed to fetch user data from backend:", err);
          setCurrentUser({
            uid: user.uid,
            email: user.email,
          }); // fallback
        }
      } else {
        setCurrentUser(null);
      }
  
      setLoading(false);
    });
  
    return unsubscribe;
  }, []);
  

  return (
    <AuthContext.Provider value={{ currentUser,loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

//PropTypes for linting
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
