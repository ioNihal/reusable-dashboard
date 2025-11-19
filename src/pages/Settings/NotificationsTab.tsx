import { useState } from "react";
import Card from "../../components/ui/Card";
import Toggle from "../../components/ui/Toggle";
import Button from "../../components/ui/Button";

export default function NotificationsTab() {
    const [prefs, setPrefs] = useState({
        scrapingComplete: true,
        creditsLow: false,
        monthlySummary: true,
        marketing: false,
    });

    const setPref = (key: keyof typeof prefs, value: boolean) =>
        setPrefs((p) => ({ ...p, [key]: value }));

    const rowClass =
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0";

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-xl font-semibold text-gray-900">
                    Notification Preferences
                </h3>
                <p className="text-gray-500 mt-1">
                    Manage your account settings and preferences.
                </p>
            </div>

            <Card variant="outline" className="p-4 sm:p-6 bg-white shadow-sm">
                <form className="space-y-4">
                    <div className={rowClass}>
                       
                        <p className="flex-1 min-w-0 text-sm text-gray-700">
                            Notify me when scraping completes
                        </p>

                        <div className="flex items-center sm:ml-4">
                            <Toggle
                                variant="minimal"
                                checked={prefs.scrapingComplete}
                                onChange={(v) => setPref("scrapingComplete", v)}
                            />
                        </div>
                    </div>

                    <div className={rowClass}>
                        <p className="flex-1 min-w-0 text-sm text-gray-700">
                            Alert me when credits are low
                        </p>

                        <div className="flex items-center sm:ml-4">
                            <Toggle
                                variant="minimal"
                                checked={prefs.creditsLow}
                                onChange={(v) => setPref("creditsLow", v)}
                            />
                        </div>
                    </div>

                    <div className={rowClass}>
                        <p className="flex-1 min-w-0 text-sm text-gray-700">
                            Send monthly summary report
                        </p>

                        <div className="flex items-center sm:ml-4">
                            <Toggle
                                variant="minimal"
                                checked={prefs.monthlySummary}
                                onChange={(v) => setPref("monthlySummary", v)}
                            />
                        </div>
                    </div>

                    <div className={rowClass}>
                        <p className="flex-1 min-w-0 text-sm text-gray-700">
                            Receive product updates and marketing emails
                        </p>

                        <div className="flex items-center sm:ml-4">
                            <Toggle
                                variant="minimal"
                                checked={prefs.marketing}
                                onChange={(v) => setPref("marketing", v)}
                            />
                        </div>
                    </div>


                    <div className="pt-2">
                        <Button className="w-full">Save Preferences</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
