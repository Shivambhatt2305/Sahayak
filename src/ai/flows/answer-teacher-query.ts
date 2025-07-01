'use server';

/**
 * @fileOverview A chatbot assistant for teachers.
 *
 * - answerTeacherQuery - A function that answers teacher queries.
 * - AnswerTeacherQueryInput - The input type for the answerTeacherQuery function.
 * - AnswerTeacherQueryOutput - The return type for the answerTeacherQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerTeacherQueryInputSchema = z.object({
  query: z.string().describe('The teacher\'s question.'),
});
export type AnswerTeacherQueryInput = z.infer<typeof AnswerTeacherQueryInputSchema>;

const AnswerTeacherQueryOutputSchema = z.object({
  answer: z.string().describe('The chatbot\'s answer to the teacher\'s question.'),
});
export type AnswerTeacherQueryOutput = z.infer<typeof AnswerTeacherQueryOutputSchema>;

export async function answerTeacherQuery(input: AnswerTeacherQueryInput): Promise<AnswerTeacherQueryOutput> {
  return answerTeacherQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerTeacherQueryPrompt',
  input: {schema: AnswerTeacherQueryInputSchema},
  output: {schema: AnswerTeacherQueryOutputSchema},
  prompt: `You are a professional and insightful AI assistant for teachers. Your goal is to provide well-structured, actionable, and informative answers. Use Markdown for clear formatting. Answer the following teacher's question: {{{query}}}`,
});

const answerTeacherQueryFlow = ai.defineFlow(
  {
    name: 'answerTeacherQueryFlow',
    inputSchema: AnswerTeacherQueryInputSchema,
    outputSchema: AnswerTeacherQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
