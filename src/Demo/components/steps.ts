import { SlEnergy } from "react-icons/sl";

export interface StepStructure {
  label: string;
  icon: any;
  subSteps: {
    label: string;
    furtherSubSteps: {
      label: string;
    }[];
  }[];
}

export const steps: StepStructure[] = [
  { 
    label: 'Emissions', 
    icon: SlEnergy, 
    subSteps: [
      {
        label: 'Data Collection',
        furtherSubSteps: [
            { label: 'Organization Details' },
            { label: 'Facility Address' },
            { label: 'Electric Bill Upload' },
            { label: "Don't Have Interval Data" },
            { label: 'Letter Of Authorization' },
            { label: 'LOA - Status' },
            { label: 'Natural Gas Bill Upload' },
        ]
      },
      {
        label: 'Dashboard',
        furtherSubSteps: [
            { label: 'Emissions Dashboard' }
        ]
      }
    ] 
  },
];

export const TOTAL_STEPS = steps.length;
