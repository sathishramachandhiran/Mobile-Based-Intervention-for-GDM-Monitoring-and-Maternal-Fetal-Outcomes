'use client';

import React from "react"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: 'Mon', weight: 72.5, systolic: 118, diastolic: 76 },
  { date: 'Tue', weight: 72.7, systolic: 120, diastolic: 77 },
  { date: 'Wed', weight: 72.3, systolic: 116, diastolic: 75 },
  { date: 'Thu', weight: 72.8, systolic: 122, diastolic: 78 },
  { date: 'Fri', weight: 72.6, systolic: 119, diastolic: 76 },
  { date: 'Sat', weight: 72.4, systolic: 117, diastolic: 75 },
  { date: 'Sun', weight: 72.9, systolic: 121, diastolic: 77 },
];

export default function BiophysicalTracker() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    systolic: '',
    diastolic: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Biophysical data saved:', formData);
      setFormData({
        weight: '',
        systolic: '',
        diastolic: '',
      });
      setOpen(false);
    } catch (error) {
      console.error('Failed to save biophysical data:', error);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Vital Signs & Measurements</CardTitle>
              <CardDescription>
                Track your weight and blood pressure
              </CardDescription>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Log Vitals
                </Button>
              </DialogTrigger>
              <DialogContent className="border-border bg-card">
                <DialogHeader>
                  <DialogTitle>Log Vital Signs</DialogTitle>
                  <DialogDescription>
                    Record your measurements
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.1"
                      placeholder="72.5"
                      value={formData.weight}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="systolic">Systolic BP (mm Hg)</Label>
                    <Input
                      id="systolic"
                      name="systolic"
                      type="number"
                      placeholder="120"
                      value={formData.systolic}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diastolic">Diastolic BP (mm Hg)</Label>
                    <Input
                      id="diastolic"
                      name="diastolic"
                      type="number"
                      placeholder="80"
                      value={formData.diastolic}
                      onChange={handleChange}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Save Measurements
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="weight"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  name="Weight (kg)"
                  dot={{ fill: 'var(--primary)', r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="systolic"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  name="Systolic BP"
                  dot={{ fill: 'var(--accent)', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Normal Ranges Info */}
      <Card className="border-border bg-secondary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Normal Ranges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Blood Pressure:</span>
            <span className="font-semibold text-foreground">Less than 140/90 mm Hg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Weight Gain:</span>
            <span className="font-semibold text-foreground">0.5 kg per week (2nd/3rd trimester)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
