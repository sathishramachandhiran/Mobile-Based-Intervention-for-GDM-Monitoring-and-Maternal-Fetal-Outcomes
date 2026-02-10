'use client';

import React from "react"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertCircle, Plus, Send, Lightbulb } from 'lucide-react';

interface Suggestion {
  id: string;
  type: 'clinical' | 'diet' | 'exercise' | 'general';
  message: string;
  date: string;
  status: 'pending' | 'sent';
}

const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    type: 'diet',
    message: 'Include more leafy greens and whole grains in your meals',
    date: '2024-01-28',
    status: 'sent',
  },
  {
    id: '2',
    type: 'exercise',
    message: 'Try 30 minutes of brisk walking daily to help regulate blood sugar',
    date: '2024-01-25',
    status: 'sent',
  },
  {
    id: '3',
    type: 'clinical',
    message: 'Schedule blood work next week to check glucose trends',
    date: '2024-01-28',
    status: 'pending',
  },
];

interface SuggestionsManagerProps {
  selectedPatientId: string | null;
}

export default function SuggestionsManager({ selectedPatientId }: SuggestionsManagerProps) {
  const [open, setOpen] = useState(false);
  const [suggestionType, setSuggestionType] = useState<'clinical' | 'diet' | 'exercise' | 'general'>('diet');
  const [suggestionContent, setSuggestionContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Suggestion sent:', { type: suggestionType, message: suggestionContent });
      setSuggestionContent('');
      setOpen(false);
    } catch (error) {
      console.error('Failed to send suggestion:', error);
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
            Choose a patient from the list to send suggestions
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Care Suggestions</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Suggestion
            </Button>
          </DialogTrigger>
          <DialogContent className="border-border bg-card">
            <DialogHeader>
              <DialogTitle>Send Care Suggestion</DialogTitle>
              <DialogDescription>
                Share guidance and recommendations with the patient
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Suggestion Type</Label>
                <select
                  value={suggestionType}
                  onChange={(e) => setSuggestionType(e.target.value as typeof suggestionType)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="diet">Nutrition & Diet</option>
                  <option value="exercise">Exercise & Activity</option>
                  <option value="clinical">Clinical Care</option>
                  <option value="general">General Guidance</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Your Suggestion</Label>
                <Textarea
                  id="content"
                  placeholder="Write your suggestion here..."
                  value={suggestionContent}
                  onChange={(e) => setSuggestionContent(e.target.value)}
                  className="bg-background border-border"
                  rows={5}
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Suggestion
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Suggestions List */}
      <div className="space-y-3">
        {mockSuggestions.map(suggestion => {
          const typeColors = {
            diet: 'bg-green-50 border-green-200',
            exercise: 'bg-blue-50 border-blue-200',
            clinical: 'bg-purple-50 border-purple-200',
            general: 'bg-gray-50 border-gray-200',
          };

          const typeBadges = {
            diet: 'bg-green-200 text-green-900',
            exercise: 'bg-blue-200 text-blue-900',
            clinical: 'bg-purple-200 text-purple-900',
            general: 'bg-gray-200 text-gray-900',
          };

          return (
            <Card
              key={suggestion.id}
              className={`border ${typeColors[suggestion.type]}`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      <Lightbulb className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${typeBadges[suggestion.type]}`}>
                          {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded
                          ${suggestion.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}
                        `}>
                          {suggestion.status === 'sent' ? 'Sent' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-sm text-foreground mb-2">{suggestion.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(suggestion.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {suggestion.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => console.log('Sending suggestion:', suggestion.id)}
                    >
                      Send
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
