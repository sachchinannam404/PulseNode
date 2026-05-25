
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Activity, Shield, Users, ArrowRight, Zap, Database, FlaskConical } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <Link className="flex items-center justify-center space-x-2" href="#">
          <Activity className="h-6 w-6 text-primary" />
          <span className="font-headline font-bold text-xl tracking-tighter text-primary">PULSE<span className="text-accent">NODE</span></span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/dashboard">
            Dashboard
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
            Compliance
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                    Next-Gen Infrastructure for <span className="text-accent">Modern Healthcare</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    PulseNode is an enterprise-grade Hospital Management System designed for precision, security, and AI-driven efficiency.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2 h-12 px-8">
                      Launch HMS Dashboard <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="h-12 px-8">
                    View Systems Architecture
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground pt-4">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4 text-accent" />
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Database className="h-4 w-4 text-accent" />
                    <span>Microservices Architecture</span>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-card border rounded-2xl p-6 shadow-2xl">
                  <div className="space-y-4">
                    <div className="h-2 w-1/3 bg-muted rounded"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-muted/50 rounded-lg animate-pulse"></div>
                      <div className="h-24 bg-muted/50 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center">
                      <Activity className="h-12 w-12 text-primary opacity-20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Integrated Healthcare Modules</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage a multi-specialty 500-bed hospital in one unified ecosystem.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <ModuleCard 
                icon={<Users className="h-10 w-10" />}
                title="Patient Portal & EMR"
                description="Centralized medical records, telehealth integration, and secure results delivery."
              />
              <ModuleCard 
                icon={<Database className="h-10 w-10" />}
                title="Roster & Payroll"
                description="AI-assisted shift scheduling for 1000+ staff members with seamless payroll markers."
              />
              <ModuleCard 
                icon={<Shield className="h-10 w-10" />}
                title="Billing & Insurance"
                description="Automated claim processing with major insurers and secure payment gateways."
              />
              <ModuleCard 
                icon={<Zap className="h-10 w-10" />}
                title="Pharmacy & Stock"
                description="Real-time tracking of medications and medical devices with automated restock alerts."
              />
              <ModuleCard 
                icon={<FlaskConical className="h-10 w-10" />}
                title="Diagnostics Sync"
                description="Direct integration with MRI, X-Ray, and pathology labs for real-time reporting."
              />
              <ModuleCard 
                icon={<Activity className="h-10 w-10" />}
                title="Predictive Analytics"
                description="AI-driven bed capacity management and patient readmission forecasting."
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t bg-card">
        <div className="container flex flex-col md:flex-row items-center justify-between px-4 md:px-6 mx-auto gap-4">
          <p className="text-xs text-muted-foreground">© 2024 PulseNode Healthcare Systems. HIPAA Certified.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy Policy
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Compliance Audit
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function ModuleCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="relative group overflow-hidden rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
      <div className="mb-4 text-primary group-hover:text-accent transition-colors">{icon}</div>
      <h3 className="text-lg font-headline font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
