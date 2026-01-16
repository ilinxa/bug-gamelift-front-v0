import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormField } from './FormField';
import { cn } from '@/lib/utils';

interface FormDatePickerProps {
  label: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function FormDatePicker({
  label,
  value,
  onChange,
  placeholder = 'Pick a date',
  required,
  error,
  description,
  className,
  minDate,
  maxDate,
}: FormDatePickerProps) {
  return (
    <FormField label={label} required={required} error={error} description={description} className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-card border-border",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(date) => {
              if (minDate && date < minDate) return true;
              if (maxDate && date > maxDate) return true;
              return false;
            }}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </FormField>
  );
}
