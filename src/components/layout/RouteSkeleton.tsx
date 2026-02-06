import { useEffect } from "react";
import { PageLoader } from "@/components/ui/interactive-loader";
import { useUIStore } from "@/store/uiStore";

export function RouteSkeleton() {
    const setRouteLoading = useUIStore((state) => state.setRouteLoading);

    useEffect(() => {
        setRouteLoading(true);
        return () => setRouteLoading(false);
    }, [setRouteLoading]);

    return <PageLoader message="Carregando..." />;
}
