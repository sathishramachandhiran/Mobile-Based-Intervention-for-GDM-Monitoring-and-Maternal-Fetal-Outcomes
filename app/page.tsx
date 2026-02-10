'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Heart, Users, TrendingUp, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold text-foreground">GDM Care</span>
          </div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
          Comprehensive Care for Gestational Diabetes
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
          GDM Care provides integrated monitoring, personalized guidance, and seamless communication between patients and healthcare professionals for safe, healthy pregnancies.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/auth/signup">
            <Button size="lg" className="px-8">
              Start Your Journey
            </Button>
          </Link>
          <Link href="/education">
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center text-balance">
          Why Choose GDM Care?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Real-Time Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track glucose levels, weight, and biophysical metrics in real-time with instant alerts.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Expert Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Direct communication with doctors and nurses for personalized care and guidance.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Educational Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access comprehensive education modules on diet, exercise, and pregnancy health.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <Heart className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Compassionate Care</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Maternal-friendly interface designed with empathy and ease of use in mind.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-balance">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of mothers who are managing their GDM with confidence and support.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="px-8">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-12 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2024 GDM Care. All rights reserved.</p>
          <p className="text-sm mt-4">
            Designed with compassion for expectant mothers managing gestational diabetes.
          </p>
        </div>
      </footer>
    </main>
  );
}
