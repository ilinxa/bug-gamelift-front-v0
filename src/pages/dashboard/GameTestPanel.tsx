import { useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight,
  Camera,
  Maximize,
  Minimize,
  Play,
  X,
  Pencil,
  Target,
  ListChecks,
  Keyboard,
  MessageSquare,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getGameBySlug } from '@/data/dummyData';
import { cn } from '@/lib/utils';
import { ScreenshotDialog } from '@/components/screenshot';

interface TestComment {
  id: string;
  screenshot: string;
  comment: string;
  timestamp: string;
}

// Dummy comments for demonstration
const dummyComments: TestComment[] = [
  {
    id: '1',
    screenshot: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=120&fit=crop',
    comment: 'Found a visual glitch in this area when moving fast.',
    timestamp: '2 min ago',
  },
  {
    id: '2',
    screenshot: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=120&fit=crop',
    comment: 'The collision detection seems off here.',
    timestamp: '5 min ago',
  },
  {
    id: '3',
    screenshot: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&h=120&fit=crop',
    comment: 'Great lighting effect! But performance drops slightly.',
    timestamp: '8 min ago',
  },
];

const shortcuts = [
  { key: 'F12', action: 'Screenshot', icon: Camera },
  { key: 'F11', action: 'Full Window', icon: Maximize },
  { key: 'Esc', action: 'Minimize', icon: Minimize },
  { key: 'Enter', action: 'Start', icon: Play },
  { key: 'Ctrl+Q', action: 'Close', icon: X },
  { key: 'Ctrl+D', action: 'Draw Tools', icon: Pencil },
];

