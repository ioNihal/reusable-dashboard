import { FaBars } from 'react-icons/fa';

export default function Topbar({ onMenuClick }) {
    return (
        <header className="w-full border-b border-gray-200 bg-white p-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
                <button onClick={onMenuClick} className="p-2 rounded-md md:hidden hover:bg-gray-100">
                    <FaBars />
                </button>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                    U
                </div>
            </div>
        </header>
    )
}