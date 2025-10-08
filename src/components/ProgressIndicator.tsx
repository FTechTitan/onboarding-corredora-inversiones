import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  hideLastStepNumber?: boolean;
}

const ProgressIndicator = ({ steps, currentStep, completedSteps, hideLastStepNumber = false }: ProgressIndicatorProps) => {
  const isLastStep = (index: number) => index === steps.length - 1;
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  completedSteps.includes(step.id)
                    ? "bg-primary border-primary text-primary-foreground shadow-glow"
                    : currentStep === step.id
                    ? "bg-secondary border-primary text-foreground"
                    : "bg-card border-border text-muted-foreground"
                )}
              >
                {completedSteps.includes(step.id) ? (
                  <Check className="w-6 h-6" />
                ) : hideLastStepNumber && isLastStep(index) ? (
                  <Check className="w-6 h-6 opacity-30" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
              <div className="mt-3 text-center max-w-[120px]">
                <p
                  className={cn(
                    "text-xs font-medium transition-colors",
                    currentStep === step.id || completedSteps.includes(step.id)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 transition-all duration-300",
                  completedSteps.includes(step.id)
                    ? "bg-primary"
                    : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
