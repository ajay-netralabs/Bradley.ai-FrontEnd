import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import workflowReducer from './slices/workflowSlice';
import energyProfileReducer from './slices/energyProfileSlice';
import siteAssessmentReducer from './slices/siteAssessmentSlice';
import organizationalProfileReducer from './slices/organizationalProfileSlice';
import financialInfoReducer from './slices/financialInfoSlice';
import goalsReducer from './slices/goalsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workflow: workflowReducer,
    energyProfile: energyProfileReducer,
    siteAssessment: siteAssessmentReducer,
    organizationalProfile: organizationalProfileReducer,
    financialInfo: financialInfoReducer,
    goals: goalsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
            'energyProfile/addElectricFiles', 
            'energyProfile/addGasFiles',
            'siteAssessment/addMEPFiles',
            'financialInfo/addContractsIIFiles',
            'financialInfo/addContractsIIIFiles',
            'financialInfo/addContractsIVFiles',
        ],
        // Ignore these field paths in the state
        ignoredPaths: [
            'energyProfile.electricBill.files', 
            'energyProfile.naturalGasBill.files',
            'siteAssessment.mepDrawings.files',
            'financialInfo.existingPPAContractsII.files',
            'financialInfo.existingPPAContractsIII.files',
            'financialInfo.existingContractsIV.files',
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
