'use client';

import React from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { useEffect, useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [userRole, setUserRole] = useState('patient');

  useEffect(() => {
    // Get user role from cookie or localStorage
    const role = document.cookie
      .split('; ')
      .find(row => row.startsWith('user_role='))
      ?.split('=')[1] || 'patient';
    setUserRole(decodeURIComponent(role));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userRole={userRole} />
      {children}
    </div>
  );
}
