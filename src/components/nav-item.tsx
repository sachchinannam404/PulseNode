"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface NavItemProps {
  href: string
  label: string
  icon: React.ElementType
  isActive?: boolean
  isCollapsed?: boolean
  onClick?: () => void // Add onClick to props
}

export function NavItem({
  href,
  label,
  icon: Icon,
  isActive,
  isCollapsed,
  onClick, // Destructure onClick
}: NavItemProps) {
  const content = (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md p-2 text-gray-600 hover:bg-gray-100",
        isActive && "bg-gray-200 text-gray-900",
        isCollapsed && "justify-center"
      )}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span className="font-medium">{label}</span>}
    </div>
  )

  return isCollapsed ? (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={href} onClick={onClick} className="block">
          {content}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  ) : (
    <Link href={href} onClick={onClick} className="block">
      {content}
    </Link>
  )
}
