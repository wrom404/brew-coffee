import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Page";
import CartPage from "./pages/CartPage";
import Layout from "./Layout";
import Logout from "./features/auth/Logout";
import OrderPage from "./pages/OrderPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart/:userId" element={<CartPage />} />
          <Route path="/order/:userId" element={<OrderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
