import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Star } from 'lucide-react';
import type { Game } from '@/data/dummyData';

interface GameCardProps {
  game: Game;
  onClick?: () => void;
}

const statusVariants = {
  testing: 'bg-primary/20 text-primary border-primary/30',
  live: 'bg-green-500/20 text-green-400 border-green-500/30',
  draft: 'bg-muted text-muted-foreground border-muted',
};

export function GameCard({ game, onClick }: GameCardProps) {
  return (
    <Card 
      className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:glow-primary"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge className={`${statusVariants[game.status]} border`}>
            {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            by {game.developer}
          </p>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {game.description}
        </p>
        
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">{game.players.toLocaleString()}</span>
          </div>
          
          {game.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-medium text-foreground">{game.rating}</span>
            </div>
          )}
          
          <Badge variant="secondary" className="text-xs">
            {game.genre}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
