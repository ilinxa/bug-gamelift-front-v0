import { Textarea } from '@/components/ui/textarea';
import { FormField } from './FormField';

interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
}

export function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required,
  error,
  description,
  className,
}: FormTextareaProps) {
  return (
    <FormField label={label} required={required} error={error} description={description} className={className}>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="bg-card border-border resize-none"
      />
    </FormField>
  );
}
