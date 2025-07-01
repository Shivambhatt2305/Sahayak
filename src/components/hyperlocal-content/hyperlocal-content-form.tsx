"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateHyperlocalContent, GenerateHyperlocalContentOutput } from "@/ai/flows/generate-hyperlocal-content";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, BookOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  language: z.string().min(1, "Language is required."),
  culturalReference: z.string().min(1, "Cultural Reference is required."),
  topic: z.string().min(3, "Topic must be at least 3 characters."),
  gradeLevel: z.string().min(1, "Grade level is required."),
  contentType: z.enum(['Story', 'Worksheet']),
  teacherFeedback: z.string().optional(),
});

export function HyperlocalContentForm() {
  const [generatedContent, setGeneratedContent] = useState<GenerateHyperlocalContentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "",
      culturalReference: "",
      topic: "",
      gradeLevel: "",
      contentType: "Story",
      teacherFeedback: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedContent(null);
    try {
      const result = await generateHyperlocalContent(values);
      setGeneratedContent(result);
    } catch (error) {
      console.error("Failed to generate content:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate local content. Please try again.",
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
            <CardTitle>Content Details</CardTitle>
            <CardDescription>Fill in the details to generate your educational content.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Marathi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="culturalReference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cultural Reference</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Diwali festival" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., The importance of sharing" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="gradeLevel"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Grade Level</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., 5" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="contentType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Content Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="Story">Story</SelectItem>
                            <SelectItem value="Worksheet">Worksheet</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormField
                  control={form.control}
                  name="teacherFeedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teacher Feedback (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Make the story more interactive" {...field} />
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
        {isLoading ? (
            <Card className="flex items-center justify-center h-full">
                <CardContent className="text-center p-6">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Generating your content...</p>
                </CardContent>
            </Card>
        ) : generatedContent ? (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{generatedContent.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <article className="prose dark:prose-invert max-w-none prose-h1:font-headline prose-h2:font-headline prose-h3:font-headline text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {generatedContent.content}
                </ReactMarkdown>
              </article>
            </CardContent>
          </Card>
        ) : (
            <Card className="flex flex-col h-full">
              <CardHeader>
                  <CardTitle>Generated Content</CardTitle>
                  <CardDescription>Your story or worksheet will appear here.</CardDescription>
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
