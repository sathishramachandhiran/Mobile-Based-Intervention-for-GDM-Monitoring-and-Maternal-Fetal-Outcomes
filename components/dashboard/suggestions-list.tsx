'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, CheckCircle2 } from 'lucide-react';

interface Suggestion {
  id: string;
  type: 'clinical' | 'diet' | 'exercise' | 'general';
  message: string;
  source: string;
  acknowledged: boolean;
  timestamp: string;
}

const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    type: 'diet',
    message: 'Include more fiber-rich foods in your meals to help regulate blood sugar levels.',
    source: 'Dr. Sarah Johnson',
    acknowledged: false,
    timestamp: 'Today at 10:00',
  },
  {
    id: '2',
    type: 'exercise',
    message: 'Try a gentle 20-minute walk after meals to help lower blood glucose spikes.',
    source: 'Nurse Lisa',
    acknowledged: false,
    timestamp: 'Yesterday at 14:30',
  },
  {
    id: '3',
    type: 'clinical',
    message: 'Schedule your next blood work appointment for next week. Contact reception.',
    source: 'Dr. Sarah Johnson',
    acknowledged: true,
    timestamp: '3 days ago',
  },
];

const typeColors = {
  clinical: 'bg-purple-50 border-purple-200',
  diet: 'bg-green-50 border-green-200',
  exercise: 'bg-blue-50 border-blue-200',
  general: 'bg-gray-50 border-gray-200',
};

const typeLabels = {
  clinical: 'Clinical',
  diet: 'Nutrition',
  exercise: 'Exercise',
  general: 'General',
};

export default function SuggestionsList() {
  const handleAcknowledge = async (suggestionId: string) => {
    try {
      console.log('Suggestion acknowledged:', suggestionId);
      // API call to acknowledge suggestion
    } catch (error) {
      console.error('Failed to acknowledge suggestion:', error);
    }
  };

  const unacknowledgedSuggestions = mockSuggestions.filter(s => !s.acknowledged);

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          <div>
            <CardTitle>Personalized Suggestions</CardTitle>
            <CardDescription>
              Recommendations from your healthcare team
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {unacknowledgedSuggestions.length > 0 ? (
          <div className="space-y-3">
            {unacknowledgedSuggestions.map(suggestion => (
              <div
                key={suggestion.id}
                className={`p-4 rounded-lg border ${typeColors[suggestion.type]}`}
              >
                <div className="flex justify-between items-start gap-3 mb-2">
                  <div className="flex-1">
                    <span className={`text-xs font-semibold px-2 py-1 rounded
                      ${suggestion.type === 'clinical' ? 'bg-purple-200 text-purple-900' : ''}
                      ${suggestion.type === 'diet' ? 'bg-green-200 text-green-900' : ''}
                      ${suggestion.type === 'exercise' ? 'bg-blue-200 text-blue-900' : ''}
                      ${suggestion.type === 'general' ? 'bg-gray-200 text-gray-900' : ''}
                    `}>
                      {typeLabels[suggestion.type]}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{suggestion.timestamp}</span>
                </div>
                <p className="text-foreground mb-2">{suggestion.message}</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    From: {suggestion.source}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAcknowledge(suggestion.id)}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Acknowledge
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-foreground font-medium mb-1">
              No pending suggestions
            </p>
            <p className="text-sm text-muted-foreground">
              You're all set! Check back soon for new recommendations.
            </p>
          </div>
        )}

        {/* Previous Suggestions */}
        {mockSuggestions.some(s => s.acknowledged) && (
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm font-medium text-muted-foreground mb-3">
              Acknowledged
            </p>
            <div className="space-y-2">
              {mockSuggestions
                .filter(s => s.acknowledged)
                .map(suggestion => (
                  <div key={suggestion.id} className="text-sm p-2 rounded opacity-60">
                    <p className="font-medium text-foreground">{suggestion.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {suggestion.source} • {suggestion.timestamp}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
