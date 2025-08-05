"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-lg font-semibold text-white",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 text-white border-transparent hover:bg-white/20 hover:scale-110 transition-all"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse",
        head_row: "grid grid-cols-7", // Ensure header days align with the grid
        head_cell:
          "text-white rounded-md font-medium text-[0.8rem] text-center p-2",
        row: "grid grid-cols-7 gap-1 mt-2", // Fix layout issue (ensures dates align in 7 columns)
        cell: cn(
          "relative text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-white/20 [&:has([aria-selected].day-outside)]:bg-white/10",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal text-white hover:bg-white/20 hover:scale-110 transition-all aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-white/20 text-white hover:bg-white/30 focus:bg-white/30",
        day_today: "bg-white/10 text-white font-bold",
        day_outside:
          "text-white/50 opacity-50 hover:bg-white/10 aria-selected:bg-white/20",
        day_disabled: "text-white/30 opacity-50 hover:bg-transparent cursor-not-allowed",
        day_range_middle:
          "aria-selected:bg-white/20 aria-selected:text-white",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
