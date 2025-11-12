import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
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
            <Card variant="default" className="p-6 max-w-2xl">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-4">Instagram account or Hashtag</label>
                        <Input placeholder="Enter Instagram account or Hashtag" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-4">Email Limits</label>
                            <Input placeholder="Enter email limits" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-4">Scrape Type</label>
                            <Select placeholder="Select scrape type">
                                <option value="">Select scrape type</option>
                                <option value="followings">Followings</option>
                                <option value="followers">Followers</option>
                            </Select>
                        </div>
                    </div>

                    <Button variant="primary" size="full" className="mt-8">Start Scraping</Button>
                </div>
            </Card>
        </div>
    )
}