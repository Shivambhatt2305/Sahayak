import Link from "next/link";
import { subjects as allSubjects } from "@/data/student-mock-data";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Book } from "lucide-react";

export default async function SubjectPage({ params }: { params: { subject: string } }) {
  const subjectSlug = decodeURIComponent(params.subject);
  const subject = allSubjects.find((s) => s.slug === subjectSlug);

  if (!subject) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader title="Subject not found" />
        <p>The subject you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader title={subject.name} description={`Chapters and units in ${subject.name}.`} />
      <div className="space-y-4">
        {subject.chapters.map((chapter) => (
          <Link href={`/student/subjects/${subject.slug}/${chapter.slug}`} key={chapter.slug}>
            <Card className="bg-card/50 hover:border-primary hover:shadow-lg transition-all group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-md">
                        <Book className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{chapter.name}</h3>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
