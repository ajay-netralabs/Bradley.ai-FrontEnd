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
      0: lazy(() => import('./pages/SubStep1/Organization Details')),
      1: lazy(() => import('./pages/SubStep1/Facility Address')),
      2: lazy(() => import('./pages/SubStep1/Electric Bill Upload')),
      3: lazy(() => import("./pages/SubStep1/Don't Have Interval Electric Load Data")),
      4: lazy(() => import('./pages/SubStep1/Letter Of Authorization')),
      5: lazy(() => import('./pages/SubStep1/LOA - Status')),
      6: lazy(() => import('./pages/SubStep1/Natural Gas Bill Upload')),
    },
    1: {
      // 0: lazy(() => import('../Client/pages/Energy Profile/SubStep2/Thermal Energy Needs - I')),
      0: lazy(() => import('./pages/SubStep2/EmissionsDashboardWrapper')),
      // 1: lazy(() => import('../Client/pages/Energy Profile/SubStep2/Thermal Energy Needs - II')),
      // 2: lazy(() => import('../Client/pages/Energy Profile/SubStep2/Thermal Energy Needs - III')),
      // 3: lazy(() => import('../Client/pages/Energy Profile/SubStep2/Thermal Energy Needs - IV')),
      // 4: lazy(() => import('../Client/pages/Energy Profile/SubStep2/Existing Boiler Cogeneration')),
    },
    // 2: {
    //   0: lazy(() => import('./pages/Demo/SubStep1/EmissionsDashboardWrapper')),
    // },
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