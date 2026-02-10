'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Heart, LogOut, User, Settings, BookOpen } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export interface DashboardHeaderProps {
  userRole: string;
}

function HeaderContent({ userRole }: DashboardHeaderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary" />
          <span className="text-lg font-semibold text-foreground">GDM Care</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground px-3 py-1 bg-secondary/20 rounded-full">
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
          </span>

          <Link href="/education">
            <Button variant="ghost" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              Learn
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} disabled={loading}>
                <LogOut className="w-4 h-4 mr-2" />
                {loading ? 'Logging out...' : 'Logout'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export function DashboardHeader({ userRole }: DashboardHeaderProps) {
  return <HeaderContent userRole={userRole} />;
}

export default function DashboardHeaderDefault({ userRole }: DashboardHeaderProps) {
  return <HeaderContent userRole={userRole} />;
}
