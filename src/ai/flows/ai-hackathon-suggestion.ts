'use server';
/**
 * @fileOverview AI-powered hackathon suggestion flow.
 *
 * - suggestHackathons - A function that suggests hackathons outside the user's selected interests.
 * - SuggestHackathonsInput - The input type for the suggestHackathons function.
 * - SuggestHackathonsOutput - The return type for the suggestHackathons function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestHackathonsInputSchema = z.object({
  interests: z
    .array(z.string())
    .describe('The user selected interests (DSA, Web Dev, AI/ML, UI/UX, Cloud, Data Science).'),
});
export type SuggestHackathonsInput = z.infer<typeof SuggestHackathonsInputSchema>;

const SuggestHackathonsOutputSchema = z.object({
  hackathonSuggestions: z
    .array(z.string())
    .describe('An array of suggested hackathons outside the user interests.'),
});
export type SuggestHackathonsOutput = z.infer<typeof SuggestHackathonsOutputSchema>;

export async function suggestHackathons(input: SuggestHackathonsInput): Promise<SuggestHackathonsOutput> {
  return suggestHackathonsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestHackathonsPrompt',
  input: {schema: SuggestHackathonsInputSchema},
  output: {schema: SuggestHackathonsOutputSchema},
  prompt: `Based on the user's interests, suggest 1-2 additional hackathons from outside the selected interests, so that they can broaden their skills and discover new areas of interest.

User Interests: {{interests}}

Suggest Hackathons:`,
});

const suggestHackathonsFlow = ai.defineFlow(
  {
    name: 'suggestHackathonsFlow',
    inputSchema: SuggestHackathonsInputSchema,
    outputSchema: SuggestHackathonsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
