
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Pill, AlertCircle, ShoppingCart, RefreshCw, Filter, Package } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function PharmacyPage() {
  const inventory = [
    { name: "Propofol 1% Emulsion", type: "Anesthetic", stock: 85, reorder: 40, status: "Healthy" },
    { name: "Adrenaline 1mg/ml", type: "Cardiac", stock: 12, reorder: 20, status: "Critical" },
    { name: "Ceftriaxone 1g", type: "Antibiotic", stock: 142, reorder: 50, status: "Healthy" },
    { name: "Fentanyl 50mcg", type: "Analgesic", stock: 28, reorder: 30, status: "Low Stock" },
    { name: "Saline 0.9% 500ml", type: "Fluid", stock: 450, reorder: 100, status: "Healthy" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-headline font-bold">Pharmacy & Stock</h1>
          <p className="text-sm text-muted-foreground">Inventory management and controlled substance tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><RefreshCw className="h-4 w-4" /> Sync Inventory</Button>
          <Button className="bg-primary hover:bg-primary/90 gap-2"><ShoppingCart className="h-4 w-4" /> Restock Order</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-widest">Total Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline">1,248 Items</div>
            <p className="text-xs text-muted-foreground mt-1 tracking-tight">+42 new SKU added this week</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-destructive/20 bg-destructive/[0.02]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase text-destructive tracking-widest">Critical Shortfall</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline text-destructive">8 Items</div>
            <p className="text-xs text-destructive mt-1 font-medium flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> Immediate reorder required
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase text-accent tracking-widest">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline text-accent">3 Orders</div>
            <p className="text-xs text-muted-foreground mt-1">Estimated delivery in 48h</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-headline">Central Pharmacy Stock</CardTitle>
            <CardDescription>Real-time availability of hospital consumables</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Filter by SKU or name..." className="pl-8 w-[250px] bg-secondary/30" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow>
                <TableHead className="font-bold">Item & Type</TableHead>
                <TableHead className="font-bold">Stock Level</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Reorder Level</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/5 text-primary rounded-lg"><Pill className="h-4 w-4" /></div>
                      <div>
                        <p className="font-bold text-sm leading-none mb-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">{item.type}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-[200px]">
                    <div className="space-y-1">
                       <div className="flex justify-between text-xs font-bold">
                         <span>{item.stock} Units</span>
                         <span className="text-muted-foreground">Max 500</span>
                       </div>
                       <Progress value={(item.stock / 500) * 100} className="h-1.5" indicatorClassName={item.status === 'Critical' ? 'bg-destructive' : item.status === 'Low Stock' ? 'bg-amber-500' : 'bg-primary'} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      item.status === 'Healthy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      item.status === 'Critical' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{item.reorder} units</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-primary font-bold">Reorder</Button>
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
