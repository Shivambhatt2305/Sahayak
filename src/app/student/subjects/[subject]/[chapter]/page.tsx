import { generateStudentLesson } from "@/ai/flows/generate-student-lesson";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BookOpen, AlertTriangle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function ChapterPage({ params }: { params: { subject: string; chapter: string } }) {
  const subject = decodeURIComponent(params.subject);
  const chapter = decodeURIComponent(params.chapter);

  let lesson = null;
  let error = null;

  try {
    lesson = await generateStudentLesson({
      subject: subject,
      chapter: chapter,
    });
  } catch (e) {
    console.error("Failed to generate student lesson:", e);
    error = "We couldn't generate this lesson at the moment. Please try again later.";
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader title={chapter} description={`A lesson in ${subject}`} />

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!error && !lesson && (
         <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-lg shadow-sm">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Could not load lesson content.</p>
        </div>
      )}

      {lesson && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">{lesson.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <article className="prose dark:prose-invert max-w-none prose-h1:font-headline prose-h2:font-headline prose-h3:font-headline text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {lesson.content}
              </ReactMarkdown>
            </article>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
