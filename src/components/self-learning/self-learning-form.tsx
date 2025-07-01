"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateLessonFromMaterial, GenerateLessonFromMaterialOutput } from "@/ai/flows/generate-lesson-from-material";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, BookOpen, Badge } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  material: z.string().min(50, "Please provide at least 50 characters of material."),
  gradeLevel: z.string().min(1, "Grade level is required."),
});

export function SelfLearningForm() {
  const [lesson, setLesson] = useState<GenerateLessonFromMaterialOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      material: "",
      gradeLevel: "High School",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setLesson(null);
    try {
      const result = await generateLessonFromMaterial(values);
      setLesson(result);
    } catch (error) {
      console.error("Failed to generate lesson:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate the lesson. Please try again.",
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
            <CardTitle>Your Material</CardTitle>
            <CardDescription>Provide the text you want to learn about.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="material"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Paste your text here</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste an article, notes, or any text here..."
                          {...field}
                          rows={15}
                        />
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
                        <Input placeholder="e.g., 10th Grade, University" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Lesson...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Create Lesson
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
                    <p className="mt-4 text-muted-foreground">The AI is creating your personalized lesson...</p>
                </div>
            </div>
        )}
        {lesson && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold font-headline text-lg text-primary mb-3">Key Concepts</h3>
                  <div className="flex flex-wrap gap-2">
                    {lesson.keyConcepts.map((concept, index) => (
                      <div key={index} className="flex items-center rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-sm font-medium text-primary-foreground">
                        <Badge className="mr-2 h-4 w-4 text-primary" />
                        {concept}
                      </div>
                    ))}
                  </div>
                </div>
                <Separator/>
                <article className="prose dark:prose-invert max-w-none">
                  <h3 className="font-semibold font-headline text-lg text-primary mb-2">Generated Lesson</h3>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.content}</ReactMarkdown>
                </article>
            </CardContent>
          </Card>
        )}
        {!isLoading && !lesson && (
            <Card className="flex flex-col h-full">
                <CardHeader>
                    <CardTitle>Generated Lesson</CardTitle>
                    <CardDescription>Your generated lesson will appear here.</CardDescription>
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
