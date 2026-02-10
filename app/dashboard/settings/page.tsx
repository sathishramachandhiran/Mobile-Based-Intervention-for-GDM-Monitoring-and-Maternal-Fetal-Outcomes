'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Settings, Bell, Lock, User, AlertCircle, Check } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    institution: 'Central Medical Center',
  });

  const [notifications, setNotifications] = useState({
    glucoseAlerts: true,
    appointmentReminders: true,
    educationUpdates: true,
    weeklyReports: true,
    criticalAlerts: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setSaved(true);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error changing password:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('account')}
            className={`pb-4 px-2 font-medium border-b-2 transition-colors ${
              activeTab === 'account'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Account
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`pb-4 px-2 font-medium border-b-2 transition-colors ${
              activeTab === 'notifications'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Bell className="w-4 h-4 inline mr-2" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-4 px-2 font-medium border-b-2 transition-colors ${
              activeTab === 'security'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Lock className="w-4 h-4 inline mr-2" />
            Security
          </button>
        </div>

        {/* Account Settings Tab */}
        {activeTab === 'account' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {saved && (
                  <Alert className="border-green-200 bg-green-50">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Profile updated successfully
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution/Clinic</Label>
                    <Input
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleFormChange}
                      placeholder="Your institution"
                    />
                  </div>
                </div>

                <Button onClick={handleSaveProfile} disabled={loading} className="w-full md:w-auto">
                  {loading ? 'Saving...' : 'Save Profile'}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Glucose Alerts */}
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Glucose Level Alerts</h4>
                    <p className="text-sm text-muted-foreground">Get notified when glucose levels are outside normal range</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.glucoseAlerts}
                      onChange={() => handleNotificationChange('glucoseAlerts')}
                      className="w-5 h-5 rounded border-border"
                    />
                  </label>
                </div>

                {/* Appointment Reminders */}
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Appointment Reminders</h4>
                    <p className="text-sm text-muted-foreground">Receive reminders for upcoming appointments</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.appointmentReminders}
                      onChange={() => handleNotificationChange('appointmentReminders')}
                      className="w-5 h-5 rounded border-border"
                    />
                  </label>
                </div>

                {/* Education Updates */}
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Education Updates</h4>
                    <p className="text-sm text-muted-foreground">Get notified about new educational content</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.educationUpdates}
                      onChange={() => handleNotificationChange('educationUpdates')}
                      className="w-5 h-5 rounded border-border"
                    />
                  </label>
                </div>

                {/* Weekly Reports */}
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Weekly Reports</h4>
                    <p className="text-sm text-muted-foreground">Receive weekly health summary reports</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.weeklyReports}
                      onChange={() => handleNotificationChange('weeklyReports')}
                      className="w-5 h-5 rounded border-border"
                    />
                  </label>
                </div>

                {/* Critical Alerts */}
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Critical Alerts</h4>
                    <p className="text-sm text-muted-foreground">Always receive critical health alerts (cannot be disabled)</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled={true}
                      className="w-5 h-5 rounded border-border cursor-not-allowed"
                    />
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    Use a strong password with at least 6 characters combining letters, numbers, and symbols
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Enter current password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                  />
                </div>

                <Button onClick={handleChangePassword} disabled={loading} className="w-full md:w-auto">
                  {loading ? 'Updating...' : 'Update Password'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage your active login sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Current Session</h4>
                    <p className="text-sm text-muted-foreground">Browser: Chrome on Windows • Last active: Just now</p>
                  </div>
                  <span className="text-xs font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full">Active</span>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Sign Out from All Other Sessions
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
