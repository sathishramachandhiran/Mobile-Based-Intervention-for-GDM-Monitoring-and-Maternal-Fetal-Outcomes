'use client';

import React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, BookOpen, Apple, Dumbbell, AlertTriangle, Baby } from 'lucide-react';
import { useState } from 'react';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  duration: string;
  lessons: number;
  color: string;
}

const educationModules: Module[] = [
  {
    id: '1',
    title: 'Understanding GDM',
    description: 'Learn about gestational diabetes, how it develops, and why monitoring is important.',
    icon: <BookOpen className="w-6 h-6" />,
    category: 'Basics',
    duration: '15 min',
    lessons: 4,
    color: 'from-blue-50 to-blue-100',
  },
  {
    id: '2',
    title: 'Nutrition & Diet',
    description: 'Discover the best foods for blood sugar control and meal planning strategies.',
    icon: <Apple className="w-6 h-6" />,
    category: 'Diet',
    duration: '20 min',
    lessons: 6,
    color: 'from-green-50 to-green-100',
  },
  {
    id: '3',
    title: 'Safe Exercise During Pregnancy',
    description: 'Safe and effective exercises that help manage blood sugar levels.',
    icon: <Dumbbell className="w-6 h-6" />,
    category: 'Exercise',
    duration: '18 min',
    lessons: 5,
    color: 'from-purple-50 to-purple-100',
  },
  {
    id: '4',
    title: 'Monitoring Your Health',
    description: 'How to use this app and track your glucose, weight, and other vital signs.',
    icon: <Heart className="w-6 h-6" />,
    category: 'Monitoring',
    duration: '12 min',
    lessons: 3,
    color: 'from-pink-50 to-pink-100',
  },
  {
    id: '5',
    title: 'Complications & When to Seek Help',
    description: 'Understanding warning signs and when to contact your healthcare provider.',
    icon: <AlertTriangle className="w-6 h-6" />,
    category: 'Safety',
    duration: '10 min',
    lessons: 3,
    color: 'from-orange-50 to-orange-100',
  },
  {
    id: '6',
    title: 'Postpartum Care',
    description: 'What to expect after delivery and long-term health management.',
    icon: <Baby className="w-6 h-6" />,
    category: 'Postpartum',
    duration: '14 min',
    lessons: 4,
    color: 'from-indigo-50 to-indigo-100',
  },
];

export default function Education() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['All', ...new Set(educationModules.map(m => m.category))];
  const filteredModules = selectedCategory && selectedCategory !== 'All'
    ? educationModules.filter(m => m.category === selectedCategory)
    : educationModules;

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold text-foreground">GDM Care</span>
          </div>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href="/auth/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Education & Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Comprehensive learning modules to help you understand and manage gestational diabetes
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === (category === 'All' ? null : category) ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category === 'All' ? null : category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map(module => (
            <Card
              key={module.id}
              className="border-border bg-card hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${module.color} h-32 flex items-center justify-center`}>
                <div className="text-primary opacity-20">
                  {module.icon}
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <span className="text-xs font-medium text-muted-foreground bg-secondary/20 px-2 py-1 rounded-full inline-block mt-2">
                      {module.category}
                    </span>
                  </div>
                  {module.icon}
                </div>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                  <span>📚 {module.lessons} lessons</span>
                  <span>⏱️ {module.duration}</span>
                </div>
                <Button className="w-full">Start Learning</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center text-balance">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Is GDM permanent?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No, gestational diabetes typically goes away after pregnancy. However, it increases the risk of developing type 2 diabetes later. Regular screening and lifestyle changes can help prevent this.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Can I exercise with GDM?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! In fact, regular physical activity is recommended. Exercise helps control blood sugar levels. Always consult with your doctor before starting any exercise program during pregnancy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">What should I eat?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Focus on complex carbohydrates, fiber-rich foods, lean proteins, and healthy fats. Avoid sugary drinks and refined foods. Work with a dietitian for a personalized meal plan.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">How often should I check blood sugar?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your doctor will recommend how often to test based on your individual needs. Most pregnant women with GDM test 4 times daily: fasting and 2 hours after each meal.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-12 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2024 GDM Care. All rights reserved.</p>
          <p className="text-sm mt-4">
            This educational content is for informational purposes only and should not replace professional medical advice.
          </p>
        </div>
      </footer>
    </main>
  );
}
