"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <label className="switch-wrapper">
        <input
          type="checkbox"
          className={cn("switch-input", className)}
          ref={ref}
          {...props}
        />
        <span className="switch-slider"></span>
      </label>
    )
  }
)

Switch.displayName = "Switch"

export { Switch }

