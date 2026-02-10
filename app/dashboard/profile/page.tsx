'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardHeader from '@/components/dashboard/header';
import { User, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [formData, setFormData] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1992-05-15',
    address: '123 Main Street, Springfield, IL 62701',
    age: 32,
    weeksPregnant: 28,
    medicalHistory: 'Family history of diabetes',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(formData);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Profile updated:', editData);
      setFormData(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your personal and medical information
          </p>
        </div>

        {/* Profile Header */}
        <Card className="border-border bg-card mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">{formData.fullName}</h2>
                <p className="text-muted-foreground">{formData.email}</p>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {isEditing ? (
          /* Edit Form */
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Edit Profile Information</CardTitle>
              <CardDescription>
                Update your personal and medical details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={editData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={editData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={editData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={editData.dateOfBirth}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={editData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Pregnancy Information */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="font-semibold text-foreground">Pregnancy Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={editData.age}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weeksPregnant">Weeks Pregnant</Label>
                      <Input
                        id="weeksPregnant"
                        name="weeksPregnant"
                        type="number"
                        value={editData.weeksPregnant}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="font-semibold text-foreground">Medical Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <textarea
                      id="medicalHistory"
                      name="medicalHistory"
                      value={editData.medicalHistory}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground resize-none h-24"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          /* View Mode */
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium text-foreground">{formData.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {formData.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {formData.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(formData.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {formData.address}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Pregnancy Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-medium text-foreground">{formData.age} years old</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weeks Pregnant</p>
                  <p className="font-medium text-foreground">{formData.weeksPregnant} weeks</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Due Date</p>
                  <p className="font-medium text-foreground">
                    {new Date(new Date().getTime() + (40 - formData.weeksPregnant) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">Medical History</p>
                  <p className="text-foreground">{formData.medicalHistory}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
