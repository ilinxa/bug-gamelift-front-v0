import { Star, Bug, Image, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TestResult } from '@/data/dummyData';

interface TestResultCardProps {
  result: TestResult;
  onClick?: () => void;
}

export function TestResultCard({ result, onClick }: TestResultCardProps) {
  const initials = result.testerName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const screenshotCount = result.screenshots?.length || 0;

  return (
    <Card 
      className="bg-card border-border cursor-pointer transition-colors hover:bg-muted/50"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={result.testerAvatar} alt={result.testerName} />
            <AvatarFallback className="bg-primary/20 text-primary text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="font-medium text-foreground truncate">
                {result.testerName}
              </h4>
              <div className="flex items-center gap-2">
                {screenshotCount > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Image className="w-3 h-3" />
                    {screenshotCount}
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(result.completedAt).toLocaleDateString()}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{result.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Bug className="w-4 h-4" />
                <span className="text-sm">{result.bugsFound} bugs found</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {result.feedback}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
