'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

interface PatientMonitoringProps {
  selectedPatientId: string | null;
}

const glucoseData = [
  { date: 'Mon', fbs: 105, ppbs: 142 },
  { date: 'Tue', fbs: 108, ppbs: 138 },
  { date: 'Wed', fbs: 102, ppbs: 135 },
  { date: 'Thu', fbs: 110, ppbs: 145 },
  { date: 'Fri', fbs: 112, ppbs: 150 },
  { date: 'Sat', fbs: 104, ppbs: 136 },
  { date: 'Sun', fbs: 107, ppbs: 141 },
];

const complianceData = [
  { week: 'Week 1', logged: 28, target: 28 },
  { week: 'Week 2', logged: 25, target: 28 },
  { week: 'Week 3', logged: 27, target: 28 },
  { week: 'Week 4', logged: 22, target: 28 },
];

export default function PatientMonitoring({ selectedPatientId }: PatientMonitoringProps) {
  if (!selectedPatientId) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="pt-6 text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">
            Select a Patient
          </p>
          <p className="text-muted-foreground">
            Choose a patient from the list to view their monitoring data
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <CardTitle className="text-red-900">Active Alert</CardTitle>
              <CardDescription className="text-red-800">
                High glucose reading detected - 2 consecutive readings above 150 mg/dL
              </CardDescription>
            </div>
            <Button size="sm" variant="outline" className="text-red-600 border-red-200 bg-transparent">
              Review
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Glucose Monitoring */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Glucose Trend (Last 7 Days)</CardTitle>
          <CardDescription>
            Fasting and post-meal readings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={glucoseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" domain={[80, 160]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="fbs"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  name="Fasting"
                  dot={{ fill: 'var(--primary)', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="ppbs"
                  stroke="var(--secondary)"
                  strokeWidth={2}
                  name="Post-Meal"
                  dot={{ fill: 'var(--secondary)', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Compliance */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Monitoring Compliance</CardTitle>
          <CardDescription>
            Log entries vs target per week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complianceData}>
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
                <Bar dataKey="logged" fill="var(--primary)" name="Logged" />
                <Bar dataKey="target" fill="var(--muted)" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Fasting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-foreground">106</p>
              <TrendingUp className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              mg/dL - Slightly elevated
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Post-Meal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-foreground">141</p>
              <TrendingDown className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              mg/dL - Within range
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Compliance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-foreground">89%</p>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Excellent adherence
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
