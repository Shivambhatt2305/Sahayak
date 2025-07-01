"use client";

import { classOverviewData } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function ClassOverview() {
  const { t } = useLanguage();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Users className="h-5 w-5 text-primary" />
          {t('class_overview')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {classOverviewData.map((classInfo) => (
          <div key={classInfo.id} className="flex items-center justify-between">
            <div>
                <p className="font-medium">{classInfo.name}</p>
                <p className="text-xs text-muted-foreground">{classInfo.pending} {t('pending')}, {classInfo.completed} {t('completed')}</p>
            </div>
            <div className="text-right">
                <p className="font-semibold">{classInfo.students}</p>
                <p className="text-xs text-muted-foreground">{t('students')}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
