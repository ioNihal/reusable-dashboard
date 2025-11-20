import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import { BsGoogle } from "react-icons/bs";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError } = useForm<SignupFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setIsLoading(true);
    try {
      // Replace with actual API call
      console.log("Signup data:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Redirect to login or dashboard
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setError("root", {
        message: "An error occurred during signup",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F7D4E9] to-[#E2E6FF] px-4 py-8">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-8 px-4 md:px-6">
        <div className=" bg-[#D9D9D9] w-full md:w-1/2 h-[200px] md:h-[500px] rounded-md shadow-sm"></div>
        <div className="w-full md:w-1/2 max-w-lg flex flex-col justify-center space-y-6 mx-auto md:mx-0">
          <p className="text-sm font-semibold text-gray-700">IGScraping</p>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Create an account</h2>
            <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField

                type="text"
                placeholder="First name"
                variant="outline"
                disabled={isLoading}
                error={errors.firstName?.message}
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="focus:border-purple-600 bg-transparent!"
              />
              <InputField

                type="text"
                placeholder="Last name"
                variant="outline"
                disabled={isLoading}
                error={errors.lastName?.message}
                {...register("lastName", {
                  required: "Last name is required",
                })}
                className="focus:border-purple-600 bg-transparent!"
              />
            </div>

            <InputField

              type="email"
              placeholder="Email"
              variant="outline"
              disabled={isLoading}
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
              className="focus:border-purple-600 bg-transparent!"
            />

            <InputField

              type="password"
              placeholder="Enter your password..."
              variant="outline"
              disabled={isLoading}
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="focus:border-purple-600 bg-transparent!"
            />

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-purple-600 border-gray-300 rounded cursor-pointer"
                defaultChecked
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            {errors.root && (
              <p className="text-red-600 text-sm">{errors.root.message}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="full"
              disabled={isLoading}
              className="mt-2"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="relative max-w-md mx-auto w-full">
            <hr className="my-3 border-gray-300" />
            <p className="absolute top-0.5 left-1/2 -translate-x-1/2 bg-[#E5E0FF] px-3 text-center text-sm text-gray-500">or register with</p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-white flex items-center justify-center gap-3"
            onClick={() => navigate("/login")}
          >
            <BsGoogle className="text-lg" />
            <span>Google</span>
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-600 hover:underline font-semibold"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
