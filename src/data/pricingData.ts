

export type PricingPlan = {
    name: string;
    price: string;
    period: string;
    emails: string;
    credits: string;
    features: string[];
    button: string;
    buttonDisabled: boolean;
    gradient: string;
};

export const pricingPlans: PricingPlan[] = [
    {
        name: "Free Plan",
        price: "$0",
        period: "/forever",
        emails: "100 emails/month",
        credits: "10 credits",
        features: [
            "Basic email scraping",
            "Up to 100 profiles",
            "Standard support",
            "Export to CSV",
        ],
        button: "Change Plan",
        buttonDisabled: false,
        gradient: "from-purple-500 via-pink-500 to-indigo-500",
    },
    {
        name: "Starter Plan",
        price: "$29",
        period: "/per month",
        emails: "1,000 emails/month",
        credits: "100 credits",
        features: [
            "Advanced email scraping",
            "Up to 1,000 profiles",
            "Priority support",
            "Export to CSV & XLS",
            "Email verification",
            "Basic analytics",
        ],
        button: "Upgrade",
        buttonDisabled: false,
        gradient: "from-orange-400 via-pink-500 to-purple-500",
    },
    {
        name: "Pro Plan",
        price: "$79",
        period: "/per month",
        emails: "5,000 emails/month",
        credits: "500 credits",
        features: [
            "Unlimited email scraping",
            "Unlimited profiles",
            "24/7 Premium support",
            "All export formats",
            "Advanced email verification",
            "API access",
        ],
        button: "Current Plan",
        buttonDisabled: true,
        gradient: "from-orange-400 via-pink-500 to-indigo-500",
    },
];
