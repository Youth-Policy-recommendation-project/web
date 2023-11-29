import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      const isValidToken = accessToken && accessToken !== 'null' && accessToken !== 'undefined';
  
      setIsLoggedIn(isValidToken);
    }, []);

  const handleLogout = () => {
    fetch("/api/members/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('accessToken'),

      },
    })
      .then((res) => {
        if (res.ok) {
          localStorage.clear();
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };
  
  const authContextValue = {
    isLoggedIn,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
