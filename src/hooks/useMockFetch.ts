import { useState, useEffect } from "react";
import { fetchMock } from "../services/api";

export default function useMockFetch<T>(input: T, delay: number = 400) {
    const [loading, setLoading] = useState<boolean>(true);
    const [result, setResult] = useState<T | null>(null);

    useEffect(() => {
        let mounted = true;

        setLoading(true);

        fetchMock<T>(input, delay).then((res) => {
            if (!mounted) return;
            setResult(res);
            setLoading(false);
        });

        return () => {
            mounted = false;
        };
    }, [input, delay]);

    return { data: result, loading };
}
