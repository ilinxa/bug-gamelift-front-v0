import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Star, 
  Play, 
  Target, 
  CheckCircle2,
  UserPlus,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MediaGallery } from '@/components/MediaGallery';
import { TestResultCard } from '@/components/TestResultCard';
import { getGameBySlug } from '@/data/dummyData';

const statusVariants = {
  testing: 'bg-primary/20 text-primary border-primary/30',
  live: 'bg-green-500/20 text-green-400 border-green-500/30',
  draft: 'bg-muted text-muted-foreground border-muted',
};

export default function GameDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const game = getGameBySlug(slug || '');

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-bold text-foreground">Game Not Found</h1>
        <p className="text-muted-foreground">The game you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const isOwner = game.isOwned;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="text-muted-foreground hover:text-foreground"
        onClick={handleBack}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* Cover Image */}
      <div className="relative h-48 md:h-64 lg:h-80 rounded-xl overflow-hidden">
        <img 
          src={game.coverImage} 
          alt={game.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-3 mb-2">
            <Badge className={`${statusVariants[game.status]} border`}>
              {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
            </Badge>
            <Badge variant="secondary">{game.genre}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{game.title}</h1>
          <p className="text-muted-foreground mt-1">by {game.developer}</p>
        </div>
      </div>

      {/* Main Content */}
      {isOwner ? (
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="details">Game Details</TabsTrigger>
            <TabsTrigger value="test-history">Test History</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <GameDetailsContent game={game} isOwner={isOwner} />
          </TabsContent>

          <TabsContent value="test-history" className="space-y-6">
            <TestHistoryContent game={game} />
          </TabsContent>
        </Tabs>
      ) : (
        <GameDetailsContent game={game} isOwner={isOwner} />
      )}
    </div>
  );
}

function GameDetailsContent({ game, isOwner }: { game: ReturnType<typeof getGameBySlug>; isOwner: boolean }) {
  const navigate = useNavigate();

  if (!game) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Main Info */}
      <div className="lg:col-span-2 space-y-6">
        {/* Description */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">About this Game</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{game.description}</p>
          </CardContent>
        </Card>

        {/* Playtest Goal */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Target className="w-5 h-5 text-primary" />
              Main Goal of Playtest
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{game.playtestGoal}</p>
          </CardContent>
        </Card>

        {/* Test Objectives */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Test Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {game.testObjectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Media Gallery */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Media Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <MediaGallery media={game.mediaGallery} />
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Sidebar */}
      <div className="space-y-6">
        {/* CTA Card */}
        <Card className="bg-card border-border overflow-hidden">
          <div className="bg-primary/10 p-6 text-center">
            {isOwner ? (
              <Button 
                size="lg" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => navigate(`/dashboard/game/${game.slug}/test`)}
              >
                <Play className="w-5 h-5 mr-2" />
                Launch Test Panel
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => navigate(`/dashboard/game/${game.slug}/test`)}
              >
                <Play className="w-5 h-5 mr-2" />
                Test This Game
              </Button>
            )}
            {isOwner && (
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full mt-3 border-primary/30 text-primary hover:bg-primary/10"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Invite Play Testers
              </Button>
            )}
          </div>
        </Card>

        {/* Playtest Info */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-base">Playtest Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Playtest Name</p>
              <p className="text-foreground font-medium">{game.playtestName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Version</p>
              <p className="text-foreground font-medium">{game.playtestVersion}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Start Date</p>
                <p className="text-foreground text-sm flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-primary" />
                  {new Date(game.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">End Date</p>
                <p className="text-foreground text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  {new Date(game.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Published</p>
              <p className="text-foreground text-sm">
                {new Date(game.publishedDate).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  {game.players.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Testers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-foreground">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  {game.rating > 0 ? game.rating : 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platforms */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-base">Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {game.platform.map((p) => (
                <Badge key={p} variant="secondary">{p}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-base">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="border-primary/30 text-primary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TestHistoryContent({ game }: { game: ReturnType<typeof getGameBySlug> }) {
  const navigate = useNavigate();

  if (!game) return null;

  const testResults = game.testResults || [];

  const handleResultClick = (reviewId: string) => {
    navigate(`/dashboard/game/${game.slug}/review/${reviewId}`);
  };

  return (
    <div className="space-y-4">
      {testResults.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Test Results Yet</h3>
            <p className="text-muted-foreground mb-4">
              Invite play testers to get feedback on your game.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Play Testers
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              {testResults.length} Test {testResults.length === 1 ? 'Result' : 'Results'}
            </h2>
          </div>
          <div className="space-y-4">
            {testResults.map((result) => (
              <TestResultCard 
                key={result.id} 
                result={result} 
                onClick={() => handleResultClick(result.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
