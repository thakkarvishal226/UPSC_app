"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BookOpen, PenTool, Brain, TrendingUp, Settings } from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Syllabus Tracker",
    href: "/syllabus",
    icon: BookOpen,
  },
  {
    title: "Answer Writing",
    href: "/answer-writing",
    icon: PenTool,
  },
  {
    title: "AI Assistant",
    href: "/ai-assistant",
    icon: Brain,
  },
  {
    title: "Progress & Stats",
    href: "/progress",
    icon: TrendingUp,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 flex-col border-r bg-background px-4 py-6 md:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <span className="text-xl font-bold">UPSC 2026</span>
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
