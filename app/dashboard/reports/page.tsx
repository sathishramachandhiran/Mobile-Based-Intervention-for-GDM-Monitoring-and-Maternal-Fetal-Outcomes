'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import DashboardHeader from '@/components/dashboard/header';
import { Download, FileText, Plus, Mail, Share2, Printer } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: string;
  period: string;
  generatedDate: string;
  status: 'ready' | 'generating';
  size: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Monthly Health Report - January 2024',
    type: 'Monthly Summary',
    period: 'Jan 1-31, 2024',
    generatedDate: '2024-02-01',
    status: 'ready',
    size: '2.5 MB',
  },
  {
    id: '2',
    title: 'Weekly Progress Report',
    type: 'Weekly Summary',
    period: 'Jan 22-28, 2024',
    generatedDate: '2024-01-29',
    status: 'ready',
    size: '1.2 MB',
  },
  {
    id: '3',
    title: 'Custom Period Report',
    type: 'Custom',
    period: 'Jan 15-25, 2024',
    generatedDate: '2024-01-26',
    status: 'ready',
    size: '1.8 MB',
  },
];

export default function ReportsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [open, setOpen] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportData, setReportData] = useState({
    type: 'monthly',
    startDate: '',
    endDate: '',
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

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratingReport(true);
    try {
      console.log('Generating report:', reportData);
      // Simulate report generation
      setTimeout(() => {
        const newReport: Report = {
          id: String(reports.length + 1),
          title: `${reportData.type === 'monthly' ? 'Monthly' : reportData.type === 'weekly' ? 'Weekly' : 'Custom'} Report - ${new Date().toLocaleDateString()}`,
          type: reportData.type.charAt(0).toUpperCase() + reportData.type.slice(1),
          period: reportData.type === 'custom' ? `${reportData.startDate} to ${reportData.endDate}` : new Date().toLocaleDateString(),
          generatedDate: new Date().toISOString().split('T')[0],
          status: 'ready',
          size: Math.random().toFixed(1) + ' MB',
        };
        setReports([newReport, ...reports]);
        setReportData({
          type: 'monthly',
          startDate: '',
          endDate: '',
        });
        setOpen(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleDownloadReport = (reportId: string) => {
    console.log('Downloading report:', reportId);
    // Trigger PDF download
  };

  const handleEmailReport = (reportId: string) => {
    console.log('Emailing report:', reportId);
  };

  const handleShareReport = (reportId: string) => {
    console.log('Sharing report:', reportId);
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Health Reports
            </h1>
            <p className="text-muted-foreground">
              Generate and download your comprehensive health reports
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </DialogTrigger>
            <DialogContent className="border-border bg-card max-w-md">
              <DialogHeader>
                <DialogTitle>Generate Health Report</DialogTitle>
                <DialogDescription>
                  Create a new comprehensive report of your health data
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleGenerateReport} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Report Type</Label>
                  <select
                    value={reportData.type}
                    onChange={(e) => setReportData({ ...reportData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="monthly">Monthly Report</option>
                    <option value="weekly">Weekly Report</option>
                    <option value="custom">Custom Period</option>
                  </select>
                </div>

                {reportData.type === 'custom' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <input
                        id="startDate"
                        type="date"
                        value={reportData.startDate}
                        onChange={(e) => setReportData({ ...reportData, startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <input
                        id="endDate"
                        type="date"
                        value={reportData.endDate}
                        onChange={(e) => setReportData({ ...reportData, endDate: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      />
                    </div>
                  </>
                )}

                <Button type="submit" className="w-full" disabled={generatingReport}>
                  {generatingReport ? 'Generating...' : 'Generate Report'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Reports List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All ({reports.length})</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {reports.map(report => (
              <Card key={report.id} className="border-border bg-card hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="mt-1">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-lg">
                          {report.title}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{report.period}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                          <span>•</span>
                          <span>Generated {new Date(report.generatedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleDownloadReport(report.id)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEmailReport(report.id)}
                        title="Email report"
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShareReport(report.id)}
                        title="Share report"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        title="Print report"
                      >
                        <Printer className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            {reports.filter(r => r.type === 'Monthly Summary').map(report => (
              <Card key={report.id} className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground">{report.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{report.period}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleDownloadReport(report.id)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            {reports.filter(r => r.type === 'Custom').map(report => (
              <Card key={report.id} className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground">{report.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{report.period}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleDownloadReport(report.id)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Report Contents Info */}
        <Card className="border-border bg-secondary/5 mt-8">
          <CardHeader>
            <CardTitle>What's Included in Your Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-foreground mb-2">Health Metrics</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Glucose readings and trends</li>
                  <li>• Weight and BP monitoring</li>
                  <li>• Vital signs summary</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Insights & Analysis</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Compliance rates</li>
                  <li>• Health patterns</li>
                  <li>• Recommendations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
