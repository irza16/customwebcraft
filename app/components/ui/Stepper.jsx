"use client";

import { Children, useMemo, useState } from "react";
import "./Stepper.css";

function Step({ children }) {
  return <div className="stepper-step-content">{children}</div>;
}

export default function Stepper({
  children,
  initialStep = 1,
  nextButtonText = "Next →",
  backButtonText = "← Back",
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = "",
}) {
  const steps = Children.toArray(children).filter(Boolean);
  const [currentStep, setCurrentStep] = useState(initialStep - 1);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    onFinalStepCompleted();
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const progress = useMemo(() => Math.round(((currentStep + 1) / steps.length) * 100), [currentStep, steps.length]);

  return (
    <div className="stepper-shell">
      <div className="stepper-steps">
        {steps[currentStep]}
      </div>

      <div className="stepper-nav">
        <button type="button" onClick={handleBack} className="stepper-button next-button" disabled={isFirstStep} style={{ opacity: isFirstStep ? 0.45 : 1 }}>
          {backButtonText}
        </button>

        <div className={`stepper-progress ${stepCircleContainerClassName}`.trim()}>
          {steps.map((_, index) => (
            <span
              key={index}
              className={`stepper-dot ${index === currentStep ? "active" : ""} step-indicator-inner`}
              data-animate={index === currentStep ? "active" : "inactive"}
            />
          ))}
        </div>

        <button type="button" onClick={handleNext} className="stepper-button next-button">
          {isLastStep ? "Finished ✓" : nextButtonText}
        </button>
      </div>

      <div style={{ marginTop: "0.75rem", textAlign: "center", color: "#888880", fontSize: "0.875rem" }}>
        {progress}% complete
      </div>
    </div>
  );
}

Stepper.Step = Step;
