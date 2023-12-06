import { createContext, useState } from 'react';

// Step 1: Create a context
// as the actual values you need the pass
export const UserContext = createContext({
    currentUser:null,
    setCurentUser: () => null,
});

// Step 2: Create a provider component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const values={currentUser,setCurrentUser}

  //allow the child compnent to access all values
  return (
    <UserContext.Provider value={ values }>
      {children}
    </UserContext.Provider>
  );
};