import { cn } from "@/lib/utils"

interface InteractiveLoaderProps {
    className?: string
    size?: "sm" | "md" | "lg"
    variant?: "spinner" | "dots" | "pulse"
}

export function InteractiveLoader({
    className,
    size = "md",
    variant = "spinner"
}: InteractiveLoaderProps) {
    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-12 h-12",
        lg: "w-16 h-16"
    }

    if (variant === "dots") {
        return (
            <div className={cn("flex items-center justify-center gap-2", className)}>
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            </div>
        )
    }

    if (variant === "pulse") {
        return (
            <div className={cn("flex items-center justify-center", className)}>
                <div className={cn(
                    "rounded-full bg-primary/20 flex items-center justify-center animate-pulse",
                    sizeClasses[size]
                )}>
                    <div className={cn(
                        "rounded-full bg-primary/40",
                        size === "sm" ? "w-4 h-4" : size === "md" ? "w-8 h-8" : "w-12 h-12"
                    )}></div>
                </div>
            </div>
        )
    }

    // Default: spinner
    return (
        <div className={cn("flex items-center justify-center", className)}>
            <div className={cn(
                "relative",
                sizeClasses[size]
            )}>
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                {/* Spinning gradient ring */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"></div>
                {/* Inner dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={cn(
                        "rounded-full bg-primary animate-pulse",
                        size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
                    )}></div>
                </div>
            </div>
        </div>
    )
}

// Full page loader
export function PageLoader({ message }: { message?: string }) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
            <InteractiveLoader size="lg" variant="spinner" />
            {message && (
                <p className="text-sm text-muted-foreground font-medium tracking-wide uppercase animate-pulse">
                    {message}
                </p>
            )}
        </div>
    )
}

// Product grid loader
export function ProductGridLoader({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="group">
                    <div className="relative aspect-[3/4] mb-4 bg-secondary/50 overflow-hidden rounded-md flex items-center justify-center">
                        <InteractiveLoader size="md" variant="pulse" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-secondary/50 rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-secondary/50 rounded w-1/2 animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}
