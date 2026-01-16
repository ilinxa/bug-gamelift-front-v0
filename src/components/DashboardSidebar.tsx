import { NavLink, useLocation } from 'react-router-dom';
import { Compass, Gamepad2, LogOut, Settings } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/dashboard', icon: Compass, label: 'Explore', end: true },
  { to: '/dashboard/my-games', icon: Gamepad2, label: 'My Games' },
];

export function DashboardSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <NavLink to="/">
          <Logo size="lg" />
        </NavLink>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = item.end 
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                'text-sidebar-foreground hover:bg-sidebar-accent',
                isActive && 'bg-sidebar-accent text-primary font-medium'
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive && 'text-primary')} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <NavLink 
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-muted-foreground hover:bg-sidebar-accent hover:text-destructive transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </NavLink>
      </div>
    </aside>
  );
}
