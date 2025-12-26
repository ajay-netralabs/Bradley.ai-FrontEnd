import React, { useState, useMemo, useEffect, ReactNode } from 'react';
import {
    Box, Typography, Card, styled, CardContent, Paper, Tabs, Tab, FormControl,
    Select, MenuItem, Slider, Button, Grid, Table, TableBody, TableCell,
    TableContainer, TableRow, TableHead, Modal, IconButton, Stack, SelectChangeEvent, Checkbox, TableFooter,
    Zoom,
    Grow
} from '@mui/material';
import {
    HelpOutline, Close,
    TrendingUp, TrendingDown, CheckCircle, Warning, Error
} from '@mui/icons-material';
import { keyframes } from '@mui/system';
// Removed unused Cell import
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { SRECMetrics, DashboardDataObject } from '../../../../Context/DashboardDataContext';

// --- TYPE DEFINITIONS ---
// interface DashboardDataObject {
//     // file_id: string;
//     _id: string;
//     // source: string;
//     location: string;
//     area_sq_ft: number;
//     energy_usage_intensity: number | null;
//     verdict: { status_banner: string; severity: string; penalty_risk_usd: number; time_left_months: number; limit_utilization_pct: number; };
//     evidence: { metrics: { actual_emissions: number; projected_emissions: number; full_year_projection: number; actual_yoy_pct: number | string; compliance_target: number; compliance_jurisdiction: string; required_reduction_pct: number; bradley_solution?: number; bradley_reduction_pct?: number; over_by: number; bradley_savings?: number; bradley_roi_years?: number; } };
//     emission_reduction_projects: {
//         [key: string]: number;
//     };
//     srec_metrics: SRECMetrics;
//     der_control_panel: {
//         current_mix_pct: { [key: string]: number };
//         recommended_mix_pct: { [key: string]: number };
//         impact_by_der: { [key: string]: number };
//         insights?: string[];
//     };
//     monthly_tracking: { target_per_month: number | string | null; with_bradley_der_per_month: number | string | null; monthly_emissions: { month: string | number; year: number | string; grid_actual: number | null; grid_projected: number | null; gas_actual: number | null; gas_projected: number | null; actual: number | null; projected: number | null; }[]; };
//     action_center: {
//         recommended_solution: { title: string; components: { type: string; size: string; }[]; investment_usd: number; payback_years: number; eliminates_penalties: boolean; };
//         alternatives?: { title: string; investment_usd: number; reduction_pct: number; estimated_penalties_remaining_usd_per_year?: number; carbon_negative_by_year?: number; }[];
//         insights?: string[];
//     };
// }

// --- COLOR PALETTES ---
const colorPalette = {
    target: '#d32f2f',       // Strong Red
    withBradley: '#388E3C', // Clear Green
    
    // Electric (Grid) Colors
    gridActual: '#264653',    // Deep Teal
    gridProjected: '#86A3B3', // Light Teal
    
    // Gas (Natural Gas) Colors
    gasActual: '#8D6E63',     // Warm Brown
    gasProjected: '#D7C1B9',  // Light Sand
    
    // Fallbacks / Defaults
    defaultActual: '#424242',
    defaultProjected: '#BDBDBD',

    // Legacy keys needed for Modal & Fallback consistency
    actual: '#424242',       
    projected: '#BDBDBD',    
};

// const sourceColorPalette: { [key: string]: string } = {
//     'grid_actual': colorPalette.gridActual,
//     'grid_projected': colorPalette.gridProjected,
//     'gas_actual': colorPalette.gasActual,
//     'gas_projected': colorPalette.gasProjected,
// };

// Fallback color generator
const getColorForSource = (source: string, type: 'actual' | 'projected') => {
    const name = source.toLowerCase();
    
    if (name.includes('grid') || name.includes('electric') || name.includes('solar')) {
        return type === 'actual' ? colorPalette.gridActual : colorPalette.gridProjected;
    }
    if (name.includes('gas') || name.includes('diesel') || name.includes('fuel')) {
        return type === 'actual' ? colorPalette.gasActual : colorPalette.gasProjected;
    }
    return type === 'actual' ? colorPalette.defaultActual : colorPalette.defaultProjected;
};

// --- KEYFRAMES ---
const fadeIn = keyframes` from { opacity: 0; } to { opacity: 1; } `;
const fadeInDown = keyframes` from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } `;
const slideInFromLeft = keyframes` from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } `;
const zoomIn = keyframes` from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } `;
const pulseCritical = keyframes` 0% { box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(255, 152, 0, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 152, 0, 0); } `;
const pulseWarning = keyframes` 0% { box-shadow: 0 0 0 0 rgba(211, 47, 47, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(211, 47, 47, 0); } 100% { box-shadow: 0 0 0 0 rgba(211, 47, 47, 0); } `;

// --- STYLED COMPONENTS ---
const StyledTitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'Nunito Sans, sans-serif', fontSize: '2rem', fontWeight: 'bold',
    textAlign: 'center', marginBottom: theme.spacing(1),
    animation: `${fadeInDown} 0.5s ease-out`,
}));

const StyledBenefitCard = styled(Card)(({ theme }) => ({
    flex: 1, padding: theme.spacing(1), position: 'relative', overflow: 'hidden', textAlign: 'center',
    backgroundColor: '#f5f5ff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.03)', 
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #e9ecef', 
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    '&:hover': { 
        transform: 'translateY(-6px) scale(1.02)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
        borderColor: 'rgba(25, 118, 210, 0.5)',
        '& .watermark-icon': {
            transform: 'translateY(-50%) rotate(-5deg) scale(1.05)',
            opacity: 0.1,
        }
    },
}));

const WatermarkIcon = styled('div')({
    position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%) rotate(-15deg)',
    fontSize: '4rem', opacity: 0.08, fontWeight: 'bold', color: '#333', zIndex: 1,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
});

const AbsoluteValue = styled(Typography)({
    fontFamily: 'Nunito Sans, sans-serif', fontWeight: '900', fontSize: '1.2rem',
    position: 'relative', zIndex: 2, lineHeight: 2.2,
});

const BenefitDescription = styled(Typography)(({ theme }) => ({
    fontFamily: 'Nunito Sans, sans-serif', fontWeight: '600', fontSize: '0.7rem', color: theme.palette.grey[600],
    position: 'relative', zIndex: 2, lineHeight: 1.5,
}));

const ModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    backgroundColor: 'white', border: '1px solid #ddd',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)', 
    borderRadius: '12px', 
    padding: theme.spacing(3),
    animation: `${zoomIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
}));

const StyledTabPanelBox = styled(Box)(({ theme }) => ({ 
    position: 'relative', 
    padding: theme.spacing(2), 
    backgroundColor: theme.palette.grey[100], 
    borderRadius: theme.shape.borderRadius,
    animation: `${fadeIn} 0.5s ease-in-out`
}));

interface TabPanelProps { children?: React.ReactNode; index: number; value: number; }
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => ( 
    <div role="tabpanel" hidden={value !== index}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div> 
);

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    transition: 'background-color 0.2s ease-out',
    '&.animated-row': {
        opacity: 0,
        animation: `${slideInFromLeft} 0.4s ease-out forwards`,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    }
}));


// --- HELPER FUNCTIONS ---
const formatValue = (value?: number | string | null, type: 'number' | 'currency' | 'percent' = 'number'): string => { if (value === null || value === undefined || value === "") return 'N/A'; const num = typeof value === 'string' ? parseFloat(value) : value; if (isNaN(num)) return 'N/A'; const options: Intl.NumberFormatOptions = { maximumFractionDigits: 2 }; if (type === 'currency') { options.style = 'currency'; options.currency = 'USD'; options.minimumFractionDigits = 2; } if (type === 'percent') { return `${num.toFixed(1)}%`; } return new Intl.NumberFormat('en-US', options).format(num); };
const derOrder = ['Solar PV', 'Battery Storage', 'CHP', 'Fuel Cells', 'Simple Turbines', 'Linear Generation', 'NATURAL GAS', 'GRID'];
const derNameMapping: {[key: string]: string} = { solar_pv: 'Solar PV', battery_storage: 'Battery Storage', chp: 'CHP', fuel_cells: 'Fuel Cells', simple_turbines: 'Simple Turbines', linear_generation: 'Linear Generation', gas: 'NATURAL GAS', grid: 'GRID', efficiency_retrofit: 'Efficiency Retrofit' };

// --- CHILD COMPONENTS ---
interface BenefitData { value: string; title: ReactNode; description: ReactNode; watermark: string; }

interface EnhancedBenefitCardProps {
    benefit: BenefitData;
    onClick: () => void;
    valueColor?: string; 
}
const EnhancedBenefitCard: React.FC<EnhancedBenefitCardProps> = ({ benefit, onClick, valueColor }) => (
    <StyledBenefitCard onClick={onClick}>
        <WatermarkIcon className="watermark-icon">{benefit.watermark}</WatermarkIcon>
        <CardContent sx={{ position: 'relative', zIndex: 2, py: 2.1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 600, fontSize: '0.9rem', mb: 0.5 }}>{benefit.title}</Typography>
            <AbsoluteValue sx={{ fontSize:'1.6rem', color: valueColor ?? '#333' }}>{benefit.value}</AbsoluteValue>
            <BenefitDescription sx={{ fontSize: '0.8rem' }}>{benefit.description}</BenefitDescription>
        </CardContent>
    </StyledBenefitCard>
);

// --- MAIN DASHBOARD COMPONENT ---
interface EmissionsDashboardProps {
    allData: DashboardDataObject[];
    onConfirmChanges: (userMix: {[key:string]: number}, _id: string/* , source: string */) => void;
    hasUnsavedChanges: boolean;
    setHasUnsavedChanges: (changed: boolean) => void;
    selectedLocation: string;
    onLocationChange: (location: string) => void;
    selectedLocations: string[];
    onLocationsChange: (locations: string[]) => void;
    // selectedSource: string;
    // onSourceChange: (source: string) => void;
    selectedYear: number | string;
    onYearChange: (year: number | string) => void;
    
    projectSelections: { [key: string]: boolean };
    onProjectSelectChange: (key: string) => void;
    srecPercentage: number;
    onSrecPercentageChange: (value: number) => void;
    onSrecChangeCommitted: (value: number, targetData?: DashboardDataObject | null) => void;
    calculatedSrecMetrics: SRECMetrics | null;

    calculatedDer: DashboardDataObject['der_control_panel'] | null;
}

const EmissionsDashboard: React.FC<EmissionsDashboardProps> = ({
    allData, onConfirmChanges, setHasUnsavedChanges,
    selectedLocation, /* onLocationChange, */
    // selectedSource, 
    // onSourceChange, // Removed unused import to clear warning
    selectedYear, onYearChange,
    projectSelections,
    onProjectSelectChange,
    srecPercentage,
    onSrecPercentageChange,
    onSrecChangeCommitted,
    calculatedSrecMetrics,
    calculatedDer
}) => {
    const [tabValue, setTabValue] = useState(0);
    const [userDerAllocation, setUserDerAllocation] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContentId, setModalContentId] = useState<number | null>(null);

    const [frozenDerInsights, setFrozenDerInsights] = useState<string[] | undefined>(undefined);
    const [frozenActionInsights, setFrozenActionInsights] = useState<string[] | undefined>(undefined);

    const [quickFixModalOpen, setQuickFixModalOpen] = useState(false);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    
    // NEW: State for Multi-Source Graph
    const [graphSources, setGraphSources] = useState<string[]>([]);

    const handleOpenModal = (id: number) => { setModalContentId(id); setModalOpen(true); };
    const handleCloseModal = () => { setModalOpen(false); setModalContentId(null); };

    const availableLocations = useMemo(() => {
        if (!allData) return [];
        return Array.from(new Set(allData.map(d => d.location)));
    }, [allData]);

    const filteredDataByLocations = useMemo(() => {
        if (!allData) return [];
        return allData.filter(d => selectedLocations.includes(d.location));
    }, [allData, selectedLocations]);

    const aggregatedMetrics = useMemo(() => {
        if (filteredDataByLocations.length === 0) return null;

        const acc = {
            actual_emissions: 0,
            projected_emissions: 0,
            full_year_projection: 0,
            compliance_target: 0,
            bradley_solution: 0,
            over_by: 0,
            bradley_savings: 0,
            // Averaging helpers
            yoy_sum: 0,
            yoy_count: 0,
            roi_sum: 0,
            roi_count: 0,
            reduction_pct_sum: 0,
            reduction_pct_count: 0
        };

        filteredDataByLocations.forEach(d => {
            const m = d.evidence?.metrics;
            if (!m) return;
            acc.actual_emissions += m.actual_emissions || 0;
            acc.projected_emissions += m.projected_emissions || 0;
            acc.full_year_projection += m.full_year_projection || 0;
            acc.compliance_target += m.compliance_target || 0;
            acc.bradley_solution += m.bradley_solution || 0;
            acc.over_by += m.over_by || 0;
            acc.bradley_savings += m.bradley_savings || 0;

            // Collect ROI for Average & Sum
            const roi = m.bradley_roi_years || 0;
            acc.roi_sum += roi;
            acc.roi_count += 1;

            // Collect Reduction % for Average
            const redPct = m.bradley_reduction_pct || 0;
            acc.reduction_pct_sum += redPct;
            acc.reduction_pct_count += 1;

            const yoyVal = parseFloat(String(m.actual_yoy_pct));
            if (!isNaN(yoyVal)) {
                acc.yoy_sum += yoyVal;
                acc.yoy_count += 1;
            }
        });

        // Recalculate percentages based on new totals
        const required_reduction_pct = acc.full_year_projection > 0
            ? ((acc.full_year_projection - acc.compliance_target) / acc.full_year_projection) * 100
            : 0;

        // UPDATED: Simple Average for Bradley Reduction %
        const bradley_reduction_pct = acc.reduction_pct_count > 0
             ? acc.reduction_pct_sum / acc.reduction_pct_count
             : 0;
        
        // UPDATED: Simple Average for ROI (Fixes 0 display for negative savings)
        const bradley_roi_years_avg = acc.roi_count > 0 
            ? acc.roi_sum / acc.roi_count 
            : 0;

        return {
            ...acc,
            required_reduction_pct,
            bradley_reduction_pct,
            bradley_roi_years: bradley_roi_years_avg,
            bradley_roi_sum: acc.roi_sum, // Expose sum for the range display
            // For strings like jurisdiction, check if unique, else say 'Multiple'
            compliance_jurisdiction: new Set(filteredDataByLocations.map(d => d.evidence?.metrics?.compliance_jurisdiction)).size > 1 
                ? 'Multiple Jurisdictions' 
                : filteredDataByLocations[0]?.evidence?.metrics?.compliance_jurisdiction,
            actual_yoy_pct: acc.yoy_count > 0 ? (acc.yoy_sum / acc.yoy_count) : 'N/A'
        };
    }, [filteredDataByLocations]);

    // "Active" data for single-source logic (Tabs 1, 3, 4)
    const data = useMemo(() => {
        let foundData: DashboardDataObject | undefined;

        if (filteredDataByLocations.length === 1) {
            foundData = filteredDataByLocations[0];
        } else {
            foundData = allData?.find(d => d.location === selectedLocation);
        }

        if (foundData && calculatedDer) {
            return {
                ...foundData,
                der_control_panel: calculatedDer
            };
        }
        
        return foundData;
    }, [filteredDataByLocations, allData, selectedLocation, calculatedDer]);
//random commit
    // NEW: Aggregated Data for Stacked Chart (Tab 2)
    const stackedChartData = useMemo(() => {
    // Only proceed if we have valid data and a selected year
    if (!data || !selectedYear || !data.monthly_tracking?.monthly_emissions) return [];
    
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Filter by selected year
    const yearlyData = data.monthly_tracking.monthly_emissions.filter(em => em.year == selectedYear);

    // Map to chart format (ensure months are strings for XAxis)
    return yearlyData.map(em => {
        let monthName = String(em.month);
        const monthIndex = Number(em.month) - 1;
        if (!isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12) {
            monthName = monthOrder[monthIndex];
        }

        return {
            ...em, // This includes grid_actual, gas_projected, etc.
            month: monthName
        };
    }).sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
}, [data, selectedYear]);

    // Calculate Y-Axis Max for Stacked Chart
    const yAxisMaxStacked = useMemo(() => {
    if (stackedChartData.length === 0) return 'auto';
    
    let maxTotal = 0;
    stackedChartData.forEach((row: any) => {
        let rowSum = 0;
        // Sum up selected sources dynamically
        if (graphSources.includes('Grid')) {
            rowSum += (row.grid_actual || 0) + (row.grid_projected || 0);
        }
        if (graphSources.includes('Gas')) {
            rowSum += (row.gas_actual || 0) + (row.gas_projected || 0);
        }
        if (rowSum > maxTotal) maxTotal = rowSum;
    });

    const target = Number(data?.monthly_tracking?.target_per_month || 0);
    const absoluteMax = Math.max(maxTotal, target);
    
    if (absoluteMax === 0) return 100;
    return Math.ceil((absoluteMax * 1.1) / 10) * 10;
}, [stackedChartData, graphSources, data]);

    useEffect(() => {
        setFrozenDerInsights(data?.der_control_panel?.insights);
        setFrozenActionInsights(data?.action_center?.insights);
    }, [selectedLocation/* , selectedSource */]);

    const initialState = useMemo(() => {
    const current = data?.der_control_panel?.current_mix_pct;
    
    // Initialize all possible DER types to 0
    const state = {
        'Solar PV': 0,
        'Battery Storage': 0,
        'CHP': 0,
        'Fuel Cells': 0,
        'Simple Turbines': 0,
        'Linear Generation': 0,
        'GRID': 0,
        'NATURAL GAS': 0,
    };
    
    // Only update values that exist in current_mix_pct
    if (current) {
        state['Solar PV'] = current.solar_pv ?? 0;
        state['Battery Storage'] = current.battery_storage ?? 0;
        state['CHP'] = current.chp ?? 0;
        state['Fuel Cells'] = current.fuel_cells ?? 0;
        state['Simple Turbines'] = current.simple_turbines ?? 0;
        state['Linear Generation'] = current.linear_generation ?? 0;
        state['GRID'] = current.grid ?? 0;
        state['NATURAL GAS'] = current.gas ?? 0;
    }
    
    return state;
}, [data]);

    useEffect(() => {
        setUserDerAllocation(initialState);
        setHasUnsavedChanges(false);
    }, [initialState, setHasUnsavedChanges]);

    const isChanged = useMemo(() => JSON.stringify(userDerAllocation) !== JSON.stringify(initialState), [userDerAllocation, initialState]);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTabValue(newValue);
    
    const handleSliderChange = (name: string, value: number) => {
        const otherDersTotal = Object.entries(userDerAllocation).filter(([key]) => key !== 'GRID' && key !== name).reduce((acc, [, val]) => acc + (val as number), 0);
        const newTotal = otherDersTotal + value;
        if (newTotal > 100) return;
        setUserDerAllocation(prev => ({ ...prev, [name]: value, GRID: 100 - newTotal }));
    };
    
    const handleReset = () => setUserDerAllocation(initialState);
    
    const handleApplyRecommendation = () => {
        const recommended = data?.der_control_panel?.recommended_mix_pct;
        if (!recommended) return;
        setUserDerAllocation({
            'Solar PV': recommended.solar_pv ?? 0, 'Battery Storage': recommended.battery_storage ?? 0, 'CHP': recommended.chp ?? 0,
            'Fuel Cells': recommended.fuel_cells ?? 0, 'Simple Turbines': recommended.simple_turbines ?? 0,
            'Linear Generation': recommended.linear_generation ?? 0, 'GRID': recommended.grid ?? 0, 'NATURAL GAS': recommended.gas ?? 0,
        });
    };
    const handleConfirm = () => {
        const payloadMix = {
            grid: (userDerAllocation as any)['GRID'] ?? 0, solar_pv: (userDerAllocation as any)['Solar PV'] ?? 0,
            battery_storage: (userDerAllocation as any)['Battery Storage'] ?? 0, chp: (userDerAllocation as any)['CHP'] ?? 0,
            fuel_cells: (userDerAllocation as any)['Fuel Cells'] ?? 0, simple_turbines: (userDerAllocation as any)['Simple Turbines'] ?? 0,
            linear_generation: (userDerAllocation as any)['Linear Generation'] ?? 0, gas: (userDerAllocation as any)['NATURAL GAS'] ?? 0,
        };
        if (data && data._id) {
            onConfirmChanges(payloadMix, data._id);
        }
        // onConfirmChanges(payloadMix, selectedLocation/* , selectedSource */);
    };
    
    const availableYears = useMemo(() => {
        const years = new Set<number>();
        
        if (filteredDataByLocations.length > 0) {
            filteredDataByLocations.forEach(d => {
                d.monthly_tracking?.monthly_emissions?.forEach(em => {
                    if (em.year) years.add(Number(em.year));
                });
            });
        } 
        else if (data) {
            data.monthly_tracking?.monthly_emissions?.forEach(em => {
                if (em.year) years.add(Number(em.year));
            });
        }

        return Array.from(years).sort((a, b) => b - a);
    }, [filteredDataByLocations, data]);

    const staticProjectKeys: { [key: string]: string } = {
        'Lighting': 'Lighting',
        'Ventilation': 'Ventilation',
        'Cooling': 'Cooling',
        'Other (Pumps, Small Motors, Common Areas)': 'Other (pumps, small motors, common areas)',
        'Refrigeration': 'Refrigeration',
        'Computing/IT': 'Computing/IT',
        'Space Heating (Electric)': 'space heating (electric)',
    };

    const cumulativeReduction = useMemo(() => {
        if (!data?.emission_reduction_projects || !projectSelections) return 0;
        return Object.entries(projectSelections).reduce((sum, [formattedKey, isSelected]) => {
            if (isSelected) {
                const backendKey = staticProjectKeys[formattedKey];
                return sum + (data.emission_reduction_projects[backendKey] || 0);
            }
            return sum;
        }, 0);
    }, [projectSelections, data?.emission_reduction_projects]);

    const availableSources = useMemo(() => {
        // We check the first active location's data to see what columns exist
        const activeData = allData.find(d => d.location === selectedLocation);
        if (!activeData || !activeData.monthly_tracking?.monthly_emissions) return [];
        
        const sources = new Set<string>();
        const emissions = activeData.monthly_tracking.monthly_emissions;

        // Check if ANY entry has non-null grid values
        const hasGrid = emissions.some(e => e.grid_actual !== null || e.grid_projected !== null);
        if (hasGrid) sources.add('Grid');

        // Check if ANY entry has non-null gas values
        const hasGas = emissions.some(e => e.gas_actual !== null || e.gas_projected !== null);
        if (hasGas) sources.add('Gas');

        return Array.from(sources);
    }, [allData, selectedLocation]);
    
    // Update graph sources when location changes to select all by default
    useEffect(() => {
        if (availableSources.length > 0) {
            setGraphSources(availableSources);
        } else {
            setGraphSources([]);
        }
    }, [availableSources]);

    const evidenceCards: BenefitData[] = [
        { 
            value: `${formatValue(aggregatedMetrics?.full_year_projection)} MT`, 
            title: (<>Annual Emissions<br />(YTD + Projected)</>), 
            description: <>YTD: <b>{formatValue(aggregatedMetrics?.actual_emissions)} MT</b><br />Projected: <b>{formatValue(aggregatedMetrics?.projected_emissions)} MT</b><br/>YoY: <b>{aggregatedMetrics?.actual_yoy_pct === 'N/A' ? 'N/A' : formatValue(aggregatedMetrics?.actual_yoy_pct, 'percent')}</b> | Over by: <b>{formatValue(aggregatedMetrics?.over_by)} MT</b><br/></>, 
            watermark: '🔥' 
        },
        { 
            value: `${formatValue(aggregatedMetrics?.compliance_target)} MT`, 
            title: (<>Compliance Target<br />by 2030</>), 
            description: <>State: <b>{aggregatedMetrics?.compliance_jurisdiction}</b><br/>Required by law<br/><b>{formatValue(aggregatedMetrics?.required_reduction_pct, 'percent')}</b> reduction</>, 
            watermark: '⚖️' 
        },
        { 
            value: `${formatValue(aggregatedMetrics?.bradley_solution)} MT`, 
            title: 'Emission Compliance Energy Supply Configuration', 
            description: <><b>{formatValue(aggregatedMetrics?.bradley_reduction_pct, 'percent')}</b> Reduction<br/>Saves: <b>{formatValue(aggregatedMetrics?.bradley_savings, 'currency')}/yr</b><br/>ROI: <b>{
                selectedLocations.length > 1 
                ? `${formatValue(aggregatedMetrics?.bradley_roi_years)} - ${formatValue(aggregatedMetrics?.bradley_roi_sum)} years`
                : `${formatValue(aggregatedMetrics?.bradley_roi_years)} years`
            }</b></>, 
            watermark: '💡' 
        },
    ];
    
    const HelpButton = ({ onClick }: { onClick: () => void }) => (
        <IconButton 
            size="small" 
            onClick={onClick} 
            sx={{ 
                ml: 0.5,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.15) rotate(10deg)',
                    color: 'primary.main'
                }
            }}
        >
            <HelpOutline sx={{fontSize: '1.1rem'}} />
        </IconButton>
    );

    // --- CHANGE 1 & 3 ---
    // Modal titles are simple strings now (defaults to black)
    // Insight logic is confirmed to be present and correct
    const renderModalContent = () => {
        const content: { title: React.ReactNode; body: React.ReactNode } = {
            title: '',
            body: <></>
        }
        
        switch (modalContentId) {
    case 0:
        content.title = <span style={{ color: '#000' }}>How to Optimize Your Energy Mix</span>;
        content.body = (
            <>
                <Typography sx={{ mt: 1.5, mb: 2, color: '#555', fontSize: '0.9rem' }}>
                    Adjusting your Distributed Energy Resource (DER) mix can significantly impact your emissions and compliance status. This panel allows you to experiment with different configurations to find the optimal balance for your operations.
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                    <Typography variant="body1"><strong>Key Insights:</strong></Typography>
                    {frozenDerInsights && frozenDerInsights.length > 0 ? (
  <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
    {frozenDerInsights.map((insight, index) => (
      <li key={index} style={{ marginTop: '4px' }}>{insight}</li>
    ))}
  </ul>
) : (
  <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 1 }}>
    No specific insights available for this configuration.
  </Typography>
)}

                </Paper>
            </>
        );
        break;
    case 1:
                content.title = <span style={{ color: '#000' }}>Reading Your Performance Chart</span>;
                if (selectedLocations.length > 1) {
                    content.body = (
                        <>
                            <Typography sx={{ mt: 1.5, mb: 2, color: '#555' }}>
                                This chart compares performance across all selected locations, breaking down emissions by source and projection status against key benchmarks.
                            </Typography>
                            <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                    <li><b>Stacked Bars</b> show the Total Emissions profile:
                                        <ul style={{ marginTop: '4px', marginBottom: '4px' }}>
                                            <li><b>Solid colors</b> (e.g. <span style={{ color: colorPalette.gridActual }}>■</span>, <span style={{ color: colorPalette.gasActual }}>■</span>) represent recorded <b>Actual</b> emissions.</li>
                                            <li><b>Lighter shades</b> (e.g. <span style={{ color: colorPalette.gridProjected }}>■</span>, <span style={{ color: colorPalette.gasProjected }}>■</span>) represent <b>Projected</b> forecasts for the remainder of the year.</li>
                                        </ul>
                                    </li>
                                    <li style={{ marginTop: '8px' }}>The <b><span style={{ color: colorPalette.target }}>Red Bar</span></b> indicates the specific <b>Compliance Target</b> for that location.</li>
                                    <li style={{ marginTop: '8px' }}>The <b><span style={{ color: colorPalette.withBradley }}>Green Bar</span></b> shows the reduced emissions level achievable with the <b>EmissionCheckIQ+</b> solution.</li>
                                    <li style={{ marginTop: '8px' }}><i>Locations are sorted by highest total emissions to help prioritize high-impact sites.</i></li>
                                </ul>
                            </Paper>
                        </>
                    );
                } else {
                    content.body = (
                        <>
                            <Typography sx={{ mt: 1.5, mb: 2, color: '#555' }}>
                                This chart visualizes your monthly progress, comparing your actual emissions to critical benchmarks. Use it to track trends and validate your strategy.
                            </Typography>
                            <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                    <li><b>Solid colors</b> (e.g. <span style={{ color: colorPalette.gridActual }}>■</span>, <span style={{ color: colorPalette.gasActual }}>■</span>): Your recorded historical emissions (Actuals).</li>
                                    <li style={{ marginTop: '8px' }}><b>Lighter shades</b> (e.g. <span style={{ color: colorPalette.gridProjected }}>■</span>, <span style={{ color: colorPalette.gasProjected }}>■</span>): AI-powered forecasts for upcoming months.</li>
                                    <li style={{ marginTop: '8px' }}>The <b style={{ color: colorPalette.target }}>Red Target Line</b>: Your monthly compliance limit. Staying below this is key to avoiding penalties.</li>
                                    <li style={{ marginTop: '8px' }}>The <b style={{ color: colorPalette.withBradley }}>Green EmissionCheckIQ+ Line</b>: Projected emissions if you adopt our recommended solution.</li>
                                </ul>
                            </Paper>
                        </>
                    );
                }
                break;
    case 2:
        content.title = <span style={{ color: '#000' }}>Understanding Your Action Plan</span>;
        content.body = (
            <>
                <Typography sx={{ mt: 1.5, mb: 2, color: '#555' }}>
                    Here, we turn data into a clear, actionable roadmap. Our goal is to provide a comprehensive solution that not only solves your compliance problem but also delivers long-term value.
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                    <Typography variant="body1"><strong>Key Insights:</strong></Typography>
                     {frozenActionInsights && frozenActionInsights.length > 0 ? (
  <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
    {frozenActionInsights.map((insight, index) => (
      <li key={index} style={{ marginTop: '4px' }}>{insight}</li>
    ))}
  </ul>
) : (
  <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 1 }}>
    No specific insights available for this action plan.
  </Typography>
)}

                </Paper>
            </>
        );
        break;
    case 3:
        content.title = <span style={{ color: '#000' }}>Emission Reduction Projects Explained</span>;
        content.body = (
            <>
                <Typography sx={{ mt: 1.5, mb: 2, color: '#555' }}>
                    This section outlines various projects that can help reduce your emissions. Each project targets specific areas of your operations, contributing to your overall compliance strategy.
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                    <Typography variant="body1"><strong>Project Details:</strong></Typography>
                    <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                        {Object.entries(staticProjectKeys).map(([formattedKey, backendKey]) => (
                            <li key={formattedKey} style={{ marginTop: '4px' }}>
                                <b>{formattedKey}:</b> Reduces emissions by <b>{formatValue(data?.emission_reduction_projects?.[backendKey])} MT</b>
                            </li>
                        ))}
                    </ul>
                </Paper>
            </>
        );
        break;
    case 4:
        content.title = <span style={{ color: '#000' }}>SREC Impact Overview</span>;
        content.body = (
            <>
                <Typography sx={{ mt: 1.5, mb: 2, color: '#555' }}>
                    Solar Renewable Energy Credits (SRECs) can significantly offset your compliance costs. This section provides insights into how varying SREC percentages impact your overall strategy.
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                    <Typography variant="body1"><strong>SREC Metrics Explained:</strong></Typography>
                    {calculatedSrecMetrics ? (
                        <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                            <li>Estimated Annual SREC Value: <b>{formatValue(calculatedSrecMetrics.reduced_emissions_mtpy, 'currency')}</b></li>
                            <li style={{ marginTop: '4px' }}>Impact on Penalty Risk: <b>{formatValue(calculatedSrecMetrics.srec_needed_mwh, 'currency')}</b></li>
                            <li style={{ marginTop: '4px' }}>Net Cost After SRECs: <b>{formatValue(calculatedSrecMetrics.total_srec_cost_usd, 'currency')}</b></li>
                        </ul>
                    ) : (
                        <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 1 }}>
                            SREC metrics are not available for the current configuration.
                        </Typography>
                    )}
                </Paper>
            </>
        );
        break;
    case 10: 
                content.title = <span style={{ color: '#000' }}>Annual Emissions</span>;
                content.body = (
                    <>
                        <Typography sx={{ mt: 1.5, mb: 2, color: '#555' }}>
                            This card summarizes your total emissions profile for {selectedLocations.length > 1 ? 'all selected locations' : 'this location'}, based on current data and future projections.
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                                <li style={{ marginTop: '8px' }}><b>YTD (Year-to-Date):</b> {formatValue(aggregatedMetrics?.actual_emissions)} MT. This is your actual, recorded emissions so far.</li>
                                <li style={{ marginTop: '8px' }}><b>Projected:</b> {formatValue(aggregatedMetrics?.projected_emissions)} MT. This is our AI-forecast for the rest of the year.</li>
                                <li style={{ marginTop: '8px' }}><b>Full Projection:</b> {formatValue(aggregatedMetrics?.full_year_projection)} MT. The (YTD + Projected) total.</li>
                                <li style={{ marginTop: '8px' }}><b>YoY (Year-over-Year):</b> {aggregatedMetrics?.actual_yoy_pct === '—' || aggregatedMetrics?.actual_yoy_pct === 'N/A' ? 'N/A' : formatValue(aggregatedMetrics?.actual_yoy_pct, 'percent')}. Your emissions are tracking this much higher than the previous year.</li>
                                <li style={{ marginTop: '8px' }}><b>Over By:</b> {formatValue(aggregatedMetrics?.over_by)} MT. This is how much your full projection exceeds your annual compliance target.</li>
                            </ul>
                        </Paper>
                    </>
                );
                break;
            case 11: 
                content.title = <span style={{ color: '#000' }}>Compliance Target By 2030</span>;
                content.body = (
                    <>
                        <Typography sx={{ mt: 1.5, mb: 2, color: '#555' }}>
                            This card details the specific legal requirements {selectedLocations.length > 1 ? 'aggregated for the selected locations' : 'for this location'} you must meet by 2030.
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                                <li style={{ marginTop: '8px' }}><b>Target:</b> {formatValue(aggregatedMetrics?.compliance_target)} MT. Your annual emissions must be at or below this level by 2030.</li>
                                <li style={{ marginTop: '8px' }}><b>Jurisdiction:</b> {aggregatedMetrics?.compliance_jurisdiction}. This is the governing body (e.g., state, city) setting the mandate.</li>
                                <li style={{ marginTop: '8px' }}><b>Required Reduction:</b> {formatValue(aggregatedMetrics?.required_reduction_pct, 'percent')}. This is the total reduction required from your baseline to meet the 2030 target.</li>
                            </ul>
                        </Paper>
                    </>
                );
                break;
            case 12: 
                content.title = <span style={{ color: '#000' }}>Emission Compliance Energy Supply Configuration</span>;
                content.body = (
                    <>
                        <Typography sx={{ mt: 1.5, mb: 2, color: '#555' }}>
                            This card outlines the high-level benefits of adopting the EmissionCheckIQ+ recommended energy configuration {selectedLocations.length > 1 ? 'across all selected locations' : ''}.
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                                <li style={{ marginTop: '8px' }}><b>Projected Emissions:</b> {formatValue(aggregatedMetrics?.bradley_solution)} MT. Your new annual emissions after implementing the solution.</li>
                                <li style={{ marginTop: '8px' }}><b>Total Reduction:</b> {formatValue(aggregatedMetrics?.bradley_reduction_pct, 'percent')}. The percentage decrease from your current projected emissions.</li>
                                <li style={{ marginTop: '8px' }}><b>Annual Savings:</b> {formatValue(aggregatedMetrics?.bradley_savings, 'currency')}. This is the estimated amount you will save <i>per year</i> by avoiding penalties.</li>
                                <li style={{ marginTop: '8px' }}><b>ROI (Return on Investment):</b> {formatValue(aggregatedMetrics?.bradley_roi_years)} years. The estimated time it will take for the solution's savings to pay for its initial investment.</li>
                            </ul>
                        </Paper>
                    </>
                );
                break;
    default:
        return null;
}
        return (
            <>
                <IconButton onClick={handleCloseModal} sx={{position: 'absolute', top: 8, right: 8}}><Close /></IconButton>
                {/* --- CHANGE 1 --- */}
                {/* Title is rendered as a simple h6, which defaults to black */}
                <Typography variant="h6" component="h2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>{content.title}</Typography>
                <Box sx={{ fontFamily: 'Nunito Sans, sans-serif' }}>{content.body}</Box>
            </>
        );
    };

    // const utilizationPct = data?.verdict?.limit_utilization_pct ?? 0;
    // const severity = data?.verdict?.severity || 'INFO';
    // const status_banner = data?.verdict?.status_banner || 'Status not available';
    // let complianceBannerBg: string;
    // let complianceBannerBorder: string;
    // let complianceBannerColor: string;
    // let complianceIcon: string;
    // let progressBarColor: string;
    // let statusColor: string;
    // let statusIcon: ReactNode;
    
    // switch (severity) {
    //     case 'INFO':
    //         complianceBannerBg = '#e8f5e9';
    //         complianceBannerBorder = '#4caf50';
    //         complianceBannerColor = '#1b5e20';
    //         complianceIcon = '✅';
    //         progressBarColor = '#388E3C';
    //         statusColor = '#388E3C'; // Green
    //         statusIcon = <CheckCircle sx={{ fontSize: '1rem', verticalAlign: 'middle' }} />;
    //         break;
    //     case 'WARNING':
    //         complianceBannerBg = '#fffde7';
    //         complianceBannerBorder = '#fdd835';
    //         complianceBannerColor = '#f57f17';
    //         complianceIcon = '⚠️';
    //         progressBarColor = '#fdd835';
    //         statusColor = '#f57f17'; // Yellow/Orange
    //         statusIcon = <Warning sx={{ fontSize: '1rem', verticalAlign: 'middle' }} />;
    //         break;
    //     case 'CRITICAL':
    //         complianceBannerBg = '#fff3e0';
    //         complianceBannerBorder = '#ff9800';
    //         complianceBannerColor = '#e65100';
    //         complianceIcon = '❗';
    //         progressBarColor = '#ff9800';
    //         statusColor = '#e65100'; // Dark Orange
    //         statusIcon = <Error sx={{ fontSize: '1rem', verticalAlign: 'middle' }} />;
    //         break;
    //     case 'OVERLOAD':
    //     default:
    //         complianceBannerBg = '#ffebee';
    //         complianceBannerBorder = '#d32f2f';
    //         complianceBannerColor = '#b71c1c';
    //         complianceIcon = '☠️';
    //         progressBarColor = '#d32f2f';
    //         statusColor = '#d32f2f'; // Red
    //         statusIcon = <Error sx={{ fontSize: '1rem', verticalAlign: 'middle' }} />;
    //         break;
    // }

    // const initialEmissionFactor = data?.srec_metrics?.emission_factor_constant || 0.433;
    // const initialReducedEmissions = data?.srec_metrics?.reduced_emissions_mtpy || 0;
    // const initialCreditsNeeded = data?.srec_metrics?.srec_needed_mwh || 0;

    // useEffect(() => {
    //     if (data?.srec_metrics?.percentage_needed && srecPercentage === 0) {
    //         const optimal = data.srec_metrics.percentage_needed;
    //         onSrecPercentageChange(optimal);
    //         // onSrecChangeCommitted(optimal); 
    //     }
    // }, [data, srecPercentage, onSrecPercentageChange]);

    // const currentMetrics = calculatedSrecMetrics || data?.srec_metrics;

    

    useEffect(() => {
    if (availableLocations.length > 0 && selectedLocations.length === 0) {
        setSelectedLocations(availableLocations); // Select all by default
    }
}, [availableLocations]);



const isMultiLocation = selectedLocations.length > 1;

const getSeverityColors = (severity: string) => {
    switch (severity) {
        case 'INFO':
            return {
                bg: '#e8f5e9',
                border: '#4caf50',
                color: '#1b5e20',
                icon: '✅',
                progressBar: '#388E3C',
                statusColor: '#388E3C',
                statusIcon: <CheckCircle sx={{ fontSize: '1rem', verticalAlign: 'middle' }} />
            };
        case 'WARNING':
            return {
                bg: '#fffde7',
                border: '#fdd835',
                color: '#f57f17',
                icon: '⚠️',
                progressBar: '#fdd835',
                statusColor: '#f57f17',
                statusIcon: <Warning sx={{ fontSize: '1rem', verticalAlign: 'middle' }} />
            };
        case 'CRITICAL':
            return {
                bg: '#fff3e0',
                border: '#ff9800',
                color: '#e65100',
                icon: '❗',
                progressBar: '#ff9800',
                statusColor: '#e65100',
                statusIcon: <Error sx={{ fontSize: '1rem', verticalAlign: 'middle' }} />
            };
        case 'OVERLOAD':
        default:
            return {
                bg: '#ffebee',
                border: '#d32f2f',
                color: '#b71c1c',
                icon: '☠️',
                progressBar: '#d32f2f',
                statusColor: '#d32f2f',
                statusIcon: <Error sx={{ fontSize: '1rem', verticalAlign: 'middle' }} />
            };
    }
};

// Get colors based on current view
const distinctSeverities = useMemo(() => {
    return new Set(filteredDataByLocations.map(d => d.verdict?.severity || 'INFO'));
}, [filteredDataByLocations]);

const isUniformStatus = distinctSeverities.size === 1;
const uniformSeverity = isUniformStatus ? Array.from(distinctSeverities)[0] : null;

// 2. Determine the "Effective" severity for the main container styling
// If mixed, we use a custom 'MIXED' flag to trigger neutral styling
const effectiveSeverity = isUniformStatus ? uniformSeverity : 'MIXED';

// 3. Get colors based on the effective severity
const getContainerColors = (sev: string | null) => {
    if (sev === 'MIXED' || !sev) {
        return {
            bg: '#f8f9fa',       // Neutral Grey Background
            border: '#e0e0e0',   // Neutral Grey Border
            color: '#424242',
            icon: '',            // No icon for mixed container
            // progressBar: '#9e9e9e',
            statusColor: 'black',
            statusIcon: null
        };
    }
    return getSeverityColors(sev);
};

const containerColors = getContainerColors(effectiveSeverity);

// 4. Determine Animation
// Only animate if Uniform AND (Critical OR Overload)
const containerAnimation = (isUniformStatus && (effectiveSeverity === 'CRITICAL' || effectiveSeverity === 'OVERLOAD'))
    ? `${effectiveSeverity === 'OVERLOAD' ? pulseWarning : pulseCritical} 2s infinite`
    : 'none';

// Use these for the Main Table Container
const complianceBannerBg = containerColors.bg;
const complianceBannerBorder = containerColors.border;
// const complianceBannerColor = containerColors.color;
const statusColor = containerColors.statusColor;

// Severity for the status banner text
// const severity = isUniformStatus ? uniformSeverity : 'Mixed Statuses';

// Use these throughout the component
// const complianceBannerBg = severityColors.bg;
// const complianceBannerBorder = severityColors.border;
// const complianceBannerColor = severityColors.color;
// const complianceIcon = severityColors.icon;
// const progressBarColor = severityColors.progressBar;
// const statusColor = severityColors.statusColor;
// const statusIcon = severityColors.statusIcon;
// const severity = currentSeverity;

const [quickFixData, setQuickFixData] = useState<DashboardDataObject | null>(null);

const handleOpenQuickFix = (rowData: DashboardDataObject) => {
        setQuickFixData(rowData);
        setQuickFixModalOpen(true);
    };

    const handleCloseQuickFix = () => {
        setQuickFixModalOpen(false);
        setQuickFixData(null);
    };

    // const [expandedLocations, setExpandedLocations] = useState<string[]>([]);

    // const handleToggleLocation = (location: string) => {
    //     setExpandedLocations(prev => 
    //         prev.includes(location) 
    //             ? prev.filter(l => l !== location) 
    //             : [...prev, location]
    //     );
    // };

     const aggregateLocationData = useMemo(() => {
        if (selectedLocations.length === 0 || !allData || !selectedYear) return [];

        return selectedLocations.map(loc => {
            const locData = allData.find(d => d.location === loc);
            const m = locData?.evidence?.metrics;
            if (!locData) return null;

            // Calculate Granular Totals based on Selected Year
            let grid_actual = 0;
            let grid_projected = 0;
            let gas_actual = 0;
            let gas_projected = 0;

            const monthlyData = locData.monthly_tracking?.monthly_emissions?.filter(em => em.year == selectedYear) || [];

            monthlyData.forEach(em => {
                grid_actual += em.grid_actual || 0;
                grid_projected += em.grid_projected || 0;
                gas_actual += em.gas_actual || 0;
                gas_projected += em.gas_projected || 0;
            });

            // Calculate total for sorting
            const currentTotal = grid_actual + grid_projected + gas_actual + gas_projected;

            return {
                location: loc.length > 15 ? loc.substring(0, 15) + '...' : loc,
                fullName: loc,
                // Granular values for stacking
                grid_actual,
                grid_projected,
                gas_actual,
                gas_projected,
                // Totals for comparison
                current: currentTotal,
                target: m?.compliance_target || 0,
                solution: m?.bradley_solution || 0
            };
        })
        .filter(Boolean)
        .sort((a: any, b: any) => b.current - a.current);
    }, [allData, selectedLocations, selectedYear]);

useEffect(() => {
    if (availableYears.length > 0) {
        onYearChange(availableYears[0]);
    }
}, [availableYears]);

useEffect(() => {
    if (availableSources.length > 0) {
        setGraphSources(availableSources);
    }
}, [availableSources]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;900&display=swap');
                
                .ref-line-target .recharts-reference-line-line,
                .ref-line-bradley .recharts-reference-line-line {
                    transition: all 0.2s ease-in-out;
                }
                
                .ref-line-target .recharts-reference-line-line:hover,
                .ref-line-bradley .recharts-reference-line-line:hover {
                    stroke-width: 2.5;
                    stroke-opacity: 1;
                }
            `}</style>
            
            <Modal 
                open={modalOpen} 
                onClose={handleCloseModal}
            >
                <ModalBox>{renderModalContent()}</ModalBox>
            </Modal>

            <StyledTitle variant="h6">EmissionCheckIQ+ Dashboard</StyledTitle>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: { xs: '20px', md: '80px' } }}>
                <Paper variant="outlined" sx={{ 
                    p: 2, 
                    position: 'relative', 
                    borderRadius: 2, 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    animation: `${fadeIn} 0.5s ease-out`
                }}>
                    <Box sx={{ position: 'absolute', top: 16, right: 24, display: 'flex', gap: 2 }}>
                        <FormControl size="small">
    <Select
        multiple
        value={selectedLocations}
        onChange={(e: SelectChangeEvent<string[]>) => {
            const value = e.target.value;
            if (typeof value === 'string') return;
            
            // Handle "Select All" logic
            if (value.includes('SELECT_ALL')) {
                if (selectedLocations.length === availableLocations.length) {
                    setSelectedLocations([]);
                } else {
                    setSelectedLocations(availableLocations);
                }
            } else {
                setSelectedLocations(value);
            }
        }}
        renderValue={(selected) => 
            selected.length === availableLocations.length 
                ? 'All Locations' 
                : selected.length === 1
                ? selected[0]
                : `${selected.length} Locations`
        }
        sx={{ 
            fontSize: '0.8rem', 
            fontFamily: 'Nunito Sans, sans-serif',
            '& .MuiSelect-select': {
                fontSize: '0.8rem',
                fontFamily: 'Nunito Sans, sans-serif'
            }
        }}
        MenuProps={{
            PaperProps: {
                sx: {
                    '& .MuiMenuItem-root': {
                        fontSize: '0.8rem',
                        fontFamily: 'Nunito Sans, sans-serif',
                        py: 0.5
                    }
                }
            }
        }}
    >
        <MenuItem value="SELECT_ALL" sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }}>
            <Checkbox 
                checked={selectedLocations.length === availableLocations.length}
                indeterminate={selectedLocations.length > 0 && selectedLocations.length < availableLocations.length}
                size="small"
            />
            <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }}>
                Select All
            </Typography>
        </MenuItem>
        {availableLocations.map(loc => (
            <MenuItem 
                key={loc} 
                value={loc}
                sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }}
            >
                <Checkbox 
                    checked={selectedLocations.indexOf(loc) > -1}
                    size="small"
                />
                <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }}>
                    {loc}
                </Typography>
            </MenuItem>
        ))}
    </Select>
