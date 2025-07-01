"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Plus, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/language-context";

export function DashboardContentForm() {
    const form = useForm();
    const router = useRouter();
    const { t } = useLanguage();

    function onSubmit() {
        // For now, redirect to the main content generation page
        router.push('/content-generation');
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {t('quick_content_generation')}
                </CardTitle>
                <CardDescription>{t('quick_content_description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="gradeLevel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('grade_level')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('select_grade')} />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="grade-9">{t('grade_9')}</SelectItem>
                                                <SelectItem value="grade-10">{t('grade_10')}</SelectItem>
                                                <SelectItem value="grade-11">{t('grade_11')}</SelectItem>
                                                <SelectItem value="grade-12">{t('grade_12')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('subject')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('select_subject')} />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="math">{t('math')}</SelectItem>
                                                <SelectItem value="science">{t('science')}</SelectItem>
                                                <SelectItem value="history">{t('history')}</SelectItem>
                                                <SelectItem value="english">{t('english')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="contentType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('content_type')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('select_type')} />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="lesson-plan">{t('lesson_plan')}</SelectItem>
                                                <SelectItem value="worksheet">{t('worksheet')}</SelectItem>
                                                <SelectItem value="quiz">{t('quiz')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                         <FormField
                            control={form.control}
                            name="requirements"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('requirements')}</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder={t('requirements_placeholder')} {...field} rows={3} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                             <Button type="submit">
                                <Plus className="mr-2 h-4 w-4" />
                                {t('generate')}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
