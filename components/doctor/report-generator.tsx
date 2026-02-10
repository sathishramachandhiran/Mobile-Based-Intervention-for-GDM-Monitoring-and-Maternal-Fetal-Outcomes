'use client';

import React from "react"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertCircle, Download, Plus, FileText } from 'lucide-react';

interface Report {
  id: string;
  type: string;
  period: string;
  generatedDate: string;
  status: 'ready' | 'processing';
}

const mockReports: Report[] = [
  {
    id: '1',
    type: 'Weekly Summary',
    period: 'Jan 22-28, 2024',
    generatedDate: '2024-01-28',
    status: 'ready',
  },
  {
    id: '2',
    type: 'Monthly Comprehensive',
    period: 'January 2024',
    generatedDate: '2024-01-31',
    status: 'processing',
  },
  {
    id: '3',
    type: 'Weekly Summary',
    period: 'Jan 15-21, 2024',
    generatedDate: '2024-01-21',
    status: 'ready',
  },
];

interface ReportGeneratorProps {
  selectedPatientId: string | null;
}

export default function ReportGenerator({ selectedPatientId }: ReportGeneratorProps) {
  const [open, setOpen] = useState(false);
  const [reportType, setReportType] = useState('weekly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    try {
      console.log('Generating report:', { type: reportType, startDate, endDate });
      // API call to generate report
      setTimeout(() => {
        setOpen(false);
        setGenerating(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to generate report:', error);
      setGenerating(false);
    }
  };

  const handleDownload = (reportId: string) => {
    console.log('Downloading report:', reportId);
    // Trigger PDF download
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
            Choose a patient from the list to view and generate reports
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Generated Reports</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent className="border-border bg-card">
            <DialogHeader>
              <DialogTitle>Generate Patient Report</DialogTitle>
              <DialogDescription>
                Create a comprehensive report for this patient
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Report Type</Label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="weekly">Weekly Summary</option>
                  <option value="monthly">Monthly Comprehensive</option>
                  <option value="custom">Custom Period</option>
                </select>
              </div>

              {reportType === 'custom' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full" disabled={generating}>
                {generating ? 'Generating...' : 'Generate Report'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {mockReports.length > 0 ? (
          mockReports.map((report) => (
            <Card
              key={report.id}
              className="border-border bg-card hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <FileText className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{report.type}</p>
                      <p className="text-sm text-muted-foreground">{report.period}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Generated: {new Date(report.generatedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === 'ready' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(report.id)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 text-amber-600">
                        <div className="animate-spin">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-sm">Processing...</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-border bg-card">
            <CardContent className="pt-6 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-foreground font-medium mb-1">
                No reports yet
              </p>
              <p className="text-sm text-muted-foreground">
                Generate your first patient report
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Report Details */}
      <Card className="border-border bg-secondary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Report Contents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            • <span className="font-medium">Glucose Analysis:</span> Average readings, trends, and deviations
          </p>
          <p className="text-muted-foreground">
            • <span className="font-medium">Vital Signs:</span> Weight changes and blood pressure trends
          </p>
          <p className="text-muted-foreground">
            • <span className="font-medium">Compliance Metrics:</span> Logging consistency and adherence
          </p>
          <p className="text-muted-foreground">
            • <span className="font-medium">Clinical Summary:</span> Notes and recommendations
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
