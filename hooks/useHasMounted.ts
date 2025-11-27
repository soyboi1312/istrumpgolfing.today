import { useState, useEffect } from 'react';

/**
 * Hook to track if the component has mounted on the client.
 * Useful for avoiding hydration mismatches with SSR/SSG.
 */
export default function useHasMounted(): boolean {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
}