</FormControl>
                        {/* <FormControl size="small">
                            <Select
                                value={selectedSource}
                                onChange={(e: SelectChangeEvent<string>) => onSourceChange(e.target.value)}
                                sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }}
                            >
                                {availableSources.map(src => <MenuItem
                                    key={src}
                                    value={src}
                                    sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif'}}
                                >
                                    {src.charAt(0).toUpperCase() + src.slice(1)}
                                </MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl size="small">
                            <Select
                                value={selectedYear}
                                onChange={(e: SelectChangeEvent<string | number>) => onYearChange(e.target.value)}
                                sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }}
                            >
                                {availableYears.map(year => <MenuItem
                                    key={year}
                                    value={year}
                                    sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }}
                                >
                                    {year}
                                </MenuItem>)}
                            </Select>
                        </FormControl> */}
                    </Box>
                    <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1rem' }}>COMPLIANCE STATUS</Typography>
                    
                    <Paper 
    variant="outlined" 
    sx={{ 
        mt: 3, 
        backgroundColor: complianceBannerBg, // Uses neutral if mixed, specific color if uniform
        textAlign: 'center', 
        p: 1, 
        borderColor: complianceBannerBorder,
        borderRadius: '8px',
        // Apply animation only if uniform AND critical/overload
        animation: containerAnimation,
        position: 'relative',
        transition: 'all 0.3s ease'
    }}
