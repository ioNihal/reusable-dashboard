import { BsLightningFill } from 'react-icons/bs'
import Button from './Button'

/**
 * UpgradeBanner Component - Reusable upgrade promotion banner for sidebar
 * 
 * @param {Object} props
 * @param {string} props.title - Banner title (default: 'Pick a plan to start scraping and closing deals')
 * @param {string} props.buttonText - Button label (default: 'Upgrade Plan')
 * @param {Function} props.onUpgradeClick - Callback when upgrade button is clicked
 * @param {string} props.iconColor - Icon color (default: '#ffc400')
 * @param {string} props.iconBgColor - Icon background color (default: 'bg-blue-400')
 * @param {string} props.buttonVariant - Button variant from Button component (default: 'primary')
 * @param {string} props.buttonSize - Button size from Button component (default: 'md')
 */
export default function UpgradeBanner({
    title = 'Pick a plan to start scraping and closing deals',
    buttonText = 'Upgrade Plan',
    onUpgradeClick = () => {},
    iconColor = '#ffc400',
    iconBgColor = 'bg-blue-400',
    buttonVariant = 'primary',
    buttonSize = 'md',
}) {
    return (
        <div className="rounded-lg bg-linear-to-b from-blue-100 to-blue-50 p-4 space-y-3 relative">
            {/* Icon */}
            <div className="flex justify-center absolute -top-5 left-1/2 -translate-x-1/2">
                <div className={`w-10 h-10 rounded-full ${iconBgColor} flex items-center justify-center`}>
                    <BsLightningFill fill={iconColor} size={28} />
                </div>
            </div>
            
            {/* Content */}
            <div className="text-center space-y-3 mt-2">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <Button
                    variant={buttonVariant}
                    size={buttonSize}
                    className="w-full"
                    onClick={onUpgradeClick}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    )
}
