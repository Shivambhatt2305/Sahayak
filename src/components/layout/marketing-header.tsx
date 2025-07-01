"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BookOpenCheck, ChevronDown, GraduationCap, School } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { LanguageSwitcher } from "../language-switcher";
import { useLanguage } from "@/context/language-context";

export function MarketingHeader() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <BookOpenCheck className="h-6 w-6 text-primary" />
            <span className="font-bold">{t('sahayak')}</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/#teacher-features" className="text-muted-foreground transition-colors hover:text-foreground">
            {t('for_teachers')}
          </Link>
          <Link href="/#student-features" className="text-muted-foreground transition-colors hover:text-foreground">
            {t('for_students')}
          </Link>
          <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
            {t('about')}
          </Link>
          <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
            {t('contact')}
          </Link>
        </nav>
        <div className="flex items-center justify-end space-x-2">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default">
                {t('login')}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <School className="mr-2 h-4 w-4" />
                  <span>{t('teacher_login')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/student/subjects">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span>{t('student_login')}</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
