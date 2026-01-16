// Centralized dummy data for BugLab GameLift

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string; // For videos
}

export interface TestScreenshot {
  id: string;
  imageUrl: string;
  comment: string;
  timestamp: string;
}

export interface TestResult {
  id: string;
  testerName: string;
  testerAvatar?: string;
  completedAt: string;
  rating: number;
  feedback: string;
  bugsFound: number;
  screenshots?: TestScreenshot[];
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  coverImage: string;
  mediaGallery: MediaItem[];
  developer: string;
  genre: string;
  platform: string[];
  status: 'testing' | 'live' | 'draft';
  players: number;
  rating: number;
  createdAt: string;
  isOwned?: boolean;
  
  // Playtest specific fields
  playtestName: string;
  playtestVersion: string;
  publishedDate: string;
  startDate: string;
  endDate: string;
  playtestGoal: string;
  testObjectives: string[];
  tags: string[];
  
  // Test results (only for owned games)
  testResults?: TestResult[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  gamesPublished: number;
  gamesPlayed: number;
}

export const genres = [
  'Action',
  'Adventure', 
  'RPG',
  'Strategy',
  'Puzzle',
  'Racing',
  'Sports',
  'Simulation',
  'Shooter',
  'Platformer',
] as const;

export const platforms = [
  'Windows',
  'macOS',
  'Linux',
  'Web',
  'Mobile',
] as const;

export const statuses = [
  { value: 'testing', label: 'Testing' },
  { value: 'live', label: 'Live' },
  { value: 'draft', label: 'Draft' },
] as const;

export const dummyGames: Game[] = [
  {
    id: '1',
    slug: 'neon-runners',
    title: 'Neon Runners',
    description: 'A fast-paced cyberpunk racing game with stunning visuals and intense multiplayer action. Race through neon-lit cityscapes, customize your vehicle, and compete against players worldwide in this adrenaline-pumping experience.',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=600&fit=crop',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop' },
      { type: 'video', url: 'https://www.youtube.com/embed/LH9osuLmqLc', thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=225&fit=crop' },
    ],
    developer: 'CyberStudio',
    genre: 'Racing',
    platform: ['Windows', 'macOS'],
    status: 'testing',
    players: 1250,
    rating: 4.5,
    createdAt: '2026-01-02',
    playtestName: 'Neon Runners Alpha Test',
    playtestVersion: '0.8.2',
    publishedDate: '2026-01-02',
    startDate: '2026-01-02',
    endDate: '2026-02-15',
    playtestGoal: 'Validate core racing mechanics and multiplayer stability under load. Gather feedback on track design and vehicle handling.',
    testObjectives: [
      'Complete 5 races in single-player mode',
      'Participate in at least 3 multiplayer matches',
      'Test vehicle customization system',
      'Report any visual glitches or performance issues',
      'Provide feedback on track difficulty balance',
    ],
    tags: ['Racing', 'Cyberpunk', 'Multiplayer', 'Action', 'Vehicles'],
  },
  {
    id: '2',
    slug: 'galaxy-conquest',
    title: 'Galaxy Conquest',
    description: 'Build your empire across the stars in this epic 4X strategy experience. Explore uncharted galaxies, establish colonies, research advanced technologies, and engage in diplomatic or military conquests.',
    thumbnail: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=300&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=1920&h=600&fit=crop',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=450&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=450&fit=crop' },
      { type: 'video', url: 'https://www.youtube.com/embed/LH9osuLmqLc', thumbnail: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=225&fit=crop' },
    ],
    developer: 'StarForge Games',
    genre: 'Strategy',
    platform: ['Windows', 'Linux'],
    status: 'live',
    players: 3420,
    rating: 4.8,
    createdAt: '2025-12-15',
    playtestName: 'Galaxy Conquest Public Beta',
    playtestVersion: '1.2.0',
    publishedDate: '2025-12-15',
    startDate: '2025-12-15',
    endDate: '2026-03-01',
    playtestGoal: 'Balance faction abilities and economic systems. Test late-game performance with large empires.',
    testObjectives: [
      'Play through one complete campaign',
      'Test all 6 faction abilities',
      'Engage in diplomatic negotiations',
      'Build and manage a fleet of 100+ ships',
      'Report AI behavior issues',
    ],
    tags: ['Strategy', '4X', 'Space', 'Sci-Fi', 'Empire Building'],
  },
  {
    id: '3',
    slug: 'shadow-legends',
    title: 'Shadow Legends',
    description: 'An action RPG with deep lore and challenging combat mechanics. Venture through dark dungeons, uncover ancient secrets, and master powerful abilities.',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=600&fit=crop',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop' },
    ],
    developer: 'DarkPixel',
    genre: 'RPG',
    platform: ['Windows', 'macOS', 'Linux'],
    status: 'testing',
    players: 890,
    rating: 4.2,
    createdAt: '2026-01-04',
    playtestName: 'Shadow Legends Closed Alpha',
    playtestVersion: '0.5.1',
    publishedDate: '2026-01-04',
    startDate: '2026-01-04',
    endDate: '2026-01-31',
    playtestGoal: 'Test combat system responsiveness and boss encounter difficulty.',
    testObjectives: [
      'Complete the tutorial dungeon',
      'Defeat the first 3 bosses',
      'Test all weapon types',
      'Report hitbox and collision issues',
    ],
    tags: ['RPG', 'Action', 'Dark Fantasy', 'Souls-like', 'Adventure'],
  },
  {
    id: '4',
    slug: 'puzzle-dimensions',
    title: 'Puzzle Dimensions',
    description: 'Mind-bending puzzles across multiple dimensions. Think outside the box and manipulate reality to solve increasingly complex challenges.',
    thumbnail: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=400&h=300&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=1920&h=600&fit=crop',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=800&h=450&fit=crop' },
      { type: 'video', url: 'https://www.youtube.com/embed/LH9osuLmqLc', thumbnail: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=400&h=225&fit=crop' },
    ],
    developer: 'BrainWave Studios',
    genre: 'Puzzle',
    platform: ['Web', 'Mobile'],
    status: 'live',
    players: 5670,
    rating: 4.6,
    createdAt: '2025-11-20',
    playtestName: 'Puzzle Dimensions Level Pack Test',
    playtestVersion: '2.1.0',
    publishedDate: '2025-11-20',
    startDate: '2025-11-20',
    endDate: '2026-02-28',
    playtestGoal: 'Evaluate new puzzle mechanics and level difficulty curve.',
    testObjectives: [
      'Complete all 20 new levels',
      'Rate difficulty of each level',
      'Identify any unsolvable puzzles',
      'Test hint system effectiveness',
    ],
    tags: ['Puzzle', 'Brain Teaser', 'Casual', 'Mind-bending'],
  },
  {
    id: '5',
    slug: 'mech-warriors-online',
    title: 'Mech Warriors Online',
    description: 'Pilot massive mechs in team-based multiplayer battles. Customize your war machine and dominate the battlefield.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=600&fit=crop',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop' },
    ],
    developer: 'IronForge Dev',
    genre: 'Shooter',
    platform: ['Windows'],
    status: 'testing',
    players: 2100,
    rating: 4.4,
    createdAt: '2026-01-01',
    playtestName: 'Mech Warriors Beta Season 1',
    playtestVersion: '0.9.0',
    publishedDate: '2026-01-01',
    startDate: '2026-01-01',
    endDate: '2026-02-01',
    playtestGoal: 'Test matchmaking system and mech balance across weight classes.',
    testObjectives: [
      'Complete placement matches',
      'Test all mech weight classes',
      'Report weapon balance issues',
      'Evaluate map design and flow',
    ],
    tags: ['Shooter', 'Mech', 'Multiplayer', 'PvP', 'Sci-Fi'],
  },
  {
    id: '6',
    slug: 'farm-life-simulator',
    title: 'Farm Life Simulator',
    description: 'Relax and build your dream farm with friends. Grow crops, raise animals, and create a thriving agricultural paradise.',
    thumbnail: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&h=600&fit=crop',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=450&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=450&fit=crop' },
    ],
    developer: 'Cozy Games Co',
    genre: 'Simulation',
    platform: ['Windows', 'macOS', 'Mobile'],
    status: 'live',
    players: 8900,
    rating: 4.7,
    createdAt: '2025-10-10',
    playtestName: 'Farm Life Seasons Update',
    playtestVersion: '3.0.0',
    publishedDate: '2025-10-10',
    startDate: '2025-10-10',
    endDate: '2026-04-01',
    playtestGoal: 'Test new seasonal content and cooperative farming features.',
    testObjectives: [
      'Experience all four seasons',
      'Test crop growth cycles',
      'Play cooperative mode with friends',
      'Report any save game issues',
    ],
    tags: ['Simulation', 'Farming', 'Cozy', 'Relaxing', 'Co-op'],
  },
];

