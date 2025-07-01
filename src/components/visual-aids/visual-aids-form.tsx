"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { designVisualAid, DesignVisualAidOutput } from "@/ai/flows/design-visual-aids";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, BookOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

const formSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters."),
  visualAidType: z.string().min(1, "Please select a type."),
});

export function VisualAidsForm() {
  const [visualAid, setVisualAid] = useState<DesignVisualAidOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      visualAidType: "infographic",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setVisualAid(null);
    try {
      const result = await designVisualAid(values);
      setVisualAid(result);
    } catch (error) {
      console.error("Failed to design visual aid:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to design visual aid. Please try again.",
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
            <CardTitle>Visual Aid Details</CardTitle>
            <CardDescription>Describe the visual aid you want to create.</CardDescription>
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
                        <Input placeholder="e.g., The Water Cycle" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="visualAidType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visual Aid Type</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="infographic">Infographic</SelectItem>
                          <SelectItem value="diagram">Diagram</SelectItem>
                          <SelectItem value="chart">Chart</SelectItem>
                          <SelectItem value="illustration">Illustration</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Designing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Design Visual Aid
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
                    <p className="mt-4 text-muted-foreground">Designing your visual aid...</p>
                </div>
            </div>
        )}
        {visualAid && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Generated Visual Aid</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {visualAid.imageUrl && (
                    <div className="relative aspect-video w-full">
                        <Image src={visualAid.imageUrl} alt="Generated visual aid" layout="fill" objectFit="contain" className="rounded-lg" />
                    </div>
                )}
              <article className="prose dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{visualAid.description}</ReactMarkdown>
              </article>
            </CardContent>
          </Card>
        )}
        {!isLoading && !visualAid && (
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Generated Visual Aid</CardTitle>
                <CardDescription>Your generated visual aid will appear here.</CardDescription>
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
