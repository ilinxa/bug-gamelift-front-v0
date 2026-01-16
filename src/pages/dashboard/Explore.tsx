import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/DashboardHeader';
import { SearchFilter } from '@/components/SearchFilter';
import { GameCard } from '@/components/GameCard';
import { dummyGames } from '@/data/dummyData';

export default function Explore() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredGames = useMemo(() => {
    return dummyGames.filter((game) => {
      const matchesSearch = 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGenre = !selectedGenre || selectedGenre === 'all' || game.genre === selectedGenre;
      const matchesPlatform = !selectedPlatform || selectedPlatform === 'all' || game.platform.includes(selectedPlatform);
      const matchesStatus = !selectedStatus || selectedStatus === 'all' || game.status === selectedStatus;
      
      return matchesSearch && matchesGenre && matchesPlatform && matchesStatus;
    });
  }, [searchQuery, selectedGenre, selectedPlatform, selectedStatus]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setSelectedPlatform('');
    setSelectedStatus('');
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <DashboardHeader 
        title="Explore Games" 
        subtitle="Discover and test games published by other developers"
      />
      
      <div className="flex-1 p-6 space-y-6">
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onClearFilters={clearFilters}
        />
        
        {filteredGames.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-muted-foreground text-lg">No games found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={() => navigate(`/dashboard/game/${game.slug}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
