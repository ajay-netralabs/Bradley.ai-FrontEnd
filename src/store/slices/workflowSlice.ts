import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WorkflowState {
  currentStep: number;
  currentSubStep: number;
  currentFurtherSubStep: number;
  visitedSteps: boolean[][];
  completedSubSteps: boolean[][];
}

const initialState: WorkflowState = {
  currentStep: 0,
  currentSubStep: 0,
  currentFurtherSubStep: 0,
  visitedSteps: [],
  completedSubSteps: [],
};

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    setWorkflowState: (state, action: PayloadAction<Partial<WorkflowState>>) => {
      return { ...state, ...action.payload };
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setCurrentSubStep: (state, action: PayloadAction<number>) => {
      state.currentSubStep = action.payload;
    },
    setCurrentFurtherSubStep: (state, action: PayloadAction<number>) => {
      state.currentFurtherSubStep = action.payload;
    },
    setVisitedSteps: (state, action: PayloadAction<boolean[][]>) => {
        state.visitedSteps = action.payload;
    },
    setCompletedSubSteps: (state, action: PayloadAction<boolean[][]>) => {
        state.completedSubSteps = action.payload;
    },
    // Add specific updaters to avoid passing full arrays if needed
    markStepVisited: (state, action: PayloadAction<{stepIndex: number, subStepIndex: number}>) => {
        const { stepIndex, subStepIndex } = action.payload;
        if (state.visitedSteps[stepIndex]) {
            state.visitedSteps[stepIndex][subStepIndex] = true;
        }
    },
    markSubStepCompleted: (state, action: PayloadAction<{stepIndex: number, subStepIndex: number, isCompleted: boolean}>) => {
         const { stepIndex, subStepIndex, isCompleted } = action.payload;
         if (state.completedSubSteps[stepIndex]) {
             state.completedSubSteps[stepIndex][subStepIndex] = isCompleted;
         }
    }
  },
});

export const { 
    setWorkflowState, 
    setCurrentStep, 
    setCurrentSubStep, 
    setCurrentFurtherSubStep, 
    setVisitedSteps, 
    setCompletedSubSteps,
    markStepVisited,
    markSubStepCompleted
} = workflowSlice.actions;

export default workflowSlice.reducer;
