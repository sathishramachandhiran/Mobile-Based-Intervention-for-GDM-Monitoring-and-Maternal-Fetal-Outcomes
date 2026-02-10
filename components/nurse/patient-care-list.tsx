'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Plus, User } from 'lucide-react';

interface PatientCare {
  id: string;
  name: string;
  phone: string;
  email: string;
  weeksPregnant: number;
  lastCheckup: string;
  careLevel: 'routine' | 'intensive' | 'critical';
}

const mockPatients: PatientCare[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    email: 'sarah.j@email.com',
    weeksPregnant: 28,
    lastCheckup: '2024-01-26',
    careLevel: 'routine',
  },
  {
    id: '2',
    name: 'Emily Chen',
    phone: '+1 (555) 234-5678',
    email: 'emily.chen@email.com',
    weeksPregnant: 24,
    lastCheckup: '2024-01-20',
    careLevel: 'intensive',
  },
  {
    id: '3',
    name: 'Maria Garcia',
    phone: '+1 (555) 345-6789',
    email: 'maria.g@email.com',
    weeksPregnant: 32,
    lastCheckup: '2024-01-25',
    careLevel: 'critical',
  },
  {
    id: '4',
    name: 'Jessica Williams',
    phone: '+1 (555) 456-7890',
    email: 'jessica.w@email.com',
    weeksPregnant: 20,
    lastCheckup: '2024-01-24',
    careLevel: 'routine',
  },
];

interface PatientCareListProps {
  searchTerm: string;
  onSelectPatient: (patientId: string) => void;
}

const careLevelColors = {
  routine: 'bg-green-50 border-green-200 text-green-900',
  intensive: 'bg-amber-50 border-amber-200 text-amber-900',
  critical: 'bg-red-50 border-red-200 text-red-900',
};

const careLevelBadges = {
  routine: 'bg-green-100 text-green-800',
  intensive: 'bg-amber-100 text-amber-800',
  critical: 'bg-red-100 text-red-800',
};

export default function PatientCareList({ searchTerm, onSelectPatient }: PatientCareListProps) {
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
          Schedule Checkup
        </Button>
      </div>

      <div className="space-y-3">
        {filteredPatients.length > 0 ? (
          filteredPatients.map(patient => (
            <Card
              key={patient.id}
              className={`border cursor-pointer hover:shadow-md transition-shadow ${careLevelColors[patient.careLevel]}`}
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
                        <Badge className={careLevelBadges[patient.careLevel]}>
                          {patient.careLevel.charAt(0).toUpperCase() + patient.careLevel.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {patient.weeksPregnant} weeks pregnant
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground">{patient.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground">{patient.email}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Last checkup: {new Date(patient.lastCheckup).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Contacting patient:', patient.id);
                    }}
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
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
