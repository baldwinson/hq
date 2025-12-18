import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "HQ" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/ethics", label: "Ethics" },
  { href: "/apps", label: "Apps" },
];

interface NavigationProps {
  currentPath?: string;
}

export function Navigation({ currentPath = "/" }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Logo - Left */}
        <a
          href="/"
          className="flex items-center text-lg font-light tracking-tight text-foreground transition-colors hover:text-foreground/80"
        >
          BALDWINSON
        </a>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <ul className="flex items-center space-x-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-normal transition-colors after:absolute after:left-4 after:right-4 after:-bottom-0.5 after:h-px after:origin-center after:content-[''] after:transition-transform after:duration-300 ${
                    currentPath === item.href
                      ? "text-foreground after:bg-foreground/50 after:scale-x-100"
                      : "text-muted-foreground hover:text-foreground after:bg-foreground/30 after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right spacer for desktop to balance the logo */}
        <div className="hidden md:block md:w-[140px]" />

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[350px]">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col space-y-6 px-2 pt-6">
              <span className="text-lg font-light tracking-tight text-foreground">
                BALDWINSON
              </span>
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-3 text-base font-normal transition-colors ${
                      currentPath === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
