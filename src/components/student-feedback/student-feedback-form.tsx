"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { summarizeStudentFeedback, SummarizeStudentFeedbackOutput } from "@/ai/flows/summarize-student-feedback";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Lightbulb, FileText, BookOpen } from "lucide-react";

const formSchema = z.object({
  feedbackText: z.string().min(20, "Please provide at least 20 characters of feedback."),
});

export function StudentFeedbackForm() {
  const [summary, setSummary] = useState<SummarizeStudentFeedbackOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedbackText: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await summarizeStudentFeedback(values);
      setSummary(result);
    } catch (error) {
      console.error("Failed to summarize feedback:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to summarize feedback. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-5 gap-8">
      <div className="md:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Student Feedback</CardTitle>
            <CardDescription>Paste in anonymous student feedback to get a summary.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="feedbackText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feedback Text</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., The class was great, but sometimes the pace was a bit too fast. More examples would be helpful..."
                          {...field}
                          rows={10}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Summarizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Summarize Feedback
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 bg-card rounded-lg shadow-sm">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Analyzing feedback...</p>
            </div>
          </div>
        )}
        {summary && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Key Themes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <article className="prose dark:prose-invert max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary.summary}</ReactMarkdown>
                </article>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                    Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <article className="prose dark:prose-invert max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary.areasForImprovement}</ReactMarkdown>
                </article>
              </CardContent>
            </Card>
          </div>
        )}
        {!isLoading && !summary && (
           <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Feedback Summary</CardTitle>
                <CardDescription>Your feedback summary will appear here.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center flex-grow p-6">
                <div className="text-center text-muted-foreground">
                  <BookOpen className="mx-auto h-12 w-12" />
                  <p className="mt-4">Your generated content will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
