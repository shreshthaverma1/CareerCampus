import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai'; // Make sure this is the correct import for your Genkit version

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY, // <--- ADD THIS LINE!
    }),
  ],
  model: 'googleai/gemini-2.0-flash', // You can also put this model directly into the googleAI plugin options if preferred
});
