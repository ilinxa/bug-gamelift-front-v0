import { Input } from '@/components/ui/input';
import { FormField } from './FormField';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
}

export function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  error,
  description,
  className,
}: FormInputProps) {
  return (
    <FormField label={label} required={required} error={error} description={description} className={className}>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-card border-border"
      />
    </FormField>
  );
}
