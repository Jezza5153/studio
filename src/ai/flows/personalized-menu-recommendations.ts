'use server';

/**
 * @fileOverview A flow for providing personalized menu recommendations to website visitors.
 *
 * - getPersonalizedMenuRecommendations - A function that handles the retrieval of personalized menu recommendations.
 * - PersonalizedMenuRecommendationsInput - The input type for the getPersonalizedMenuRecommendations function.
 * - PersonalizedMenuRecommendationsOutput - The return type for the getPersonalizedMenuRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedMenuRecommendationsInputSchema = z.object({
  visitorPreferences: z
    .string()
    .describe(
      'A description of the website visitor\'s food preferences, including dietary restrictions, preferred cuisines, and past order history.'
    ),
  menuItems: z
    .string()
    .describe(
      'A list of available menu items with descriptions, ingredients, and prices.'
    ),
});
export type PersonalizedMenuRecommendationsInput = z.infer<
  typeof PersonalizedMenuRecommendationsInputSchema
>;

const PersonalizedMenuRecommendationsOutputSchema = z.object({
  recommendedItems: z
    .string()
    .describe(
      'A list of menu items recommended for the visitor, tailored to their preferences.'
    ),
});
export type PersonalizedMenuRecommendationsOutput = z.infer<
  typeof PersonalizedMenuRecommendationsOutputSchema
>;

export async function getPersonalizedMenuRecommendations(
  input: PersonalizedMenuRecommendationsInput
): Promise<PersonalizedMenuRecommendationsOutput> {
  return personalizedMenuRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedMenuRecommendationsPrompt',
  input: {schema: PersonalizedMenuRecommendationsInputSchema},
  output: {schema: PersonalizedMenuRecommendationsOutputSchema},
  prompt: `You are a personal restaurant menu recommender. Given the preferences of the website visitor and a list of menu items, you make personalized recommendations. 

Visitor Preferences: {{{visitorPreferences}}}

Menu Items: {{{menuItems}}}

Based on these preferences, what menu items would you recommend? Return the names of dishes from the menu items.
`,
});

const personalizedMenuRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedMenuRecommendationsFlow',
    inputSchema: PersonalizedMenuRecommendationsInputSchema,
    outputSchema: PersonalizedMenuRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
