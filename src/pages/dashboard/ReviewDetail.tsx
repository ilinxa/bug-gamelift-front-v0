import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Bug, Image, Calendar, Share2, Download, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { getGameBySlug } from '@/data/dummyData';
import jsPDF from 'jspdf';

export default function ReviewDetail() {
  const { slug, reviewId } = useParams<{ slug: string; reviewId: string }>();
  const navigate = useNavigate();

  const game = getGameBySlug(slug || '');
  const review = game?.testResults?.find(r => r.id === reviewId);

  if (!game || !review) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-bold text-foreground">Review Not Found</h1>
        <p className="text-muted-foreground">The review you're looking for doesn't exist.</p>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const initials = review.testerName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const screenshotCount = review.screenshots?.length || 0;

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${review.testerName}'s Review - ${game.title}`,
          text: review.feedback,
          url,
        });
      } catch (err) {
        // User cancelled or error
        await navigator.clipboard.writeText(url);
        toast({ title: 'Link copied to clipboard!' });
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({ title: 'Link copied to clipboard!' });
    }
  };

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let yPos = margin;

    // Header
    pdf.setFillColor(30, 30, 35);
    pdf.rect(0, 0, pageWidth, 50, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(game.title, margin, 25);

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Playtest Review Report', margin, 35);

    yPos = 60;

    // Reviewer Info Section
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(10);
    pdf.text('REVIEWER', margin, yPos);
    yPos += 8;

    pdf.setTextColor(30, 30, 35);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(review.testerName, margin, yPos);
    yPos += 10;

    // Stats Row
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    
    const statsY = yPos;
    pdf.setTextColor(100, 100, 100);
    pdf.text('Rating:', margin, statsY);
    pdf.setTextColor(30, 30, 35);
    pdf.text(`${review.rating}/5`, margin + 15, statsY);

    pdf.setTextColor(100, 100, 100);
    pdf.text('Bugs Found:', margin + 40, statsY);
    pdf.setTextColor(30, 30, 35);
    pdf.text(`${review.bugsFound}`, margin + 65, statsY);

    pdf.setTextColor(100, 100, 100);
    pdf.text('Screenshots:', margin + 85, statsY);
    pdf.setTextColor(30, 30, 35);
    pdf.text(`${screenshotCount}`, margin + 115, statsY);

    pdf.setTextColor(100, 100, 100);
    pdf.text('Date:', margin + 135, statsY);
    pdf.setTextColor(30, 30, 35);
    pdf.text(new Date(review.completedAt).toLocaleDateString(), margin + 148, statsY);

    yPos += 15;

    // Separator
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    // Overall Feedback Section
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(10);
    pdf.text('OVERALL FEEDBACK', margin, yPos);
    yPos += 8;

    pdf.setTextColor(30, 30, 35);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');

    const feedbackLines = pdf.splitTextToSize(review.feedback, contentWidth);
    pdf.text(feedbackLines, margin, yPos);
    yPos += feedbackLines.length * 6 + 10;

    // Screenshots Section
    if (screenshotCount > 0) {
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;

      pdf.setTextColor(100, 100, 100);
      pdf.setFontSize(10);
      pdf.text(`SCREENSHOTS & COMMENTS (${screenshotCount})`, margin, yPos);
      yPos += 10;

      for (const screenshot of review.screenshots || []) {
        // Check if we need a new page
        if (yPos > 250) {
          pdf.addPage();
          yPos = margin;
        }

        // Screenshot placeholder box
        pdf.setFillColor(240, 240, 240);
        pdf.roundedRect(margin, yPos, contentWidth, 40, 3, 3, 'F');
        
        pdf.setTextColor(150, 150, 150);
        pdf.setFontSize(10);
        pdf.text('Screenshot: ' + screenshot.imageUrl.substring(0, 50) + '...', margin + 5, yPos + 20);
        yPos += 45;

        // Comment
        pdf.setTextColor(30, 30, 35);
        pdf.setFontSize(11);
        const commentLines = pdf.splitTextToSize(screenshot.comment, contentWidth - 10);
        pdf.text(commentLines, margin, yPos);
        yPos += commentLines.length * 6;

        // Timestamp
        pdf.setTextColor(100, 100, 100);
        pdf.setFontSize(9);
        pdf.text(new Date(screenshot.timestamp).toLocaleString(), margin, yPos + 5);
        yPos += 15;
      }
    }

    // Footer
    const footerY = pdf.internal.pageSize.getHeight() - 15;
    pdf.setTextColor(150, 150, 150);
    pdf.setFontSize(9);
    pdf.text(`Generated on ${new Date().toLocaleDateString()} • ${game.playtestName} v${game.playtestVersion}`, margin, footerY);

    // Save the PDF
    pdf.save(`${game.slug}-review-${review.id}.pdf`);
    toast({ title: 'PDF downloaded successfully!' });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Back Button & Actions */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Test History
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Game Context */}
        <Card className="bg-muted/30 border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <img 
                src={game.thumbnail} 
                alt={game.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="font-semibold text-foreground">{game.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {game.playtestName} • v{game.playtestVersion}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviewer Header */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={review.testerAvatar} alt={review.testerName} />
                <AvatarFallback className="bg-primary/20 text-primary text-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">{review.testerName}</h1>
                <p className="text-muted-foreground">Playtest Review</p>
                
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-semibold text-primary">{review.rating}</span>
                    <span className="text-primary/70">/5</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Bug className="w-4 h-4" />
                    <span className="font-medium">{review.bugsFound}</span>
                    <span>bugs found</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Image className="w-4 h-4" />
                    <span className="font-medium">{screenshotCount}</span>
                    <span>screenshots</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(review.completedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall Feedback */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Overall Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{review.feedback}</p>
          </CardContent>
        </Card>

        {/* Screenshots Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Screenshots & Comments ({screenshotCount})
          </h2>

          {screenshotCount > 0 ? (
            <div className="space-y-6">
              {review.screenshots?.map((screenshot, index) => (
                <Card key={screenshot.id} className="bg-card border-border overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img 
                      src={screenshot.imageUrl} 
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-foreground mb-3">{screenshot.comment}</p>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(screenshot.timestamp).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <Image className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No screenshots were captured during this test session.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
