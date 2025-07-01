import Link from "next/link";
import { subjects } from "@/data/student-mock-data";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function SubjectsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Choose a Subject"
        description="Select a subject to start learning."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <Link href={`/student/subjects/${subject.slug}`} key={subject.slug}>
            <Card className="h-full group bg-card/50 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-primary/10 rounded-md">
                    <subject.icon className="w-8 h-8 text-primary" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle>{subject.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">{subject.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
