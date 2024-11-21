import React, { Suspense, lazy } from 'react';

const stepSubStepMapping = {
  0: {
    0: {
      0: lazy(() => import('./Step1/SubStep1/SubStep1.1')),
    },
    1: {
      0: lazy(() => import('./Step1/SubStep2/SubStep2.1')),
      1: lazy(() => import('./Step1/SubStep2/SubStep2.2')),
      2: lazy(() => import('./Step1/SubStep2/SubStep2.3')),
      3: lazy(() => import('./Step1/SubStep2/SubStep2.4')),
      4: lazy(() => import('./Step1/SubStep2/SubStep2.5')),
    },
  },
  1: {
    0: {
      0: lazy(() => import('./Step2/SubStep1/SubStep1.1')),
    },
    1: {
      0: lazy(() => import('./Step2/SubStep2/SubStep2.1')),
      1: lazy(() => import('./Step2/SubStep2/SubStep2.2')),
      2: lazy(() => import('./Step2/SubStep2/SubStep2.3')),
      3: lazy(() => import('./Step2/SubStep2/SubStep2.4')),
      4: lazy(() => import('./Step2/SubStep2/SubStep2.5')),
      5: lazy(() => import('./Step2/SubStep2/SubStep2.6')),
      6: lazy(() => import('./Step2/SubStep2/SubStep2.7')),
    },
    2: {
      0: lazy(() => import('./Step2/SubStep3/SubStep3.1')),
      1: lazy(() => import('./Step2/SubStep3/SubStep3.2')),
    },
  },
  2: {
    0: {
      0: lazy(() => import('./Step3/SubStep1/SubStep1.1')),
    },
    1: {
      0: lazy(() => import('./Step3/SubStep2/SubStep2.1')),
      1: lazy(() => import('./Step3/SubStep2/SubStep2.2')),
    },
    2: {
      0: lazy(() => import('./Step3/SubStep3/SubStep3.1')),
      1: lazy(() => import('./Step3/SubStep3/SubStep3.2')),
    },
  },
  3: {
    0: {
      0: lazy(() => import('./Step4/SubStep1/SubStep1.1')),
    },
    1: {
      0: lazy(() => import('./Step4/SubStep2/SubStep2.1')),
      1: lazy(() => import('./Step4/SubStep2/SubStep2.2')),
      2: lazy(() => import('./Step4/SubStep2/SubStep2.3')),
      3: lazy(() => import('./Step4/SubStep2/SubStep2.4')),
      4: lazy(() => import('./Step4/SubStep2/SubStep2.5')),
      5: lazy(() => import('./Step4/SubStep2/SubStep2.6')),
    },
    2: {
      0: lazy(() => import('./Step4/SubStep3/SubStep3.1')),
      1: lazy(() => import('./Step4/SubStep3/SubStep3.2')),
      2: lazy(() => import('./Step4/SubStep3/SubStep3.3')),
      3: lazy(() => import('./Step4/SubStep3/SubStep3.4')),
      4: lazy(() => import('./Step4/SubStep3/SubStep3.5')),
      5: lazy(() => import('./Step4/SubStep3/SubStep3.6')),
    },
  },
  4: {
    0: {
      0: lazy(() => import('./Step5/SubStep1/SubStep1.1')),
      1: lazy(() => import('./Step5/SubStep1/SubStep1.2')),
    },
    1: {
      0: lazy(() => import('./Step5/SubStep2/SubStep2.1')),
      1: lazy(() => import('./Step5/SubStep2/SubStep2.2')),
      2: lazy(() => import('./Step5/SubStep2/SubStep2.3')),
      3: lazy(() => import('./Step5/SubStep2/SubStep2.4')),
      4: lazy(() => import('./Step5/SubStep2/SubStep2.5')),
      5: lazy(() => import('./Step5/SubStep2/SubStep2.6')),
    },
    2: {
      0: lazy(() => import('./Step5/SubStep3/SubStep3.1')),
    },
  },
  5: {
    0: {
      0: lazy(() => import('./Step6/SubStep1/SubStep1.1')),
      1: lazy(() => import('./Step6/SubStep1/SubStep1.2')),
    },
  },
  6: {
    0: {
      0: lazy(() => import('./Step7/SubStep1/SubStep1.1')),
      1: lazy(() => import('./Step7/SubStep1/SubStep1.2')),
      2: lazy(() => import('./Step7/SubStep1/SubStep1.3')),
      3: lazy(() => import('./Step7/SubStep1/SubStep1.4')),
    },
  },
};

interface StepContentProps {
  step: number;
  subStep: number;
  furtherSubStep: number;
}

const StepContent: React.FC<StepContentProps> = ({ step, subStep, furtherSubStep }) => {
  const ComponentToRender = stepSubStepMapping[step]?.[subStep]?.[furtherSubStep];

  if (!ComponentToRender) {
    return <div>No content available for this step/sub-step</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.800rem' }}>
        <ComponentToRender />
      </div>
    </Suspense>
  );
};

export default StepContent;