export const myGames: Game[] = [
  {
    id: '7',
    slug: 'cyber-strike',
    title: 'Cyber Strike',
    description: 'Your tactical shooter with unique hacking mechanics. Infiltrate corporate networks, outmaneuver security systems, and complete high-stakes missions in a dystopian future.',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&h=600&fit=crop',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop' },
      { type: 'video', url: 'https://www.youtube.com/embed/5rzWHAv7Cu4', thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=225&fit=crop' },
    ],
    developer: 'You',
    genre: 'Shooter',
    platform: ['Windows', 'Linux'],
    status: 'testing',
    players: 340,
    rating: 4.1,
    createdAt: '2026-01-05',
    isOwned: true,
    playtestName: 'Cyber Strike Alpha Playtest',
    playtestVersion: '0.3.5',
    publishedDate: '2026-01-05',
    startDate: '2026-01-05',
    endDate: '2026-02-28',
    playtestGoal: 'Validate hacking mechanic usability and mission pacing. Collect feedback on tutorial effectiveness.',
    testObjectives: [
      'Complete the tutorial mission',
      'Test all hacking tools',
      'Complete at least 3 main missions',
      'Report stealth AI detection issues',
      'Evaluate difficulty progression',
    ],
    tags: ['Shooter', 'Tactical', 'Hacking', 'Cyberpunk', 'Stealth'],
    testResults: [
      {
        id: 'tr-1',
        testerName: 'Alex Chen',
        testerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        completedAt: '2026-01-05',
        rating: 4.2,
        feedback: 'Great hacking mechanics! The stealth system needs some polish but overall very promising.',
        bugsFound: 3,
        screenshots: [
          {
            id: 'ss-1',
            imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop',
            comment: 'Enemy AI clips through this wall when chasing player',
            timestamp: '2026-01-05T14:23:00Z',
          },
          {
            id: 'ss-2',
            imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
            comment: 'Hacking minigame UI overlaps with objective marker',
            timestamp: '2026-01-05T15:45:00Z',
          },
          {
            id: 'ss-3',
            imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop',
            comment: 'Great atmosphere in this section!',
            timestamp: '2026-01-05T16:12:00Z',
          },
        ],
      },
      {
        id: 'tr-2',
        testerName: 'Sarah Johnson',
        testerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        completedAt: '2026-01-05',
        rating: 4.0,
        feedback: 'Love the atmosphere! Found some collision issues in mission 2.',
        bugsFound: 5,
        screenshots: [
          {
            id: 'ss-4',
            imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop',
            comment: 'Collision issue - player got stuck between these objects',
            timestamp: '2026-01-05T11:30:00Z',
          },
          {
            id: 'ss-5',
            imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop',
            comment: 'Lighting glitch appears when switching weapons',
            timestamp: '2026-01-05T12:15:00Z',
          },
        ],
      },
      {
        id: 'tr-3',
        testerName: 'Marcus Lee',
        completedAt: '2026-01-06',
        rating: 4.5,
        feedback: 'Best tactical shooter I\'ve tested in a while. Hacking feels unique and rewarding.',
        bugsFound: 1,
      },
    ],
  },
  {
    id: '8',
    slug: 'pixel-quest',
    title: 'Pixel Quest',
    description: 'A retro-style adventure game with modern mechanics. Explore vibrant pixel-art worlds, solve puzzles, and uncover the mystery of the ancient artifacts.',
    thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541f7f7f7a?w=400&h=300&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1493711662062-fa541f7f7f7a?w=1920&h=600&fit=crop',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1493711662062-fa541f7f7f7a?w=800&h=450&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=800&h=450&fit=crop' },
    ],
    developer: 'You',
    genre: 'Adventure',
    platform: ['Web', 'Mobile'],
    status: 'draft',
    players: 0,
    rating: 0,
    createdAt: '2026-01-06',
    isOwned: true,
    playtestName: 'Pixel Quest Internal Test',
    playtestVersion: '0.1.0',
    publishedDate: '2026-01-06',
    startDate: '2026-01-06',
    endDate: '2026-03-15',
    playtestGoal: 'Internal testing of core adventure mechanics and puzzle designs.',
    testObjectives: [
      'Test movement and controls',
      'Validate puzzle solutions',
      'Check pixel art rendering across devices',
    ],
    tags: ['Adventure', 'Pixel Art', 'Retro', 'Puzzle', 'Indie'],
    testResults: [],
  },
];

