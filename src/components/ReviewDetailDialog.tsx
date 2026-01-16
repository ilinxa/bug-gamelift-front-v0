import { X, Star, Bug, Image, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import type { TestResult } from '@/data/dummyData';

interface ReviewDetailDialogProps {
  result: TestResult | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewDetailDialog({ result, open, onOpenChange }: ReviewDetailDialogProps) {
  if (!result) return null;

  const initials = result.testerName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const screenshotCount = result.screenshots?.length || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 gap-0 bg-card border-border">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={result.testerAvatar} alt={result.testerName} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold text-foreground">
                {result.testerName}'s Review
              </DialogTitle>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">{result.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Bug className="w-4 h-4" />
                  <span className="text-sm">{result.bugsFound} bugs</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Image className="w-4 h-4" />
                  <span className="text-sm">{screenshotCount} screenshots</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{new Date(result.completedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="p-6 space-y-6">
            {/* Overall Feedback */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Overall Feedback
              </h3>
              <p className="text-foreground">{result.feedback}</p>
            </div>

            {/* Screenshots */}
            {screenshotCount > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                  Screenshots & Comments ({screenshotCount})
                </h3>
                <div className="space-y-4">
                  {result.screenshots?.map((screenshot) => (
                    <Card key={screenshot.id} className="bg-muted/50 border-border overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={screenshot.imageUrl} 
                          alt="Screenshot"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-foreground text-sm">{screenshot.comment}</p>
                          <Badge variant="outline" className="text-xs whitespace-nowrap">
                            {new Date(screenshot.timestamp).toLocaleTimeString()}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {screenshotCount === 0 && (
              <div className="text-center py-8">
                <Image className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No screenshots were captured during this test session.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
