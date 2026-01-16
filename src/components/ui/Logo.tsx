import logo from '@/assets/logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-12',
};

export function Logo({ className = '', size = 'md' }: LogoProps) {
  return (
    <img 
      src={logo} 
      alt="BugLab GameLift" 
      className={`${sizeClasses[size]} w-auto object-contain ${className}`}
    />
  );
}
