import { BiFolder } from "react-icons/bi";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-violet-50 px-4">
            <div className="max-w-md text-center">
                <span className="inline-flex justify-center"><BiFolder size={40} /></span>

                <h4 className="mb-9 mt-9 text-2xl font-medium leading-snug text-gray-900">
                    Sorry, we didn't find any match!
                </h4>

                <a
                    href="/"
                    className="rounded-md bg-yellow-500 px-6 py-2 text-white transition hover:bg-yellow-600"
                >
                    Back to Home
                </a>
            </div>
        </div>
    );
}
