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
      0: lazy(() => import('./pages/Organizational Profile/SubStep1/Organization Profile Setup')),
    },
    1: {
      0: lazy(() => import('./pages/Organizational Profile/SubStep2/Organization Details')),
      1: lazy(() => import('./pages/Organizational Profile/SubStep2/Annual Energy Spend')),
      2: lazy(() => import('./pages/Organizational Profile/SubStep2/Facility Operation Description')),
      3: lazy(() => import('./pages/Organizational Profile/SubStep2/Facility Address')),
      4: lazy(() => import('./pages/Organizational Profile/SubStep2/Other Details')),
    },
  },
  1: {
    0: {
      0: lazy(() => import('./pages/Energy Profile/SubStep1/Energy Profile Setup')),
    },
    1: {
      0: lazy(() => import('./pages/Energy Profile/SubStep2/Electric Bill Upload')),
      1: lazy(() => import("./pages/Energy Profile/SubStep2/Don't Have Interval Electric Load Data")),
      2: lazy(() => import('./pages/Energy Profile/SubStep2/Letter Of Authorization')),
      3: lazy(() => import('./pages/Energy Profile/SubStep2/LOA - Status')),
      4: lazy(() => import('./pages/Energy Profile/SubStep2/Natural Gas Bill Upload')),
      5: lazy(() => import('./pages/Energy Profile/SubStep2/Thermal Energy Needs - I')),
      6: lazy(() => import('./pages/Energy Profile/SubStep2/Thermal Energy Needs - II')),
      7: lazy(() => import('./pages/Energy Profile/SubStep2/Thermal Energy Needs - III')),
      8: lazy(() => import('./pages/Energy Profile/SubStep2/Thermal Energy Needs - IV')),
      9: lazy(() => import('./pages/Energy Profile/SubStep2/Existing Boiler Cogeneration')),
      // 10: lazy(() => import("./pages/Energy Profile/SubStep2/Don't Have Interval Electric Load Data")),
    },
    // 2: {
    //   0: lazy(() => import('./pages/Energy Profile/SubStep3/Letter Of Authorization')),
    //   1: lazy(() => import('./pages/Energy Profile/SubStep3/LOA - Status')),
    // },
  },
  2: {
    0: {
      0: lazy(() => import('./pages/Goals & Priorities/SubStep1/Your Goal(s) & Priorities Setup')),
    },
    1: {
      0: lazy(() => import('./pages/Goals & Priorities/SubStep2/Prioritization - I')),
      1: lazy(() => import('./pages/Goals & Priorities/SubStep2/Prioritization - II')),
    },
    2: {
      0: lazy(() => import('./pages/Goals & Priorities/SubStep3/Financials & Investment Information - I')),
      1: lazy(() => import('./pages/Goals & Priorities/SubStep3/Financials & Investment Information - II')),
    },
  },
  3: {
    0: {
      0: lazy(() => import('./pages/Site Assessment/SubStep1/User Insights- Site Assessment Inputs')),
    },
    1: {
      0: lazy(() => import('./pages/Site Assessment/SubStep2/Confirm Edit Your Pre-Entered Site Location')),
      1: lazy(() => import('./pages/Site Assessment/SubStep2/Site Characteristics - I')),
      2: lazy(() => import('./pages/Site Assessment/SubStep2/Site Characteristics - II')),
      3: lazy(() => import('./pages/Site Assessment/SubStep2/Other Site Characteristics')),
      4: lazy(() => import('./pages/Site Assessment/SubStep2/Facility Usage & Operating Days')),
      5: lazy(() => import('./pages/Site Assessment/SubStep2/Upload Existing Drawings')),
    },
    2: {
      0: lazy(() => import('./pages/Site Assessment/SubStep3/INPUTS TO MAXIMIZE SOLAR DER ASSETS')),
      1: lazy(() => import('./pages/Site Assessment/SubStep3/Roofing Considerations')),
      2: lazy(() => import('./pages/Site Assessment/SubStep3/Roof - Mounted Solar (Optional)')),
      3: lazy(() => import('./pages/Site Assessment/SubStep3/Ground - Mounted Solar (Optional)')),
      4: lazy(() => import('./pages/Site Assessment/SubStep3/Carport - Mounted Solar (Optional)')),
      5: lazy(() => import('./pages/Site Assessment/SubStep3/Existing Solar & Wind Resource (Optional)')),
      6: lazy(() => import('./pages/Site Assessment/SubStep3/Equipment Preferences (Optional)')),
    },
  },
  4: {
    0: {
      0: lazy(() => import('./pages/Financial Info/SubStep1/Financial Information Step')),
      1: lazy(() => import('./pages/Financial Info/SubStep1/Ownership Preference')),
    },
    1: {
      0: lazy(() => import('./pages/Financial Info/SubStep2/Own/Financial Preferences')),
      1: lazy(() => import('./pages/Financial Info/SubStep2/Own/Existing Energy Contracts - I')),
      2: lazy(() => import('./pages/Financial Info/SubStep2/Own/Existing Power Purchase Agreement (PPA) Electricity Contracts - II')),
      3: lazy(() => import('./pages/Financial Info/SubStep2/Own/Existing Power Purchase Agreement (PPA) for Combined Heat and or Power (CHP) Contracts – III')),
      4: lazy(() => import('./pages/Financial Info/SubStep2/Own/Existing Energy Contracts - IV')),
      5: lazy(() => import('./pages/Financial Info/SubStep2/Own/Other Energy Commitments (Optional)')),
      6: lazy(() => import('./pages/Financial Info/SubStep2/Own/What Are Your Budget & Investment Goals')),
      7: lazy(() => import('./pages/Financial Info/SubStep2/Own/Financing Preferences')),
    },
    2: {
      0: lazy(() => import('./pages/Financial Info/SubStep2/ThirdParty/You Selected A Third Party Ownership Model')),
      1: lazy(() => import('./pages/Financial Info/SubStep2/ThirdParty/PPA Preferences')),
      2: lazy(() => import('./pages/Financial Info/SubStep2/ThirdParty/Additional PPA Preferences (Optional)')),
    },
  },
  5: {
    0: {
      0: lazy(() => import('./pages/Data Verification/SubStep1/Data Verification & Processing')),
    },
  },
  6: {
    0: {
      0: lazy(() => import('./pages/Onboarding/SubStep1/DER Analysis By Bradley.ai Is Underway!')),
    },
  },
  7: {
    0: {
      0: lazy(() => import("./pages/Onboarding/SubStep1/Bradley's Recommendation For User")),
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
