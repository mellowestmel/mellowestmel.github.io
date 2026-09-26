export function getCached(cacheKey, ttlMs) {
    try {
        const cached = sessionStorage.getItem(cacheKey);
        if (!cached) return null;

        const { value, cachedAt } = JSON.parse(cached);
        const isExpired = Date.now() - cachedAt > ttlMs;

        return isExpired ? null : value;
    } catch {
        return null;
    }
}

export function setCached(cacheKey, value) {
    try {
        sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ value, cachedAt: Date.now() })
        );
    } catch {}
}