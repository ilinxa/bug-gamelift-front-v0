import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { genres, platforms, statuses } from '@/data/dummyData';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedGenre: string;
  onGenreChange: (value: string) => void;
  selectedPlatform: string;
  onPlatformChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  onClearFilters: () => void;
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  selectedPlatform,
  onPlatformChange,
  selectedStatus,
  onStatusChange,
  onClearFilters,
}: SearchFilterProps) {
  const hasFilters = searchQuery || selectedGenre || selectedPlatform || selectedStatus;

  return (
    <div className="flex flex-col sm:flex-row gap-3 p-4 bg-card rounded-lg border border-border">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background border-border focus:border-primary"
        />
      </div>
      
      <Select value={selectedGenre} onValueChange={onGenreChange}>
        <SelectTrigger className="w-full sm:w-[140px] bg-background border-border">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genres</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre} value={genre}>{genre}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={selectedPlatform} onValueChange={onPlatformChange}>
        <SelectTrigger className="w-full sm:w-[140px] bg-background border-border">
          <SelectValue placeholder="Platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Platforms</SelectItem>
          {platforms.map((platform) => (
            <SelectItem key={platform} value={platform}>{platform}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-[130px] bg-background border-border">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {hasFilters && (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
