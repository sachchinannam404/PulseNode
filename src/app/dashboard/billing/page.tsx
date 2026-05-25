"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, DollarSign, FileText, TrendingUp, Search, Download, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function BillingPage() {
  const invoices = [
    { id: "INV-8821", patient: "Alice Johnson", amount: "$1,240.00", status: "Paid", insurer: "Blue Shield", date: "Oct 22, 2024" },
    { id: "INV-8822", patient: "Michael Smith", amount: "$3,450.00", status: "Pending", insurer: "Medicare", date: "Oct 23, 2024" },
    { id: "INV-8823", patient: "Sarah Williams", amount: "$12,800.00", status: "Claimed", insurer: "Aetna", date: "Oct 24, 2024" },
    { id: "INV-8824", patient: "David Brown", amount: "$450.00", status: "Paid", insurer: "Self-Pay", date: "Oct 21, 2024" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-headline font-bold">Billing & Claims</h1>
          <p className="text-sm text-muted-foreground">Financial operations and insurance claim synchronization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 font-headline"><Download className="h-4 w-4" /> Export Ledger</Button>
          <Button className="bg-primary hover:bg-primary/90 gap-2 font-headline"><DollarSign className="h-4 w-4" /> New Invoice</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm border-emerald-500/20 bg-emerald-500/[0.02]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Total Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline text-emerald-600">$1.2M</div>
            <div className="flex items-center text-[10px] text-emerald-600 mt-1 font-bold">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +12% vs last month
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Pending Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">$428K</div>
            <p className="text-[10px] text-muted-foreground mt-1 font-medium tracking-tight">184 active insurance submissions</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Claim Rejections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline text-destructive">1.4%</div>
            <p className="text-[10px] text-muted-foreground mt-1 font-medium tracking-tight">Below industry average (2.5%)</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-primary/20 bg-primary/[0.02]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Insurance Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline text-primary">14</div>
            <div className="flex items-center gap-1 text-[10px] text-primary mt-1 font-bold">
              <ShieldCheck className="h-3 w-3" /> All APIs Healthy
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-border/50">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <div>
            <CardTitle className="text-lg font-headline">Recent Financial Activity</CardTitle>
            <CardDescription>Ledger of patient invoices and claim status</CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search invoice or MRN..." className="pl-8 w-[250px] bg-secondary/30" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-bold">ID & Date</TableHead>
                <TableHead className="font-bold">Patient</TableHead>
                <TableHead className="font-bold">Insurance Carrier</TableHead>
                <TableHead className="font-bold">Amount</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv, i) => (
                <TableRow key={i} className="group">
                  <TableCell>
                    <p className="font-bold text-sm text-primary">{inv.id}</p>
                    <p className="text-[10px] text-muted-foreground font-bold tracking-widest">{inv.date}</p>
                  </TableCell>
                  <TableCell className="font-medium">{inv.patient}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <div className="h-2 w-2 rounded-full bg-primary/40"></div>
                       <span className="text-sm font-medium">{inv.insurer}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold font-headline text-sm">{inv.amount}</TableCell>
                  <TableCell>
                    <Badge className={
                      inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      inv.status === 'Claimed' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }>
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><FileText className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}