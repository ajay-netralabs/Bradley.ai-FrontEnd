import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Verdict {
    // compliance_status: string;
    status_banner: string;
    severity: string;
    penalty_risk_usd: number;
    time_left_months: number;
    limit_utilization_pct: number;
}

export interface EvidenceMetrics {
    actual_emissions: number;
    projected_emissions: number;
    full_year_projection: number;
    actual_yoy_pct: number | string;
    compliance_target: number;
    compliance_jurisdiction: string;
    required_reduction_pct: number;
    bradley_solution?: number;
    bradley_reduction_pct?: number;
    over_by: number;
    // estimated_penalty_cost_usd_per_year: number;
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
    insights?: string[];
}

export interface MonthlyEmission {
    month: number; 
    year: number | string;
    actual: number | null;
    projected: number | null;
    TOTALS: number | null;
    emissions: number | null;
}

export interface MonthlyTracking {
    target_per_month: number | string | null;
    with_bradley_der_per_month: number | string | null;
    monthly_emissions: MonthlyEmission[];
}

export interface ActionCenter {
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
    insights?: string[];
}

export interface RegulatoryContext {
    targets_2030: {
        location: {
            county: string;
            state: string;
            corp: number;
        };
        penalty_rule: {
            county: string;
            state: string;
            corp: string;
        };
    };
    penalty_details: {
        expected_annual_penalty_usd: number;
    };
}

export interface EmissionReductionProjects {
    Lighting: number;
    Ventilation: number;
    Cooling: number;
    'Other (pumps, small motors, common areas)': number;
    Refrigeration: number;
    'Computing/IT': number;
    'space heating (electric)': number;
    [key: string]: number;
}

export interface SRECMetrics {
    reduced_emissions_mtpy: number;
    srec_needed_mwh: number;
    total_srec_cost_usd: number;
    percentage_needed: number;
    emission_factor_constant: number;
}

export interface DashboardDataObject {
    file_id: string;
    source: string;
    zipcode: string;
    location: string;
    verdict: Verdict;
    evidence: Evidence;
    emission_reduction_projects: EmissionReductionProjects;
    srec_metrics: SRECMetrics;
    der_control_panel: DERControlPanel;
    monthly_tracking: MonthlyTracking;
    action_center: ActionCenter;
    regulatory_context: RegulatoryContext;
}

export type DashboardData = DashboardDataObject[];

interface DashboardDataContextType {
    dashboardData: DashboardData | null;
    setDashboardData: React.Dispatch<React.SetStateAction<DashboardData | null>>;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    viewMode: 'individual' | 'aggregate';
    setViewMode: React.Dispatch<React.SetStateAction<'individual' | 'aggregate'>>;
    aggregatedData: DashboardDataObject | null;
    setAggregatedData: React.Dispatch<React.SetStateAction<DashboardDataObject | null>>;
}

const DashboardDataContext = createContext<DashboardDataContextType | undefined>(undefined);

export const DashboardDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<'individual' | 'aggregate'>('individual');
    const [aggregatedData, setAggregatedData] = useState<DashboardDataObject | null>(null);
    
    return (
        <DashboardDataContext.Provider value={{ dashboardData, setDashboardData, isLoading, setIsLoading, viewMode, setViewMode, aggregatedData, setAggregatedData }}>
            {children}
        </DashboardDataContext.Provider>
    );
};

export const useDashboardData = (): DashboardDataContextType => {
    const context = useContext(DashboardDataContext);
    if (context === undefined) {
        throw new Error('useDashboardData must be used within a DashboardDataProvider');
    }
    return context;
};
