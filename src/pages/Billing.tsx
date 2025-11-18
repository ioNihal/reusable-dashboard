import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { LuCalendar, LuCreditCard } from "react-icons/lu";
import { pricingPlans } from "../data/pricingData";
import { FiCreditCard } from "react-icons/fi";
import type { Column } from "../types/table";
import { billingHistoryData, type BillingHistory } from "../data/billingHistoryData";
import Table from "../components/ui/Table";


const billingHistoryColumns: Column<BillingHistory>[] = [
    {
        key: "date",
        title: "Date",
    },
    {
        key: "description",
        title: "Description",
    },
    {
        key: "amount",
        title: "Amount",
    },
    {
        key: "status",
        title: "Status",
        render: (row) => (
            <span className="px-3 py-1 text-xs rounded-md bg-green-100 text-green-600">
                {row.status}
            </span>
        ),
    },
];

export default function Billing() {
    return (
        <div className="p-6 space-y-6 bg-purple-50 min-h-screen max-w-screen">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900">Billing</h2>
                <p className="text-gray-500">
                    Manage your subscription, usage, and invoices.
                </p>
            </div>

            {/* current plan card */}
            <div>
                <Card className="max-w-xs p-4 ">
                    <div className="flex flex-col space-y-4 md:space-y-5 lg:space-y-6">

                        {/* Header Row */}
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-base md:text-lg lg:text-xl">
                                Current Plan
                            </span>
                            <Badge variant="action" className="text-xs md:text-sm lg:text-base">
                                Action
                            </Badge>
                        </div>

                        {/* Plan Name + Subtitle */}
                        <div>
                            <span className="text-xl md:text-2xl lg:text-3xl font-semibold">
                                Pro Plan
                            </span>
                            <p className="text-slate-600 text-sm md:text-base lg:text-lg">
                                Perfect for growing businesses
                            </p>
                        </div>

                        {/* Credits Remaining */}
                        <p className="inline-flex items-center gap-2 text-slate-800 text-sm md:text-base lg:text-lg">
                            <LuCreditCard className="text-base md:text-lg" />
                            Credits Remaining:{" "}
                            <span className="text-black font-semibold text-sm md:text-base lg:text-lg">
                                120
                            </span>
                        </p>

                        {/* Renewal Date */}
                        <p className="inline-flex items-center gap-2 text-slate-800 text-sm md:text-base lg:text-lg">
                            <LuCalendar className="text-base md:text-lg" />
                            Renews on:{" "}
                            <span className="text-black font-semibold text-sm md:text-base lg:text-lg">
                                Nov 23, 2025
                            </span>
                        </p>

                        <Button className="text-sm md:text-base lg:text-lg py-2 md:py-3">
                            Change Plan
                        </Button>
                    </div>

                </Card>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-gray-900">Available Plans</h3>
                <p className="text-gray-500">
                    Choose the plan that fits your needs
                </p>
            </div>

            {/* Pricing cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pricingPlans.map((plan, i) => (
                    <div
                        key={i}
                        className={`rounded-xl pt-1 bg-linear-to-r ${plan.gradient}`}>
                        <Card variant="pricing" className="h-full p-4">
                            <div className="flex flex-col gap-4 h-full">
                                <h2 className="font-semibold text-lg">{plan.name}</h2>

                                <p className="text-4xl font-bold">
                                    {plan.price}
                                    <span className="text-gray-500 text-base font-normal">
                                        {plan.period}
                                    </span>
                                </p>

                                <p className="text-gray-600">
                                    {plan.emails} <br />
                                    {plan.credits}
                                </p>

                                <ul className="space-y-3 text-gray-700">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <span className="text-purple-500">✔</span> {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    disabled={plan.buttonDisabled}
                                    variant="accent"
                                    className="mt-auto disabled:opacity-70 disabled:cursor-not-allowed" >
                                    {plan.button}
                                </Button>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            <div>
                <h3 className="text-xl font-semibold text-gray-900">Payment Method</h3>
                <p className="text-gray-500">
                    Manage your payment methods
                </p>
            </div>

            <div>
                <Card className="p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                    {/* Icon */}
                    <span className="shrink-0">
                        <FiCreditCard size={45} className="text-purple-600" />
                    </span>

                    {/* Card Info */}
                    <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-base md:text-lg">Visa ending in 4242</span>
                        <span className="text-slate-700 text-sm md:text-base">Expires 12/2025</span>
                    </div>

                    {/* Buttons */}
                    <div className="mt-3 md:mt-0 md:ml-auto flex flex-col md:flex-row gap-3">
                        <Button
                            variant="outline"
                            className="border-purple-600 border-2 hover:border-purple-400 text-sm md:text-base" >
                            Edit payment method
                        </Button>

                        <Button
                            variant="outline"
                            className="border-2 text-sm md:text-base">
                            Add new card
                        </Button>
                    </div>
                </Card>
            </div>


            <div>
                <h3 className="text-xl font-semibold text-gray-900">Invoices</h3>
                <p className="text-gray-500">
                    Download your billing history
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <Table columns={billingHistoryColumns} data={billingHistoryData} />
            </div>

        </div>
    )
}
