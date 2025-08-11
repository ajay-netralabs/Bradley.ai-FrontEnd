import React, { Suspense, lazy } from 'react';
import { CircularProgress } from '@mui/material';

type StepSubStepMapping = {
  [step: number]: {
    [subStep: number]: {
      [furtherSubStep: number]: React.LazyExoticComponent<React.FC>;
    };
  };
};

const stepSubStepMapping: StepSubStepMapping = {
  0: {
    0: {
      0: lazy(() => import('../Client/pages/Organizational Profile/SubStep2/Organization Details')),
      1: lazy(() => import('../Client/pages/Organizational Profile/SubStep2/Facility Address')),
      2: lazy(() => import('../Client/pages/Energy Profile/SubStep2/Electric Bill Upload')),
      3: lazy(() => import("../Client/pages/Energy Profile/SubStep2/Don't Have Interval Electric Load Data")),
      4: lazy(() => import('../Client/pages/Energy Profile/SubStep2/Letter Of Authorization')),
      5: lazy(() => import('../Client/pages/Energy Profile/SubStep2/LOA - Status')),
      6: lazy(() => import('../Client/pages/Energy Profile/SubStep2/Natural Gas Bill Upload')),
    },
    1: {
      // Change this line to point to your new wrapper component
      0: lazy(() => import('./pages/Demo/SubStep1/EmissionsDashboardWrapper')),
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
    <Suspense
      fallback={
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      }
    >
      <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.800rem' }}>
        <ComponentToRender />
      </div>
    </Suspense>
  );
};

export default StepContent;