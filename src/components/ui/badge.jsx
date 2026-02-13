import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-offset-2 sm:px-4 sm:py-2 sm:text-sm",
  {
    variants: {
      variant: {
        default: "border-gray-200 bg-gray-50 text-gray-800",
        green:
          "border-green-200 bg-green-50 text-green-800",
        blue: "border-blue-200 bg-blue-50 text-blue-800",
        purple: "border-purple-200 bg-purple-50 text-purple-800",
        outline: "border-gray-300 text-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
