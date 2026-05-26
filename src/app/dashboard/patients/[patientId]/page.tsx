
"use client";

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  FileText,
  Pill,
  Activity,
  Clock,
  Calendar,
  User,
  Stethoscope,
  Plus
} from "lucide-react";
import { dummyAppointments, dummyPrescriptions } from "@/lib/dummy-data";

// Dummy patient data
const dummyPatient = {
  name: "John Doe",
  mrn: "123456",
  gender: "Male",
  bloodType: "O+",
  dob: "1990-01-01",
  status: "Stable",
  attendingDoctor: "Dr. Smith",
  condition: "Common Cold",
};

export default function PatientDetailPage() {
  const router = useRouter();
  const patient = dummyPatient;
  const visits = dummyAppointments;
  const prescriptions = dummyPrescriptions;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-headline font-bold">{patient?.name}</h1>
            <p className="text-sm text-muted-foreground">MRN: {patient?.mrn} • {patient?.gender} • {patient?.bloodType}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><FileText className="h-4 w-4" /> Export EMR</Button>
          <Button className="bg-primary hover:bg-primary/90 gap-2"><Plus className="h-4 w-4" /> Add Note</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-headline flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Demographics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailItem label="Date of Birth" value={patient?.dob} />
              <DetailItem label="Status" value={
                <Badge className={
                  patient?.status === 'Stable' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  patient?.status === 'Observation' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  patient?.status === 'Critical' ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-blue-50 text-blue-700'
                }>
                  {patient?.status}
                </Badge>
              } />
              <DetailItem label="Attending" value={patient?.attendingDoctor} />
              <DetailItem label="Primary Condition" value={patient?.condition} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-headline flex items-center gap-2">
                <Activity className="h-5 w-5 text-accent" />
                Latest Vitals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-secondary/30 rounded-lg text-center">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">BP</p>
                  <p className="text-lg font-bold">120/80</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg text-center">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">HR</p>
                  <p className="text-lg font-bold">72 bpm</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clinical Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="visits" className="w-full">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="visits" className="gap-2"><Clock className="h-4 w-4" /> Visits</TabsTrigger>
              <TabsTrigger value="prescriptions" className="gap-2"><Pill className="h-4 w-4" /> Prescriptions</TabsTrigger>
              <TabsTrigger value="history" className="gap-2"><FileText className="h-4 w-4" /> Clinical History</TabsTrigger>
            </TabsList>

            <TabsContent value="visits" className="mt-6 space-y-4">
              {visits?.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No visits recorded yet.</div>
              ) : (
                visits?.map((visit) => (
                  <Card key={visit.id} className="hover:bg-secondary/10 transition-colors">
                    <CardHeader className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Stethoscope className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-sm font-bold">{visit.reason}</CardTitle>
                            <CardDescription className="text-xs flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {new Date(visit.date).toLocaleDateString()}
                            </CardDescription>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">View Details</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        "{visit.notes}"
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="prescriptions" className="mt-6 space-y-4">
              {prescriptions?.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No active prescriptions.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prescriptions?.map((rx) => (
                    <Card key={rx.id} className="border-l-4 border-l-accent">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold flex items-center justify-between">
                          {rx.medication}
                          <Badge variant="outline" className="text-[10px]">{rx.duration}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground mb-1">Dosage: {rx.dosage}</p>
                        <p className="text-xs font-bold text-accent uppercase tracking-widest">{rx.frequency}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
