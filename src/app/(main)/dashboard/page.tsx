"use client";

import { PageHeader } from "@/components/page-header";
import { DashboardContentForm } from "@/components/dashboard/dashboard-content-form";
import { ClassOverview } from "@/components/dashboard/class-overview";
import { PendingWork } from "@/components/dashboard/pending-work";
import { Reminders } from "@/components/dashboard/reminders";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/context/language-context";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('dashboard')}
        description={t('dashboard_welcome')}
      >
        <LanguageSwitcher />
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button>
      </PageHeader>

      <DashboardContentForm />
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <ClassOverview />
        <PendingWork />
        <Reminders />
      </div>
    </div>
  );
}
