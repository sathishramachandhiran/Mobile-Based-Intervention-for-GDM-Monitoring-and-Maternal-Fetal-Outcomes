'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import DashboardHeader from '@/components/dashboard/header';
import PatientCareList from '@/components/nurse/patient-care-list';
import PatientCheckups from '@/components/nurse/patient-checkups';
import EducationTracker from '@/components/nurse/education-tracker';
import SuggestionsManager from '@/components/nurse/suggestions-manager';
import { Search, Users, Heart, BookOpen, MessageSquare } from 'lucide-react';

export default function NurseDashboard() {
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
        if (data.role !== 'nurse') {
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
          <Heart className="w-8 h-8 text-primary mx-auto mb-4 animate-pulse" />
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
            Nurse Dashboard
          </h1>
          <p className="text-muted-foreground">
            Provide comprehensive care support to your patients
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Assigned Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">18</p>
              <p className="text-xs text-muted-foreground mt-1">
                Active cases
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Checkups Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">7</p>
              <p className="text-xs text-muted-foreground mt-1">
                Scheduled
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">5</p>
              <p className="text-xs text-muted-foreground mt-1">
                To be acknowledged
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Education Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground mt-1">
                Completed this month
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
              <span className="hidden sm:inline">Patients</span>
            </TabsTrigger>
            <TabsTrigger value="checkups" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Checkups</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Suggestions</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-4">
            <PatientCareList searchTerm={searchTerm} onSelectPatient={setSelectedPatient} />
          </TabsContent>

          <TabsContent value="checkups" className="space-y-4">
            <PatientCheckups selectedPatientId={selectedPatient} />
          </TabsContent>

          <TabsContent value="education" className="space-y-4">
            <EducationTracker selectedPatientId={selectedPatient} />
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-4">
            <SuggestionsManager selectedPatientId={selectedPatient} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
