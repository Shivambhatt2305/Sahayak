"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Smile, Frown, Meh, Laugh, Send } from "lucide-react";

const formSchema = z.object({
  rating: z.enum(["excellent", "good", "medium", "bad"]),
  comment: z.string().optional(),
});

type RatingOption = {
  value: "excellent" | "good" | "medium" | "bad";
  label: string;
  icon: React.ComponentType<any>;
  color: string;
};

const ratingOptions: RatingOption[] = [
  { value: "excellent", label: "Excellent", icon: Laugh, color: "text-green-500" },
  { value: "good", label: "Good", icon: Smile, color: "text-blue-500" },
  { value: "medium", label: "Medium", icon: Meh, color: "text-yellow-500" },
  { value: "bad", label: "Bad", icon: Frown, color: "text-red-500" },
];

export function StudentFeedbackSubmissionForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: "good",
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Feedback submitted:", values); // Simulate submission
    toast({
      title: "Feedback Sent!",
      description: "Thank you for your valuable feedback.",
    });
    form.reset({ rating: "good", comment: "" });
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit Anonymous Feedback</CardTitle>
        <CardDescription>Select a rating and optionally add a comment.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>How would you rate your teacher's recent performance?</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {ratingOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => field.onChange(option.value)}
                          className={cn(
                            "flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all",
                            field.value === option.value
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <option.icon className={cn("w-10 h-10 mb-2", option.color)} />
                          <span className="font-medium">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Comments (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your experience..."
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Submit Feedback
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
