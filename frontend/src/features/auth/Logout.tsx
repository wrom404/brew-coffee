import { useSignOut } from "@/hooks/auth/useSignOut";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Logout = () => {
  const { mutate: signOut, isPending: signingOut, isError: signOutError } = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    signOut(undefined, {
      onSuccess: (message) => {  // Changed from isSuccess to onSuccess
        toast.success(message?.message as string)
        navigate("/")
      },
      onError: () => {
        console.log("")
      }
    });
  }, [signOut, navigate]);

  if (signingOut) {
    return (  // Added missing return statement
      <div className="min-h-full flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (signOutError) {
    return (
      <div className="min-h-full flex justify-center items-center">
        <span className="text-red-600 text-2xl">
          Error while logging out
        </span>
      </div>
    );
  }

  return <div>Logging out...</div>;
};

export default Logout;