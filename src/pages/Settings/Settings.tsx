import { useState } from "react"
import ProfileTab from "./ProfileTab";


export default function Settings() {
  const [currentTab, setCurrentTab] = useState("Profile");

  const tabs = ["Profile", "Security", "Notifications"];

  const renderTabContent = () => {
    switch (currentTab) {
      case "Profile":
        return (
          <ProfileTab />
        );
      case "Security":
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
            <p className="text-gray-600">Manage your password and security options.</p>
          </div>
        );
      case "Notifications":
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
            <p className="text-gray-600">Configure your notification settings.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-10 bg-purple-50 min-h-screen max-w-screen">

      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
        <p className="text-gray-500">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex items-center gap-1 rounded-full bg-gray-200 p-1 w-max mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={`w-56 py-2 rounded-full transition-colors font-medium cursor-pointer ${currentTab === tab
              ? "bg-gray-50 text-gray-700 hover:bg-gray-100"
              : "hover:bg-gray-100/50 text-gray-600"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {renderTabContent()}
    </div>
  )
}
