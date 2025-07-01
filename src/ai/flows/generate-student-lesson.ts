'use server';

/**
 * @fileOverview A student-facing lesson generation AI agent.
 *
 * - generateStudentLesson - A function that generates a lesson for a student on a specific topic.
 * - GenerateStudentLessonInput - The input type for the generateStudentLesson function.
 * - GenerateStudentLessonOutput - The return type for the generateStudentLesson function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStudentLessonInputSchema = z.object({
  subject: z.string().describe('The subject of the lesson.'),
  chapter: z.string().describe('The chapter or topic of the lesson.'),
});
export type GenerateStudentLessonInput = z.infer<typeof GenerateStudentLessonInputSchema>;

const GenerateStudentLessonOutputSchema = z.object({
  title: z.string().describe('A suitable title for the lesson.'),
  content: z.string().describe('The educational content of the lesson, formatted for a student using Markdown.'),
});
export type GenerateStudentLessonOutput = z.infer<typeof GenerateStudentLessonOutputSchema>;

export async function generateStudentLesson(input: GenerateStudentLessonInput): Promise<GenerateStudentLessonOutput> {
  return generateStudentLessonFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudentLessonPrompt',
  input: {schema: GenerateStudentLessonInputSchema},
  output: {schema: GenerateStudentLessonOutputSchema},
  prompt: `You are an expert AI tutor, "Sahayak". Your goal is to generate a clear, engaging, and easy-to-understand lesson for a high school student.

The lesson is on the topic of "{{chapter}}" within the subject of "{{subject}}".

Break down the concepts into simple terms. Use headings, bullet points, and examples to structure the content. You can also include simple practice questions with answers at the end to check for understanding. The output 'content' field must be a single string in Markdown format.`,
});

const generateStudentLessonFlow = ai.defineFlow(
  {
    name: 'generateStudentLessonFlow',
    inputSchema: GenerateStudentLessonInputSchema,
    outputSchema: GenerateStudentLessonOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
