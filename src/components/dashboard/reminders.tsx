"use client";

import { reminders } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function Reminders() {
  const { t } = useLanguage();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Bell className="h-5 w-5 text-primary" />
          {t('reminders')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="flex items-center gap-4">
            <div className="p-2 bg-secondary rounded-md">
                <Bell className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="font-semibold">{reminder.title}</p>
              <p className="text-sm text-muted-foreground">{reminder.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
