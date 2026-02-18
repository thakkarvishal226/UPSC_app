"use client"

import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { UserCircle, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileSidebar } from "@/components/layout/sidebar";
import { useAuth } from "@/context/auth-context";
import { useGamification } from "@/context/gamification-context";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const [open, setOpen] = useState(false);
  const { signOut, user } = useAuth();
  const { profile } = useGamification();

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="px-2 py-6">
               <span className="text-xl font-bold">UPSC 2026</span>
               <MobileSidebar open={open} setOpen={setOpen} />
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold md:hidden">UPSC 2026</h1>
      </div>
      <div className="flex items-center gap-4">
        {profile && (
            <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm font-medium">{profile.displayName}</span>
                <div className="flex gap-2">
                    <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">{profile.rank}</Badge>
                    <span className="text-[10px] text-muted-foreground">Lvl {profile.level}</span>
                </div>
            </div>
        )}
        <ModeToggle />
        {user ? (
             <Button variant="ghost" size="icon" onClick={() => signOut()}>
                <LogOut className="h-5 w-5 text-red-500" />
                <span className="sr-only">Sign Out</span>
             </Button>
        ) : (
            <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">Account</span>
            </Button>
        )}
      </div>
    </header>
  );
}