export default function GameTestPanel() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const gameWindowRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [isGameFocused, setIsGameFocused] = useState(false);
  const [comments, setComments] = useState<TestComment[]>(dummyComments);
  const [screenshotDialogOpen, setScreenshotDialogOpen] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState<string>('');
  
  const game = getGameBySlug(slug || '');

  // Capture screenshot from video
  const captureScreenshot = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    
    setCurrentScreenshot(dataUrl);
    setScreenshotDialogOpen(true);
  }, []);

  // Handle game window keyboard events - prevent browser shortcuts when focused
  const handleGameKeyDown = (e: React.KeyboardEvent) => {
    // Prevent all default browser shortcuts when game is focused
    const preventedKeys = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Escape'];
    if (preventedKeys.includes(e.key) || e.ctrlKey || e.altKey || e.metaKey) {
      e.preventDefault();
      e.stopPropagation();
      
      // Handle our custom shortcuts
      if (e.key === 'F12') captureScreenshot();
      if (e.key === 'F11') console.log('Toggle fullscreen');
      if (e.key === 'Escape') setIsGameFocused(false);
      if (e.key === 'Enter') console.log('Start game');
      if (e.ctrlKey && e.key === 'q') console.log('Close game');
      if (e.ctrlKey && e.key === 'd') console.log('Open draw tools');
    }
  };

  const handleDeleteComment = (id: string) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  const handleSaveScreenshot = (imageData: string, comment: string) => {
    const newComment: TestComment = {
      id: Date.now().toString(),
      screenshot: imageData,
      comment: comment || 'No comment provided',
      timestamp: 'Just now',
    };
    setComments(prev => [newComment, ...prev]);
  };

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-background">
        <h1 className="text-2xl font-bold text-foreground">Game Not Found</h1>
        <p className="text-muted-foreground">The game you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="h-14 border-b border-border bg-card flex items-center px-4 gap-4 shrink-0">
        <Button 
          variant="ghost" 
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => navigate(`/dashboard/game/${game.slug}`)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Game
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{game.title}</span>
          <Badge variant="secondary" className="text-xs">v{game.playtestVersion}</Badge>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div 
          className={cn(
            "bg-card border-r border-border flex flex-col transition-all duration-300 shrink-0",
            leftSidebarOpen ? "w-80" : "w-0"
          )}
        >
          {leftSidebarOpen && (
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-6">
                {/* Playtest Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                      Playtest Name
                    </h3>
                    <p className="text-sm font-medium text-foreground">{game.playtestName}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                      Version
                    </h3>
                    <p className="text-sm font-medium text-foreground">{game.playtestVersion}</p>
                  </div>
                </div>

                <Separator />

                {/* Main Goal */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-primary" />
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Main Goal
                    </h3>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{game.playtestGoal}</p>
                </div>

                <Separator />

                {/* Test Objectives */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ListChecks className="w-4 h-4 text-primary" />
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Test Objectives
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {game.testObjectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Keyboard Shortcuts */}
                <Card className="bg-muted/50 border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Keyboard className="w-4 h-4 text-primary" />
                      <CardTitle className="text-xs font-medium uppercase tracking-wider">
                        Shortcuts
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {shortcuts.map((shortcut) => (
                        <div key={shortcut.key} className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <shortcut.icon className="w-3.5 h-3.5" />
                            <span>{shortcut.action}</span>
                          </div>
                          <kbd className="px-2 py-0.5 text-xs font-mono bg-background rounded border border-border">
                            {shortcut.key}
                          </kbd>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Left Sidebar Toggle */}
        <button
          onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
          className="w-6 bg-card hover:bg-muted border-r border-border flex items-center justify-center shrink-0 transition-colors"
        >
          {leftSidebarOpen ? (
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {/* Game Window Area */}
        <div className="flex-1 flex items-center justify-center p-6 bg-muted/30">
          <div
            ref={gameWindowRef}
            tabIndex={0}
            onClick={() => setIsGameFocused(true)}
            onBlur={() => setIsGameFocused(false)}
            onKeyDown={handleGameKeyDown}
            className={cn(
              "w-full  Xmax-w-7xl max-h-[800px] bg-black rounded-lg overflow-hidden shadow-2xl transition-all duration-200 relative",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
              isGameFocused && "ring-2 ring-primary ring-offset-2 ring-offset-background"
            )}
          >
            {/* Video as game placeholder */}
            <video
              ref={videoRef}
              className="w-full  object-fit"
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
            />
            
            {/* Screenshot button - always visible */}
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-3 left-3 gap-1.5 bg-black/70 hover:bg-black/90 text-white border-0"
              onClick={(e) => {
                e.stopPropagation();
                captureScreenshot();
              }}
            >
              <Camera className="w-4 h-4" />
              <span className="text-xs">F12</span>
            </Button>
            
            {/* Focus overlay */}
            {!isGameFocused && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-8 cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Play className="w-10 h-10 text-primary" />
                </div>
                <p className="text-white font-medium mb-1">Click to Focus</p>
                <p className="text-gray-400 text-sm">Keyboard shortcuts will be active when focused</p>
              </div>
            )}
            
            {/* Focused indicator */}
            {isGameFocused && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-primary text-primary-foreground text-xs">
                  Focused - Press Esc to exit
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar Toggle */}
        <button
          onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          className="w-6 bg-card hover:bg-muted border-l border-border flex items-center justify-center shrink-0 transition-colors"
        >
          {rightSidebarOpen ? (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {/* Right Sidebar - Comments */}
        <div 
          className={cn(
            "bg-card border-l border-border flex flex-col transition-all duration-300 shrink-0",
            rightSidebarOpen ? "w-80" : "w-0"
          )}
        >
          {rightSidebarOpen && (
            <>
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Comments</h3>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {comments.length}
                  </Badge>
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                  {comments.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No comments yet</p>
                      <p className="text-xs">Take screenshots and add notes</p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <Card key={comment.id} className="bg-muted/50 border-border overflow-hidden group">
                        <div className="relative">
                          <img 
                            src={comment.screenshot} 
                            alt="Screenshot" 
                            className="w-full h-28 object-cover"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                        <CardContent className="p-3">
                          <p className="text-sm text-foreground mb-2">{comment.comment}</p>
                          <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </>
          )}
        </div>
      </div>

      {/* Screenshot Dialog */}
      <ScreenshotDialog
        open={screenshotDialogOpen}
        onOpenChange={setScreenshotDialogOpen}
        screenshotUrl={currentScreenshot}
        onSave={handleSaveScreenshot}
      />
    </div>
  );
}
