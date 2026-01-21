import * as React from "react"
import { cn } from "@/lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-slate-50 ring-offset-slate-50 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Button.displayName = "Button"

export { Button }

