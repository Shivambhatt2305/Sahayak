"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateImage, GenerateImageOutput } from "@/ai/flows/generate-image";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, BookOpen } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  prompt: z.string().min(5, "Prompt must be at least 5 characters."),
});

export function TextToImageForm() {
  const [generatedImage, setGeneratedImage] = useState<GenerateImageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedImage(null);
    try {
      const result = await generateImage(values);
      setGeneratedImage(result);
    } catch (error) {
      console.error("Failed to generate image:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate image. Please try again.",
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
            <CardTitle>Image Prompt</CardTitle>
            <CardDescription>Describe the image you want to create.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prompt</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="e.g., A futuristic city skyline at sunset, with flying cars and neon lights, in a photorealistic style." 
                          {...field}
                          rows={6}
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
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Image
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
                    <p className="mt-4 text-muted-foreground">Generating your image... this may take a moment.</p>
                </div>
            </div>
        )}
        {generatedImage && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Generated Image</CardTitle>
            </CardHeader>
            <CardContent>
                {generatedImage.imageUrl && (
                    <div className="relative aspect-square w-full">
                        <Image src={generatedImage.imageUrl} alt="Generated image" layout="fill" objectFit="contain" className="rounded-lg" />
                    </div>
                )}
            </CardContent>
          </Card>
        )}
        {!isLoading && !generatedImage && (
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Generated Image</CardTitle>
              <CardDescription>Your generated image will appear here.</CardDescription>
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
