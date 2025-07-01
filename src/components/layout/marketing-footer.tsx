import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center gap-2">
            <BookOpenCheck className="h-6 w-6 text-primary" />
            <p className="text-lg font-semibold">Sahayak</p>
        </div>
        <p className="text-sm text-muted-foreground mt-4 sm:mt-0">
          © {new Date().getFullYear()} Sahayak. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
