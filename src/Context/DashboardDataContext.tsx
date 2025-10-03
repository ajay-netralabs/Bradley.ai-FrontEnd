import React, { createContext, useState, useContext, ReactNode } from 'react';

// --- Interfaces matching the FINAL API Response Structure ---

export interface Verdict {
    status_banner: string;
    severity: string;
    penalty_risk_usd: number;
    time_left_months: number;
    limit_utilization_pct: number;
}

export interface EvidenceMetrics {
    actual_emissions: number;
    actual_yoy_pct: number | string;
    compliance_target: number;
    compliance_jurisdiction: string;
    required_reduction_pct: number;
    bradley_solution?: number;
    bradley_reduction_pct?: number;
    over_by: number;
    estimated_penalty_cost_usd_per_year: number;
    bradley_savings?: number;
    bradley_roi_years?: number;
}

export interface Evidence {
    metrics: EvidenceMetrics;
}

export interface DERControlPanel {
    current_mix_pct: { [key: string]: number };
    recommended_mix_pct: { [key: string]: number };
    impact_by_der: { [key: string]: number };
}

export interface MonthlyTracking {
    target_per_month: number;
    with_bradley_der_per_month: number;
    monthly_emissions: { 
        month: string; 
        year: number | string; 
        actual: number | null; 
        projected: number | null; 
    }[];
}

export interface ActionCenter {
    // This now correctly matches the final JSON structure
    recommended_solution: {
        title: string;
        components: { type: string; size: string; }[];
        investment_usd: number;
        payback_years: number;
        eliminates_penalties: boolean;
    };
    alternatives?: {
        title: string;
        investment_usd: number;
        reduction_pct: number;
        estimated_penalties_remaining_usd_per_year?: number;
        carbon_negative_by_year?: number;
    }[];
}

export interface DashboardDataObject {
    file_id: string; // Added as required
    source: string;
    zipcode: string;
    location: string;
    verdict: Verdict;
    evidence: Evidence;
    der_control_panel: DERControlPanel;
    monthly_tracking: MonthlyTracking;
    action_center: ActionCenter;
}

export type DashboardData = DashboardDataObject[];

// --- Context Definition & Provider ---

interface DashboardDataContextType {
    dashboardData: DashboardData | null;
    // CORRECTED: Use the standard React dispatch type for state setters
    setDashboardData: React.Dispatch<React.SetStateAction<DashboardData | null>>;
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