import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInSchema, SignInSchema } from "@/lib/zod/authSchema";
import { Dispatch, SetStateAction } from "react";
import { Lock, Mail, X } from "lucide-react";

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

  if (!isSignInModalOpen) return null;

  const onSubmit: SubmitHandler<SignInSchema> = (data) => {
    console.log("Signing in...");
    console.log("data: ", data);
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
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  aria-invalid={errors.email ? "true" : "false"}
                  placeholder="you@example.com"
                  className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
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
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  aria-invalid={errors.password ? "true" : "false"}
                  placeholder="Your Password"
                  className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors cursor-pointer"
            >
              Sign In
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
