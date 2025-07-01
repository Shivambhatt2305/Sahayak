"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateLessonPlan, GenerateLessonPlanOutput } from "@/ai/flows/generate-lesson-plan";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, BookOpen } from "lucide-react";
import { Separator } from "../ui/separator";

const formSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters."),
  gradeLevel: z.string().min(1, "Grade level is required."),
  learningObjectives: z.string().optional(),
  duration: z.string().optional(),
});

export function ContentGenerationForm() {
  const [lessonPlan, setLessonPlan] = useState<GenerateLessonPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      gradeLevel: "",
      learningObjectives: "",
      duration: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setLessonPlan(null);
    try {
      const result = await generateLessonPlan(values);
      setLessonPlan(result);
    } catch (error) {
      console.error("Failed to generate lesson plan:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate lesson plan. Please try again.",
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
            <CardTitle>Lesson Details</CardTitle>
            <CardDescription>Provide details to generate a tailored lesson plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Photosynthesis" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gradeLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade Level</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Grade 10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="learningObjectives"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Learning Objectives (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Students will be able to explain the process of photosynthesis." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 45 minutes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Content
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
                    <p className="mt-4 text-muted-foreground">Generating your lesson plan...</p>
                </div>
            </div>
        )}
        {lessonPlan && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{lessonPlan.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <article className="prose dark:prose-invert max-w-none">
                <h3 className="font-semibold font-headline text-lg text-primary">Introduction</h3>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{lessonPlan.introduction}</ReactMarkdown>
                <Separator className="my-6" />
                <h3 className="font-semibold font-headline text-lg text-primary">Activities</h3>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{lessonPlan.activities}</ReactMarkdown>
                <Separator className="my-6" />
                <h3 className="font-semibold font-headline text-lg text-primary">Assessment</h3>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{lessonPlan.assessment}</ReactMarkdown>
                <Separator className="my-6" />
                <h3 className="font-semibold font-headline text-lg text-primary">Materials</h3>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{lessonPlan.materials}</ReactMarkdown>
              </article>
            </CardContent>
          </Card>
        )}
        {!isLoading && !lessonPlan && (
            <Card className="flex flex-col h-full">
                <CardHeader>
                    <CardTitle>Generated Lesson Plan</CardTitle>
                    <CardDescription>Your generated lesson plan will appear here.</CardDescription>
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