>
    <TableContainer>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell><strong>Location</strong></TableCell>
                    {/* <TableCell><strong>Source</strong></TableCell> */}
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Utilization</strong></TableCell>
                    <TableCell><strong>Area (sq ft)</strong></TableCell>
                    <TableCell><strong>Emissions (MT)</strong></TableCell>
                    <TableCell><strong>EUI</strong></TableCell>
                    <TableCell><strong>Limit (MT)</strong></TableCell>
                    <TableCell><strong>Action</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
    {[...filteredDataByLocations]
  .sort((a, b) => {
    const nameA = (a.location || '').toString().toLowerCase();
    const nameB = (b.location || '').toString().toLowerCase();
    return nameA.localeCompare(nameB);
  })
  .map((locationData) => {
        const locationSeverity = locationData.verdict?.severity || 'INFO';
        
        // Calculate specific colors for this ROW only
        const rowColors = getSeverityColors(locationSeverity);
        const isRowCritical = locationSeverity === 'CRITICAL' || locationSeverity === 'OVERLOAD';
        
        return (
            <TableRow 
                // key={locationData.file_id || `${locationData.location}-${locationData.source}`}
                key={locationData._id}
                sx={{
                    // Light background for the specific row based on its status
                    backgroundColor: locationSeverity === 'INFO' ? 'rgba(56, 142, 60, 0.05)' :
                                     locationSeverity === 'WARNING' ? 'rgba(245, 127, 23, 0.05)' :
                                     'rgba(211, 47, 47, 0.05)', // Red tint for critical
                    borderLeft: `4px solid ${rowColors.statusColor}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: 'white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }
                }}
            >
                <TableCell>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {typeof locationData.location === 'string'
                            ? (locationData.location.length > 30 ? `${locationData.location.slice(0, 27)}...` : locationData.location)
                            : locationData.location}
                    </Typography>
                </TableCell>
                {/* <TableCell>
                    <Typography variant="caption">
                        {locationData.source}
                    </Typography>
                </TableCell> */}
                <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: rowColors.statusColor }}>
                        {rowColors.statusIcon}
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {locationSeverity}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: rowColors.statusColor }}>
                        {formatValue(locationData.verdict?.limit_utilization_pct, 'percent')}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="caption">{formatValue(locationData.area_sq_ft)}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="caption">{formatValue(locationData.evidence?.metrics?.full_year_projection)}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="caption">{formatValue(locationData.energy_usage_intensity)}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="caption">{formatValue(locationData.evidence?.metrics?.compliance_target)}</Typography>
                </TableCell>
                <TableCell>
                    <Button 
                        size="small" 
                        variant="contained"
                        onClick={() => handleOpenQuickFix(locationData)}
                        sx={{ 
                            fontSize: '0.7rem',
                            bgcolor: rowColors.statusColor,
                            color: 'white',
                            fontWeight: 600,
                            // If this specific row is critical, give the button a subtle glow/pulse
                            animation: isRowCritical ? `${pulseCritical} 2s infinite` : 'none',
                            boxShadow: isRowCritical ? '0 0 8px rgba(211, 47, 47, 0.5)' : 'none',
                            '&:hover': {
                                bgcolor: rowColors.statusColor,
                                filter: 'brightness(0.9)',
                            }
                        }}
                    >
                        Purchase Credits
                    </Button>
                </TableCell>
            </TableRow>
        );
    })}
</TableBody>
        </Table>
    </TableContainer>
</Paper>

<Modal 
    open={quickFixModalOpen} 
    onClose={handleCloseQuickFix}
>
    <ModalBox sx={{ 
        width: 650, 
        maxWidth: '90vw',
        // Use quickFixData for styling, fallback to defaults if null
        borderTop: `4px solid ${quickFixData ? getSeverityColors(quickFixData.verdict?.severity).border : complianceBannerBorder}`,
        borderBottom: `4px solid ${quickFixData ? getSeverityColors(quickFixData.verdict?.severity).border : complianceBannerBorder}`,
    }}>
        <IconButton onClick={handleCloseQuickFix} sx={{position: 'absolute', top: 8, right: 8}}>
            <Close />
        </IconButton>
        
        {/* Derive colors specifically for this modal instance */}
        {(() => {
            const activeData = quickFixData || data; // Fallback to global data if quickFix is null
            const activeSeverity = activeData?.verdict?.severity || 'INFO';
            const activeColors = getSeverityColors(activeSeverity);
            
            // Local metrics for this specific row
            const activeMetrics = activeData?.srec_metrics;
            // const activeEvidence = activeData?.evidence?.metrics;

            const creditsNeeded = activeMetrics?.srec_needed_mwh || 0;
            const reducedEmissions = activeMetrics?.reduced_emissions_mtpy || 0;
            const emissionFactor = activeMetrics?.emission_factor_constant || 0.433;
            const penaltyRisk = activeData?.verdict?.penalty_risk_usd || 0;
            const optimalPercentage = activeMetrics?.percentage_needed || 0;
            // const totalSrecCost = activeMetrics?.total_srec_cost_usd || 0;
            // const reducedEmissionsMtpy = activeMetrics?.reduced_emissions_mtpy || 0;
            // const srecNeeded = activeMetrics?.srec_needed_mwh || 0;

            return (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Typography variant="h6" component="h2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: '#000' }}>
                            Purchase Solar Renewable Energy Credits (SRECs)
                        </Typography>
                        {/* <Box sx={{ 
                            bgcolor: activeColors.bg, 
                            color: activeColors.color, 
                            border: `1px solid ${activeColors.border}`,
                            px: 1, py: 0.5, borderRadius: 1, fontSize: '0.7rem', fontWeight: 'bold' 
                        }}>
                            {activeData?.location}
                        </Box> */}
                    </Box>
                    
                    <Typography sx={{ fontSize: '0.85rem', color: '#666', mb: 3, fontFamily: 'Nunito Sans, sans-serif' }}>
                        Avoid {formatValue(penaltyRisk, 'currency')} penalty while you work on long-term solutions
                    </Typography>

                    <Paper 
                        variant="outlined" 
                        sx={{ 
                            p: 2, 
                            mb: 3, 
                            bgcolor: activeColors.bg,
                            borderColor: activeColors.border,
                            borderWidth: 2,
                        }}
                    >
                        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '0.9rem', mb: 1.5, color: activeColors.color }}>
                            💡 CREDITS NEEDED FOR COMPLIANCE:
                        </Typography>
                        
                        <Box sx={{ textAlign: 'center', py: 2 }}>
                            <Typography sx={{ fontSize: '0.85rem', fontFamily: 'Nunito Sans, sans-serif', color: '#666', mb: 1 }}>
                                You need
                            </Typography>
                            <Typography sx={{ 
                                fontSize: '2.5rem', 
                                fontWeight: 'bold', 
                                fontFamily: 'Nunito Sans, sans-serif',
                                color: activeColors.color,
                                lineHeight: 1,
                            }}>
                                {/* {Math.ceil((data?.evidence?.metrics?.over_by || 0) / (data?.srec_metrics?.emission_factor_constant || 0.433))} */}
                                {/* {formatValue(calculatedSrecMetrics?.srec_needed_mwh) === 'N/A' ? '0' : formatValue(calculatedSrecMetrics?.srec_needed_mwh)} */}
                                {formatValue(creditsNeeded)}
                            </Typography>
                            <Typography sx={{ fontSize: '0.85rem', fontFamily: 'Nunito Sans, sans-serif', color: '#666', mt: 0.5 }}>
                                SRECs to get back to compliance
                            </Typography>
                        </Box>
                        
                        <Box sx={{ mt: 2, p: 1.5, bgcolor: 'white', borderRadius: 1, border: `1px dashed ${activeColors.border}` }}>
                            <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', textAlign: 'center', color: '#666' }}>
                                {/* <b>Calculation:</b> {formatValue(calculatedSrecMetrics?.reduced_emissions_mtpy) === 'N/A' ? '0' : formatValue(calculatedSrecMetrics?.reduced_emissions_mtpy)} MT/yr ÷ {data?.srec_metrics?.emission_factor_constant} = {Math.ceil((data?.evidence?.metrics?.over_by || 0) / (data?.srec_metrics?.emission_factor_constant))} {formatValue(calculatedSrecMetrics?.srec_needed_mwh) === 'N/A' ? '0' : formatValue(calculatedSrecMetrics?.srec_needed_mwh)} MWh SRECs */}
                                <b>Calculation:</b> {formatValue(reducedEmissions)} MT/yr ÷ {emissionFactor * 1000} = {formatValue(creditsNeeded)} SRECs
                            </Typography>
                        </Box>
                    </Paper>

                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '0.9rem', mb: 1.5, display: 'flex', alignItems: 'center', gap: 0.5, color: '#000' }}>
                        <span>🛒</span> CONFIGURE YOUR PURCHASE:
                    </Typography>

                    <Paper 
                        variant="outlined" 
                        sx={{ 
                            p: 2.5,
                            transition: 'all 0.3s ease',
                            border: `2px solid ${activeColors.border}`,
                            bgcolor: 'white',
                        }}
                    >
                        {/* Slider Section */}
                        <Box sx={{ mb: 2.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                    ☀️ Solar RECs - Purchase Percentage
                                </Typography>
                                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1.1rem', color: activeColors.color }}>
                                    {srecPercentage}%
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Slider
                                    value={srecPercentage}
                                    onChange={(_, newValue) => onSrecPercentageChange(newValue as number)}
                                    onChangeCommitted={(_, newValue) => onSrecChangeCommitted(newValue as number, quickFixData || data)}
                                    sx={{ 
                                        flex: 1,
                                        color: activeColors.progressBar, // Dynamic slider color
                                        '& .MuiSlider-thumb': { 
                                            transition: 'all 0.1s ease',
                                            backgroundColor: activeColors.statusColor
                                        },
                                        '& .MuiSlider-track': {
                                            backgroundColor: activeColors.progressBar
                                        }
                                    }}
                                />
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => {
                                        const percentage = activeMetrics?.percentage_needed || 0;
                                        onSrecPercentageChange(percentage);
                                        onSrecChangeCommitted(percentage, quickFixData || data);
                                    }}
                                    sx={{
                                        fontFamily: 'Nunito Sans, sans-serif',
                                        fontSize: '0.7rem',
                                        whiteSpace: 'nowrap',
                                        minWidth: '115px',
                                        bgcolor: activeColors.color,
                                        '&:hover': {
                                            bgcolor: activeColors.statusColor,
                                        }
                                    }}
                                >
                                    Optimal {optimalPercentage}%
                                </Button>
                            </Box>
                        </Box>

                        {/* Metrics Grid */}
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography sx={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Nunito Sans, sans-serif', mb: 0.5 }}>
                                        Total Cost (USD)
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Nunito Sans, sans-serif', color: activeColors.color }}>
                                        {formatValue(srecPercentage === 0 ? 0 : (calculatedSrecMetrics ? calculatedSrecMetrics.total_srec_cost_usd : activeMetrics?.total_srec_cost_usd), 'currency')}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography sx={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Nunito Sans, sans-serif', mb: 0.5 }}>
                                        Emission Offset
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Nunito Sans, sans-serif', color: '#1b5e20' }}>
                                        {formatValue(srecPercentage === 0 ? 0 : (calculatedSrecMetrics ? calculatedSrecMetrics.reduced_emissions_mtpy : activeMetrics?.reduced_emissions_mtpy))} MT/yr
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography sx={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Nunito Sans, sans-serif', mb: 0.5 }}>
                                        SRECs Needed
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Nunito Sans, sans-serif' }}>
                                        {formatValue(srecPercentage === 0 ? 0 : (calculatedSrecMetrics ? calculatedSrecMetrics.srec_needed_mwh : activeMetrics?.srec_needed_mwh))}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
                        <Button 
                            variant="outlined" 
                            size="small"
                            onClick={handleCloseQuickFix}
                            sx={{ 
                                fontFamily: 'Nunito Sans, sans-serif',
                                borderColor: activeColors.border,
                                color: activeColors.color,
                                '&:hover': {
                                    borderColor: activeColors.statusColor,
                                    bgcolor: `${activeColors.bg}80`,
                                }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="contained" 
                            size="small"
                            sx={{ 
                                fontFamily: 'Nunito Sans, sans-serif',
                                bgcolor: activeColors.progressBar,
                                color: 'white',
                                fontWeight: 'bold',
                                '&:hover': { 
                                    bgcolor: activeColors.statusColor,
                                }
                            }}
                        >
                            Purchase SRECs
                        </Button>
                    </Box>
                </>
            );
        })()}
    </ModalBox>
</Modal>

                    {/* <Box sx={{ position: 'relative', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', margin: '16px auto', maxWidth: '100%' }}>
                        <Box sx={{
                            width: `${utilizationPct > 100 ? 100 : utilizationPct}%`,
                            height: '100%',
                            backgroundColor: progressBarColor,
                            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            animation: `${progressFill} 1s ease-out`
                        }} />
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Typography sx={{
                                color: utilizationPct > 40 ? '#fff' : '#000',
                                textShadow: utilizationPct > 40 ? '0px 0px 3px rgba(0,0,0,0.5)' : 'none',
                                fontFamily: 'Nunito Sans, sans-serif',
                                fontWeight: 'bold',
                                fontSize: '0.75rem',
                                lineHeight: '20px'
                            }}>
                                {formatValue(utilizationPct, 'percent')} Utilization
                            </Typography>
                        </Box>
                    </Box>
                    
                    <Grid container spacing={1} sx={{ textAlign: 'center' }}>
                        <Grid item xs={4} sx={{ animation: `${fadeIn} 0.6s ease-out`}}>
                            <Typography sx={{fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5}}>
                                STATUS: <b style={{ color: statusColor, display: 'flex', alignItems: 'center', gap: '4px' }}>{statusIcon} {severity}</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ animation: `${fadeIn} 0.7s ease-out`}}>
                            <Typography sx={{fontSize: '0.8rem'}}>PENALTY RISK: <b>{formatValue(data?.verdict?.penalty_risk_usd, 'currency')}</b></Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ animation: `${fadeIn} 0.8s ease-out`}}>
                            <Typography sx={{fontSize: '0.8rem'}}>TIME LEFT: <b>{data?.verdict?.time_left_months} MONTHS</b></Typography>
                        </Grid>
                    </Grid> */}
                </Paper>

                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: 2, 
                    mt: 1,
                }}>
                    {evidenceCards.map((benefit, index) => (
                        <Box key={index} sx={{ flex: 1, animation: `${fadeInDown} 0.5s ease-out ${0.6 + index * 0.1}s backwards`, opacity: 0, animationFillMode: 'forwards' }}>
                            <EnhancedBenefitCard 
                                benefit={benefit} 
                                onClick={() => handleOpenModal(10 + index)}
                                // Pass statusColor to first card and green to third card (index 2)
                                valueColor={index === 0 ? statusColor : index === 2 ? '#388E3C' : 'black'}
                            />
                        </Box>
                    ))}
                </Box>

                <Paper elevation={0} sx={{ 
                    width: '100%', 
                    mt: 4, 
                    backgroundColor: 'transparent',
                    animation: `${fadeIn} 0.8s ease-out`
                }}>
                    <Box sx={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e0e0e0', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                        <Tabs
                            value={isMultiLocation ? 1 : tabValue}
                            onChange={handleTabChange}
                            centered
                            sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                '& .MuiTab-root': { 
                                    fontFamily: 'Nunito Sans, sans-serif', 
                                    margin: '0 18px', 
                                    textTransform: 'none',
                                    transition: 'all 0.2s ease',
                                    borderRadius: '4px 4px 0 0',
                                    '&:hover': {
                                        backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                        transform: 'translateY(-2px)'
                                    }
                                },
                            }}
                        >
                            <Tab disabled={isMultiLocation} label={<span>Interactive Emission<br />Modelling Dashboard</span>} />
                            <Tab label={<span>Simulated Emissions from<br />Alternate Energy Source(s)</span>} />
                            <Tab disabled={isMultiLocation} label={<span>Immediate Emission<br />Compliance Configuration</span>} />
                            <Tab disabled={isMultiLocation} label={<span>Energy Conservation &<br />Reduction Measures</span>} />
                        </Tabs>
                        
                        <TabPanel value={isMultiLocation ? 1 : tabValue} index={0}>
                            <StyledTabPanelBox> 
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2}}>
                                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>VISUALIZE YOUR FUTURE ENERGY SUPPLY AND EMISSIONS</Typography>
                                    <HelpButton onClick={() => handleOpenModal(0)} />
                                </Box>
                                <TableContainer component={Paper} variant="outlined">
                                    <Table size="small">
                                        <TableHead sx={{ backgroundColor: '#fafafa' }}>
                                            <TableRow>
                                                <TableCell sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>DER System</TableCell>
                                                <TableCell align="center" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>Preferred Gen. % to achieve<br />GHG Emission Compliance</TableCell>
                                                <TableCell align="center" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', width: '30%' }}>Your Allocation</TableCell>
                                                <TableCell align="right" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>Impact (MT)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>{derOrder.map((name, idx) => {
                                            const backendKey = Object.keys(derNameMapping).find(key => derNameMapping[key] === name) || '';
                                            const recMix = data?.der_control_panel?.recommended_mix_pct;
                                            const impactValue = data?.der_control_panel?.impact_by_der?.[backendKey] ?? 0;
                                            const bradleyValue = recMix?.[backendKey] ?? 0;
                                            const userValue = (userDerAllocation as any)[name] ?? 0;
                                            const isPlant = name === 'GRID';
                                            return (
                                                <StyledTableRow 
                                                    key={name} 
                                                    className="animated-row"
                                                    style={{ animationDelay: `${idx * 50}ms` }}
                                                    sx={{ backgroundColor: isPlant ? '#f5f5f5' : '#fff' }}
                                                >
                                                    <TableCell sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 600 }}>{name}</TableCell>
                                                    <TableCell align="center" sx={{ fontFamily: 'Nunito Sans, sans-serif' }}>{formatValue(bradleyValue, 'percent')}</TableCell>
                                                    <TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Slider 
                                                            value={userValue} 
                                                            onChange={(_, v) => handleSliderChange(name, v as number)} 
                                                            disabled={isPlant} 
                                                            sx={{ '& .MuiSlider-thumb': { transition: 'all 0.1s ease'/* , '&:hover': { transform: 'scale(1.3)' } */}}}
                                                        />
                                                        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', width: '40px' }}>{formatValue(userValue, 'percent')}</Typography>
                                                    </Box></TableCell>
                                                    <TableCell align="right">
                                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                                                            {impactValue < 0 ? <TrendingDown sx={{ fontSize: '1rem', color: 'success.main' }} /> : (impactValue > 0 ? <TrendingUp sx={{ fontSize: '1rem', color: 'error.main' }} /> : null)}
                                                            <Typography 
                                                                sx={{ 
                                                                    fontFamily: 'Nunito Sans, sans-serif', 
                                                                    fontWeight: 'bold', 
                                                                    // --- CHANGE 2 ---
                                                                    // All non-negative numbers (0 and >0) are red
                                                                    color: impactValue < 0 ? 'success.main' : 'error.main' 
                                                                }}
                                                            >
                                                                {formatValue(impactValue)}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                </StyledTableRow>
                                            );
                                        })}</TableBody>
                                    </Table>
                                </TableContainer>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                                    <Button sx={{ fontFamily: 'Nunito Sans, sans-serif' }} size="small" variant="outlined" onClick={handleReset}>Reset to Current</Button>
                                    <Button sx={{ fontFamily: 'Nunito Sans, sans-serif' }} size="small" variant="contained" onClick={handleApplyRecommendation}>Apply desired configuration of power generation</Button>
                                    <Button sx={{ fontFamily: 'Nunito Sans, sans-serif' }} size="small" variant="outlined" onClick={handleConfirm} disabled={!isChanged}>Confirm Changes</Button>
                                </Box>
                            </StyledTabPanelBox>
                        </TabPanel>
                        <TabPanel value={isMultiLocation ? 1 : tabValue} index={1}>
                            <StyledTabPanelBox>
                                <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 2 }}>
                                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>MONTHLY PERFORMANCE & FORECASTING</Typography>
                                    <HelpButton onClick={() => handleOpenModal(1)} />
                                    
                                    {/* Filters: ALWAYS Visible now */}
                                    <Box sx={{ position: 'absolute', right: 19, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {/* Multi-Select Source Filter */}
                                        <FormControl size="small">
    <Select
        multiple
        value={graphSources}
        onChange={(e: SelectChangeEvent<string[]>) => {
            const value = e.target.value;
            if (typeof value === 'string') return;

            if (value.includes('SELECT_ALL')) {
                if (graphSources.length === availableSources.length) {
                    setGraphSources([]);
                } else {
                    setGraphSources(availableSources);
                }
            } else {
                setGraphSources(value);
            }
        }}
        renderValue={(selected) =>
            selected.length === availableSources.length
                ? 'All Sources'
                : selected.length === 1
                ? selected[0]
                : `${selected.length} Sources`
        }
        sx={{
            fontSize: '0.8rem',
            fontFamily: 'Nunito Sans, sans-serif',
            minWidth: 140
        }}
        MenuProps={{
            PaperProps: {
                sx: {
                    '& .MuiMenuItem-root': {
                        fontSize: '0.8rem',
                        fontFamily: 'Nunito Sans, sans-serif',
                        py: 0.5
                    }
                }
            }
        }}
    >
        <MenuItem value="SELECT_ALL">
            <Checkbox
                checked={
                    graphSources.length === availableSources.length &&
                    availableSources.length > 0
                }
                indeterminate={
                    graphSources.length > 0 &&
                    graphSources.length < availableSources.length
                }
                size="small"
            />
            <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }}>
                Select All
            </Typography>
        </MenuItem>

        {availableSources.map((src) => (
            <MenuItem key={src} value={src}>
                <Checkbox checked={graphSources.includes(src)} size="small" />
                <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }}>
                    {src}
                </Typography>
            </MenuItem>
        ))}
    </Select>
</FormControl>

<FormControl size="small">
    <Select
        value={selectedYear}
        onChange={(e: SelectChangeEvent<string | number>) => onYearChange(e.target.value)}
        sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }}
    >
        {availableYears.map((year) => (
            <MenuItem
                key={year}
                value={year}
                sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }}
            >
                {year}
            </MenuItem>
        ))}
    </Select>
</FormControl>

                                    </Box>
                                </Box>

                                {selectedLocations.length !== 1 ? (
                                    // MULTI-LOCATION VIEW: Horizontal Detailed Bar Chart
                                    <Box sx={{ height: Math.max(400, selectedLocations.length * 60), width: '100%', mt: 1 }}>
                                        {aggregateLocationData.length > 0 ? (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart
                                                    layout="vertical"
                                                    data={aggregateLocationData}
                                                    margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                                                    barGap={4}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                                    <XAxis type="number" tick={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }} />
                                                    <YAxis 
                                                        dataKey="location" 
                                                        type="category" 
                                                        tick={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', fontWeight: 600 }}
                                                        width={120}
                                                    />
                                                    <Tooltip 
                                                        cursor={{ fill: 'rgba(230, 230, 230, 0.4)' }}
                                                        contentStyle={{ fontFamily: 'Nunito Sans, sans-serif', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                        labelFormatter={(label, payload) => payload[0]?.payload?.fullName || label}
                                                    />
                                                    <Legend wrapperStyle={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }} />
                                                    
                                                    {/* Stacked Current Emissions Bar (Projected+Actual for selected sources) */}
                                                    {graphSources.map((source) => [
                                                        <Bar 
                                                            key={`${source}-actual-agg`} 
                                                            dataKey={`${source.toLowerCase()}_actual`} 
                                                            name={`${source} (Actual)`} 
                                                            stackId="current" 
                                                            fill={getColorForSource(source, 'actual')} 
                                                            barSize={20}
                                                            animationDuration={800} 
                                                        />,
                                                        <Bar 
                                                            key={`${source}-projected-agg`} 
                                                            dataKey={`${source.toLowerCase()}_projected`} 
                                                            name={`${source} (Projected)`} 
                                                            stackId="current" 
                                                            fill={getColorForSource(source, 'projected')} 
                                                            barSize={20}
                                                            animationDuration={800} 
                                                        />
                                                    ])}

                                                    {/* Comparison Bars (Unstacked) */}
                                                    <Bar dataKey="target" name="Target" fill={colorPalette.target} barSize={20} radius={[0, 4, 4, 0]} animationDuration={800} />
                                                    <Bar dataKey="solution" name="With EmissionCheckIQ+" fill={colorPalette.withBradley} barSize={20} radius={[0, 4, 4, 0]} animationDuration={800} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Typography color="text.secondary">No data available for the selected year/filters.</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                ) : (
                                    <Box sx={{ height: 350 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={stackedChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" tick={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }} />
                                                <YAxis tick={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }} domain={[0, yAxisMaxStacked]} />
                                                <Tooltip
    cursor={{ fill: 'rgba(230, 230, 230, 0.4)' }}
    content={({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const targetVal = data?.monthly_tracking?.target_per_month;
            const bradleyVal = data?.monthly_tracking?.with_bradley_der_per_month;

            return (
                <div style={{
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    padding: '10px',
                    fontFamily: 'Nunito Sans, sans-serif',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    minWidth: '200px'
                }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '0.85rem' }}>{label}</p>
                    
                    {payload.map((entry: any, index: number) => (
                        <div key={index} style={{ color: entry.color, fontSize: '0.75rem', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{entry.name.replace('_actual', ' (Actual)').replace('_projected', ' (Projected)')}:</span>
                            <span style={{ fontWeight: 600 }}>{formatValue(entry.value)}</span>
                        </div>
                    ))}

                    <div style={{ height: '1px', backgroundColor: '#eee', margin: '8px 0' }}></div>

                    {(targetVal !== null && targetVal !== undefined) && (
                        <div style={{ color: colorPalette.target, fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Target:</span>
                            <span>{formatValue(targetVal)}</span>
                        </div>
                    )}

                    {(bradleyVal !== null && bradleyVal !== undefined) && (
                        <div style={{ color: colorPalette.withBradley, fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                            <span>With EmissionCheckIQ+:</span>
                            <span>{formatValue(bradleyVal)}</span>
                        </div>
                    )}
                </div>
            );
        }
        return null;
    }}
/>
                                                <Legend 
                                                    wrapperStyle={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}
                                                    payload={[
                                                        { value: 'Target', type: 'line', color: colorPalette.target },
                                                        { value: 'With EmissionCheckIQ+', type: 'line', color: colorPalette.withBradley },
                                                        { value: 'Actual Grid', type: 'square', color: colorPalette.gridActual },
                                                        { value: 'Actual Gas', type: 'square', color: colorPalette.gasActual },
                                                        { value: 'Projected Grid', type: 'square', color: colorPalette.gridProjected },
                                                        { value: 'Projected Gas', type: 'square', color: colorPalette.gasProjected },
                                                    ]}
                                                />
                                                {graphSources.map((source) => [
                                                    <Bar key={`${source}-actual-${selectedYear}`} dataKey={`${source.toLowerCase()}_actual`} name={`${source} (Actual)`} stackId="a" fill={getColorForSource(source, 'actual')} animationDuration={800} />,
                                                    <Bar key={`${source}-projected-${selectedYear}`} dataKey={`${source.toLowerCase()}_projected`} name={`${source} (Projected)`} stackId="a" fill={getColorForSource(source, 'projected')} animationDuration={800} />
                                                ])}
                                                { (data?.monthly_tracking?.target_per_month !== null && data?.monthly_tracking?.target_per_month !== undefined && isFinite(Number(data.monthly_tracking.target_per_month))) &&
                                                    <ReferenceLine y={Number(data.monthly_tracking.target_per_month)} stroke={colorPalette.target} strokeDasharray="3 3" strokeWidth={1.5} label={{ value: `Target: ${formatValue(data.monthly_tracking.target_per_month)} MT`, position: 'insideBottomRight', fill: colorPalette.target, fontFamily: 'Nunito Sans, sans-serif', fontSize: 12, fontWeight: 'bold' }} className="ref-line-target" />
                                                }
                                                { (data?.monthly_tracking?.with_bradley_der_per_month !== null && data?.monthly_tracking?.with_bradley_der_per_month !== undefined && isFinite(Number(data.monthly_tracking.with_bradley_der_per_month))) &&
                                                    <ReferenceLine y={Number(data.monthly_tracking.with_bradley_der_per_month)} stroke={colorPalette.withBradley} strokeDasharray="3 3" strokeWidth={1.5} label={{ value: `With EmissionCheckIQ+: ${formatValue(data.monthly_tracking.with_bradley_der_per_month)} MT`, position: 'insideTopRight', fill: colorPalette.withBradley, fontFamily: 'Nunito Sans, sans-serif', fontSize: 12, fontWeight: 'bold' }} className="ref-line-bradley" />
                                                }
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Box>
                                )}
                            </StyledTabPanelBox>
                        </TabPanel>
                        <TabPanel value={isMultiLocation ? 1 : tabValue} index={2}>
                                <StyledTabPanelBox sx={{minHeight: 360}}>
                                    <Box sx={{
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        pb: 2
                                    }}>
                                        <Typography sx={{ 
                                            fontFamily: 'Nunito Sans, sans-serif',  
                                            textAlign: 'center', 
                                            fontWeight: 'bold', 
                                            fontSize: '0.9rem' 
                                        }}>
                                            YOUR ACTION PLAN
                                        </Typography>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => handleOpenModal(2)}
                                            sx={{
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.2) rotate(15deg)',
                                                    color: '#1976d2'
                                                }
                                            }}
                                        >
                                            <HelpOutline sx={{fontSize: '1.1rem'}} />
                                        </IconButton>
                                    </Box>
                                    <Grid container spacing={3} alignItems="stretch">
                                        <Grid item xs={12} md={7}>
                                            <Grow in timeout={800}>
                                                <Paper variant="outlined" sx={{ 
                                                    p: 2.5, 
                                                    height: '87%', 
                                                    display: 'flex', 
                                                    flexDirection: 'column',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                                                        transform: 'translateY(-2px)'
                                                    }
                                                }}>
                                                    <Typography sx={{ 
                                                        fontFamily: 'Nunito Sans, sans-serif', 
                                                        fontWeight: 'bold', 
                                                        fontSize: '1rem', 
                                                        mb: 1.5 
                                                    }}>
                                                        RECOMMENDED SOLUTION
                                                    </Typography>
                                                    <Card variant="outlined" sx={{ 
                                                        flexGrow: 1,
                                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        color: 'white'
                                                    }}>
                                                        <CardContent sx={{
                                                            display: 'flex', 
                                                            flexDirection: 'column', 
                                                            height: '100%', 
                                                            justifyContent: 'space-between'
                                                        }}>
                                                            <div>
                                                                <Typography sx={{ 
                                                                    fontFamily: 'Nunito Sans, sans-serif', 
                                                                    fontWeight: 'bold',
                                                                    color: 'white',
                                                                    fontSize: '1.1rem'
                                                                }}>
                                                                    📋 {data?.action_center?.recommended_solution?.title}
                                                                </Typography>
                                                                <ul style={{ 
                                                                    fontSize: '0.9rem', 
                                                                    margin: '12px 0', 
                                                                    paddingLeft: '20px',
                                                                    color: 'rgba(255,255,255,0.95)'
                                                                }}>
                                                                    {data?.action_center?.recommended_solution?.components?.map(c => (
                                                                        <li key={c.type}>
                                                                            {`${c.size} ${derNameMapping[c.type] || c.type}`}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                                <Typography sx={{ 
                                                                    fontFamily: 'Nunito Sans, sans-serif',
                                                                    color: 'rgba(255,255,255,0.95)'
                                                                }}>
                                                                    <b>Investment:</b> {formatValue(data?.action_center?.recommended_solution?.investment_usd, 'currency')} | <b>Payback:</b> {data?.action_center?.recommended_solution?.payback_years} years
                                                                </Typography>
                                                            
                                                                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                                                    <Button 
                                                                        sx={{
                                                                            fontFamily: 'Nunito Sans, sans-serif',
                                                                            bgcolor: 'white',
                                                                            color: '#667eea',
                                                                            '&:hover': {
                                                                                bgcolor: 'rgba(255,255,255,0.9)',
                                                                                transform: 'scale(1.05)'
                                                                            },
                                                                            transition: 'all 0.3s ease'
                                                                        }} 
                                                                        variant="contained" 
                                                                        size="small"
                                                                    >
                                                                        Schedule Consultation
                                                                    </Button>
                                                                    <Button 
                                                                        sx={{
                                                                            fontFamily: 'Nunito Sans, sans-serif',
                                                                            borderColor: 'white',
                                                                            color: 'white',
                                                                            '&:hover': {
                                                                                borderColor: 'white',
                                                                                bgcolor: 'rgba(255,255,255,0.1)',
                                                                                transform: 'scale(1.05)'
                                                                            },
                                                                            transition: 'all 0.3s ease'
                                                                        }} 
                                                                        variant="outlined" 
                                                                        size="small"
                                                                    >
                                                                        Email Proposal
                                                                    </Button>
                                                                </Box>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Paper>
                                            </Grow>
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <Grow in timeout={1000}>
                                                <Paper variant="outlined" sx={{ 
                                                    p: 2.5, 
                                                    height: '87%', 
                                                    display: 'flex', 
                                                    flexDirection: 'column',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                                                        transform: 'translateY(-2px)'
                                                    }
                                                }}>
                                                    <Typography sx={{ 
                                                        fontFamily: 'Nunito Sans, sans-serif', 
                                                        fontWeight: 'bold', 
                                                        fontSize: '1rem', 
                                                        mb: 1.5 
                                                    }}>
                                                        ALTERNATIVE OPTIONS
                                                    </Typography>
                                                    <Stack spacing={2}
                                                    sx={{
                                                          '--card-h': '112px',                            
                                                          maxHeight: 'calc(var(--card-h) * 2 + 16px)',    
                                                          overflowY: 'auto',
                                                          pr: 1,                                          
                                                          scrollbarWidth: 'none',                         
                                                          msOverflowStyle: 'none',                        
                                                          '&::-webkit-scrollbar': { width: 0, height: 0 }
                                                        }}
                                                    >
                                                        {data?.action_center?.alternatives?.map((alt, idx) => (
                                                            <Zoom in timeout={600 + idx * 200} key={alt.title}>
                                                                <Card 
                                                                    variant="outlined"
                                                                    sx={{
                                                                          transition: 'all 0.3s ease',
                                                                          minHeight: '147px',
                                                                          background: 'linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%)',
                                                                          '&:hover': {
                                                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                                            transform: 'scale(1.03)',
                                                                            borderColor: '#1976d2'
                                                                          }
                                                                        }}
                                                                >
                                                                    <CardContent sx={{py: 1.5, '&:last-child': { pb: 1.5 }}}>
                                                                        <Typography sx={{ 
                                                                            fontFamily: 'Nunito Sans, sans-serif', 
                                                                            fontWeight: 'bold' 
                                                                        }}>
                                                                            {alt.title.includes("Quick") || alt.title.includes("Solar") ? '💡' : '🚀'} {alt.title}
                                                                        </Typography>
                                                                        <Typography sx={{
                                                                            fontFamily: 'Nunito Sans, sans-serif', 
                                                                            fontSize: '0.85rem'
                                                                        }}>
                                                                            <b>Investment:</b> {formatValue(alt.investment_usd, 'currency')}<br />
                                                                            <b>Reduction:</b> {formatValue(alt.reduction_pct, 'percent')}
                                                                        </Typography>
                                                                        {alt.estimated_penalties_remaining_usd_per_year != null && (
                                                                            <Typography sx={{ 
                                                                                fontFamily: 'Nunito Sans, sans-serif', 
                                                                                fontWeight: 'bold', 
                                                                                fontSize: '0.85rem', 
                                                                                color: alt.estimated_penalties_remaining_usd_per_year > 0 ? '#ff3b30' : '#34c759' 
                                                                            }}>
                                                                                Penalties: {formatValue(alt.estimated_penalties_remaining_usd_per_year, 'currency')}/yr
                                                                            </Typography>
                                                                        )}
                                                                        {alt.carbon_negative_by_year != null && (
                                                                            <Typography sx={{ 
                                                                                fontFamily: 'Nunito Sans, sans-serif', 
                                                                                fontSize: '0.85rem' 
                                                                            }}>
                                                                                <b>Carbon -ve by year:</b> {alt.carbon_negative_by_year}
                                                                            </Typography>
                                                                        )}
                                                                    </CardContent>
                                                                </Card>
                                                            </Zoom>
                                                        ))}
                                                    </Stack>
                                                </Paper>
                                            </Grow>
                                        </Grid>
                                    </Grid>
                                </StyledTabPanelBox>
                            </TabPanel>
                        <TabPanel value={isMultiLocation ? 1 : tabValue} index={3}>
    {/* --- Box 1: Emission Reduction Projects --- */}
    <StyledTabPanelBox sx={{maxHeight: 410, fontFamily: 'Nunito Sans, sans-serif', mb: 2}}> {/* Added mb: 2 for spacing */}
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2}}>
        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif',  textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>EMISSION REDUCTION PROJECTS</Typography>
        <HelpButton onClick={() => handleOpenModal(3)} /></Box>
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
            <Table size="small">
                <TableHead sx={{ backgroundColor: '#fafafa' }}>
                    <TableRow>
                        <TableCell sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>Emission Reduction Projects</TableCell>
                        <TableCell align="right" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>Estimated Reduction (MT)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(staticProjectKeys).map(([formattedKey, backendKey], idx) => {
                        const isSelected = !!projectSelections[formattedKey];
                        return (
                            <StyledTableRow
                                key={formattedKey}
                                hover
                                onClick={() => onProjectSelectChange(formattedKey)}
                                className="animated-row"
                                style={{ animationDelay: `${idx * 50}ms` }}
                                sx={{
                                    cursor: 'pointer',
                                    backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                                }}
                            >
                                <TableCell sx={{
                                    fontFamily: 'Nunito Sans, sans-serif',
                                    fontWeight: isSelected ? 700 : 400,
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={isSelected}
                                            size="small"
                                            sx={{ mr: 1, p: 0.5 }}
                                        />
                                        {formattedKey}
                                    </Box>
                                </TableCell>
                                <TableCell align="right" sx={{
                                    fontFamily: 'Nunito Sans, sans-serif',
                                    fontWeight: isSelected ? 700 : 400,
                                    color: isSelected ? '#1976d2' : 'inherit',
                                }}>
                                    {formatValue(data?.emission_reduction_projects?.[backendKey])} MT
                                </TableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
                <TableFooter sx={{ backgroundColor: cumulativeReduction > 0 ? '#e8f5e9' : '#ffebee', borderTop: '2px solid', borderColor: cumulativeReduction > 0 ? '#1b5e20' : '#d32f2f', transition: 'all 0.3s ease' }}>
                    <TableRow sx={{ height: '40px' }}>
                        <TableCell colSpan={2} align="right" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '1rem' }}>
                            <span style={{ fontWeight: 700, marginRight: 8 }}>Cumulative Reduction:</span>
                            <span style={{ fontWeight: 700, color: cumulativeReduction > 0 ? '#1b5e20' : '#d32f2f' }}>{formatValue(cumulativeReduction)} MT</span>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </StyledTabPanelBox>

    {/* --- Box 2: Renewable Energy Credits --- */}
    {/* <StyledTabPanelBox sx={{ fontFamily: 'Nunito Sans, sans-serif'}}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2}}>
        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif',  textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>
            Renewable Energy Credits (RECs)
        </Typography>
        <HelpButton onClick={() => handleOpenModal(4)} /></Box>
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
            <Table size="small">
                <TableHead sx={{ backgroundColor: '#fafafa' }}>
                    <TableRow>
                        <TableCell sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>Renewable Energy Credits</TableCell>
                        <TableCell align="right" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', width: '60%' }}>Purchase Percentage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <TableCell sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 600 }}>Solar RECs</TableCell>
                        <TableCell align="right">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 1 }}>
                                <Slider
                                    value={srecPercentage}
                                    onChange={(_, newValue) => onSrecPercentageChange(newValue as number)}
                                    onChangeCommitted={(_, newValue) => onSrecChangeCommitted(newValue as number)}
                                    aria-labelledby="srec-slider"
                                    sx={{ '& .MuiSlider-thumb': { transition: 'all 0.1s ease' }}}
                                />
                                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', width: '50px' }}>
                                    {srecPercentage}%
                                </Typography>
                            </Box>
                        </TableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
        
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={4} sx={{ animation: `${fadeIn} 0.5s ease-out 0.2s backwards`, opacity: 0, animationFillMode: 'forwards'}}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', backgroundColor: 'white', transition: 'all 0.3s ease', '&:hover': {transform: 'translateY(-4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: 'grey.700' }}>Reduced Emissions (MT/yr)</Typography>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1.25rem', color: '#1b5e20' }}>
                        {formatValue(calculatedSrecMetrics?.reduced_emissions_mtpy) === 'N/A' ? '0' : formatValue(calculatedSrecMetrics?.reduced_emissions_mtpy)}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} sx={{ animation: `${fadeIn} 0.5s ease-out 0.3s backwards`, opacity: 0, animationFillMode: 'forwards'}}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', backgroundColor: 'white', transition: 'all 0.3s ease', '&:hover': {transform: 'translateY(-4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: 'grey.700' }}>SREC Needed (MWh)</Typography>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1.25rem' }}>
                        {formatValue(calculatedSrecMetrics?.srec_needed_mwh) === 'N/A' ? '0' : formatValue(calculatedSrecMetrics?.srec_needed_mwh)}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} sx={{ animation: `${fadeIn} 0.5s ease-out 0.4s backwards`, opacity: 0, animationFillMode: 'forwards'}}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', backgroundColor: 'white', transition: 'all 0.3s ease', '&:hover': {transform: 'translateY(-4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: 'grey.700' }}>Total SREC Cost (USD)</Typography>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1.25rem' }}>
                        {formatValue(calculatedSrecMetrics?.total_srec_cost_usd, 'currency') === 'N/A' ? '$0.00' : formatValue(calculatedSrecMetrics?.total_srec_cost_usd, 'currency')}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    </StyledTabPanelBox> */}
</TabPanel>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};
export default EmissionsDashboard;