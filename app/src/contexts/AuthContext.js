import { useState, useEffect, createContext } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: email,
        });
      } else {
        setCurrentUser({
          uid:"012",
          email:"ichami"
        });
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
