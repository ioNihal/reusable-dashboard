/**
 * UserProfile Component - Reusable user profile section for sidebar
 * 
 * @param {Object} props
 * @param {string} props.name - User name (default: 'User Name')
 * @param {string} props.email - User email (default: 'user@example.com')
 * @param {string} props.avatarInitial - Avatar initial letter (default: 'U')
 * @param {string} props.avatarColor - Avatar background color (default: 'bg-orange-500')
 * @param {boolean} props.expanded - Whether sidebar is expanded (controls text visibility)
 */
export default function UserProfile({
    name = 'User Name',
    email = 'user@example.com',
    avatarInitial = 'U',
    avatarColor = 'bg-orange-500',
    expanded = true,
}) {
    return (
        <div className={`border-t border-gray-200 p-4 flex items-center justify-center ${expanded && "gap-2"}`}>
            <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                {avatarInitial}
            </div>
            {expanded && (
                <div className="overflow-hidden transition-all min-w-0">
                    <h4 className="font-semibold text-sm truncate">{name}</h4>
                    <span className="text-xs text-gray-600 truncate block">{email}</span>
                </div>
            )}
        </div>
    )
}
