'use client';

import React from "react"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertCircle, Plus, CheckCircle2, Calendar } from 'lucide-react';

interface Checkup {
  id: string;
  date: string;
  time: string;
  type: string;
  notes: string;
  status: 'scheduled' | 'completed' | 'pending';
}

const mockCheckups: Checkup[] = [
  {
    id: '1',
    date: '2024-02-02',
    time: '10:00',
    type: 'Routine Checkup',
    notes: 'Review glucose readings and vital signs',
    status: 'scheduled',
  },
  {
    id: '2',
    date: '2024-02-01',
    time: '14:00',
    type: 'Weight & BP Check',
    notes: 'Monitor weight gain and blood pressure',
    status: 'pending',
  },
  {
    id: '3',
    date: '2024-01-28',
    time: '11:00',
    type: 'Routine Checkup',
    notes: 'General health assessment',
    status: 'completed',
  },
];

interface PatientCheckupsProps {
  selectedPatientId: string | null;
}

export default function PatientCheckups({ selectedPatientId }: PatientCheckupsProps) {
  const [open, setOpen] = useState(false);
  const [checkupData, setCheckupData] = useState({
    date: '',
    time: '',
    type: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCheckupData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Checkup scheduled:', checkupData);
      setCheckupData({
        date: '',
        time: '',
        type: '',
        notes: '',
      });
      setOpen(false);
    } catch (error) {
      console.error('Failed to schedule checkup:', error);
    }
  };

  if (!selectedPatientId) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="pt-6 text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">
            Select a Patient
          </p>
          <p className="text-muted-foreground">
            Choose a patient from the list to manage their checkups
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Scheduled Checkups</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Checkup
            </Button>
          </DialogTrigger>
          <DialogContent className="border-border bg-card">
            <DialogHeader>
              <DialogTitle>Schedule Patient Checkup</DialogTitle>
              <DialogDescription>
                Set up a checkup appointment with the patient
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={checkupData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={checkupData.time}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Checkup Type</Label>
                <select
                  name="type"
                  value={checkupData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="">Select type</option>
                  <option value="routine">Routine Checkup</option>
                  <option value="weight">Weight & BP Check</option>
                  <option value="glucose">Glucose Review</option>
                  <option value="education">Education Session</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Add any notes about this checkup..."
                  value={checkupData.notes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground resize-none h-20"
                />
              </div>

              <Button type="submit" className="w-full">
                Schedule Checkup
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {mockCheckups.map(checkup => (
          <Card
            key={checkup.id}
            className={`border ${
              checkup.status === 'scheduled'
                ? 'bg-blue-50 border-blue-200'
                : checkup.status === 'pending'
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-green-50 border-green-200'
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground">{checkup.type}</p>
                      <span className={`text-xs font-semibold px-2 py-1 rounded
                        ${checkup.status === 'scheduled' ? 'bg-blue-200 text-blue-900' : ''}
                        ${checkup.status === 'pending' ? 'bg-amber-200 text-amber-900' : ''}
                        ${checkup.status === 'completed' ? 'bg-green-200 text-green-900' : ''}
                      `}>
                        {checkup.status.charAt(0).toUpperCase() + checkup.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(checkup.date).toLocaleDateString()} at {checkup.time}
                    </p>
                    <p className="text-sm text-foreground">{checkup.notes}</p>
                  </div>
                </div>
                {checkup.status === 'pending' && (
                  <Button size="sm" variant="outline">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Complete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
