import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInSchema, SignInSchema } from "@/lib/zod/authSchema";
import { Dispatch, SetStateAction, useState } from "react";
import { X } from "lucide-react";
import { useSignIn } from "@/hooks/auth/useSignIn";
import toast from "react-hot-toast";

const SignInModal = ({
  setIsSignInModalOpen,
  isSignInModalOpen,
  setIsSignUpModalOpen,
}: // isSignUpModalOpen,
  {
    setIsSignInModalOpen: Dispatch<SetStateAction<boolean>>;
    isSignInModalOpen: boolean;
    setIsSignUpModalOpen: Dispatch<SetStateAction<boolean>>;
    // isSignUpModalOpen: boolean;
  }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const { mutate: signIn, isPending: isSigningIn, } = useSignIn();
  const [signInError, setSignInError] = useState<string>('');

  if (!isSignInModalOpen) return null;

  const onSubmit: SubmitHandler<SignInSchema> = (data) => {
    // The onSuccess and onError callbacks below allow us to handle the result of the signIn mutation directly.
    // - onSuccess is called when the API request succeeds and returns the response data (e.g., user info, token).
    // - onError is triggered if the API request fails (e.g., invalid credentials, network issues).
    // These callbacks let us show appropriate feedback (e.g., error message or redirect on login success) immediately after the mutation.
    signIn(data, {
      onSuccess: (successDataResult) => {
        toast.success(successDataResult?.message as string)
        setIsSignInModalOpen(false)
      },
      onError: (errorData) => {
        console.log("errorData: ", errorData)
        setSignInError(errorData.message)
      }
    })
  };


  const handleSignUp = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(true);
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
          onClick={() => setIsSignInModalOpen(false)}
        >
          <X size={20} />
        </button>

        {/* Modal content */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>
          <div>
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
                  className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
                {
                  signInError && signInError == "Email not found." && (
                    <h3 className="text-red-500 text-sm my-2 text-start">{signInError}</h3>
                  )
                }
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
                  className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
                {
                  signInError && signInError == "Password is incorrect." && (
                    <h3 className="text-red-500 text-sm my-2 text-start">{signInError}</h3>
                  )
                }
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors cursor-pointer"
            >
              {isSigningIn ? <span className="loader"></span> : 'Sign in'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={handleSignUp}
                className="text-amber-600 hover:text-amber-800 font-medium cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInModal;
