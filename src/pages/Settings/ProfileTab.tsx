import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuCamera } from "react-icons/lu";
import Card from "../../components/ui/Card";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import { useToast } from "../../hooks/useToast";

interface ProfileFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
    avatar?: FileList;
}

export default function ProfileTab() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormData>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            username: "",
        },
    });

    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: ProfileFormData) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Form Data:", data);

            showToast({
                title: "Success!",
                message: "Your profile has been updated successfully.",
                variant: "success",
                duration: 3000,
            });

            reset();
            setAvatarPreview(null);
        } catch {
            showToast({
                title: "Error!",
                message: "Failed to update profile. Please try again.",
                variant: "error",
                duration: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        reset();
        setAvatarPreview(null);
        showToast({
            title: "Cancelled",
            message: "Changes have been discarded.",
            variant: "info",
            duration: 2000,
        });
    };

    return (
        <>
            <div>
                <h3 className="text-xl font-semibold text-gray-900">Profile Information</h3>
                <p className="text-gray-500 mt-1">
                    Update your personal information and preferences.
                </p>
            </div>

            <Card variant="outline" className="p-4 bg-white shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="flex gap-5 items-center">
                        <div className={`w-14 h-14 rounded-full ${avatarPreview ? "" : "bg-amber-900"}
                                flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden`}>
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                            ) : (
                                "U"
                            )}
                        </div>
                        <InputField
                            type="media"
                            id="avatar-input"
                            icon={<LuCamera />}
                            placeholder="Change Avatar"
                            disabled={isLoading}
                            {...register("avatar", {
                                onChange: handleAvatarChange,
                            })}
                        />
                    </div>

                    <div className="border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
                        <InputField
                            type="text"
                            label="First Name"
                            placeholder="Enter first name..."
                            disabled={isLoading}
                            error={errors.firstName?.message}
                            {...register("firstName", {
                                required: "First name is required",
                                minLength: { value: 2, message: "Must be at least 2 characters" },
                            })}
                        />
                        <InputField
                            type="text"
                            label="Last Name"
                            placeholder="Enter last name..."
                            disabled={isLoading}
                            error={errors.lastName?.message}
                            {...register("lastName", {
                                required: "Last name is required",
                                minLength: { value: 2, message: "Must be at least 2 characters" },
                            })}
                        />
                        <InputField
                            type="email"
                            label="Email"
                            placeholder="Enter email..."
                            disabled={isLoading}
                            error={errors.email?.message}
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
                            })}
                        />
                        <InputField
                            type="phone"
                            label="Phone Number"
                            placeholder="Enter phone number..."
                            disabled={isLoading}
                            error={errors.phone?.message}
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: { value: /^[\d\s+().-]+$/, message: "Invalid phone format" },
                            })}
                        />
                        <InputField
                            type="text"
                            label="Username"
                            placeholder="Enter username..."
                            disabled={isLoading}
                            error={errors.username?.message}
                            {...register("username", {
                                required: "Username is required",
                                minLength: { value: 3, message: "Must be at least 3 characters" },
                            })}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-5">
                        <Button
                            type="button"
                            variant="outline"
                            className="border-purple-600 border-2"
                            onClick={handleCancel}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </Card>
        </>
    );
}
