'use server';

/**
 * @fileOverview Assessment question generation flow.
 *
 * - generateAssessmentQuestions - Generates assessment questions based on a lesson plan or topic.
 * - GenerateAssessmentQuestionsInput - The input type for the generateAssessmentQuestions function.
 * - GenerateAssessmentQuestionsOutput - The return type for the generateAssessmentQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAssessmentQuestionsInputSchema = z.object({
  topic: z.string().describe('The topic or lesson plan for which to generate assessment questions.'),
  questionType: z.enum(['multiple choice', 'short answer']).describe('The type of assessment questions to generate.'),
  numberOfQuestions: z.number().int().positive().default(5).describe('The number of assessment questions to generate.'),
});
export type GenerateAssessmentQuestionsInput = z.infer<typeof GenerateAssessmentQuestionsInputSchema>;

const GenerateAssessmentQuestionsOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of assessment questions.'),
});
export type GenerateAssessmentQuestionsOutput = z.infer<typeof GenerateAssessmentQuestionsOutputSchema>;

export async function generateAssessmentQuestions(input: GenerateAssessmentQuestionsInput): Promise<GenerateAssessmentQuestionsOutput> {
  return generateAssessmentQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAssessmentQuestionsPrompt',
  input: {schema: GenerateAssessmentQuestionsInputSchema},
  output: {schema: GenerateAssessmentQuestionsOutputSchema},
  prompt: `You are an expert teacher. Your goal is to generate {{numberOfQuestions}} {{questionType}} assessment questions based on the following topic or lesson plan: {{{topic}}}.  The questions should be appropriate for high school students.

Output the questions as a JSON array of strings called 'questions'.`, 
});

const generateAssessmentQuestionsFlow = ai.defineFlow(
  {
    name: 'generateAssessmentQuestionsFlow',
    inputSchema: GenerateAssessmentQuestionsInputSchema,
    outputSchema: GenerateAssessmentQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
