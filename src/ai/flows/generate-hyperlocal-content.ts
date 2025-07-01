'use server';
/**
 * @fileOverview A local content generation AI agent.
 *
 * - generateHyperlocalContent - A function that handles the local content generation process.
 * - GenerateHyperlocalContentInput - The input type for the generateHyperlocalContent function.
 * - GenerateHyperlocalContentOutput - The return type for the generateHyperlocalContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHyperlocalContentInputSchema = z.object({
  language: z.string().describe('The language for the content.'),
  culturalReference: z.string().describe('A cultural reference to include in the content (e.g., a festival, a local custom).'),
  topic: z.string().describe('The main topic or theme of the content.'),
  gradeLevel: z.string().describe('The target grade level for the content.'),
  contentType: z.enum(['Story', 'Worksheet']).describe('The type of content to generate.'),
  teacherFeedback: z.string().optional().describe('Optional feedback from the teacher to guide content generation.'),
});
export type GenerateHyperlocalContentInput = z.infer<typeof GenerateHyperlocalContentInputSchema>;

const GenerateHyperlocalContentOutputSchema = z.object({
    title: z.string().describe('The title of the generated content.'),
    content: z.string().describe('The generated content, formatted in Markdown.'),
});
export type GenerateHyperlocalContentOutput = z.infer<typeof GenerateHyperlocalContentOutputSchema>;

export async function generateHyperlocalContent(input: GenerateHyperlocalContentInput): Promise<GenerateHyperlocalContentOutput> {
  return generateHyperlocalContentFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generateLocalContentPrompt',
    input: {schema: GenerateHyperlocalContentInputSchema},
    output: {schema: GenerateHyperlocalContentOutputSchema},
    prompt: `You are an expert curriculum developer specializing in creating engaging, culturally relevant educational content.

Your task is to generate a "{{contentType}}" for a "{{gradeLevel}}" grade student.

The content must be written in the {{language}} language.
It should be about the topic of "{{topic}}".
Crucially, you must incorporate the cultural reference of "{{culturalReference}}" into the content.

{{#if teacherFeedback}}
Also, please incorporate the following feedback from the teacher to improve the content: "{{teacherFeedback}}"
{{/if}}

Generate a suitable 'title' and the main 'content' for this educational material. The 'content' field must be a well-structured Markdown string.
`,
});


const generateHyperlocalContentFlow = ai.defineFlow(
  {
    name: 'generateHyperlocalContentFlow',
    inputSchema: GenerateHyperlocalContentInputSchema,
    outputSchema: GenerateHyperlocalContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
