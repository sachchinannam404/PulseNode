
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Microscope, Activity, FlaskConical, Stethoscope, Clock, FileCheck, ClipboardList, Scan } from "lucide-react";

export default function DiagnosticsPage() {
  const tests = [
    { patient: "Alice Johnson", test: "Cardiac Troponin", unit: "Lab B", status: "In-Progress", eta: "15m", priority: "High" },
    { patient: "Sarah Williams", test: "CT Chest w/ Contrast", unit: "Imaging 2", status: "Processing", eta: "45m", priority: "Urgent" },
    { patient: "Michael Smith", test: "Complete Blood Count", unit: "Lab A", status: "Completed", eta: "Done", priority: "Routine" },
    { patient: "Robert Wilson", test: "MRI Lumbar Spine", unit: "Imaging 1", status: "Queued", eta: "2h", priority: "Routine" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-headline font-bold">Diagnostics Network</h1>
          <p className="text-sm text-muted-foreground">Lab results, imaging telemetry, and pathology tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Scan className="h-4 w-4" /> Scan Batch</Button>
          <Button className="bg-primary hover:bg-primary/90 gap-2 font-headline">New Diagnostic Order</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm border-primary/10">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-primary mb-2">
              <FlaskConical className="h-5 w-5" />
              <CardTitle className="text-lg font-headline">Lab Ops</CardTitle>
            </div>
            <CardDescription>Daily throughput metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-baseline justify-between p-3 border rounded-lg bg-secondary/20">
               <span className="text-sm font-medium">Pending Tests</span>
               <span className="text-2xl font-bold font-headline text-primary">24</span>
             </div>
             <div className="flex items-baseline justify-between p-3 border rounded-lg">
               <span className="text-sm font-medium">Completed (24h)</span>
               <span className="text-2xl font-bold font-headline">152</span>
             </div>
             <div className="space-y-2">
               <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                 <span>System Load</span>
                 <span>72%</span>
               </div>
               <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                 <div className="h-full w-[72%] bg-primary"></div>
               </div>
             </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-sm">
          <Tabs defaultValue="all" className="w-full">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="all">Queue</TabsTrigger>
                <TabsTrigger value="lab">Lab Results</TabsTrigger>
                <TabsTrigger value="imaging">Imaging</TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="sm" className="text-xs uppercase font-bold tracking-widest">View All</Button>
            </CardHeader>
            <CardContent>
              <TabsContent value="all" className="mt-0 space-y-4">
                {tests.map((test, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-secondary/10 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className={`p-3 rounded-lg ${test.test.includes('CT') || test.test.includes('MRI') ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
                         {test.test.includes('CT') || test.test.includes('MRI') ? <Activity className="h-5 w-5" /> : <Microscope className="h-5 w-5" />}
                       </div>
                       <div>
                         <p className="font-bold text-sm font-headline leading-none mb-1">{test.test}</p>
                         <p className="text-xs text-muted-foreground">Patient: {test.patient} • {test.unit}</p>
                       </div>
                    </div>
                    <div className="hidden md:block text-center">
                       <Badge variant={test.priority === 'Urgent' ? 'destructive' : test.priority === 'High' ? 'default' : 'outline'} className="font-bold">
                         {test.priority}
                       </Badge>
                    </div>
                    <div className="text-right">
                       <div className="flex items-center gap-2 justify-end mb-1 text-xs font-bold">
                         <Clock className="h-3 w-3 text-muted-foreground" />
                         <span>{test.eta}</span>
                       </div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{test.status}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="lab">
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                  <ClipboardList className="h-10 w-10 opacity-20 mb-2" />
                  <p className="text-sm">Filter for Pathology & Biochemistry active</p>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
