import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser) // current user | redirect to homepage if successful login (user exists)
  return (
    <Router>
      <Routes>
        <Route exact path = "/" element = {<Home />} />

        {/* List of products with category _____ */}
        <Route path = "/products/:category" element = {<ProductList />} />

         {/* Product with id ____  */}
        <Route path = "/product/:id" element = {<Product />} />
        
        <Route path = "/cart" element = {<Cart/>} />
        <Route path = "/success" element = {<Success/>} />
        <Route
          path = "/login"
          element = {user ? <Navigate replace to = "/" /> : <Login />} // redirect to homepage if successful login (user exists)
        />
        <Route
          path = "/register"
          element = {user ? <Navigate replace to = "/" /> : <Register/>} />
      </Routes>
    </Router>
  )
};

export default App;
