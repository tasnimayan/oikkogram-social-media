"use client"

import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function EventFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleTimeframeSelect = (timeframe: string) => {
    setSelectedTimeframe((prev) => (prev === timeframe ? null : timeframe))
  }

  const handleTypeSelect = (type: string) => {
    setSelectedType((prev) => (prev === type ? null : type))
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedTimeframe !== null || selectedType !== null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2",
            hasActiveFilters &&
              "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
          )}
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-white text-xs font-medium">
              {selectedCategories.length + (selectedTimeframe ? 1 : 0) + (selectedType ? 1 : 0)}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Filter Events</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-gray-500 font-normal">Categories</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={selectedCategories.includes("Social")}
            onCheckedChange={() => handleCategoryToggle("Social")}
          >
            Social
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedCategories.includes("Volunteer")}
            onCheckedChange={() => handleCategoryToggle("Volunteer")}
          >
            Volunteer
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedCategories.includes("Education")}
            onCheckedChange={() => handleCategoryToggle("Education")}
          >
            Education
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedCategories.includes("Sports")}
            onCheckedChange={() => handleCategoryToggle("Sports")}
          >
            Sports & Recreation
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedCategories.includes("Arts")}
            onCheckedChange={() => handleCategoryToggle("Arts")}
          >
            Arts & Culture
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-gray-500 font-normal">Timeframe</DropdownMenuLabel>
          <DropdownMenuItem
            className={
              selectedTimeframe === "Today" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : ""
            }
            onClick={() => handleTimeframeSelect("Today")}
          >
            Today
          </DropdownMenuItem>
          <DropdownMenuItem
            className={
              selectedTimeframe === "This Weekend"
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                : ""
            }
            onClick={() => handleTimeframeSelect("This Weekend")}
          >
            This Weekend
          </DropdownMenuItem>
          <DropdownMenuItem
            className={
              selectedTimeframe === "This Week" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : ""
            }
            onClick={() => handleTimeframeSelect("This Week")}
          >
            This Week
          </DropdownMenuItem>
          <DropdownMenuItem
            className={
              selectedTimeframe === "This Month"
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                : ""
            }
            onClick={() => handleTimeframeSelect("This Month")}
          >
            This Month
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-gray-500 font-normal">Event Type</DropdownMenuLabel>
          <DropdownMenuItem
            className={
              selectedType === "Free Events" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : ""
            }
            onClick={() => handleTypeSelect("Free Events")}
          >
            Free Events
          </DropdownMenuItem>
          <DropdownMenuItem
            className={
              selectedType === "Virtual Events" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : ""
            }
            onClick={() => handleTypeSelect("Virtual Events")}
          >
            Virtual Events
          </DropdownMenuItem>
          <DropdownMenuItem
            className={
              selectedType === "In-Person Events"
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                : ""
            }
            onClick={() => handleTypeSelect("In-Person Events")}
          >
            In-Person Events
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-gray-500 font-normal">Location</DropdownMenuLabel>
          <DropdownMenuItem>My Neighborhood Only</DropdownMenuItem>
          <DropdownMenuItem>Within 5 Miles</DropdownMenuItem>
          <DropdownMenuItem>Within 10 Miles</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <div className="p-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              setSelectedCategories([])
              setSelectedTimeframe(null)
              setSelectedType(null)
            }}
          >
            Clear All Filters
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
