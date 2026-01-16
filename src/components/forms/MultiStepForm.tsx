import { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface MultiStepFormProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  children: ReactNode;
  isSubmitting?: boolean;
  submitText?: string;
}

export function MultiStepForm({
  steps,
  currentStep,
  onStepChange,
  onSubmit,
  onCancel,
  children,
  isSubmitting = false,
  submitText = 'Submit',
}: MultiStepFormProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onSubmit();
    } else {
      onStepChange(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      onStepChange(currentStep - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative z-10"
              >
                {/* Step Circle */}
                <button
                  type="button"
                  onClick={() => index < currentStep && onStepChange(index)}
                  disabled={index > currentStep}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    isCompleted && "bg-primary text-primary-foreground cursor-pointer",
                    isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </button>
                
                {/* Step Title */}
                <div className="mt-2 text-center">
                  <p className={cn(
                    "text-sm font-medium",
                    (isCompleted || isCurrent) ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-[2px] bg-muted -z-0">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="min-h-[400px]">
        {children}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={isFirstStep ? onCancel : handleBack}
        >
          {isFirstStep ? 'Cancel' : 'Back'}
        </Button>
        
        <Button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLastStep ? (isSubmitting ? 'Submitting...' : submitText) : 'Next'}
        </Button>
      </div>
    </div>
  );
}
