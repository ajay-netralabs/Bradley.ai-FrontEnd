export const steps = [
  { label: 'Organizational Profile', subSteps: 2, furtherSubSteps: [1, 5] },
  { label: 'Energy Profile', subSteps: 2, furtherSubSteps: [1, 10/* , 2 */] },
  { label: 'Goals & Priorities', subSteps: 3, furtherSubSteps: [1, 2, 2] },
  { label: 'Site Assessment', subSteps: 3, furtherSubSteps: [1, 6, 7] },
  { label: 'Financial Info', subSteps: 2, furtherSubSteps: [2, 8, 3] }, 
  { label: 'Data Verification', subSteps: 1, furtherSubSteps: [1] },
  { label: 'Onboarding', subSteps: 1, furtherSubSteps: [1] },
  { label: 'Recommendations', subSteps: 1, furtherSubSteps: [1] },
];

export const TOTAL_STEPS = steps.length;