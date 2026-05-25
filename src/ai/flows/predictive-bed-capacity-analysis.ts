'use server';
/**
 * @fileOverview This file provides AI-driven forecasts for bed availability and patient readmission rates.
 *
 * - predictBedCapacityAndReadmission - A function that handles the prediction process.
 * - PredictiveBedCapacityAnalysisInput - The input type for the predictBedCapacityAndReadmission function.
 * - PredictiveBedCapacityAnalysisOutput - The return type for the predictBedCapacityAndReadmission function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PredictiveBedCapacityAnalysisInputSchema = z.object({
  hospitalName: z.string().describe('The name of the hospital.'),
  totalBeds: z.number().int().positive().describe('Total number of beds in the hospital.'),
  currentOccupancy: z.number().int().min(0).describe('Current number of occupied beds.'),
  historicalAdmissionsLast30Days: z.number().int().min(0).describe('Number of patient admissions in the last 30 days.'),
  historicalDischargesLast30Days: z.number().int().min(0).describe('Number of patient discharges in the last 30 days.'),
  averageLengthOfStayDays: z.number().positive().describe('Average length of patient stay in days.'),
  scheduledAdmissionsNext7Days: z.number().int().min(0).describe('Number of scheduled admissions for the next 7 days.'),
  scheduledDischargesNext7Days: z.number().int().min(0).describe('Number of scheduled discharges for the next 7 days.'),
  historicalReadmissionRates: z.record(z.string(), z.number().min(0).max(100)).describe('A map of medical conditions to their historical readmission rates (percentage).'),
  seasonalFactor: z.number().min(0).max(2).describe('A factor indicating current seasonal impact on patient load (e.g., 1.1 for 10% increase, 0.9 for 10% decrease).'),
});
export type PredictiveBedCapacityAnalysisInput = z.infer<typeof PredictiveBedCapacityAnalysisInputSchema>;

const PredictiveBedCapacityAnalysisOutputSchema = z.object({
  predictedAvailableBeds24h: z.number().int().describe('Predicted number of available beds in the next 24 hours.'),
  predictedOccupancy24h: z.number().min(0).max(100).describe('Predicted bed occupancy percentage in the next 24 hours.'),
  predictedAvailableBeds7d: z.number().int().describe('Predicted number of available beds in the next 7 days.'),
  predictedOccupancy7d: z.number().min(0).max(100).describe('Predicted bed occupancy percentage in the next 7 days.'),
  overallPredictedReadmissionRate: z.number().min(0).max(100).describe('Overall predicted readmission rate across all conditions (percentage).'),
  predictedReadmissionRatesByCondition: z.record(z.string(), z.number().min(0).max(100)).describe('A map of medical conditions to their predicted readmission rates (percentage).'),
  resourceAllocationRecommendations: z.string().describe('Recommendations for optimizing resource allocation based on predictions.'),
});
export type PredictiveBedCapacityAnalysisOutput = z.infer<typeof PredictiveBedCapacityAnalysisOutputSchema>;

export async function predictBedCapacityAndReadmission(input: PredictiveBedCapacityAnalysisInput): Promise<PredictiveBedCapacityAnalysisOutput> {
  return predictiveBedCapacityAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictiveBedCapacityAnalysisPrompt',
  input: { schema: PredictiveBedCapacityAnalysisInputSchema },
  output: { schema: PredictiveBedCapacityAnalysisOutputSchema },
  prompt: `You are an expert hospital operations analyst and a data scientist. Your task is to analyze hospital data and provide forecasts for bed availability and patient readmission rates, along with resource allocation recommendations.

Analyze the following data for {{hospitalName}}:

Total Beds: {{totalBeds}}
Current Occupancy: {{currentOccupancy}}
Historical Admissions (last 30 days): {{historicalAdmissionsLast30Days}}
Historical Discharges (last 30 days): {{historicalDischargesLast30Days}}
Average Length of Stay (days): {{averageLengthOfStayDays}}
Scheduled Admissions (next 7 days): {{scheduledAdmissionsNext7Days}}
Scheduled Discharges (next 7 days): {{scheduledDischargesNext7Days}}
Seasonal Impact Factor: {{seasonalFactor}} (1.0 is normal, >1.0 for increased load, <1.0 for decreased load)

Historical Readmission Rates:
{{#each historicalReadmissionRates}}
- {{ @key }}: {{ this }}%
{{/each}}

Based on the provided information, predict the following:
1.  **Bed Availability and Occupancy:**
    -   Predicted available beds and occupancy percentage for the next 24 hours.
    -   Predicted available beds and occupancy percentage for the next 7 days.
2.  **Patient Readmission Rates:**
    -   Overall predicted readmission rate.
    -   Predicted readmission rates for each listed condition.
3.  **Resource Allocation Recommendations:**
    -   Provide specific, actionable recommendations to proactively manage hospital resources and optimize patient flow based on your predictions. Consider staffing adjustments, bed management strategies, and discharge planning.

Ensure your output strictly adheres to the provided JSON schema. Calculate percentages to two decimal places where appropriate. If no historical readmission rates are provided, infer reasonable averages or state that data is insufficient.
`,
});

const predictiveBedCapacityAnalysisFlow = ai.defineFlow(
  {
    name: 'predictiveBedCapacityAnalysisFlow',
    inputSchema: PredictiveBedCapacityAnalysisInputSchema,
    outputSchema: PredictiveBedCapacityAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
