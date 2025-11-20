import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import { BsGoogle } from "react-icons/bs";

interface LoginFormData {
    email: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        setIsLoading(true);
        try {
            // Replace with actual API call
            console.log("Login data:", data);
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Redirect to dashboard
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            setError("root", {
                message: "Invalid email or password",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-[#F7D4E9] to-[#E2E6FF] px-4 py-8">
            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-8 px-4 md:px-6">
                <div className="bg-[#D9D9D9] w-full md:w-1/2 h-[200px] md:h-[500px] rounded-md shadow-sm"></div>
                <div className="w-full md:w-1/2 max-w-lg flex flex-col justify-center space-y-6 mx-auto md:mx-0">
                    <p className="text-sm font-semibold text-gray-700">IGScraping</p>
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900">Log in to your account</h2>
                        <p className="text-gray-600 mt-2">Welcome back! Select method to log in:</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputField
                            type="email"
                            placeholder="Email"
                            variant="outline"
                            disabled={isLoading}
                            {...register("email", { required: "Email is required" })}
                            error={errors.email?.message}
                            className="focus:border-purple-600 bg-transparent!"
                        />
                        <InputField
                            type="password"
                            placeholder="Enter your password..."
                            variant="outline"
                            disabled={isLoading}
                            {...register("password", { required: "Password is required" })}
                            error={errors.password?.message}
                            className="focus:border-purple-600 bg-transparent!"
                        />
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input type="checkbox" id="rememberMe" className="w-4 h-4" />
                                <span>Remember me</span>
                            </label>
                            <a className="text-sm text-purple-600 hover:underline" href="/reset-password">Forgot password?</a>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-2"
                        >
                            {isLoading ? "Logging in..." : "Get Started"}
                        </Button>
                        {errors.root && (
                            <p className="text-red-500 text-sm mt-2">{errors.root.message}</p>
                        )}
                    </form>

                    <div className="relative max-w-md mx-auto w-full">
                        <hr className="my-3 border-gray-300" />
                        <p className="absolute top-0.5 left-1/2 -translate-x-1/2 bg-[#E5E0FF] px-3 text-center text-sm text-gray-500">or register with</p>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full bg-white flex items-center justify-center gap-3"
                        onClick={() => navigate("/signup")}
                    >
                        <BsGoogle className="text-lg" />
                        <span>Google</span>
                    </Button>

                    <p className="text-center text-sm">Don't have an account? <a href="/signup" className="text-purple-600">Sign up</a> </p>
                </div>
            </div>
        </div>
    );
}
