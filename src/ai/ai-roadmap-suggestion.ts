'use server';

/**
 * @fileOverview This file contains the Genkit flow for recommending personalized roadmaps using GenAI based on user interests.
 *
 * - recommendRoadmap - A function that recommends a roadmap based on user interests.
 * - RecommendRoadmapInput - The input type for the recommendRoadmap function.
 * - RecommendRoadmapOutput - The return type for the recommendRoadmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendRoadmapInputSchema = z.object({
  interest: z
    .string()
    .describe("The user's selected interest (DSA, Web Dev, AI/ML, UI/UX, Cloud, Data Science)."),
});
export type RecommendRoadmapInput = z.infer<typeof RecommendRoadmapInputSchema>;

const RecommendRoadmapOutputSchema = z.object({
  roadmapSteps: z
    .array(z.string())
    .describe('An array of roadmap steps recommended for the user.'),
});
export type RecommendRoadmapOutput = z.infer<typeof RecommendRoadmapOutputSchema>;

export async function recommendRoadmap(input: RecommendRoadmapInput): Promise<RecommendRoadmapOutput> {
  return recommendRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendRoadmapPrompt',
  input: {schema: RecommendRoadmapInputSchema},
  output: {schema: RecommendRoadmapOutputSchema},
  prompt: `You are a career roadmap expert. Based on the user's interest, recommend a set of roadmap steps.

  Interest: {{{interest}}}

  Roadmap Steps:`, // The response should be an array of strings
});

const recommendRoadmapFlow = ai.defineFlow(
  {
    name: 'recommendRoadmapFlow',
    inputSchema: RecommendRoadmapInputSchema,
    outputSchema: RecommendRoadmapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
