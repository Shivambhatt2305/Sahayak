'use server';

/**
 * @fileOverview A chatbot assistant for students.
 *
 * - answerStudentQuery - A function that answers student queries.
 * - AnswerStudentQueryInput - The input type for the answerStudentQuery function.
 * - AnswerStudentQueryOutput - The return type for the answerStudentQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerStudentQueryInputSchema = z.object({
  query: z.string().describe("The student's question."),
});
export type AnswerStudentQueryInput = z.infer<typeof AnswerStudentQueryInputSchema>;

const AnswerStudentQueryOutputSchema = z.object({
  answer: z.string().describe("The chatbot's answer to the student's question."),
});
export type AnswerStudentQueryOutput = z.infer<typeof AnswerStudentQueryOutputSchema>;

export async function answerStudentQuery(input: AnswerStudentQueryInput): Promise<AnswerStudentQueryOutput> {
  return answerStudentQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerStudentQueryPrompt',
  input: {schema: AnswerStudentQueryInputSchema},
  output: {schema: AnswerStudentQueryOutputSchema},
  prompt: `You are "Sahayak," a friendly and patient AI tutor for students. Your goal is to explain concepts clearly, using simple terms, examples, and analogies. Always format your answers using Markdown for readability (headings, lists, bold text). Answer the following student's question: {{{query}}}`,
});

const answerStudentQueryFlow = ai.defineFlow(
  {
    name: 'answerStudentQueryFlow',
    inputSchema: AnswerStudentQueryInputSchema,
    outputSchema: AnswerStudentQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
