import * as React from "react"
import { cn } from "../../lib/utils"

const Progress = React.forwardRef(({ className, value = 0, ...props }, ref) => {
    // Ensure value is between 0 and 100
    const cleanValue = Math.min(Math.max(value, 0), 100);

    return (
        <div
            ref={ref}
            className={cn("w-full flex items-center gap-4", className)}
            {...props}
        >
            <div className="relative h-4 w-full flex-1 overflow-hidden rounded-full bg-gray-200 border border-gray-300">
                <div
                    className="h-full w-full flex-1 bg-primary transition-all duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${100 - cleanValue}%)`,
                        backgroundColor: '#4CAF50' /* Force green just in case Tailwind variable fails */
                    }}
                />
            </div>
            <span className="text-sm font-bold text-foreground tabular-nums min-w-[3rem] text-right">
                {Math.round(cleanValue)}%
            </span>
        </div>
    )
})
Progress.displayName = "Progress"

export { Progress }
