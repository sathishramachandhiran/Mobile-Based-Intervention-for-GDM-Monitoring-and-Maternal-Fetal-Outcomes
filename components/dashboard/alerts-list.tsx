'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface Alert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'high_glucose',
    severity: 'high',
    message: 'Your post-lunch glucose reading was 152 mg/dL, which is above the target range.',
    timestamp: 'Today at 14:30',
    acknowledged: false,
  },
  {
    id: '2',
    type: 'reminder',
    severity: 'medium',
    message: 'Don\'t forget to log your dinner glucose reading.',
    timestamp: 'Today at 18:00',
    acknowledged: false,
  },
  {
    id: '3',
    type: 'low_activity',
    severity: 'low',
    message: 'You haven\'t logged any exercise today. Try a 20-minute walk!',
    timestamp: 'Today at 12:00',
    acknowledged: true,
  },
];

const severityStyles = {
  low: 'bg-blue-50 border-blue-200 text-blue-900',
  medium: 'bg-amber-50 border-amber-200 text-amber-900',
  high: 'bg-orange-50 border-orange-200 text-orange-900',
  critical: 'bg-red-50 border-red-200 text-red-900',
};

const severityIcons = {
  low: <Info className="w-5 h-5 text-blue-600" />,
  medium: <AlertCircle className="w-5 h-5 text-amber-600" />,
  high: <AlertCircle className="w-5 h-5 text-orange-600" />,
  critical: <AlertCircle className="w-5 h-5 text-red-600" />,
};

export default function AlertsList() {
  const handleAcknowledge = async (alertId: string) => {
    try {
      console.log('Alert acknowledged:', alertId);
      // API call to acknowledge alert
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
    }
  };

  const unacknowledgedAlerts = mockAlerts.filter(alert => !alert.acknowledged);

  return (
    <div className="space-y-4">
      {unacknowledgedAlerts.length > 0 ? (
        <div className="space-y-3">
          {unacknowledgedAlerts.map(alert => (
            <Card
              key={alert.id}
              className={`border ${severityStyles[alert.severity]}`}
            >
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="mt-0.5">
                    {severityIcons[alert.severity]}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-1">{alert.message}</p>
                    <p className="text-sm opacity-75">{alert.timestamp}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAcknowledge(alert.id)}
                    className="ml-4"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border bg-card">
          <CardContent className="pt-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">
              All Caught Up!
            </p>
            <p className="text-muted-foreground">
              No active alerts. Keep up your healthy habits!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Acknowledged Alerts Section */}
      {mockAlerts.some(a => a.acknowledged) && (
        <Card className="border-border bg-secondary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Previous Alerts</CardTitle>
            <CardDescription>
              {mockAlerts.filter(a => a.acknowledged).length} acknowledged
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockAlerts
                .filter(a => a.acknowledged)
                .map(alert => (
                  <div
                    key={alert.id}
                    className="text-sm p-2 rounded border border-border opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <p className="font-medium text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
