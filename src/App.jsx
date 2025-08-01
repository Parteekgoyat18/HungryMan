import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { UserProgContextProvider } from "./store/UserProgContext";
// import  CartContextProvider  from "./store/CartContext";

function App() {
  return (
    // <CartContext.Provider>
    <UserProgContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <CheckOut/>
      </CartContextProvider>

      {/* // </CartContext.Provider> */}
    </UserProgContextProvider>
  );
}

export default App;
