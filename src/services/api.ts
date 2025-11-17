export function fetchMock<T>(data: T, delay: number = 600): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Deep clone to simulate a real API response
            const cloned = JSON.parse(JSON.stringify(data)) as T;
            resolve(cloned);
        }, delay);
    });
}
