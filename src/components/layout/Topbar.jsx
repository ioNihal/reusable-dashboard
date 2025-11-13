import { FaBars } from 'react-icons/fa';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export default function Topbar({ onMenuClick }) {

    const navigate = useNavigate();

    const handleUpgradeClick = () => {
        navigate('/billing');
    }


    return (
        <header className="w-full border-b border-gray-200 bg-white px-4 py-2 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
                <button onClick={onMenuClick} className="p-2 rounded-md md:hidden hover:bg-gray-100">
                    <FaBars />
                </button>
            </div>

            <Button
                variant="primary"
                size="md"
                onClick={handleUpgradeClick}
                className="ml-auto mr-4"
            >
                Upgrade Plan
            </Button>
            {/* user profile */}
            <div className="flex items-center justify-between gap-2 bg-blue-100 rounded-full py-1 px-2 pr-4 cursor-pointer hover:ring-1 ring-blue-300 transition-all duration-300">
                <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                    U
                </div>
                <div className='flex flex-col'>
                    <span className="text-sm font-medium text-gray-800">User Name</span>
                    <span className="text-xs text-gray-500">Remaining 10 Credits</span>
                </div>
            </div>
        </header>
    )
}