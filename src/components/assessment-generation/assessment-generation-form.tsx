"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateAssessmentQuestions, GenerateAssessmentQuestionsOutput } from "@/ai/flows/generate-assessment-questions";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, BookOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters."),
  questionType: z.enum(['multiple choice', 'short answer']),
  numberOfQuestions: z.number().int().min(1).max(10),
});

export function AssessmentGenerationForm() {
  const [assessment, setAssessment] = useState<GenerateAssessmentQuestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      questionType: "multiple choice",
      numberOfQuestions: 5,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAssessment(null);
    try {
      const result = await generateAssessmentQuestions(values);
      setAssessment(result);
    } catch (error) {
      console.error("Failed to generate questions:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate questions. Please try again.",
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
            <CardTitle>Assessment Details</CardTitle>
            <CardDescription>Provide details to generate assessment questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic or Lesson Plan Summary</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Key events of World War II" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="questionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a question type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="multiple choice">Multiple Choice</SelectItem>
                          <SelectItem value="short answer">Short Answer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberOfQuestions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Questions: {field.value}</FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
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
                      Generate Questions
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
                    <p className="mt-4 text-muted-foreground">Generating your assessment...</p>
                </div>
            </div>
        )}
        {assessment && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Generated Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
                {assessment.questions.map((q, index) => (
                  <li key={index}>{q}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}
        {!isLoading && !assessment && (
           <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Generated Questions</CardTitle>
                <CardDescription>Your generated questions will appear here.</CardDescription>
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
