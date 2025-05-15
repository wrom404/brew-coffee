import Header from "./components/ui-components/Header";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
