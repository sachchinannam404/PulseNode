"use client"

import { usePathname } from "next/navigation"
import { NavItem } from "@/components/nav-item"
import { NAV_ITEMS } from "@/lib/constants"

interface SidebarProps {
  onLinkClick?: () => void
}

export function Sidebar({ onLinkClick }: SidebarProps) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2 p-4">
      {NAV_ITEMS.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
          isActive={pathname === item.href}
          onClick={onLinkClick} // Pass the onClick handler to NavItem
        />
      ))}
    </nav>
  )
}
