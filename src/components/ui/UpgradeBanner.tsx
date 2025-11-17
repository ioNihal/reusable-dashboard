import { BsLightningFill } from "react-icons/bs";
import type { UpgradeBannerProps } from "../../types/upgradeBanner";
import Button from "./Button";


export default function UpgradeBanner({
    title = "Pick a plan to start scraping and closing deals",
    buttonText = "Upgrade Plan",
    onUpgradeClick = () => { },
    iconColor = "#ffc400",
    iconBgColor = "bg-[#8D33A8]",
    buttonVariant = "secondary",
    buttonSize = "md",
}: UpgradeBannerProps) {
    return (
        <div className="rounded-lg bg-linear-to-b from-purple-100 to-purple-50 p-4 space-y-3 relative">
            {/* Icon */}
            <div className="flex justify-center absolute -top-5 left-1/2 -translate-x-1/2">
                <div className={`w-10 h-10 rounded-full ${iconBgColor} flex items-center justify-center`}>
                    <BsLightningFill fill={iconColor} size={18} className="ml-px mt-px" />
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
    );
}
