import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'

export default function NewScrape() {
    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Start Scraping</h1>
                <p className="text-gray-500">Target an account and scrape it's followers and following</p>
            </div>

            {/* Form Card */}
            <div>
                <div className="space-y-6">

                    <InputField
                        label="Instagram account or Hashtag"
                        type="text"
                        placeholder="Enter Instagram account or Hashtag"
                        variant="default"
                    />

                    <div className="grid grid-cols-2 gap-6">
                        <InputField
                            label="Email Limits"
                            type="number"
                            placeholder="Enter email limits"
                            variant="default"
                            min="0"
                        />

                        <InputField
                            label="Scrape Type"
                            type="select"
                            options={[
                                { label: "Followings", value: "followings" },
                                { label: "Followers", value: "followers" },
                            ]}
                            defaultSelect="Select scrape type"
                            variant="default"
                        />
                    </div>

                    <Button variant="primary" size="full" className="mt-2 py-2.5">Start Scraping</Button>
                </div>
            </div >
        </div >
    )
}