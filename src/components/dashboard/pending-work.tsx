"use client";

import { pendingWork } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function PendingWork() {
  const { t } = useLanguage();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Clock className="h-5 w-5 text-primary" />
          {t('pending_work')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingWork.map((work) => (
          <div key={work.id} className="flex items-center gap-4">
            <div className="p-2 bg-secondary rounded-md">
                <Clock className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="font-semibold">{work.title}</p>
              <p className="text-sm text-muted-foreground">{work.subject} &middot; Due {work.dueDate}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
