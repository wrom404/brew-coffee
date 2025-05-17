import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, signUpSchema } from "@/lib/zod/authSchema";
import { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";

const SignUpModal = ({
  setIsSignInModalOpen,
  // isSignInModalOpen,
  setIsSignUpModalOpen,
  isSignUpModalOpen,
}: // isSignUpModalOpen,
{
  setIsSignInModalOpen: Dispatch<SetStateAction<boolean>>;
  // isSignInModalOpen: boolean;
  setIsSignUpModalOpen: Dispatch<SetStateAction<boolean>>;
  isSignUpModalOpen: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  if (!isSignUpModalOpen) return null;

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    console.log("Signing up...");
    console.log("data: ", data);
  };
  const handleGoogleAuth = () => {
    console.log("Signing up with google...");
  };
  const handleNavigateSignIn = () => {
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(true);
  };
  return (
    <div className="fixed h-screen w-full inset-0 bg-black/50 flex items-center justify-center p-4 z-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-xl w-full max-w-md relative overflow-hidden"
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => setIsSignUpModalOpen(false)}
        >
          <X size={20} />
        </button>

        {/* Modal content */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>
          <div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  aria-invalid={errors.name ? "true" : "false"}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  aria-invalid={errors.email ? "true" : "false"}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  aria-invalid={errors.password ? "true" : "false"}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors cursor-pointer"
            >
              Create Account
            </button>
          </div>

          <div>
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Google logo */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="#EA4335"
                  d="M5.27 9.76C6.2 6.94 8.85 4.91 12 4.91c1.69 0 3.22.6 4.42 1.58L19.91 3C17.78 1.15 15.05 0 12 0 7.27 0 3.2 2.7 1.24 6.65L5.27 9.76z"
                />
                <path
                  fill="#34A853"
                  d="M16.04 18.01c-1.09.7-2.48 1.08-4.04 1.08-3.13 0-5.78-2.01-6.72-4.82L1.24 17.33C3.19 21.29 7.27 24 12 24c2.93 0 5.73-1.04 7.83-3.0L16.04 18.01z"
                />
                <path
                  fill="#4A90E2"
                  d="M19.83 21C22.03 18.95 23.45 15.9 23.45 12c0-.71-.11-1.47-.27-2.18H12v4.64h6.44c-.32 1.56-1.17 2.76-2.4 3.56L19.83 21z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.24-.71-.37-1.47-.37-2.27 0-.78.12-1.53.36-2.27L1.24 6.65C.44 8.26 0 10.08 0 12c0 1.92.44 3.74 1.24 5.33l4.04-3.06z"
                />
              </svg>
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={handleNavigateSignIn}
                className="text-amber-600 hover:text-amber-800 font-medium cursor-pointer"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpModal;
