import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

export function StudentHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <BookOpenCheck className="h-6 w-6 text-primary" />
            <span className="font-bold">Sahayak</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/student/subjects" className="text-muted-foreground transition-colors hover:text-foreground">
            Subjects
          </Link>
          <Link href="/student/self-learning" className="text-muted-foreground transition-colors hover:text-foreground">
            Self-Learning
          </Link>
           <Link href="/student/chatbot" className="text-muted-foreground transition-colors hover:text-foreground">
            AI Tutor
          </Link>
          <Link href="/student/feedback" className="text-muted-foreground transition-colors hover:text-foreground">
            Feedback
          </Link>
        </nav>
      </div>
    </header>
  );
}
