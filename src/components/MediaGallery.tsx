import { useState } from 'react';
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { MediaItem } from '@/data/dummyData';

interface MediaGalleryProps {
  media: MediaItem[];
}

export function MediaGallery({ media }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openMedia = (index: number) => setSelectedIndex(index);
  const closeMedia = () => setSelectedIndex(null);

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? media.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === media.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  const currentMedia = selectedIndex !== null ? media[selectedIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {media.map((item, index) => (
          <button
            key={index}
            onClick={() => openMedia(index)}
            className="group relative aspect-video rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all"
          >
            <img
              src={item.type === 'video' ? item.thumbnail : item.url}
              alt={`Media ${index + 1}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Play className="w-5 h-5 text-primary-foreground ml-1" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={() => closeMedia()}>
        <DialogContent className="max-w-4xl p-0 bg-background border-border overflow-hidden">
          <div className="relative">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 z-10 bg-background/80 hover:bg-background"
              onClick={closeMedia}
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Navigation */}
            {media.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                  onClick={goToNext}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </>
            )}

            {/* Media content */}
            <div className="aspect-video">
              {currentMedia?.type === 'video' ? (
                <iframe
                  src={currentMedia.url}
                  title="Video player"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={currentMedia?.url}
                  alt="Gallery image"
                  className="w-full h-full object-contain bg-black"
                />
              )}
            </div>

            {/* Counter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-sm">
              {(selectedIndex ?? 0) + 1} / {media.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
