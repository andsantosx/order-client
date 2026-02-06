import { Skeleton } from "@/components/ui/skeleton";

export function RouteSkeleton() {
    return (
        <div className="w-full min-h-[60vh] mx-auto max-w-[1400px] px-6 lg:px-10 py-12 space-y-8 animate-in fade-in duration-500">
            <div className="space-y-4">
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="aspect-[3/4] w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    );
}
