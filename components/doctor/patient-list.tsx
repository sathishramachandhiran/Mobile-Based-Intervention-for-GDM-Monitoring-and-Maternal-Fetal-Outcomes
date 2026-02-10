'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Plus, User } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  weeksPregnant: number;
  lastGlucose: number;
  status: 'stable' | 'alert' | 'critical';
  nextAppointment: string;
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 32,
    weeksPregnant: 28,
    lastGlucose: 118,
    status: 'stable',
    nextAppointment: '2024-02-05',
  },
  {
    id: '2',
    name: 'Emily Chen',
    age: 28,
    weeksPregnant: 24,
    lastGlucose: 152,
    status: 'alert',
    nextAppointment: '2024-02-03',
  },
  {
    id: '3',
    name: 'Maria Garcia',
    age: 35,
    weeksPregnant: 32,
    lastGlucose: 165,
    status: 'critical',
    nextAppointment: '2024-02-02',
  },
  {
    id: '4',
    name: 'Jessica Smith',
    age: 29,
    weeksPregnant: 20,
    lastGlucose: 110,
    status: 'stable',
    nextAppointment: '2024-02-06',
  },
];

interface PatientListProps {
  searchTerm: string;
  onSelectPatient: (patientId: string) => void;
}

const statusColors = {
  stable: 'bg-green-50 border-green-200 text-green-900',
  alert: 'bg-amber-50 border-amber-200 text-amber-900',
  critical: 'bg-red-50 border-red-200 text-red-900',
};

const statusBadges = {
  stable: 'bg-green-100 text-green-800',
  alert: 'bg-amber-100 text-amber-800',
  critical: 'bg-red-100 text-red-800',
};

export default function PatientList({ searchTerm, onSelectPatient }: PatientListProps) {
  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.includes(searchTerm)
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Your Patients</h3>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      <div className="space-y-3">
        {filteredPatients.length > 0 ? (
          filteredPatients.map(patient => (
            <Card
              key={patient.id}
              className={`border cursor-pointer hover:shadow-md transition-shadow ${statusColors[patient.status]}`}
              onClick={() => onSelectPatient(patient.id)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-foreground">{patient.name}</p>
                        <Badge className={statusBadges[patient.status]}>
                          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Age</p>
                          <p className="font-medium text-foreground">{patient.age}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Weeks Pregnant</p>
                          <p className="font-medium text-foreground">{patient.weeksPregnant}w</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Last Glucose</p>
                          <p className="font-medium text-foreground">{patient.lastGlucose} mg/dL</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Next appointment: {new Date(patient.nextAppointment).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {patient.status !== 'stable' && (
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-border bg-card">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No patients found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
