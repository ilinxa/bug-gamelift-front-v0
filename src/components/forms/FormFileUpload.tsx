import { useRef } from 'react';
import { Upload, X, Image, FileArchive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormField } from './FormField';
import { cn } from '@/lib/utils';

interface FormFileUploadProps {
  label: string;
  value: File | File[] | null;
  onChange: (files: File | File[] | null) => void;
  accept?: string;
  multiple?: boolean;
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
  variant?: 'default' | 'image' | 'archive';
}

export function FormFileUpload({
  label,
  value,
  onChange,
  accept,
  multiple = false,
  required,
  error,
  description,
  className,
  variant = 'default',
}: FormFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (multiple) {
      const existingFiles = Array.isArray(value) ? value : [];
      onChange([...existingFiles, ...Array.from(files)]);
    } else {
      onChange(files[0]);
    }
  };

  const removeFile = (index?: number) => {
    if (multiple && Array.isArray(value) && index !== undefined) {
      const newFiles = value.filter((_, i) => i !== index);
      onChange(newFiles.length > 0 ? newFiles : null);
    } else {
      onChange(null);
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'image':
        return <Image className="w-8 h-8 text-muted-foreground" />;
      case 'archive':
        return <FileArchive className="w-8 h-8 text-muted-foreground" />;
      default:
        return <Upload className="w-8 h-8 text-muted-foreground" />;
    }
  };

  const files = multiple && Array.isArray(value) ? value : value ? [value as File] : [];

  return (
    <FormField label={label} required={required} error={error} description={description} className={className}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
      
      <div
        onClick={handleClick}
        className={cn(
          "border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer",
          "hover:border-primary/50 hover:bg-primary/5 transition-colors",
          "flex flex-col items-center justify-center gap-2"
        )}
      >
        {getIcon()}
        <p className="text-sm text-muted-foreground">
          Click to upload {multiple ? 'files' : 'file'}
        </p>
        {accept && (
          <p className="text-xs text-muted-foreground/60">
            Accepted: {accept}
          </p>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-card border border-border rounded-lg px-3 py-2"
            >
              <span className="text-sm text-foreground truncate max-w-[200px]">
                {file.name}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(multiple ? index : undefined);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </FormField>
  );
}
