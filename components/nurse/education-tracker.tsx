'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, BookOpen, Plus } from 'lucide-react';

interface EducationSession {
  id: string;
  topic: string;
  date: string;
  status: 'completed' | 'pending';
  notes?: string;
}

const mockEducationSessions: EducationSession[] = [
  {
    id: '1',
    topic: 'Nutrition & Diet Planning',
    date: '2024-01-28',
    status: 'completed',
    notes: 'Patient understood meal planning basics',
  },
  {
    id: '2',
    topic: 'Safe Exercise During Pregnancy',
    date: '2024-02-02',
    status: 'pending',
    notes: 'Scheduled for 2 PM',
  },
  {
    id: '3',
    topic: 'Understanding Glucose Readings',
    date: '2024-01-20',
    status: 'completed',
    notes: 'Patient demonstrates good understanding',
  },
];

interface EducationTrackerProps {
  selectedPatientId: string | null;
}

export default function EducationTracker({ selectedPatientId }: EducationTrackerProps) {
  if (!selectedPatientId) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="pt-6 text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">
            Select a Patient
          </p>
          <p className="text-muted-foreground">
            Choose a patient from the list to manage their education sessions
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Education Sessions</h3>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Session
        </Button>
      </div>

      <div className="space-y-3">
        {mockEducationSessions.map(session => (
          <Card
            key={session.id}
            className={`border ${
              session.status === 'completed'
                ? 'bg-green-50 border-green-200'
                : 'bg-amber-50 border-amber-200'
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    <BookOpen className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground">{session.topic}</p>
                      <span className={`text-xs font-semibold px-2 py-1 rounded
                        ${session.status === 'completed' ? 'bg-green-200 text-green-900' : 'bg-amber-200 text-amber-900'}
                      `}>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                    {session.notes && (
                      <p className="text-sm text-foreground">{session.notes}</p>
                    )}
                  </div>
                </div>
                {session.status === 'completed' && (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Education Topics */}
      <Card className="border-border bg-secondary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Available Topics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            • Understanding Gestational Diabetes
          </p>
          <p className="text-muted-foreground">
            • Nutrition & Meal Planning
          </p>
          <p className="text-muted-foreground">
            • Safe Exercise During Pregnancy
          </p>
          <p className="text-muted-foreground">
            • Blood Sugar Monitoring
          </p>
          <p className="text-muted-foreground">
            • Preparing for Delivery
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
