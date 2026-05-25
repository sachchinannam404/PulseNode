
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Users, Bed, Pill, AlertTriangle, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-headline font-bold">Health Center Overview</h1>
          <p className="text-sm text-muted-foreground">Real-time telemetry for Central Medical Facility - Node A</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 font-medium">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            Systems Nominal
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">Last updated: 14:02 PM</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Patients" 
          value="482" 
          change="+12 from yesterday" 
          trend="up" 
          icon={<Users className="h-5 w-5" />} 
        />
        <StatCard 
          title="Bed Occupancy" 
          value="92.4%" 
          change="Critical Load" 
          trend="up" 
          icon={<Bed className="h-5 w-5" />} 
          critical
        />
        <StatCard 
          title="ER Wait Time" 
          value="18m" 
          change="-4m from average" 
          trend="down" 
          icon={<Clock className="h-5 w-5" />} 
        />
        <StatCard 
          title="Pharmacy Stock" 
          value="84%" 
          change="3 items low" 
          trend="down" 
          icon={<Pill className="h-5 w-5" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-headline">Patient Admission Flux</CardTitle>
              <CardDescription>24-hour admission vs discharge telemetry</CardDescription>
            </div>
            <Activity className="h-5 w-5 text-primary opacity-50" />
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full flex items-end gap-2 pb-4">
              {[65, 45, 78, 90, 85, 60, 40, 55, 70, 88, 95, 82, 67, 50, 44, 58, 72, 85, 92, 77, 60, 45, 55, 62].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-colors relative group">
                   <div style={{ height: `${h}%` }} className="bg-primary rounded-t-sm w-full"></div>
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">{h}%</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground px-1 uppercase font-bold tracking-widest">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Critical Alerts</CardTitle>
            <CardDescription>Action required immediately</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AlertItem 
              severity="high" 
              title="Blood Type O- Low" 
              desc="Reserve critically low in Blood Bank." 
            />
            <AlertItem 
              severity="medium" 
              title="Staffing Shortfall" 
              desc="Night shift ICU requires 2 additional nurses." 
            />
            <AlertItem 
              severity="low" 
              title="MRI-2 Maintenance" 
              desc="Scheduled calibration in 2 hours." 
            />
            <AlertItem 
              severity="medium" 
              title="Bed Capacity Prediction" 
              desc="Estimated 100% occupancy in 72 hours." 
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Recent Lab Results</CardTitle>
            <CardDescription>Internal Diagnostics Network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "John Doe", test: "Complete Blood Count", time: "12m ago", status: "Critical", color: "text-destructive" },
                { name: "Jane Smith", test: "MRI Lumbar Spine", time: "24m ago", status: "Normal", color: "text-emerald-600" },
                { name: "Robert Wilson", test: "Lipid Profile", time: "45m ago", status: "Review", color: "text-amber-600" },
              ].map((res, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                      {res.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{res.name}</p>
                      <p className="text-xs text-muted-foreground">{res.test}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${res.color}`}>{res.status}</p>
                    <p className="text-[10px] text-muted-foreground">{res.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Inventory Status</CardTitle>
            <CardDescription>High-value consumables tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <InventoryMetric label="Propofol 200mg" value={32} critical={20} />
            <InventoryMetric label="Latex-free Gloves (M)" value={78} critical={15} />
            <InventoryMetric label="Adrenaline 1:1000" value={12} critical={10} />
            <InventoryMetric label="Surgical Masks (Box)" value={94} critical={10} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon, critical = false }: { 
  title: string, 
  value: string, 
  change: string, 
  trend: 'up' | 'down', 
  icon: React.ReactNode, 
  critical?: boolean 
}) {
  return (
    <Card className={`border-border/50 shadow-sm ${critical ? 'ring-2 ring-destructive/20' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
        <div className={`p-2 rounded-md ${critical ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-headline">{value}</div>
        <div className="flex items-center mt-1">
          {trend === 'up' ? (
            <TrendingUp className={`h-3 w-3 mr-1 ${critical ? 'text-destructive' : 'text-emerald-500'}`} />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1 text-emerald-500" />
          )}
          <p className={`text-[10px] font-medium ${critical ? 'text-destructive' : 'text-muted-foreground'}`}>
            {change}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function AlertItem({ severity, title, desc }: { severity: 'high' | 'medium' | 'low', title: string, desc: string }) {
  const colors = {
    high: 'bg-destructive/10 border-destructive/20 text-destructive',
    medium: 'bg-amber-50 border-amber-200 text-amber-700',
    low: 'bg-blue-50 border-blue-200 text-blue-700'
  };

  return (
    <div className={`p-3 border rounded-lg ${colors[severity]} flex items-start gap-3`}>
      <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
      <div>
        <p className="text-xs font-bold leading-none mb-1">{title}</p>
        <p className="text-[10px] leading-tight opacity-80">{desc}</p>
      </div>
    </div>
  );
}

function InventoryMetric({ label, value, critical }: { label: string, value: number, critical: number }) {
  const isCritical = value <= critical;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-medium">
        <span>{label}</span>
        <span className={isCritical ? 'text-destructive font-bold' : ''}>{value}%</span>
      </div>
      <Progress value={value} className="h-1.5" indicatorClassName={isCritical ? 'bg-destructive' : 'bg-primary'} />
    </div>
  );
}
