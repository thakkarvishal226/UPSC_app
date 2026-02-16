import { ModeToggle } from "@/components/mode-toggle";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold md:hidden">UPSC 2026</h1>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Button variant="ghost" size="icon">
          <UserCircle className="h-6 w-6" />
          <span className="sr-only">Account</span>
        </Button>
      </div>
    </header>
  );
}
