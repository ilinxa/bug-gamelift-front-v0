import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FormField } from './FormField';
import { cn } from '@/lib/utils';

export interface UserOption {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}

interface FormUserSearchProps {
  label: string;
  value: UserOption[];
  onChange: (value: UserOption[]) => void;
  users: UserOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
}

export function FormUserSearch({
  label,
  value,
  onChange,
  users,
  placeholder = 'Search users...',
  required,
  error,
  description,
  className,
}: FormUserSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return users
      .filter((user) => 
        !value.some((selected) => selected.id === user.id) &&
        (user.name.toLowerCase().includes(query) || 
         user.username.toLowerCase().includes(query))
      )
      .slice(0, 5);
  }, [searchQuery, users, value]);

  const handleSelectUser = (user: UserOption) => {
    onChange([...value, user]);
    setSearchQuery('');
  };

  const handleRemoveUser = (userId: string) => {
    onChange(value.filter((u) => u.id !== userId));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <FormField label={label} required={required} error={error} description={description} className={className}>
      <div className="space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder={placeholder}
            className="pl-9 bg-card border-border"
          />
          
          {/* Dropdown Results */}
          {isFocused && filteredUsers.length > 0 && (
            <div className="absolute z-50 mt-1 w-full bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleSelectUser(user)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-accent transition-colors text-left"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {isFocused && searchQuery && filteredUsers.length === 0 && (
            <div className="absolute z-50 mt-1 w-full bg-popover border border-border rounded-lg shadow-lg p-4">
              <p className="text-sm text-muted-foreground text-center">No users found</p>
            </div>
          )}
        </div>

        {/* Selected Users */}
        {value.length > 0 && (
          <div className="space-y-2">
            {value.map((user) => (
              <div
                key={user.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg",
                  "bg-muted/30 border border-border"
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveUser(user.id)}
                  className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </FormField>
  );
}
