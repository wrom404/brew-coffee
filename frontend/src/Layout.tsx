import Header from "./components/ui-components/Header";
import { Outlet } from "react-router";
import { useGetCurrentUser } from "./hooks/user/useGetCurrentUser";
import useUser from "./store/useUser";
import { useEffect } from "react";

const Layout = () => {
  const { data: currentUser, isPending: isFetchingUser, isError: fetchError } = useGetCurrentUser()
  const { currentUserId, setCurrentUserId } = useUser();

  useEffect(() => {
    if (currentUser) {
      setCurrentUserId(currentUser.currentUser.id)
    }
  }, [currentUser, setCurrentUserId])

  console.log("currentUser: ", currentUserId)

  if (isFetchingUser) {
    <h1>Loading...</h1>
  }

  if (fetchError) {
    console.log("Something went wrong.")
  }

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
