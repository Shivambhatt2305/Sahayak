"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { answerTeacherQuery } from "@/ai/flows/answer-teacher-query";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Send, Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";

const formSchema = z.object({
  query: z.string().min(1),
});

interface Message {
    role: "user" | "bot";
    text: string;
}

export function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: "" },
  });

  useEffect(() => {
    if(scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo(0, scrollAreaRef.current.scrollHeight);
    }
  }, [messages])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setMessages(prev => [...prev, { role: "user", text: values.query }]);
    form.reset();

    try {
      const result = await answerTeacherQuery(values);
      setMessages(prev => [...prev, { role: "bot", text: result.answer }]);
    } catch (error) {
      console.error("Failed to get answer:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get an answer. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
                <div className="space-y-6">
                {messages.length === 0 && (
                    <div className="text-center text-muted-foreground">
                        <Bot className="mx-auto h-12 w-12" />
                        <p className="mt-2">Start a conversation by typing below.</p>
                    </div>
                )}
                {messages.map((message, index) => (
                    <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                        {message.role === 'bot' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn("max-w-xl rounded-lg px-4 py-2", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                            <article className="prose dark:prose-invert max-w-none prose-p:my-2">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                            </article>
                        </div>
                         {message.role === 'user' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                        <div className="max-w-md rounded-lg px-4 py-3 bg-muted flex items-center">
                           <Loader2 className="h-5 w-5 animate-spin text-muted-foreground"/>
                        </div>
                    </div>
                )}
                </div>
            </ScrollArea>
        </CardContent>
        <CardFooter className="pt-4 border-t">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-center space-x-2">
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="e.g., How can I explain photosynthesis to 10th graders?" {...field} autoComplete="off" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
              </form>
            </Form>
        </CardFooter>
    </Card>
  );
}
