'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import DashboardHeader from '@/components/dashboard/header';
import { Calendar, Clock, User, MapPin, Plus, CheckCircle2, X } from 'lucide-react';

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  provider: string;
  type: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Routine Checkup',
    date: '2024-02-05',
    time: '10:00',
    provider: 'Dr. Sarah Johnson',
    type: 'Consultation',
    location: 'Medical Center - Room 302',
    status: 'scheduled',
  },
  {
    id: '2',
    title: 'Blood Work',
    date: '2024-02-08',
    time: '09:00',
    provider: 'Lab Technician',
    type: 'Lab Test',
    location: 'Lab Center - 1st Floor',
    status: 'scheduled',
  },
  {
    id: '3',
    title: 'Ultrasound',
    date: '2024-01-20',
    time: '14:00',
    provider: 'Dr. Michael Chen',
    type: 'Imaging',
    location: 'Imaging Center - Room 105',
    status: 'completed',
  },
];

export default function AppointmentsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    provider: '',
    type: '',
    location: '',
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAppointment: Appointment = {
        id: String(appointments.length + 1),
        ...formData,
        status: 'scheduled',
      };
      setAppointments([...appointments, newAppointment]);
      setFormData({
        title: '',
        date: '',
        time: '',
        provider: '',
        type: '',
        location: '',
      });
      setOpen(false);
    } catch (error) {
      console.error('Failed to book appointment:', error);
    }
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const upcomingAppointments = appointments.filter(apt => apt.status === 'scheduled');
  const completedAppointments = appointments.filter(apt => apt.status === 'completed');
  const cancelledAppointments = appointments.filter(apt => apt.status === 'cancelled');

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userRole={userRole} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Appointments
            </h1>
            <p className="text-muted-foreground">
              Schedule and manage your healthcare appointments
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="border-border bg-card max-w-md">
              <DialogHeader>
                <DialogTitle>Book an Appointment</DialogTitle>
                <DialogDescription>
                  Schedule an appointment with your healthcare provider
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleBookAppointment} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Appointment Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Routine Checkup"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provider">Healthcare Provider</Label>
                  <Input
                    id="provider"
                    name="provider"
                    placeholder="Doctor or provider name"
                    value={formData.provider}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Appointment Type</Label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Lab Test">Lab Test</option>
                    <option value="Imaging">Imaging</option>
                    <option value="Follow-up">Follow-up</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Medical center address"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Book Appointment
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {upcomingAppointments.length}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {completedAppointments.length}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cancelled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {cancelledAppointments.length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        <div className="space-y-6">
          {upcomingAppointments.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Upcoming Appointments
              </h2>
              <div className="space-y-3">
                {upcomingAppointments.map(apt => (
                  <Card key={apt.id} className="border-blue-200 bg-blue-50 hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="mt-1">
                            <Calendar className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-foreground text-lg">
                              {apt.title}
                            </p>
                            <div className="grid md:grid-cols-2 gap-3 mt-3">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                {new Date(apt.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                {apt.time}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <User className="w-4 h-4" />
                                {apt.provider}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                {apt.location}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancelAppointment(apt.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Completed Appointments */}
          {completedAppointments.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Past Appointments
              </h2>
              <div className="space-y-3">
                {completedAppointments.map(apt => (
                  <Card key={apt.id} className="border-green-200 bg-green-50 opacity-75">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">
                            {apt.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(apt.date).toLocaleDateString()} at {apt.time} with {apt.provider}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {appointments.length === 0 && (
            <Card className="border-border bg-card">
              <CardContent className="pt-8 text-center pb-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium text-foreground mb-2">
                  No appointments yet
                </p>
                <p className="text-muted-foreground mb-4">
                  Book your first appointment with your healthcare provider
                </p>
                <Button onClick={() => setOpen(true)}>
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
