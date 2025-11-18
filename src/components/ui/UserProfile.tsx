import type { UserProfileProps } from "../../types/userProfile";

export default function UserProfile({
    name = "User Name",
    email = "user@example.com",
    avatarInitial = "U",
    avatarColor = "bg-orange-500",
    expanded = true,
}: UserProfileProps) {
    return (
        <div
            className={`border-t border-gray-200 p-4 flex items-center 
                         ${expanded ? "gap-2" : ""}
                        cursor-pointer hover:bg-gray-100 transition-colors duration-200`}>
            <div className={`w-10 h-10 rounded-full ${avatarColor}
                            flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                {avatarInitial}
            </div>

            {expanded && (
                <div className="overflow-hidden transition-all min-w-0">
                    <h4 className="font-semibold text-sm truncate">{name}</h4>
                    <span className="text-xs text-gray-600 truncate block">{email}</span>
                </div>
            )}
        </div>
    );
}
