import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import ProgressBar from '../components/ui/ProgressBar';
import ScrapeResultCard from '../components/ui/ScrapeResultCard';
import { useToast } from '../hooks/useToast';



export default function NewScrape() {
    const [progress, setProgress] = useState(0);
    const [isScraping, setIsScraping] = useState(false);
    const [scrapeDone, setScrapeDone] = useState(false);

    const { showToast } = useToast();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log("Submitting data:", data);
        startScraping();
    };


    const startScraping = () => {
        setIsScraping(true);
        setScrapeDone(false);

        let value = 0;
        const timer = setInterval(() => {
            value += 5;
            setProgress(value);

            if (value >= 100) {
                clearInterval(timer);
                setScrapeDone(true);
                setIsScraping(false);
                setProgress(0);

                showToast({
                    title: "Scraping Completed",
                    message: "Your scraping task has finished successfully.",
                    variant: "success",
                    duration: 3000
                });
            }
        }, 300);
    };



    return (
        <div className="p-6 space-y-6 bg-violet-50 min-h-screen max-w-screen">

            <div>
                <h1 className="text-2xl font-bold text-gray-900">Start Scraping</h1>
                <p className="text-gray-500">Target an account and scrape its followers and following</p>
            </div>

            {isScraping && (
                <ProgressBar
                    progress={progress}
                    statusText="Scraping in progress..."
                    onCancel={() => {
                        setIsScraping(false);
                        setProgress(0);
                    }}
                    onPause={() => console.log("Paused")}
                />
            )}

            {scrapeDone && (
                <ScrapeResultCard
                    account="@Travel"
                    type="Followings"
                    totalEmails={50}
                    verifiedEmails={12}
                    status="completed"
                    onExportCSV={() => console.log("Export CSV")}
                    onExportXLS={() => console.log("Export XLS")}
                />
            )}


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Instagram Account */}
                <InputField
                    label="Instagram account or Hashtag"
                    type="text"
                    placeholder="Enter Instagram account or Hashtag"
                    {...register("target", { required: "This field is required" })}
                    error={errors.target?.message}
                    success={!errors.target && watch("target") ? "Looks good!" : ""}
                />

                <div className="grid grid-cols-2 gap-6">

                    {/* Email Limits */}
                    <InputField
                        label="Email Limits"
                        type="number"
                        min="0"
                        placeholder="Enter email limits"
                        {...register("emailLimit", {
                            required: "This field is Required",
                            min: { value: 1, message: "Must be greater than 0" }
                        })}
                        error={errors.emailLimit?.message}
                        success={!errors.emailLimit && watch("emailLimit") ? "Valid number" : ""}
                    />

                    {/* Scrape Type */}
                    <InputField
                        label="Scrape Type"
                        type="select"
                        defaultSelect="Select scrape type"
                        options={[
                            { label: "Followings", value: "followings" },
                            { label: "Followers", value: "followers" },
                        ]}
                        {...register("scrapeType", { required: "Select one option" })}
                        error={errors.scrapeType?.message}
                        success={!errors.scrapeType && watch("scrapeType") ? "Selected" : ""}
                    />
                </div>

                <Button variant="primary" size="full" className="mt-2 py-2.5">
                    Start Scraping
                </Button>

            </form>
        </div>
    );
}
