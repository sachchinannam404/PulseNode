
"use client";

import { useState } from 'react';
import { predictBedCapacityAndReadmission, type PredictiveBedCapacityAnalysisOutput } from '@/ai/flows/predictive-bed-capacity-analysis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, BrainCircuit, Loader2, BedDouble, Users, AlertCircle, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictiveBedCapacityAnalysisOutput | null>(null);

  async function handleAnalyze() {
    setLoading(true);
    try {
      const result = await predictBedCapacityAndReadmission({
        hospitalName: "PulseNode Central Medical",
        totalBeds: 500,
        currentOccupancy: 462,
        historicalAdmissionsLast30Days: 1200,
        historicalDischargesLast30Days: 1150,
        averageLengthOfStayDays: 4.5,
        scheduledAdmissionsNext7Days: 85,
        scheduledDischargesNext7Days: 92,
        historicalReadmissionRates: {
          "Cardiology": 12.5,
          "Oncology": 8.2,
          "Respiratory": 15.1,
          "Neurology": 5.4
        },
        seasonalFactor: 1.15
      });
      setPrediction(result);
    } catch (error) {
      console.error("Prediction failed", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-headline font-bold">Predictive Capacity Intelligence</h1>
          <p className="text-sm text-muted-foreground">AI-driven forecasting for patient flow and bed management</p>
        </div>
        <Button 
          onClick={handleAnalyze} 
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-white gap-2 font-headline"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <BrainCircuit className="h-4 w-4" />}
          Run AI Forecast
        </Button>
      </div>

      {!prediction && !loading && (
        <Card className="border-dashed border-2 flex flex-col items-center justify-center py-20 bg-secondary/20">
          <div className="bg-background p-4 rounded-full shadow-sm mb-4">
            <BrainCircuit className="h-10 w-10 text-primary opacity-40" />
          </div>
          <h3 className="text-lg font-headline font-bold">Engine Offline</h3>
          <p className="text-sm text-muted-foreground max-w-sm text-center px-6">
            Execute the AI analysis to generate real-time predictions for hospital capacity and readmission risks.
          </p>
        </Card>
      )}

      {loading && (
        <div className="space-y-6 animate-pulse">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="h-48 bg-muted rounded-xl"></div>
             <div className="h-48 bg-muted rounded-xl"></div>
           </div>
           <div className="h-96 bg-muted rounded-xl"></div>
        </div>
      )}

      {prediction && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg border-primary/10">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">24H FORECAST</Badge>
                  <BedDouble className="h-5 w-5 text-primary opacity-50" />
                </div>
                <CardTitle className="text-xl font-headline mt-4">Capacity Outlook</CardTitle>
                <CardDescription>Estimated bed status for the next 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold font-headline">{prediction.predictedAvailableBeds24h}</span>
                  <span className="text-sm text-muted-foreground">Estimated Free Beds</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Occupancy Rate</span>
                    <span>{prediction.predictedOccupancy24h.toFixed(1)}%</span>
                  </div>
                  <Progress value={prediction.predictedOccupancy24h} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-accent/10">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/10">7-DAY OUTLOOK</Badge>
                  <Activity className="h-5 w-5 text-accent opacity-50" />
                </div>
                <CardTitle className="text-xl font-headline mt-4">Patient Throughput</CardTitle>
                <CardDescription>Long-range capacity prediction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold font-headline">{prediction.predictedAvailableBeds7d}</span>
                  <span className="text-sm text-muted-foreground">Avg. Free Beds</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Avg. Occupancy</span>
                    <span>{prediction.predictedOccupancy7d.toFixed(1)}%</span>
                  </div>
                  <Progress value={prediction.predictedOccupancy7d} className="h-2" indicatorClassName="bg-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-headline">Readmission Risk</CardTitle>
                <CardDescription>AI-modeled risk profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center py-6 text-center">
                   <div className="text-5xl font-bold font-headline text-primary mb-2">
                     {prediction.overallPredictedReadmissionRate.toFixed(1)}%
                   </div>
                   <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Global Risk Index</p>
                </div>
                <div className="space-y-4">
                  {Object.entries(prediction.predictedReadmissionRatesByCondition).map(([condition, rate]) => (
                    <div key={condition} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{condition}</span>
                      <div className="flex items-center gap-2">
                         <div className="h-1.5 w-24 bg-secondary rounded-full overflow-hidden">
                           <div style={{ width: `${rate}%` }} className="h-full bg-primary"></div>
                         </div>
                         <span className="font-bold w-12 text-right">{rate.toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 shadow-sm bg-primary/[0.02] border-primary/10">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <AlertCircle className="h-5 w-5" />
                  <CardTitle className="text-lg font-headline">Strategic Recommendations</CardTitle>
                </div>
                <CardDescription>AI-generated operational directives based on current telemetry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {prediction.resourceAllocationRecommendations}
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DirectiveCard 
                    title="Staffing Shift"
                    desc="Increase nursing ratios for Cardiology in Night-B shift."
                  />
                  <DirectiveCard 
                    title="Discharge Planning"
                    desc="Prioritize Step-down unit transfers for Respiratory patients."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function DirectiveCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-4 bg-background border rounded-lg flex gap-3 shadow-sm hover:shadow-md transition-shadow">
      <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
      <div>
        <p className="text-sm font-bold font-headline mb-1">{title}</p>
        <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
      </div>
    </div>
  );
}
