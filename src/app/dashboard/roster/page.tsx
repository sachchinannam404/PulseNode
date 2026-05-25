"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, Users, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RosterPage() {
  const shifts = [
    { name: "Dr. Sarah Chen", role: "Medical Director", shift: "08:00 - 18:00", unit: "ICU A", status: "On-Duty" },
    { name: "Nurse Mark Vane", role: "Senior Nurse", shift: "08:00 - 18:00", unit: "Emergency", status: "On-Duty" },
    { name: "Dr. Alex Miller", role: "Specialist", shift: "18:00 - 06:00", unit: "Cardiology", status: "Upcoming" },
    { name: "Nurse Elena Ros", role: "Shift Lead", shift: "08:00 - 18:00", unit: "Pediatrics", status: "On-Duty" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-headline font-bold">Roster Management</h1>
          <p className="text-sm text-muted-foreground">Staff scheduling and shift telemetry for Node A</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2 font-headline">
          <Plus className="h-4 w-4" /> Create Shift
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Staff Summary</CardTitle>
            <CardDescription>Real-time headcount</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-secondary/50 rounded-xl text-center">
                <p className="text-2xl font-bold font-headline">42</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Active Now</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-xl text-center">
                <p className="text-2xl font-bold font-headline text-primary">128</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">On Roster</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Unit Coverage</p>
              <div className="space-y-2">
                <CoverageBar label="ICU / CCU" value={100} color="bg-emerald-500" />
                <CoverageBar label="Emergency" value={85} color="bg-amber-500" />
                <CoverageBar label="General Ward" value={92} color="bg-primary" />
                <CoverageBar label="Diagnostics" value={60} color="bg-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-sm">
          <Tabs defaultValue="list" className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="list" className="gap-2"><Users className="h-4 w-4" /> Active Shifts</TabsTrigger>
                <TabsTrigger value="calendar" className="gap-2"><CalendarIcon className="h-4 w-4" /> Calendar View</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                <span className="text-sm font-bold font-headline px-2">Oct 24, 2024</span>
                <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="list" className="mt-0 space-y-4">
                {shifts.map((staff, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                        <AvatarImage src={`https://picsum.photos/seed/staff${i}/40/40`} />
                        <AvatarFallback>{staff.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-sm font-headline leading-none mb-1">{staff.name}</p>
                        <p className="text-xs text-muted-foreground">{staff.role}</p>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-xs font-bold uppercase text-muted-foreground mb-1 tracking-widest">Assigned Unit</p>
                      <Badge variant="outline" className="font-bold">{staff.unit}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1 justify-end">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-bold">{staff.shift}</span>
                      </div>
                      <Badge className={staff.status === 'On-Duty' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-muted text-muted-foreground'}>
                        {staff.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="calendar">
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground opacity-50">
                   <CalendarIcon className="h-12 w-12 mb-4" />
                   <p className="font-headline font-bold">Calendar Integration Loading...</p>
                   <p className="text-xs">Syncing with Exchange / Google Calendar</p>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

function CoverageBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <div style={{ width: `${value}%` }} className={`h-full ${color}`}></div>
      </div>
    </div>
  );
}