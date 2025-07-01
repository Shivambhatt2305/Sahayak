'use server';
/**
 * @fileOverview A visual aid design AI agent.
 *
 * - designVisualAid - A function that handles the visual aid design process.
 * - DesignVisualAidInput - The input type for the designVisualAid function.
 * - DesignVisualAidOutput - The return type for the designVisualAid function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DesignVisualAidInputSchema = z.object({
  topic: z.string().describe('The topic for the visual aid.'),
  visualAidType: z.string().describe('The type of visual aid to generate (e.g., infographic, diagram, chart).'),
});
export type DesignVisualAidInput = z.infer<typeof DesignVisualAidInputSchema>;

const DesignVisualAidOutputSchema = z.object({
  description: z.string().describe('A description of the visual aid and how to use it in a lesson, formatted in Markdown.'),
  imageUrl: z.string().describe('The URL of the generated image for the visual aid.'),
});
export type DesignVisualAidOutput = z.infer<typeof DesignVisualAidOutputSchema>;

export async function designVisualAid(input: DesignVisualAidInput): Promise<DesignVisualAidOutput> {
  return designVisualAidFlow(input);
}

const designVisualAidFlow = ai.defineFlow(
  {
    name: 'designVisualAidFlow',
    inputSchema: DesignVisualAidInputSchema,
    outputSchema: DesignVisualAidOutputSchema,
  },
  async (input) => {
    const textPrompt = `You are a creative educational content designer. Generate a detailed description for a visual aid about "${input.topic}". The visual aid should be a ${input.visualAidType}. The description should be formatted in Markdown and include:
- A title for the visual aid.
- A section explaining the key elements and information presented.
- A section with bullet points on how a teacher could use this visual aid in a lesson to explain the topic to students.`;
    
    const imagePrompt = `A high-quality, visually appealing and educational ${input.visualAidType} for a high school class about "${input.topic}". The style should be clean, modern, and easy to understand, with clear labels and a balanced composition. Avoid text-heavy designs.`;

    const [textResponse, imageResponse] = await Promise.all([
      ai.generate({
        prompt: textPrompt,
      }),
      ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: imagePrompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      })
    ]);

    return {
      description: textResponse.text,
      imageUrl: imageResponse.media.url,
    };
  }
);
