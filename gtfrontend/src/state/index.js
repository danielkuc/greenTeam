import React, { createContext, useState, useContext } from 'react';

// creating context for global state
const UserContext = createContext();
const LoginContext = createContext();

// custom hook to access each context
export const useUserState = () => {
  return useContext(UserContext);
}

export const useLoginState = () => {
  return useContext(LoginContext);
}


// Global State and wrapper
export const GlobalState = ({ children }) => {
  // user state
  const [user, setUser] = useState({});
  // user auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserContext.Provider value={{ user, setUser }} >
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }} >
        {children}
      </LoginContext.Provider>
    </UserContext.Provider>
  )
}