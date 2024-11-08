import React, { Suspense, lazy } from 'react';

const stepSubStepMapping = {
  0: {
    0: lazy(() => import('../pages/Step1/SubStep1')),
    1: lazy(() => import('../pages/Step1/SubStep2')),
  },
  1: {
    0: lazy(() => import('../pages/Step2/SubStep1')),
    1: lazy(() => import('../pages/Step2/SubStep2')),
    2: lazy(() => import('../pages/Step2/SubStep3')),
  },
  2: {
    0: lazy(() => import('../pages/Step3/SubStep1')),
    1: lazy(() => import('../pages/Step3/SubStep2')),
    2: lazy(() => import('../pages/Step3/SubStep3')),
  },
  3: {
    0: lazy(() => import('../pages/Step4/SubStep1')),
    1: lazy(() => import('../pages/Step4/SubStep2')),
    2: lazy(() => import('../pages/Step4/SubStep3')),
  },
  4: {
    0: lazy(() => import('../pages/Step5/SubStep1')),
    1: lazy(() => import('../pages/Step5/SubStep2')),
    2: lazy(() => import('../pages/Step5/SubStep3')),
  },
  5: {
    0: lazy(() => import('../pages/Step6/SubStep1')),
  },
  6: {
    0: lazy(() => import('../pages/Step7/SubStep1')),
  },
};

interface StepContentProps {
  step: number;
  subStep: number;
}

const StepContent: React.FC<StepContentProps> = ({ step, subStep }) => {
  const ComponentToRender = stepSubStepMapping[step]?.[subStep];

  if (!ComponentToRender) {
    return <div>No content available for this step/sub-step</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComponentToRender />
    </Suspense>
  );
};

export default StepContent;
