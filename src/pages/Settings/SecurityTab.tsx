import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import InputField from "../../components/ui/InputField";
import { useToast } from "../../hooks/useToast";

interface SecurityForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function SecurityTab() {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<SecurityForm>({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            // simulate API call
            await new Promise((r) => setTimeout(r, 1000));

            showToast({
                title: "Password Updated",
                message: "Your password has been updated successfully.",
                variant: "success",
                duration: 3000,
            });

            reset();
        } catch {
            showToast({
                title: "Update Failed",
                message: "Unable to update password. Please try again.",
                variant: "error",
                duration: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const newPasswordValue = watch("newPassword");

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-xl font-semibold text-gray-900">Password & Security</h3>
                <p className="text-gray-500 mt-1">Keep your account secure</p>
            </div>

            <Card variant="outline" className="p-4 bg-white shadow-sm">
                <h4 className="font-medium">Change Password</h4>

                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-5 py-5">
                        <InputField
                            type="password"
                            label="Current Password"
                            placeholder="Enter current password..."
                            disabled={isLoading}
                            error={errors.currentPassword?.message}
                            {...register("currentPassword", { required: "Current password is required" })}
                        />

                        <InputField
                            type="password"
                            label="New Password"
                            placeholder="Enter new password..."
                            disabled={isLoading}
                            error={errors.newPassword?.message}
                            {...register("newPassword", {
                                required: "New password is required",
                                minLength: { value: 8, message: "Password must be at least 8 characters" },
                            })}
                        />

                        <InputField
                            type="password"
                            label="Confirm Password"
                            placeholder="Confirm new password..."
                            disabled={isLoading}
                            error={errors.confirmPassword?.message}
                            {...register("confirmPassword", {
                                required: "Please confirm your new password",
                                validate: (val) => val === newPasswordValue || "Passwords do not match",
                            })}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" className="mt-2" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update Password"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
