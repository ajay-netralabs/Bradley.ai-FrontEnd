import React, { createContext, useState, useContext, ReactNode } from 'react';

// --- Interfaces matching the actual API Response Structure ---
export interface EmissionDataPoint {
    Year: number | string;
    Month: number | string;
    TOTALS: number;
    emissions: number;
}

export interface CurrentYearSummary {
    ytd_emissions: number;
    total_energy_consumption: number;
    current_month: string;
    difference_from_last_month: number;
    emission_reduction_goal: number;
    up_down_percentage: number;
    up_or_down: string;
}

export interface TargetGoals {
  baseline_co2: {
    ytd_emissions: number | string | null;
    forecast: number | null;
    previous_year: number | null;
  };
  reduction_amount: {
    county: number | null;
    state: number | null;
    corp: number | null;
  };
  reduction_percentage: {
    county: number | null;
    state: number | null;
    corp: number | null;
  };
  target_on_off: {
    county: string | null;
    state: string | null;
    corp: string | null;
  };
  action_needed: {
    county: string | null;
    state: string | null;
    corp: string | null;
  };
  penalty: {
    county: number | string | null;
    state: number | string | null;
    corp: number | string | null;
  };
}

export interface Targets2030 {
    location: { county: string; state: string; corp: string; };
    penalty_rule: { county: string; state: string; corp: string; };
}

export interface LocationData {
    location: string;
    source: "electric" | "gas";
    emissions: EmissionDataPoint[];
    current_year_summary: CurrentYearSummary;
    target_goals?: TargetGoals;
    targets_2030?: Targets2030;
}

export type DashboardData = LocationData[];

// --- Context Definition & Provider ---
interface DashboardDataContextType {
    dashboardData: DashboardData | null;
    setDashboardData: (data: DashboardData | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const DashboardDataContext = createContext<DashboardDataContextType | undefined>(undefined);

export const DashboardDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    return (
        <DashboardDataContext.Provider value={{ dashboardData, setDashboardData, isLoading, setIsLoading }}>
            {children}
        </DashboardDataContext.Provider>
    );
};

// --- Custom Hook ---
export const useDashboardData = (): DashboardDataContextType => {
    const context = useContext(DashboardDataContext);
    if (context === undefined) {
        throw new Error('useDashboardData must be used within a DashboardDataProvider');
    }
    return context;
};