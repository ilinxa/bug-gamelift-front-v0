import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormField } from './FormField';

interface FormListInputProps {
  label: string;
  value: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
  addButtonText?: string;
}

export function FormListInput({
  label,
  value,
  onChange,
  placeholder = 'Enter item',
  required,
  error,
  description,
  className,
  addButtonText = 'Add Item',
}: FormListInputProps) {
  const addItem = () => {
    onChange([...value, '']);
  };

  const updateItem = (index: number, newValue: string) => {
    const newItems = [...value];
    newItems[index] = newValue;
    onChange(newItems);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <FormField label={label} required={required} error={error} description={description} className={className}>
      <div className="space-y-3">
        {value.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={`${placeholder} ${index + 1}`}
              className="bg-card border-border flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addItem}
          className="w-full border-dashed border-border hover:border-primary hover:bg-primary/5"
        >
          <Plus className="w-4 h-4 mr-2" />
          {addButtonText}
        </Button>
      </div>
    </FormField>
  );
}
