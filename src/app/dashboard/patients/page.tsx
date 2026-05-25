
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, FileText, Calendar, MoreHorizontal, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PatientsPage() {
  const patients = [
    { id: "PX-1029", name: "Alice Johnson", age: 42, gender: "F", condition: "Post-op Cardiac", status: "Stable", lastVisit: "2h ago", attending: "Dr. Miller" },
    { id: "PX-1030", name: "Michael Smith", age: 65, gender: "M", condition: "Type 2 Diabetes", status: "Observation", lastVisit: "1h ago", attending: "Dr. Chen" },
    { id: "PX-1031", name: "Sarah Williams", age: 28, gender: "F", condition: "Acute Respiratory", status: "Critical", lastVisit: "15m ago", attending: "Dr. Sarah Chen" },
    { id: "PX-1032", name: "David Brown", age: 54, gender: "M", condition: "Orthopedic Injury", status: "Discharging", lastVisit: "5h ago", attending: "Dr. Kumar" },
    { id: "PX-1033", name: "Emma Wilson", age: 31, gender: "F", condition: "Maternity", status: "Stable", lastVisit: "1h ago", attending: "Dr. Chen" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-headline font-bold">Patient EMR Repository</h1>
          <p className="text-sm text-muted-foreground">Manage digital health records and telehealth integration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white gap-2 font-headline">
            <Plus className="h-4 w-4" /> New Admission
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Telemetry Overview</CardTitle>
            <CardDescription>Global patient status metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <span className="text-sm font-medium">Critical (Red)</span>
                <Badge variant="destructive" className="font-bold">12</Badge>
             </div>
             <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg text-amber-700">
                <span className="text-sm font-medium">Observation</span>
                <Badge variant="outline" className="font-bold border-amber-200 text-amber-700">45</Badge>
             </div>
             <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg text-emerald-700">
                <span className="text-sm font-medium">Stable</span>
                <Badge variant="outline" className="font-bold border-emerald-200 text-emerald-700">324</Badge>
             </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-headline">Direct Search</CardTitle>
              <FileText className="h-5 w-5 text-muted-foreground opacity-50" />
            </div>
            <CardDescription>Access patient records by name, MRN, or condition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Enter patient name, MRN or ID..." className="pl-10 h-12 bg-secondary/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow>
              <TableHead className="font-bold">Patient & MRN</TableHead>
              <TableHead className="font-bold">Age/Sex</TableHead>
              <TableHead className="font-bold">Primary Condition</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Attending</TableHead>
              <TableHead className="font-bold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id} className="cursor-pointer hover:bg-secondary/10">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
                      {patient.id}
                    </div>
                    <div>
                      <p className="font-bold text-sm leading-none mb-1">{patient.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Admitted {patient.lastVisit}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium">{patient.age} / {patient.gender}</TableCell>
                <TableCell className="text-sm">{patient.condition}</TableCell>
                <TableCell>
                  <Badge 
                    variant={patient.status === 'Critical' ? 'destructive' : 'outline'}
                    className={
                      patient.status === 'Stable' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                      patient.status === 'Observation' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      patient.status === 'Discharging' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''
                    }
                  >
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm font-medium">{patient.attending}</TableCell>
                <TableCell className="text-right">
                   <div className="flex items-center justify-end gap-2">
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                       <FileText className="h-4 w-4" />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8">
                       <MoreHorizontal className="h-4 w-4" />
                     </Button>
                   </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