// Helper function to get all games
export const getAllGames = (): Game[] => [...dummyGames, ...myGames];

// Helper function to find game by slug
export const getGameBySlug = (slug: string): Game | undefined => {
  return getAllGames().find(game => game.slug === slug);
};

export const currentUser: User = {
  id: 'user-1',
  name: 'Game Developer',
  email: 'dev@buglab.ist',
  gamesPublished: 2,
  gamesPlayed: 15,
};

// Sample users for invite functionality
export const sampleUsers: { id: string; name: string; username: string; avatar?: string }[] = [
  { id: 'user-2', name: 'Alex Johnson', username: 'alexj', avatar: 'https://i.pravatar.cc/150?u=alexj' },
  { id: 'user-3', name: 'Sarah Williams', username: 'sarahw', avatar: 'https://i.pravatar.cc/150?u=sarahw' },
  { id: 'user-4', name: 'Michael Chen', username: 'mchen', avatar: 'https://i.pravatar.cc/150?u=mchen' },
  { id: 'user-5', name: 'Emily Brown', username: 'ebrown', avatar: 'https://i.pravatar.cc/150?u=ebrown' },
  { id: 'user-6', name: 'David Kim', username: 'dkim', avatar: 'https://i.pravatar.cc/150?u=dkim' },
  { id: 'user-7', name: 'Jessica Lee', username: 'jlee', avatar: 'https://i.pravatar.cc/150?u=jlee' },
  { id: 'user-8', name: 'Ryan Martinez', username: 'rmart', avatar: 'https://i.pravatar.cc/150?u=rmart' },
  { id: 'user-9', name: 'Amanda Taylor', username: 'ataylor', avatar: 'https://i.pravatar.cc/150?u=ataylor' },
  { id: 'user-10', name: 'Chris Wilson', username: 'cwilson', avatar: 'https://i.pravatar.cc/150?u=cwilson' },
  { id: 'user-11', name: 'Nicole Anderson', username: 'nanders', avatar: 'https://i.pravatar.cc/150?u=nanders' },
];
