'use client';

import React from "react"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Utensils, Zap } from 'lucide-react';

interface Activity {
  id: string;
  type: 'food' | 'exercise';
  name: string;
  time: string;
  details?: string;
}

const mockActivities: Activity[] = [
  { id: '1', type: 'food', name: 'Breakfast', time: '08:30', details: 'Oatmeal with berries' },
  { id: '2', type: 'exercise', name: 'Morning Walk', time: '10:00', details: '30 minutes' },
  { id: '3', type: 'food', name: 'Lunch', time: '12:30', details: 'Grilled chicken salad' },
  { id: '4', type: 'exercise', name: 'Yoga', time: '16:00', details: '20 minutes' },
];

export default function ActivityTracker() {
  const [open, setOpen] = useState(false);
  const [activityType, setActivityType] = useState<'food' | 'exercise'>('food');
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    details: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Activity logged:', { type: activityType, ...formData });
      setFormData({
        name: '',
        time: '',
        details: '',
      });
      setOpen(false);
    } catch (error) {
      console.error('Failed to save activity:', error);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Food & Exercise Log</CardTitle>
              <CardDescription>
                Track your meals and physical activities
              </CardDescription>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Log Activity
                </Button>
              </DialogTrigger>
              <DialogContent className="border-border bg-card">
                <DialogHeader>
                  <DialogTitle>Log Activity</DialogTitle>
                  <DialogDescription>
                    Record your meals or exercise
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Activity Type</Label>
                    <select
                      value={activityType}
                      onChange={(e) => setActivityType(e.target.value as 'food' | 'exercise')}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    >
                      <option value="food">Food</option>
                      <option value="exercise">Exercise</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {activityType === 'food' ? 'Meal Name' : 'Exercise Type'}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={activityType === 'food' ? 'e.g., Lunch' : 'e.g., Walking'}
                      value={formData.name}
                      onChange={handleChange}
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
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details">
                      {activityType === 'food' ? 'Food Description' : 'Duration & Notes'}
                    </Label>
                    <textarea
                      id="details"
                      name="details"
                      placeholder={activityType === 'food' ? 'What did you eat?' : 'How long? Any notes?'}
                      value={formData.details}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground resize-none h-24"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Save Activity
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockActivities.map(activity => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg border border-border bg-secondary/5 hover:bg-secondary/10 transition-colors"
              >
                <div className="mt-1">
                  {activity.type === 'food' ? (
                    <Utensils className="w-5 h-5 text-primary" />
                  ) : (
                    <Zap className="w-5 h-5 text-accent" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-foreground">{activity.name}</p>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                  {activity.details && (
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Card */}
      <Card className="border-border bg-secondary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recommended Activities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            • <span className="font-medium">Exercise:</span> 30 minutes of moderate activity most days
          </p>
          <p className="text-muted-foreground">
            • <span className="font-medium">Diet:</span> Focus on complex carbs, lean proteins, and fiber
          </p>
          <p className="text-muted-foreground">
            • <span className="font-medium">Hydration:</span> Drink plenty of water throughout the day
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
