import React from 'react';

interface StepContentProps {
  step: number;
  subStep: number;
}

const StepContent: React.FC<StepContentProps> = ({ step, subStep }) => {
  return <div>Content for Step {step + 1}, Sub-step {subStep + 1}</div>;
};

export default StepContent;