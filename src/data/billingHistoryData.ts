

export type BillingHistory = {
    date: string;
    description: string;
    amount: string;
    status: "Paid" | "Failed" | "Pending";
};

export const billingHistoryData: BillingHistory[] = [
    {
        date: "Nov 1, 2025",
        description: "Pro Plan - Monthly Subscription",
        amount: "$79.00",
        status: "Paid",
    },
    {
        date: "Oct 1, 2025",
        description: "Pro Plan - Monthly Subscription",
        amount: "$79.00",
        status: "Paid",
    },
    {
        date: "Sep 1, 2025",
        description: "Starter Plan - Monthly Subscription",
        amount: "$29.00",
        status: "Paid",
    },
    {
        date: "Aug 1, 2025",
        description: "Starter Plan - Monthly Subscription",
        amount: "$29.00",
        status: "Paid",
    },
];
