export default function PageWrapper({ title, children }) {
    return (
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {title && <h1 className="text-2xl font-semibold mb-4">{title}</h1>}
                {children}
            </div>
        </main>
    )
}