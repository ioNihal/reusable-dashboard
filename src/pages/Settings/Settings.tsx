import { useState } from "react"
import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";
import NotificationsTab from "./NotificationsTab";


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
          <SecurityTab />
        );
      case "Notifications":
        return (
          <NotificationsTab />
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

      <div className="flex flex-col lg:flex-row lg:items-center gap-1 rounded-3xl lg:rounded-full bg-gray-200 p-1 lg:w-max mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={`lg:w-56 py-2 rounded-full transition-colors font-medium cursor-pointer ${currentTab === tab
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
