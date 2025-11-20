import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"email" | "reset">(
    searchParams.get("token") ? "reset" : "email"
  );
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      // Replace with actual API call
      console.log("Password reset email sent to:", email);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep("reset");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password reset
  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        message: "Passwords do not match",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Replace with actual API call
      console.log("Password reset data:", {
        email,
        password: data.password,
        token: searchParams.get("token"),
      });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/login");
    } catch (error) {
      console.error("Reset password error:", error);
      setError("root", {
        message: "Failed to reset password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-linear-to-br from-purple-50 to-blue-50 px-4 py-8">
      
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Top Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">IGScraping</h2>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              Forgot Password?
            </h1>
            <p className="text-gray-600 mt-2">
              No worries, we'll send you reset instructions
            </p>
          </div>

          {/* Email Step */}
          {step === "email" && (
            <>
              {/* Card Container */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Reset Password
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-sm"
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="full"
                    disabled={isLoading || !email.trim()}
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>

                  {/* Back Link */}
                  <div className="flex items-center justify-center pt-2">
                    <a
                      href="/login"
                      className="text-sm text-purple-600 hover:underline flex items-center gap-1"
                    >
                      ←&nbsp;&nbsp;&nbsp;Back to sign in
                    </a>
                  </div>
                </form>
              </div>

              {/* Bottom Links */}
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <a href="/login" className="text-purple-600 hover:underline font-semibold">
                    Sign in
                  </a>
                </p>
                <p className="text-xs text-gray-500">
                  <span className="font-semibold">Security tip:</span> For your protection, the reset link will expire in 1 hour.
                </p>
              </div>
            </>
          )}

          {/* Password Reset Step */}
          {step === "reset" && (
            <>
              <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* New Password */}
                  <InputField
                    label="New Password"
                    type="password"
                    placeholder="Enter new password..."
                    disabled={isLoading}
                    error={errors.password?.message}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />

                  {/* Confirm Password */}
                  <InputField
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password..."
                    disabled={isLoading}
                    error={errors.confirmPassword?.message}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />

                  {/* Submit Error */}
                  {errors.root && (
                    <p className="text-red-600 text-sm">{errors.root.message}</p>
                  )}

                  {/* Reset Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="full"
                    disabled={isLoading}
                    className="mt-2"
                  >
                    {isLoading ? "Resetting..." : "Reset Password"}
                  </Button>
                </form>
              </div>

              {/* Back Links */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  <a href="/login" className="text-purple-600 hover:underline font-semibold">
                    Back to Sign in
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
