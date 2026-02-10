'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from '@/components/dashboard/header';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, AlertCircle, Target } from 'lucide-react';

const glucoseTrendData = [
  { week: 'Week 1', avg: 118, target: 120 },
  { week: 'Week 2', avg: 122, target: 120 },
  { week: 'Week 3', avg: 116, target: 120 },
  { week: 'Week 4', avg: 125, target: 120 },
];

const readingsDistribution = [
  { range: '80-100', value: 15 },
  { range: '100-120', value: 35 },
  { range: '120-140', value: 30 },
  { range: '140+', value: 20 },
];

const complianceData = [
  { day: 'Mon', logged: 4, target: 4 },
  { day: 'Tue', logged: 4, target: 4 },
  { day: 'Wed', logged: 3, target: 4 },
  { day: 'Thu', logged: 4, target: 4 },
  { day: 'Fri', logged: 4, target: 4 },
  { day: 'Sat', logged: 2, target: 4 },
  { day: 'Sun', logged: 4, target: 4 },
];

const COLORS = ['#ec4899', '#d946ef', '#a855f7', '#f59e0b'];

export default function AnalyticsDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        if (!response.ok) {
          router.push('/auth/login');
          return;
        }
        const data = await response.json();
        setUserRole(data.role || 'patient');
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
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userRole={userRole} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Analytics & Insights
            </h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of your health data
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timeRange === 'week' ? 'default' : 'outline'}
              onClick={() => setTimeRange('week')}
              size="sm"
            >
              Week
            </Button>
            <Button
              variant={timeRange === 'month' ? 'default' : 'outline'}
              onClick={() => setTimeRange('month')}
              size="sm"
            >
              Month
            </Button>
            <Button
              variant={timeRange === 'all' ? 'default' : 'outline'}
              onClick={() => setTimeRange('all')}
              size="sm"
            >
              All
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Target className="w-4 h-4" />
                Average Glucose
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">120</p>
              <p className="text-xs text-muted-foreground mt-1">
                mg/dL - Target range
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Highest Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600">165</p>
              <p className="text-xs text-muted-foreground mt-1">
                mg/dL - Post-lunch
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Compliance Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">92%</p>
              <p className="text-xs text-muted-foreground mt-1">
                Excellent adherence
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Out of Range Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-600">8</p>
              <p className="text-xs text-muted-foreground mt-1">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="trend" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="trend">Trend</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="trend" className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Glucose Trend by Week</CardTitle>
                <CardDescription>
                  Weekly average glucose levels vs target
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={glucoseTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="week" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="avg"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        name="Average"
                        dot={{ fill: 'var(--primary)', r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="var(--secondary)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Target"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Glucose Reading Distribution</CardTitle>
                <CardDescription>
                  Breakdown of readings by range
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={readingsDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ range, value }) => `${range}: ${value}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {readingsDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Weekly Logging Compliance</CardTitle>
                <CardDescription>
                  Actual logs vs target daily logs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={complianceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="logged" fill="var(--primary)" name="Logged" />
                      <Bar dataKey="target" fill="var(--secondary)" name="Target" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Insights */}
        <Card className="border-border bg-secondary/5 mt-8">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1 bg-primary rounded"></div>
              <div>
                <p className="font-medium text-foreground">Stable Trend</p>
                <p className="text-sm text-muted-foreground">
                  Your glucose levels have remained stable with an average of 120 mg/dL over the past month.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 bg-amber-500 rounded"></div>
              <div>
                <p className="font-medium text-foreground">Post-Meal Pattern</p>
                <p className="text-sm text-muted-foreground">
                  Post-lunch readings tend to be highest. Consider adjusting lunch portions or food choices.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 bg-green-500 rounded"></div>
              <div>
                <p className="font-medium text-foreground">Excellent Compliance</p>
                <p className="text-sm text-muted-foreground">
                  Your 92% compliance rate is excellent and shows strong commitment to managing your health.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
