import { createContext, useState } from "react";

const UserProgContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckOut: () => {},
  hideCheckOut: () => {},
});

export function UserProgContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showCheckOut() {
    setUserProgress("checkout");
  }

  function hideCheckOut() {
    setUserProgress("");
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckOut,
    hideCheckOut,
  };

  return (
    <UserProgContext.Provider value={userProgressCtx}>
      {children}
    </UserProgContext.Provider>
  );
}

export default UserProgContext;
