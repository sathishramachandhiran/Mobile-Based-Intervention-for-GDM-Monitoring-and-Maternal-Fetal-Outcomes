'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DashboardHeader from '@/components/dashboard/header';
import GlucoseTracker from '@/components/dashboard/glucose-tracker';
import BiophysicalTracker from '@/components/dashboard/biophysical-tracker';
import ActivityTracker from '@/components/dashboard/activity-tracker';
import AlertsList from '@/components/dashboard/alerts-list';
import SuggestionsList from '@/components/dashboard/suggestions-list';
import { Heart, TrendingUp, AlertCircle, Calendar, Bell, BarChart3, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { ChatWidget } from '@/components/chat-widget';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      // Check if user is authenticated
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
        });

        if (!response.ok) {
          router.push('/auth/login');
          return;
        }

        const data = await response.json();
        setUserRole(data.role || 'patient');
        setUserData(data);
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
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Patient Dashboard
  if (userRole === 'patient') {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader userRole={userRole} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back!
            </h1>
            <p className="text-muted-foreground">
              Here's your health overview for today
            </p>
          </div>

          {/* Alert Banner */}
          <Alert className="mb-8 border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              Remember to log your glucose levels after meals and track your daily activities for better health insights.
            </AlertDescription>
          </Alert>

          {/* Quick Navigation */}
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            <Link
              href="/dashboard/track"
              className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow group bg-card hover:bg-card/80"
            >
              <TrendingUp className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-1">Track Data</h3>
              <p className="text-sm text-muted-foreground">
                Log glucose and vitals
              </p>
            </Link>

            <Link
              href="/dashboard/analytics"
              className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow group bg-card hover:bg-card/80"
            >
              <BarChart3 className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-1">Analytics</h3>
              <p className="text-sm text-muted-foreground">
                View insights & trends
              </p>
            </Link>

            <Link
              href="/dashboard/appointments"
              className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow group bg-card hover:bg-card/80"
            >
              <Calendar className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-1">Appointments</h3>
              <p className="text-sm text-muted-foreground">
                Schedule & manage visits
              </p>
            </Link>

            <Link
              href="/dashboard/alerts"
              className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow group bg-card hover:bg-card/80"
            >
              <Bell className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-1">Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Health notifications
              </p>
            </Link>

            <Link
              href="/dashboard/chatbot"
              className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow group bg-card hover:bg-card/80"
            >
              <MessageCircle className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-1">Chat</h3>
              <p className="text-sm text-muted-foreground">
                Get health support
              </p>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Today's Glucose Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">3/4</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Fasting, Breakfast, Lunch pending
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  This Week's Average
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">118</p>
                <p className="text-xs text-muted-foreground mt-1">
                  mg/dL - Within target range
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">1</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Review in Alerts section
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="glucose" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="glucose">Glucose</TabsTrigger>
              <TabsTrigger value="biophysical">Vital Signs</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="glucose" className="space-y-4">
              <GlucoseTracker />
            </TabsContent>

            <TabsContent value="biophysical" className="space-y-4">
              <BiophysicalTracker />
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <ActivityTracker />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4">
              <AlertsList />
            </TabsContent>
          </Tabs>

          {/* Suggestions Section */}
          <div className="mt-8">
            <SuggestionsList />
          </div>
        </main>
        <ChatWidget />
      </div>
    );
  }

  // Doctor Dashboard
  if (userRole === 'doctor') {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader userRole={userRole} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            Doctor Dashboard
          </h1>
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Your Patients</CardTitle>
              <CardDescription>
                Manage and monitor your assigned patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Patient list and monitoring tools coming soon
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Nurse Dashboard
  if (userRole === 'nurse') {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader userRole={userRole} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            Nurse Dashboard
          </h1>
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Patient Support</CardTitle>
              <CardDescription>
                Provide care support to patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Patient support tools coming soon
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return null;
}
