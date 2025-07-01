"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateTimetable, GenerateTimetableOutput } from "@/ai/flows/generate-timetable";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, CalendarDays } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { cn } from "@/lib/utils";
import { Slider } from "../ui/slider";

const formSchema = z.object({
  gradeLevel: z.string().min(1, "Grade level is required."),
  subjects: z.string().min(3, "Please enter at least one subject."),
  periodsPerDay: z.number().int().min(4).max(8),
});

export function TimetableGenerationForm() {
  const [timetable, setTimetable] = useState<GenerateTimetableOutput['timetable'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gradeLevel: "Grade 10",
      subjects: "Mathematics, English, Science, History, Art, Physical Education",
      periodsPerDay: 6,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimetable(null);
    try {
      const result = await generateTimetable(values);
      setTimetable(result.timetable);
    } catch (error) {
      console.error("Failed to generate timetable:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate timetable. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getCellClass = (subject: string) => {
    if (subject.toLowerCase().includes('lunch')) {
        return "bg-primary/20 text-primary-foreground font-semibold";
    }
    if (subject.toLowerCase().includes('free')) {
        return "text-muted-foreground";
    }
    return "";
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Timetable Details</CardTitle>
            <CardDescription>Provide details to generate a class schedule.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  name="subjects"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subjects</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter subjects, separated by commas" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="periodsPerDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Periods per Day: {field.value}</FormLabel>
                      <FormControl>
                         <Slider
                          min={4}
                          max={8}
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
                      Generate Timetable
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1">
        {isLoading && (
            <div className="flex items-center justify-center h-full">
                <div className="text-center p-8 bg-card rounded-lg shadow-sm">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Generating your timetable...</p>
                </div>
            </div>
        )}
        {timetable && (
          <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Generated Timetable</CardTitle>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[150px]">Time</TableHead>
                        <TableHead>Monday</TableHead>
                        <TableHead>Tuesday</TableHead>
                        <TableHead>Wednesday</TableHead>
                        <TableHead>Thursday</TableHead>
                        <TableHead>Friday</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {timetable.map((row) => (
                        <TableRow key={row.time}>
                            <TableCell className="font-medium">{row.time}</TableCell>
                            <TableCell className={cn(getCellClass(row.monday))}>{row.monday}</TableCell>
                            <TableCell className={cn(getCellClass(row.tuesday))}>{row.tuesday}</TableCell>
                            <TableCell className={cn(getCellClass(row.wednesday))}>{row.wednesday}</TableCell>
                            <TableCell className={cn(getCellClass(row.thursday))}>{row.thursday}</TableCell>
                            <TableCell className={cn(getCellClass(row.friday))}>{row.friday}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        )}
        {!isLoading && !timetable && (
            <div className="flex items-center justify-center h-full">
                <div className="text-center p-8 bg-card rounded-lg shadow-sm">
                    <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">Your generated timetable will appear here.</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
