import { useSignOut } from "@/hooks/auth/useSignOut"
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const { mutate: signOut, isSuccess, isPending: signingOut, isError: signOutError } = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    signOut();
  }, [signOut])

  if (isSuccess) {
    console.log("SignOut successfully.")
    navigate('/')
  }

  if (signingOut) {
    <div className="min-h-full flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  }

  if (signOutError) {
    return (
      <div className="min-h-full flex justify-center items-center">
        <span className="text-red-600 text-2xl">
          Error while fetching events
        </span>
      </div>
    );
  }

  return (
    <div>Logout</div>
  )
}

export default Logout;