import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Page";
import CartPage from "./pages/CartPage";
import Layout from "./Layout";
import Logout from "./features/auth/Logout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
