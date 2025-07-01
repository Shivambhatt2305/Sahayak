'use server';

/**
 * @fileOverview A lesson plan generation AI agent.
 *
 * - generateLessonPlan - A function that handles the lesson plan generation process.
 * - GenerateLessonPlanInput - The input type for the generateLessonPlan function.
 * - GenerateLessonPlanOutput - The return type for the generateLessonPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonPlanInputSchema = z.object({
  topic: z.string().describe('The topic of the lesson plan.'),
  gradeLevel: z.string().describe('The grade level for the lesson plan.'),
  learningObjectives: z.string().optional().describe('The learning objectives for the lesson plan.'),
  duration: z.string().optional().describe('The estimated duration of the lesson.'),
});

export type GenerateLessonPlanInput = z.infer<typeof GenerateLessonPlanInputSchema>;

const GenerateLessonPlanOutputSchema = z.object({
  title: z.string().describe('The title of the lesson plan.'),
  introduction: z.string().describe('The introduction of the lesson plan, formatted in Markdown.'),
  activities: z.string().describe('The activities for the lesson plan, formatted in Markdown.'),
  assessment: z.string().describe('The assessment methods for the lesson plan, formatted in Markdown.'),
  materials: z.string().describe('The materials needed for the lesson plan, formatted in Markdown.'),
});

export type GenerateLessonPlanOutput = z.infer<typeof GenerateLessonPlanOutputSchema>;

export async function generateLessonPlan(input: GenerateLessonPlanInput): Promise<GenerateLessonPlanOutput> {
  return generateLessonPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLessonPlanPrompt',
  input: {schema: GenerateLessonPlanInputSchema},
  output: {schema: GenerateLessonPlanOutputSchema},
  prompt: `You are an experienced teacher, skilled at creating engaging and effective lesson plans.

  Based on the provided topic, grade level, and learning objectives, generate a comprehensive lesson plan formatted with Markdown.
  For each section (introduction, activities, etc.), use lists, bold text, and other markdown features to create a well-structured and easy-to-read plan.

  Topic: {{{topic}}}
  Grade Level: {{{gradeLevel}}}
  Learning Objectives: {{{learningObjectives}}}
  Duration: {{{duration}}}

  Consider the following aspects when creating the lesson plan:
  - Title: A catchy and informative title for the lesson.
  - Introduction: An engaging introduction to capture students' attention.
  - Activities: A variety of interactive activities to facilitate learning (e.g., use a numbered list).
  - Assessment: Methods for assessing student understanding (e.g., use bullet points).
  - Materials: A list of materials needed for the lesson (e.g., use bullet points).
  `,
});

const generateLessonPlanFlow = ai.defineFlow(
  {
    name: 'generateLessonPlanFlow',
    inputSchema: GenerateLessonPlanInputSchema,
    outputSchema: GenerateLessonPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
