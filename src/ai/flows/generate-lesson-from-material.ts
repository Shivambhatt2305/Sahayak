'use server';
/**
 * @fileOverview An AI agent that generates a lesson from provided material.
 *
 * - generateLessonFromMaterial - A function that handles the lesson generation process.
 * - GenerateLessonFromMaterialInput - The input type for the generateLessonFromMaterial function.
 * - GenerateLessonFromMaterialOutput - The return type for the generateLessonFromMaterial function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonFromMaterialInputSchema = z.object({
  material: z.string().describe('The raw text material provided by the student.'),
  gradeLevel: z.string().describe('The grade level of the student.'),
});
export type GenerateLessonFromMaterialInput = z.infer<typeof GenerateLessonFromMaterialInputSchema>;

const GenerateLessonFromMaterialOutputSchema = z.object({
  title: z.string().describe('A suitable title for the lesson based on the material.'),
  content: z.string().describe('The structured and educational lesson content generated from the material, in Markdown format.'),
  keyConcepts: z.array(z.string()).describe('A list of key concepts or vocabulary from the material.'),
});
export type GenerateLessonFromMaterialOutput = z.infer<typeof GenerateLessonFromMaterialOutputSchema>;

export async function generateLessonFromMaterial(input: GenerateLessonFromMaterialInput): Promise<GenerateLessonFromMaterialOutput> {
  return generateLessonFromMaterialFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generateLessonFromMaterialPrompt',
    input: {schema: GenerateLessonFromMaterialInputSchema},
    output: {schema: GenerateLessonFromMaterialOutputSchema},
    prompt: `You are an expert educator who excels at transforming raw text into structured, engaging lessons for a {{gradeLevel}} audience.

A student has provided the following material. Your task is to:
1.  Create a clear and concise title for the lesson.
2.  Rewrite the material into a well-organized lesson using Markdown. Use headings, subheadings, bullet points, bold text for key terms, and clear explanations to make it easy to understand. Ensure the output 'content' field is a single Markdown string.
3.  Identify and list the most important key concepts or vocabulary words from the text.

Provided Material:
---
{{{material}}}
---
`,
});

const generateLessonFromMaterialFlow = ai.defineFlow(
  {
    name: 'generateLessonFromMaterialFlow',
    inputSchema: GenerateLessonFromMaterialInputSchema,
    outputSchema: GenerateLessonFromMaterialOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
