'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import DashboardHeader from '@/components/dashboard/header';
import PatientList from '@/components/doctor/patient-list';
import PatientMonitoring from '@/components/doctor/patient-monitoring';
import ClinicalNotes from '@/components/doctor/clinical-notes';
import ReportGenerator from '@/components/doctor/report-generator';
import { Search, Users, AlertCircle, FileText } from 'lucide-react';

export default function DoctorDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
        });

        if (!response.ok) {
          router.push('/auth/login');
          return;
        }

        const data = await response.json();
        if (data.role !== 'doctor') {
          router.push('/dashboard');
          return;
        }
        setUserRole(data.role);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Users className="w-8 h-8 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userRole={userRole} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Doctor Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your patients and manage their care
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground mt-1">
                Active assignments
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Critical Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">2</p>
              <p className="text-xs text-muted-foreground mt-1">
                Require immediate attention
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">5</p>
              <p className="text-xs text-muted-foreground mt-1">
                This week
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Reports Generated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">28</p>
              <p className="text-xs text-muted-foreground mt-1">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="patients" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Patients
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-4">
            <PatientList searchTerm={searchTerm} onSelectPatient={setSelectedPatient} />
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <PatientMonitoring selectedPatientId={selectedPatient} />
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <ClinicalNotes selectedPatientId={selectedPatient} />
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <ReportGenerator selectedPatientId={selectedPatient} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
