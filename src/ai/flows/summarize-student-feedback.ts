'use server';

/**
 * @fileOverview Summarizes student feedback to identify key themes and areas for improvement.
 *
 * - summarizeStudentFeedback - A function that handles the feedback summarization process.
 * - SummarizeStudentFeedbackInput - The input type for the summarizeStudentFeedback function.
 * - SummarizeStudentFeedbackOutput - The return type for the summarizeStudentFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeStudentFeedbackInputSchema = z.object({
  feedbackText: z
    .string()
    .describe('The student feedback text to be summarized.'),
});
export type SummarizeStudentFeedbackInput =
  z.infer<typeof SummarizeStudentFeedbackInputSchema>;

const SummarizeStudentFeedbackOutputSchema = z.object({
  summary: z.string().describe('A summary of the key themes in the feedback, formatted in Markdown.'),
  areasForImprovement: z
    .string()
    .describe('Areas where the teacher can improve based on the feedback, formatted in Markdown.'),
});
export type SummarizeStudentFeedbackOutput =
  z.infer<typeof SummarizeStudentFeedbackOutputSchema>;

export async function summarizeStudentFeedback(
  input: SummarizeStudentFeedbackInput
): Promise<SummarizeStudentFeedbackOutput> {
  return summarizeStudentFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeStudentFeedbackPrompt',
  input: {schema: SummarizeStudentFeedbackInputSchema},
  output: {schema: SummarizeStudentFeedbackOutputSchema},
  prompt: `You are a helpful assistant for teachers. Please analyze the following student feedback and provide:
1. A 'summary' of the key themes, using bullet points for clarity.
2. A list of 'areasForImprovement', also using bullet points.

Both fields should be formatted as Markdown strings.

Feedback:
{{{feedbackText}}}`,
});

const summarizeStudentFeedbackFlow = ai.defineFlow(
  {
    name: 'summarizeStudentFeedbackFlow',
    inputSchema: SummarizeStudentFeedbackInputSchema,
    outputSchema: SummarizeStudentFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
