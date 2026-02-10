'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from '@/components/dashboard/header';
import type { DashboardHeaderProps } from '@/components/dashboard/header';
import { AlertCircle, CheckCircle2, Bell, Trash2, Archive } from 'lucide-react';

interface Alert {
  id: string;
  type: 'glucose' | 'bp' | 'weight' | 'appointment' | 'medication';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'glucose',
    severity: 'critical',
    title: 'High Glucose Reading',
    message: 'Your glucose reading is 165 mg/dL. Please review your diet and contact your doctor if levels persist.',
    date: '2024-02-01',
    read: false,
  },
  {
    id: '2',
    type: 'appointment',
    severity: 'info',
    title: 'Appointment Reminder',
    message: 'You have a routine checkup scheduled for tomorrow at 10:00 AM with Dr. Sarah Johnson.',
    date: '2024-02-01',
    read: false,
  },
  {
    id: '3',
    type: 'weight',
    severity: 'warning',
    title: 'Weight Gain Alert',
    message: 'You have gained 2 lbs this week. Ensure proper nutrition and exercise.',
    date: '2024-01-31',
    read: true,
  },
  {
    id: '4',
    type: 'medication',
    severity: 'info',
    title: 'Medication Reminder',
    message: 'Time to take your prenatal vitamins.',
    date: '2024-01-30',
    read: true,
  },
];

export default function AlertsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [activeTab, setActiveTab] = useState('all');

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

  const handleMarkAsRead = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const handleDelete = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertsByTab = () => {
    switch (activeTab) {
      case 'unread':
        return alerts.filter(a => !a.read);
      case 'critical':
        return alerts.filter(a => a.severity === 'critical');
      case 'glucose':
        return alerts.filter(a => a.type === 'glucose');
      default:
        return alerts;
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const displayedAlerts = getAlertsByTab();
  const unreadCount = alerts.filter(a => !a.read).length;
  const criticalCount = alerts.filter(a => a.severity === 'critical').length;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userRole={userRole} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Alerts & Notifications
          </h1>
          <p className="text-muted-foreground">
            Stay informed about your health status
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {alerts.length}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Unread
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-600">
                {unreadCount}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Critical
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">
                {criticalCount}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread" className="relative">
              Unread
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="critical" className="relative">
              Critical
              {criticalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {criticalCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="glucose">Glucose</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-3">
            {displayedAlerts.length > 0 ? (
              displayedAlerts.map(alert => (
                <Card
                  key={alert.id}
                  className={`border ${getSeverityStyles(alert.severity)} ${!alert.read ? 'ring-2 ring-offset-2 ring-blue-400' : ''}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="mt-1">
                          {getSeverityIcon(alert.severity)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-foreground">{alert.title}</p>
                            {!alert.read && (
                              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-foreground mb-2">
                            {alert.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(alert.date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!alert.read && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkAsRead(alert.id)}
                            title="Mark as read"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(alert.id)}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-border bg-card">
                <CardContent className="pt-8 text-center pb-8">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    No alerts
                  </p>
                  <p className="text-muted-foreground">
                    You are all caught up! Keep up with your health monitoring.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Alert Settings */}
        <Card className="border-border bg-secondary/5 mt-8">
          <CardHeader>
            <CardTitle>Alert Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border rounded">
              <div>
                <p className="font-medium text-foreground">High Glucose Alerts</p>
                <p className="text-sm text-muted-foreground">Notify when glucose exceeds 150 mg/dL</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded">
              <div>
                <p className="font-medium text-foreground">Weight Alerts</p>
                <p className="text-sm text-muted-foreground">Notify on weight gain &gt; 2 lbs/week</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded">
              <div>
                <p className="font-medium text-foreground">Appointment Reminders</p>
                <p className="text-sm text-muted-foreground">Remind 24 hours before appointments</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
