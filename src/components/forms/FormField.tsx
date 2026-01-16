import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

export function FormField({ 
  label, 
  required, 
  error, 
  description, 
  className,
  children 
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
