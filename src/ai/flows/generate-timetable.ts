'use server';

/**
 * @fileOverview A timetable generation AI agent.
 *
 * - generateTimetable - A function that handles the timetable generation process.
 * - GenerateTimetableInput - The input type for the generateTimetable function.
 * - GenerateTimetableOutput - The return type for the generateTimetable function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTimetableInputSchema = z.object({
  gradeLevel: z.string().describe('The grade level for the timetable.'),
  subjects: z.string().describe('A comma-separated list of subjects to include in the timetable.'),
  periodsPerDay: z.number().int().min(4).max(8).default(6).describe('The number of periods per day.'),
});
export type GenerateTimetableInput = z.infer<typeof GenerateTimetableInputSchema>;

const TimetableEntrySchema = z.object({
    time: z.string(),
    monday: z.string(),
    tuesday: z.string(),
    wednesday: z.string(),
    thursday: z.string(),
    friday: z.string(),
});

const GenerateTimetableOutputSchema = z.object({
  timetable: z.array(TimetableEntrySchema),
});
export type GenerateTimetableOutput = z.infer<typeof GenerateTimetableOutputSchema>;

export async function generateTimetable(input: GenerateTimetableInput): Promise<GenerateTimetableOutput> {
  return generateTimetableFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generateTimetablePrompt',
    input: {schema: GenerateTimetableInputSchema},
    output: {schema: GenerateTimetableOutputSchema},
    prompt: `You are an expert school administrator. Create a balanced weekly class timetable (Monday to Friday) for {{gradeLevel}}.

The subjects to include are: {{subjects}}.
There should be {{periodsPerDay}} periods per day. The time slots should start from "09:00 - 10:00" and continue for {{periodsPerDay}} hours.
Distribute the subjects evenly throughout the week.
Include one period for "Lunch" around the middle of the day. For example, if there are 6 periods, Lunch should be the 4th period.
If there are not enough core subjects to fill the schedule, use "Free" for the remaining slots.

The output must be a JSON object with a 'timetable' key, which is an array of objects. Each object represents a time slot and has keys: 'time', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'.
`,
});

const generateTimetableFlow = ai.defineFlow(
  {
    name: 'generateTimetableFlow',
    inputSchema: GenerateTimetableInputSchema,
    outputSchema: GenerateTimetableOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
