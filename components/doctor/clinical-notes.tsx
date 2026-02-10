'use client';

import React from "react"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, AlertCircle, FileText } from 'lucide-react';

interface Note {
  id: string;
  type: 'clinical' | 'follow-up' | 'alert';
  title: string;
  content: string;
  author: string;
  date: string;
}

const mockNotes: Note[] = [
  {
    id: '1',
    type: 'clinical',
    title: 'Initial Assessment',
    content: 'Patient presents with gestational diabetes at 24 weeks. FBS 105, PPBS 145. Diet and exercise counseling provided.',
    author: 'Dr. Sarah Johnson',
    date: '2024-01-28',
  },
  {
    id: '2',
    type: 'follow-up',
    title: 'Follow-up Visit',
    content: 'Patient compliance excellent. Glucose readings stable. Continue current diet and exercise regimen.',
    author: 'Dr. Sarah Johnson',
    date: '2024-01-21',
  },
  {
    id: '3',
    type: 'alert',
    title: 'High Reading Alert',
    content: 'Post-lunch reading 165 mg/dL. Recommend increased monitoring and dietary adjustment.',
    author: 'Nurse Lisa',
    date: '2024-01-25',
  },
];

interface ClinicalNotesProps {
  selectedPatientId: string | null;
}

const noteTypeColors = {
  clinical: 'bg-blue-50 border-blue-200',
  'follow-up': 'bg-green-50 border-green-200',
  alert: 'bg-red-50 border-red-200',
};

export default function ClinicalNotes({ selectedPatientId }: ClinicalNotesProps) {
  const [open, setOpen] = useState(false);
  const [noteType, setNoteType] = useState<'clinical' | 'follow-up' | 'alert'>('clinical');
  const [noteContent, setNoteContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Clinical note saved:', { type: noteType, content: noteContent });
      setNoteContent('');
      setOpen(false);
    } catch (error) {
      console.error('Failed to save note:', error);
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
            Choose a patient from the list to view and add clinical notes
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Clinical Notes</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent className="border-border bg-card">
            <DialogHeader>
              <DialogTitle>Add Clinical Note</DialogTitle>
              <DialogDescription>
                Document observations and clinical information
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Note Type</Label>
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value as typeof noteType)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="clinical">Clinical Note</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="alert">Alert</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Note Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter clinical notes here..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="bg-background border-border"
                  rows={6}
                />
              </div>

              <Button type="submit" className="w-full">
                Save Note
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Notes Timeline */}
      <div className="space-y-3">
        {mockNotes.map((note) => (
          <Card
            key={note.id}
            className={`border ${noteTypeColors[note.type]}`}
          >
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="mt-1">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="font-semibold text-foreground">{note.title}</h4>
                    <span className={`text-xs font-semibold px-2 py-1 rounded
                      ${note.type === 'clinical' ? 'bg-blue-200 text-blue-900' : ''}
                      ${note.type === 'follow-up' ? 'bg-green-200 text-green-900' : ''}
                      ${note.type === 'alert' ? 'bg-red-200 text-red-900' : ''}
                    `}>
                      {note.type.charAt(0).toUpperCase() + note.type.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mb-3">{note.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {note.author} • {new Date(note.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
