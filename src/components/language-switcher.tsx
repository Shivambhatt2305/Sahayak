
"use client";

import { useLanguage } from '@/context/language-context';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('choose_language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('hi')}>
          हिन्दी
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('mr')}>
          मराठी
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('gu')}>
          ગુજરાતી
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('bn')}>
          বাংলা
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ta')}>
          தமிழ்
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('te')}>
          తెలుగు
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('kn')}>
          ಕನ್ನಡ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
