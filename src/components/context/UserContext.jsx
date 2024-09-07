import { createContext, useState } from "react";

export const UserContext = createContext({
  userId: undefined,
});

const UserContextProvider = ({ children }) => {
    const [userId,setUserId] = useState(undefined);
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};


export default UserContextProvider;