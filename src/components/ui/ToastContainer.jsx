import Toast from "./Toast";

export default function ToastContainer({ toasts }) {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-3">
            {toasts.map((t) => (
                <Toast
                    key={t.id}
                    show={true}
                    title={t.title}
                    message={t.message}
                    variant={t.variant}
                />
            ))}
        </div>
    );
}
