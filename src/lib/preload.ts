/**
 * Component Preload Utility
 * Allows manual pre-fetching of React.lazy components.
 * 
 * Usage:
 * const LazyComponent = React.lazy(() => import('./Component'));
 * preloadComponent(() => import('./Component'));
 * 
 * Note: Respects user's data saver preference to avoid unnecessary downloads.
 */
export const preloadComponent = (importFn: () => Promise<any>) => {
    // Respect user's data saver preference
    if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection?.saveData) {
            return; // Skip preloading if data saver is enabled
        }
    }

    importFn().catch((err) => {
        console.error("Failed to preload component", err);
    });
};
