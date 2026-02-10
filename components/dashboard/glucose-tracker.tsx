'use client';

import React from "react"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: 'Mon', fbs: 105, ppbs: 142 },
  { date: 'Tue', fbs: 108, ppbs: 138 },
  { date: 'Wed', fbs: 102, ppbs: 135 },
  { date: 'Thu', fbs: 110, ppbs: 145 },
  { date: 'Fri', fbs: 106, ppbs: 140 },
  { date: 'Sat', fbs: 104, ppbs: 136 },
  { date: 'Sun', fbs: 107, ppbs: 141 },
];

export default function GlucoseTracker() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fbs: '',
    ppbsBreakfast: '',
    ppbsLunch: '',
    ppbsDinner: '',
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
      // API call to save glucose log
      console.log('Glucose log saved:', formData);
      setFormData({
        fbs: '',
        ppbsBreakfast: '',
        ppbsLunch: '',
        ppbsDinner: '',
      });
      setOpen(false);
    } catch (error) {
      console.error('Failed to save glucose log:', error);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Glucose Levels</CardTitle>
              <CardDescription>
                Track your blood sugar levels throughout the day
              </CardDescription>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Log Glucose
                </Button>
              </DialogTrigger>
              <DialogContent className="border-border bg-card">
                <DialogHeader>
                  <DialogTitle>Log Glucose Level</DialogTitle>
                  <DialogDescription>
                    Enter your glucose readings for today
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fbs">Fasting Blood Sugar (mg/dL)</Label>
                    <Input
                      id="fbs"
                      name="fbs"
                      type="number"
                      placeholder="90-130"
                      value={formData.fbs}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ppbsBreakfast">Post-Breakfast (mg/dL)</Label>
                    <Input
                      id="ppbsBreakfast"
                      name="ppbsBreakfast"
                      type="number"
                      placeholder="Under 140"
                      value={formData.ppbsBreakfast}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ppbsLunch">Post-Lunch (mg/dL)</Label>
                    <Input
                      id="ppbsLunch"
                      name="ppbsLunch"
                      type="number"
                      placeholder="Under 140"
                      value={formData.ppbsLunch}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ppbsDinner">Post-Dinner (mg/dL)</Label>
                    <Input
                      id="ppbsDinner"
                      name="ppbsDinner"
                      type="number"
                      placeholder="Under 140"
                      value={formData.ppbsDinner}
                      onChange={handleChange}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Save Reading
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
                <YAxis stroke="var(--muted-foreground)" domain={[80, 160]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value} mg/dL`, 'Reading']}
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

      {/* Target Ranges Info */}
      <Card className="border-border bg-secondary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Target Ranges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fasting Blood Sugar:</span>
            <span className="font-semibold text-foreground">90-130 mg/dL</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Post-Meal:</span>
            <span className="font-semibold text-foreground">Under 140 mg/dL</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
