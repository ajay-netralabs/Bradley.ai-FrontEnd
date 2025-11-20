import React, { useState, useMemo, useEffect, ReactNode } from 'react';
import {
    Box, Typography, Card, styled, CardContent, Paper, Tabs, Tab, FormControl,
    Select, MenuItem, Slider, Button, Grid, Table, TableBody, TableCell,
    TableContainer, TableRow, TableHead, Modal, IconButton, Stack, SelectChangeEvent, Checkbox, TableFooter,
    Zoom,
    Grow,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import { 
    HelpOutline, Close, 
    // Icons for polish
    TrendingUp, TrendingDown, CheckCircle, Warning, Error 
} from '@mui/icons-material';
// Import keyframes for animations
import { keyframes } from '@mui/system';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend, Cell } from 'recharts';
// --- Import SRECMetrics type ---
import { SRECMetrics } from '../../../../Context/DashboardDataContext';

// --- TYPE DEFINITIONS ---
interface DashboardDataObject {
    file_id: string;
    source: string;
    location: string;
    verdict: { /* compliance_status: string; */ status_banner: string; severity: string; penalty_risk_usd: number; time_left_months: number; limit_utilization_pct: number; };
    evidence: { metrics: { actual_emissions: number; projected_emissions: number; full_year_projection: number; actual_yoy_pct: number | string; compliance_target: number; compliance_jurisdiction: string; required_reduction_pct: number; bradley_solution?: number; bradley_reduction_pct?: number; over_by: number; bradley_savings?: number; bradley_roi_years?: number; } };
    emission_reduction_projects: {
        [key: string]: number;
    };
    srec_metrics: SRECMetrics; // Use imported type
    der_control_panel: {
        current_mix_pct: { [key: string]: number };
        recommended_mix_pct: { [key: string]: number };
        impact_by_der: { [key: string]: number };
        insights?: string[];
    };
    monthly_tracking: { target_per_month: number | string | null; with_bradley_der_per_month: number | string | null; monthly_emissions: { month: string | number; year: number | string; actual: number | null; projected: number | null; }[]; };
    action_center: {
        recommended_solution: { title: string; components: { type: string; size: string; }[]; investment_usd: number; payback_years: number; eliminates_penalties: boolean; };
        alternatives?: { title: string; investment_usd: number; reduction_pct: number; estimated_penalties_remaining_usd_per_year?: number; carbon_negative_by_year?: number; }[];
        insights?: string[];
    };
}

// --- IMPROVED COLOR PALETTE FOR CHART ---
const colorPalette = {
    actual: '#424242',     // Dark Grey
    projected: '#BDBDBD',   // Light Grey
    target: '#d32f2f',     // Strong Red
    withBradley: '#388E3C', // Clear Green
};

// --- STABLE CSS KEYFRAME ANIMATIONS ---
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInFromLeft = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const zoomIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const progressFill = keyframes`
  from { width: 0; }
`;

const pulseWarning = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(211, 47, 47, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(211, 47, 47, 0); }
  100% { box-shadow: 0 0 0 0 rgba(211, 47, 47, 0); }
`;

const pulseCritical = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(255, 152, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 152, 0, 0); }
`;


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


// --- HELPER FUNCTIONS & DATA ---
const formatValue = (value?: number | string | null, type: 'number' | 'currency' | 'percent' = 'number'): string => { if (value === null || value === undefined || value === "") return 'N/A'; const num = typeof value === 'string' ? parseFloat(value) : value; if (isNaN(num)) return 'N/A'; const options: Intl.NumberFormatOptions = { maximumFractionDigits: 2 }; if (type === 'currency') { options.style = 'currency'; options.currency = 'USD'; options.minimumFractionDigits = 2; } if (type === 'percent') { return `${num.toFixed(1)}%`; } return new Intl.NumberFormat('en-US', options).format(num); };
const derOrder = ['Solar PV', 'Battery Storage', 'CHP', 'Fuel Cells', 'Simple Turbines', 'Linear Generation', 'GRID'];
const derNameMapping: {[key: string]: string} = { solar_pv: 'Solar PV', battery_storage: 'Battery Storage', chp: 'CHP', fuel_cells: 'Fuel Cells', simple_turbines: 'Simple Turbines', linear_generation: 'Linear Generation', grid: 'GRID', efficiency_retrofit: 'Efficiency Retrofit' };
const staticProjectKeys: { [key: string]: string } = { 'Lighting': 'Lighting', 'Ventilation': 'Ventilation', 'Cooling': 'Cooling', 'Other (Pumps, Small Motors, Common Areas)': 'Other (pumps, small motors, common areas)', 'Refrigeration': 'Refrigeration', 'Computing/IT': 'Computing/IT', 'Space Heating (Electric)': 'space heating (electric)' };

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
        <CardContent sx={{ position: 'relative', zIndex: 2, py: 0.1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 600, fontSize: '1rem', mb: 0.5 }}>{benefit.title}</Typography>
            <AbsoluteValue sx={{ color: valueColor ?? '#333' }}>{benefit.value}</AbsoluteValue>
            <BenefitDescription>{benefit.description}</BenefitDescription>
        </CardContent>
    </StyledBenefitCard>
);

const HelpButton = ({ onClick }: { onClick: () => void }) => (
    <IconButton size="small" onClick={onClick} sx={{ ml: 0.5, transition: 'all 0.2s ease-in-out', '&:hover': { transform: 'scale(1.15) rotate(10deg)', color: 'primary.main' }}}>
        <HelpOutline sx={{fontSize: '1.1rem'}} />
    </IconButton>
);


// --- PROPS INTERFACES ---
interface EmissionsDashboardProps {
    allData: DashboardDataObject[];
    onConfirmChanges: (userMix: {[key:string]: number}, location: string, source: string) => void;
    hasUnsavedChanges: boolean;
    setHasUnsavedChanges: (changed: boolean) => void;
    selectedLocation: string;
    onLocationChange: (location: string) => void;
    selectedSource: string;
    onSourceChange: (source: string) => void;
    selectedYear: number | string;
    onYearChange: (year: number | string) => void;
    
    projectSelections: { [key: string]: boolean };
    onProjectSelectChange: (key: string) => void;
    srecPercentage: number;
    onSrecPercentageChange: (value: number) => void;
    onSrecChangeCommitted: (value: number) => void;
    calculatedSrecMetrics: SRECMetrics | null;
}

interface IndividualViewProps extends EmissionsDashboardProps {
    data: DashboardDataObject | undefined;
}


// --- AGGREGATE VIEW COMPONENT (ENHANCED) ---
const AggregateView: React.FC<{ allData: DashboardDataObject[], selectedYear: number | string }> = ({ allData, selectedYear }) => {
    const [tabValue, setTabValue] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContentId, setModalContentId] = useState<number | null>(null);

    const handleOpenModal = (id: number) => { setModalContentId(id); setModalOpen(true); };
    const handleCloseModal = () => { setModalContentId(null); setModalOpen(false); };
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTabValue(newValue);

    const aggregateData = useMemo(() => {
        if (!allData || allData.length === 0) return null;
        
        const dataCount = allData.length;

        const result = {
            // Verdict
            totalPenaltyRisk: allData.reduce((sum, d) => sum + (d.verdict?.penalty_risk_usd ?? 0), 0),
            averageUtilization: allData.reduce((sum, d) => sum + (d.verdict?.limit_utilization_pct ?? 0), 0) / dataCount,
            severities: allData.map(d => d.verdict?.severity ?? 'INFO'),
            
            // Evidence
            totalFullYearProjection: allData.reduce((sum, d) => sum + (d.evidence.metrics?.full_year_projection ?? 0), 0),
            totalActualEmissions: allData.reduce((sum, d) => sum + (d.evidence.metrics?.actual_emissions ?? 0), 0),
            totalProjectedEmissions: allData.reduce((sum, d) => sum + (d.evidence.metrics?.projected_emissions ?? 0), 0),
            totalComplianceTarget: allData.reduce((sum, d) => sum + (d.evidence.metrics?.compliance_target ?? 0), 0),
            totalOverBy: allData.reduce((sum, d) => sum + (d.evidence.metrics?.over_by ?? 0), 0),
            totalBradleySolution: allData.reduce((sum, d) => sum + (d.evidence.metrics?.bradley_solution ?? 0), 0),
            totalBradleySavings: allData.reduce((sum, d) => sum + (d.evidence.metrics?.bradley_savings ?? 0), 0),
            
            // Monthly Tracking
            monthlyData: allData.flatMap(d => d.monthly_tracking.monthly_emissions)
                .reduce((acc, m) => {
                    const key = `${m.year}-${m.month}`;
                    if (!acc[key]) {
                        acc[key] = { month: m.month as string, year: m.year, actual: 0, projected: 0 };
                    }
                    acc[key].actual += m.actual ?? 0;
                    acc[key].projected += m.projected ?? 0;
                    return acc;
                }, {} as { [key: string]: { month: string, year: number | string, actual: number, projected: number } }),
            totalTargetPerMonth: allData.reduce((sum, d) => sum + Number(d.monthly_tracking.target_per_month || 0), 0),

            // DER Control Panel
            derAverages: Object.keys(derNameMapping).reduce((acc, key) => {
                acc.current[key] = allData.reduce((sum, d) => sum + (d.der_control_panel.current_mix_pct[key] ?? 0), 0) / dataCount;
                acc.recommended[key] = allData.reduce((sum, d) => sum + (d.der_control_panel.recommended_mix_pct[key] ?? 0), 0) / dataCount;
                acc.impact[key] = allData.reduce((sum, d) => sum + (d.der_control_panel.impact_by_der[key] ?? 0), 0);
                return acc;
            }, { current: {} as any, recommended: {} as any, impact: {} as any }),
            
            // Action Center
            totalRecommendedInvestment: allData.reduce((sum, d) => sum + (d.action_center.recommended_solution?.investment_usd ?? 0), 0),
            averagePaybackYears: allData.reduce((sum, d) => sum + (d.action_center.recommended_solution?.payback_years ?? 0), 0) / dataCount,
            uniqueAlternatives: [...new Map(allData.flatMap(d => d.action_center.alternatives ?? []).map(item => [item.title, item])).values()],

            // Emission Reduction Projects
            totalReductions: Object.keys(staticProjectKeys).reduce((acc, key) => {
                const backendKey = staticProjectKeys[key];
                acc[backendKey] = allData.reduce((sum, d) => sum + (d.emission_reduction_projects[backendKey] ?? 0), 0);
                return acc;
            }, {} as {[key: string]: number}),
        } as any;
        
        const severityOrder = ['INFO', 'WARNING', 'CRITICAL', 'OVERLOAD'];
        result.overallSeverity = result.severities.reduce((max: string, current: string) => severityOrder.indexOf(current) > severityOrder.indexOf(max) ? current : max, 'INFO');
        
        return result;
    }, [allData]);

    const aggregatedChartData = useMemo(() => {
        if (!aggregateData) return [];
        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        const filtered = Object.values(aggregateData.monthlyData).filter((em: any) => em.year == selectedYear);
        const processed = filtered.map((em: any) => {
            const monthIndex = Number(em.month) - 1;
            const monthName = (typeof em.month === 'number' || !isNaN(Number(em.month))) && monthIndex >= 0 && monthIndex < 12 
                ? monthOrder[monthIndex] 
                : String(em.month);
            return { ...em, month: monthName, emissions: em.actual > 0 ? em.actual : em.projected, fill: em.actual > 0 ? colorPalette.actual : colorPalette.projected };
        });
        return processed.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
    }, [aggregateData, selectedYear]);

    const yAxisMax = useMemo(() => {
        if (!aggregatedChartData || aggregatedChartData.length === 0) return 'auto';
        const maxBarValue = Math.max(...aggregatedChartData.map(entry => entry.emissions ?? 0), aggregateData?.totalTargetPerMonth ?? 0);
        if (maxBarValue === 0) return 1000;
        return Math.ceil((maxBarValue * 1.2) / 100) * 100;
    }, [aggregatedChartData, aggregateData]);

    const { complianceBannerBg, complianceBannerBorder, complianceBannerColor, complianceIcon, progressBarColor, statusColor, statusIcon } = useMemo(() => {
        const severity = aggregateData?.overallSeverity || 'INFO';
        switch (severity) {
            case 'WARNING': return { complianceBannerBg: '#fffde7', complianceBannerBorder: '#fdd835', complianceBannerColor: '#f57f17', complianceIcon: '⚠️', progressBarColor: '#fdd835', statusColor: '#f57f17', statusIcon: <Warning sx={{ fontSize: '1rem', verticalAlign: 'middle' }} /> };
            case 'CRITICAL': return { complianceBannerBg: '#fff3e0', complianceBannerBorder: '#ff9800', complianceBannerColor: '#e65100', complianceIcon: '❗', progressBarColor: '#ff9800', statusColor: '#e65100', statusIcon: <Error sx={{ fontSize: '1rem', verticalAlign: 'middle' }} /> };
            case 'OVERLOAD': return { complianceBannerBg: '#ffebee', complianceBannerBorder: '#d32f2f', complianceBannerColor: '#b71c1c', complianceIcon: '☠️', progressBarColor: '#d32f2f', statusColor: '#d32f2f', statusIcon: <Error sx={{ fontSize: '1rem', verticalAlign: 'middle' }} /> };
            case 'INFO': default: return { complianceBannerBg: '#e8f5e9', complianceBannerBorder: '#4caf50', complianceBannerColor: '#1b5e20', complianceIcon: '✅', progressBarColor: '#388E3C', statusColor: '#388E3C', statusIcon: <CheckCircle sx={{ fontSize: '1rem', verticalAlign: 'middle' }} /> };
        }
    }, [aggregateData?.overallSeverity]);

    const aggregateCards: BenefitData[] = useMemo(() => [
        { value: `${formatValue(aggregateData?.totalFullYearProjection)} MT`, title: 'Total Annual Emissions', description: <>Total YTD: <b>{formatValue(aggregateData?.totalActualEmissions)} MT</b><br/>Total Projected: <b>{formatValue(aggregateData?.totalProjectedEmissions)} MT</b></>, watermark: '🔥' },
        { value: `${formatValue(aggregateData?.totalComplianceTarget)} MT`, title: 'Combined Compliance Target', description: <>Across <b>{allData.length}</b> sources<br/>Total Over By: <b>{formatValue(aggregateData?.totalOverBy, 'number')} MT</b></>, watermark: '⚖️' },
        { value: `${formatValue(aggregateData?.totalBradleySolution)} MT`, title: 'Portfolio Compliance Emissions', description: <>Total Potential Savings:<br/><b>{formatValue(aggregateData?.totalBradleySavings, 'currency')}/yr</b></>, watermark: '💡' },
    ], [aggregateData, allData.length]);
    
    const renderModalContent = () => {
        const content = { title: '', body: <></> };
        switch(modalContentId) {
            case 0:
                content.title = "Aggregate DER Mix Overview";
                content.body = <Typography>This table shows the average current and recommended Distributed Energy Resource (DER) mixes across your entire portfolio. The "Total Impact" column shows the summed impact on emissions for each DER type. This view is read-only and provides a high-level summary of your portfolio's energy strategy.</Typography>;
                break;
            case 1:
                content.title = "Portfolio Performance & Forecasting";
                content.body = <Typography>This chart visualizes your portfolio's total monthly emissions. The bars represent the sum of actual (dark grey) and projected (light grey) emissions from all facilities. The red line represents the combined monthly compliance target for your entire portfolio, allowing you to track overall performance against your total obligations.</Typography>;
                break;
            case 2:
                content.title = "Portfolio Action Plan Summary";
                content.body = <Typography>This section summarizes the financial implications of recommended solutions across all your facilities. It shows the total required investment and the average payback period. It also compiles a list of all unique alternative strategies available within your portfolio for consideration.</Typography>;
                break;
            case 3:
                content.title = "Total Reduction Opportunities";
                content.body = <Typography>This table aggregates the potential emission reductions from various conservation and efficiency projects across all locations. Each row shows the total combined reduction (in MT) you could achieve by implementing that specific project type throughout your portfolio, highlighting the most impactful opportunities.</Typography>;
                break;
            default: return null;
        }
        return (
            <>
                <IconButton onClick={handleCloseModal} sx={{position: 'absolute', top: 8, right: 8}}><Close /></IconButton>
                <Typography variant="h6" component="h2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>{content.title}</Typography>
                <Box sx={{ fontFamily: 'Nunito Sans, sans-serif', mt: 2 }}>{content.body}</Box>
            </>
        );
    };

    if (!aggregateData) {
        return <Typography>No aggregate data available.</Typography>;
    }
    
    return (
        <Box>
            <Modal open={modalOpen} onClose={handleCloseModal}><ModalBox>{renderModalContent()}</ModalBox></Modal>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: { xs: '20px', md: '80px' } }}>
                <Paper variant="outlined" sx={{ p: 2, position: 'relative', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.03)', animation: `${fadeIn} 0.5s ease-out` }}>
                    <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1rem' }}>AGGREGATE COMPLIANCE STATUS</Typography>
                    <Paper variant="outlined" sx={{ mt: 3, backgroundColor: complianceBannerBg, textAlign: 'center', p: 1, borderColor: complianceBannerBorder, borderRadius: '8px', animation: (aggregateData.overallSeverity === 'OVERLOAD' || aggregateData.overallSeverity === 'CRITICAL') ? `${pulseWarning} 2s infinite` : 'none' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: complianceBannerColor, textAlign: 'left', pl: 1.5 }}>
                            {complianceIcon} Portfolio Status: {aggregateData.overallSeverity}
                        </Typography>
                    </Paper>
                    <Box sx={{ position: 'relative', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', margin: '16px auto', maxWidth: '100%' }}>
                        <Box sx={{ width: `${Math.min(100, aggregateData.averageUtilization)}%`, height: '100%', backgroundColor: progressBarColor, transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)', animation: `${progressFill} 1s ease-out` }} />
                        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography sx={{ color: aggregateData.averageUtilization > 40 ? '#fff' : '#000', textShadow: aggregateData.averageUtilization > 40 ? '0px 0px 3px rgba(0,0,0,0.5)' : 'none', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '0.75rem', lineHeight: '20px' }}>
                                {formatValue(aggregateData.averageUtilization, 'percent')} Avg. Utilization
                            </Typography>
                        </Box>
                    </Box>
                    <Grid container spacing={1} sx={{ textAlign: 'center' }}>
                        <Grid item xs={6} sx={{ animation: `${fadeIn} 0.6s ease-out` }}>
                            <Typography sx={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                OVERALL STATUS: <b style={{ color: statusColor, display: 'flex', alignItems: 'center', gap: '4px' }}>{statusIcon} {aggregateData.overallSeverity}</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ animation: `${fadeIn} 0.7s ease-out` }}>
                            <Typography sx={{ fontSize: '0.8rem' }}>TOTAL PENALTY RISK: <b>{formatValue(aggregateData.totalPenaltyRisk, 'currency')}</b></Typography>
                        </Grid>
                    </Grid>
                </Paper>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
                    {aggregateCards.map((benefit, index) => (
                        <Box key={index} sx={{ flex: 1, animation: `${fadeInDown} 0.5s ease-out ${0.6 + index * 0.1}s backwards`, opacity: 0, animationFillMode: 'forwards' }}>
                            <EnhancedBenefitCard benefit={benefit} onClick={() => {}} valueColor={index === 0 ? statusColor : index === 2 ? '#388E3C' : undefined} />
                        </Box>
                    ))}
                </Box>
                
                <Paper elevation={0} sx={{ width: '100%', mt: 4, backgroundColor: 'transparent', animation: `${fadeIn} 0.8s ease-out` }}>
                        <Box sx={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e0e0e0', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                            <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ borderBottom: 1, borderColor: 'divider', '& .MuiTab-root': { fontFamily: 'Nunito Sans, sans-serif', margin: '0 18px', textTransform: 'none' }}}>
                                <Tab label={<span>Aggregate DER<br />Mix Overview</span>} />
                                <Tab label={<span>Portfolio Performance<br />& Forecasting</span>} />
                                <Tab label={<span>Portfolio Action<br />Plan Summary</span>} />
                                <Tab label={<span>Total Reduction<br />Opportunities</span>} />
                            </Tabs>

                            <TabPanel value={tabValue} index={0}>
                               <StyledTabPanelBox>
                                   <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2}}>
                                       <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>AVERAGE ENERGY MIX ACROSS PORTFOLIO</Typography>
                                       <HelpButton onClick={() => handleOpenModal(0)} />
                                   </Box>
                                   <TableContainer component={Paper} variant="outlined">
                                       <Table size="small">
                                           <TableHead sx={{ backgroundColor: '#fafafa' }}>
                                               <TableRow>
                                                   <TableCell sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>DER System</TableCell>
                                                   <TableCell align="center" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>Avg. Current Mix</TableCell>
                                                   <TableCell align="center" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>Avg. Recommended Mix</TableCell>
                                                   <TableCell align="right" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>Total Impact (MT)</TableCell>
                                               </TableRow>
                                           </TableHead>
                                           <TableBody>
                                               {derOrder.map((name, idx) => {
                                                   const backendKey = Object.keys(derNameMapping).find(key => derNameMapping[key] === name) || '';
                                                   const currentMix = aggregateData.derAverages.current[backendKey] ?? 0;
                                                   const recMix = aggregateData.derAverages.recommended[backendKey] ?? 0;
                                                   const impact = aggregateData.derAverages.impact[backendKey] ?? 0;
                                                   return (
                                                       <StyledTableRow key={name} className="animated-row" style={{ animationDelay: `${idx * 50}ms` }}>
                                                           <TableCell sx={{fontFamily: 'Nunito Sans, sans-serif', fontWeight: 600}}>{name}</TableCell>
                                                           <TableCell align="center" sx={{fontFamily: 'Nunito Sans, sans-serif'}}>{formatValue(currentMix, 'percent')}</TableCell>
                                                           <TableCell align="center" sx={{fontFamily: 'Nunito Sans, sans-serif'}}>{formatValue(recMix, 'percent')}</TableCell>
                                                           <TableCell align="right">
                                                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                                                                {impact < 0 ? <TrendingDown sx={{ fontSize: '1rem', color: 'success.main' }} /> : (impact > 0 ? <TrendingUp sx={{ fontSize: '1rem', color: 'error.main' }} /> : null)}
                                                                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: impact < 0 ? 'success.main' : 'error.main' }}>
                                                                    {formatValue(impact)}
                                                                </Typography>
                                                              </Box>
                                                           </TableCell>
                                                       </StyledTableRow>
                                                   );
                                               })}
                                           </TableBody>
                                       </Table>
                                   </TableContainer>
                               </StyledTabPanelBox>
                            </TabPanel>

                            <TabPanel value={tabValue} index={1}>
                                <StyledTabPanelBox>
                                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2}}>
                                       <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>PORTFOLIO MONTHLY PERFORMANCE & FORECASTING</Typography>
                                       <HelpButton onClick={() => handleOpenModal(1)} />
                                   </Box>
                                    <Box sx={{ height: 350 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={aggregatedChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" tick={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }} />
                                                <YAxis tick={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }} domain={[0, yAxisMax]} />
                                                <Tooltip contentStyle={{ fontFamily: 'Nunito Sans, sans-serif', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                                <Legend wrapperStyle={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }} payload={[{ value: 'Actual', type: 'square', color: colorPalette.actual }, { value: 'Projected', type: 'square', color: colorPalette.projected }, { value: 'Total Target', type: 'line', color: colorPalette.target }]} />
                                                <Bar dataKey="emissions" name="Total Emissions" animationDuration={800}>
                                                    {aggregatedChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                                </Bar>
                                                {aggregateData.totalTargetPerMonth > 0 && 
                                                    <ReferenceLine y={aggregateData.totalTargetPerMonth} stroke={colorPalette.target} strokeWidth={2} strokeDasharray="3 3" label={{ value: `Total Target: ${formatValue(aggregateData.totalTargetPerMonth)}`, fill: colorPalette.target, fontSize: 12, fontWeight: 'bold', fontFamily: 'Nunito Sans, sans-serif', position: 'insideTopRight' }}/>
                                                }
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Box>
                                </StyledTabPanelBox>
                            </TabPanel>
                            
                            <TabPanel value={tabValue} index={2}>
                               <StyledTabPanelBox>
                                 <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2}}>
                                     <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>PORTFOLIO ACTION PLAN SUMMARY</Typography>
                                     <HelpButton onClick={() => handleOpenModal(2)} />
                                 </Box>
                                 <Grid container spacing={3} alignItems="stretch">
                                   <Grid item xs={12} md={6}>
                                     <Paper variant="outlined" sx={{p: 2.5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                       <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1rem', mb: 2 }}>RECOMMENDED SOLUTIONS: TOTALS</Typography>
                                       <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '1.2rem', mb: 1 }}>
                                           Total Investment: <b style={{color: '#667eea'}}>{formatValue(aggregateData.totalRecommendedInvestment, 'currency')}</b>
                                       </Typography>
                                        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '1.2rem' }}>
                                           Average Payback: <b style={{color: '#667eea'}}>{formatValue(aggregateData.averagePaybackYears)} years</b>
                                       </Typography>
                                     </Paper>
                                   </Grid>
                                   <Grid item xs={12} md={6}>
                                     <Paper variant="outlined" sx={{p: 2.5, height: '100%'}}>
                                       <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1rem', mb: 1.5 }}>UNIQUE ALTERNATIVE OPTIONS</Typography>
                                       <Stack spacing={1} sx={{maxHeight: 200, overflowY: 'auto', pr: 1}}>
                                          {aggregateData.uniqueAlternatives.length > 0 ? aggregateData.uniqueAlternatives.map((alt: any) => (
                                              <Paper key={alt.title} variant='outlined' sx={{p:1.5}}>
                                                  <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold'}}>{alt.title}</Typography>
                                                  <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem'}}>Investment: {formatValue(alt.investment_usd, 'currency')} | Reduction: {formatValue(alt.reduction_pct, 'percent')}</Typography>
                                              </Paper>
                                          )) : <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontStyle: 'italic'}}>No alternative options available.</Typography>}
                                       </Stack>
                                     </Paper>
                                   </Grid>
                                 </Grid>
                               </StyledTabPanelBox>
                            </TabPanel>
                            
                            <TabPanel value={tabValue} index={3}>
                                <StyledTabPanelBox>
                                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2}}>
                                        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>TOTAL EMISSION REDUCTION OPPORTUNITIES</Typography>
                                        <HelpButton onClick={() => handleOpenModal(3)} />
                                    </Box>
                                    <TableContainer component={Paper} variant="outlined">
                                        <Table size="small">
                                            <TableHead sx={{backgroundColor: '#fafafa'}}>
                                                <TableRow>
                                                    <TableCell sx={{fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold'}}>Project</TableCell>
                                                    <TableCell align='right' sx={{fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold'}}>Total Potential Reduction (MT)</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Object.keys(staticProjectKeys).map((key, idx) => {
                                                    const backendKey = staticProjectKeys[key];
                                                    const totalReduction = aggregateData.totalReductions[backendKey] ?? 0;
                                                    return (
                                                        <StyledTableRow key={key} className="animated-row" style={{ animationDelay: `${idx * 50}ms` }}>
                                                            <TableCell sx={{fontFamily: 'Nunito Sans, sans-serif'}}>{key}</TableCell>
                                                            <TableCell align='right' sx={{fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: '#1b5e20'}}>{formatValue(totalReduction)}</TableCell>
                                                        </StyledTableRow>
                                                    )
                                                })}
                                            </TableBody>
                                            <TableFooter sx={{backgroundColor: '#e8f5e9', borderTop: '2px solid #1b5e20'}}>
                                                <TableRow>
                                                    <TableCell colSpan={2} align="right" sx={{fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1rem'}}>
                                                        Total Portfolio Opportunity: {formatValue(Object.values(aggregateData.totalReductions).reduce((s: number, v: any) => s + v, 0))} MT
                                                    </TableCell>
                                                </TableRow>
                                            </TableFooter>
                                        </Table>
                                    </TableContainer>
                                </StyledTabPanelBox>
                            </TabPanel>
                        </Box>
                </Paper>
            </Box>
        </Box>
    );
};


// --- INDIVIDUAL VIEW COMPONENT (UNCHANGED) ---
const IndividualView: React.FC<IndividualViewProps> = ({
    allData,
    data,
    onConfirmChanges, setHasUnsavedChanges,
    selectedLocation, onLocationChange,
    selectedSource, onSourceChange,
    selectedYear, onYearChange,
    projectSelections,
    onProjectSelectChange,
    srecPercentage,
    onSrecPercentageChange,
    onSrecChangeCommitted,
    calculatedSrecMetrics
}) => {
    const [tabValue, setTabValue] = useState(0);
    const [userDerAllocation, setUserDerAllocation] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContentId, setModalContentId] = useState<number | null>(null);

    const [frozenDerInsights, setFrozenDerInsights] = useState<string[] | undefined>(undefined);
    const [frozenActionInsights, setFrozenActionInsights] = useState<string[] | undefined>(undefined);

    const [quickFixModalOpen, setQuickFixModalOpen] = useState(false);

    const handleOpenModal = (id: number) => { setModalContentId(id); setModalOpen(true); };
    const handleCloseModal = () => { setModalOpen(false); setModalContentId(null); };

    const availableLocations = useMemo(() => {
        if (!allData) return [];
        return Array.from(new Set(allData.map(d => d.location)));
    }, [allData]);

    const availableSources = useMemo(() => {
        if (!allData || !selectedLocation) return [];
        return Array.from(new Set(
            allData.filter(d => d.location === selectedLocation).map(d => d.source)
        ));
    }, [allData, selectedLocation]);

    useEffect(() => {
        setFrozenDerInsights(data?.der_control_panel?.insights);
        setFrozenActionInsights(data?.action_center?.insights);
    }, [selectedLocation, selectedSource, data]);

    
    const initialState = useMemo(() => {
        const current = data?.der_control_panel?.current_mix_pct;
        return {
            'Solar PV': current?.solar_pv ?? 0, 'Battery Storage': current?.battery_storage ?? 0, 'CHP': current?.chp ?? 0,
            'Fuel Cells': current?.fuel_cells ?? 0, 'Simple Turbines': current?.simple_turbines ?? 0,
            'Linear Generation': current?.linear_generation ?? 0, 'GRID': current?.grid ?? 100,
        };
    }, [data]);

    useEffect(() => {
        setUserDerAllocation(initialState);
        setHasUnsavedChanges(false);
    }, [initialState, setHasUnsavedChanges]);

    const isChanged = useMemo(() => JSON.stringify(userDerAllocation) !== JSON.stringify(initialState), [userDerAllocation, initialState]);

    const handleOpenQuickFix = () => setQuickFixModalOpen(true);
    const handleCloseQuickFix = () => setQuickFixModalOpen(false);
    
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
            'Linear Generation': recommended.linear_generation ?? 0, 'GRID': recommended.grid ?? 0,
        });
    };
    const handleConfirm = () => {
        const payloadMix = {
            grid: (userDerAllocation as any)['GRID'] ?? 0, solar_pv: (userDerAllocation as any)['Solar PV'] ?? 0,
            battery_storage: (userDerAllocation as any)['Battery Storage'] ?? 0, chp: (userDerAllocation as any)['CHP'] ?? 0,
            fuel_cells: (userDerAllocation as any)['Fuel Cells'] ?? 0, simple_turbines: (userDerAllocation as any)['Simple Turbines'] ?? 0,
            linear_generation: (userDerAllocation as any)['Linear Generation'] ?? 0,
        };
        onConfirmChanges(payloadMix, selectedLocation, selectedSource);
    };
    
    const availableYears = useMemo(() => {
        const years = new Set(data?.monthly_tracking?.monthly_emissions?.map(em => em.year as number));
        return Array.from(years).sort((a, b) => b - a);
    }, [data]);

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
    
    const filteredAndSortedChartData = useMemo(() => {
        if (!data || !selectedYear) return [];
        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const filtered = data.monthly_tracking.monthly_emissions.filter(em => em.year == selectedYear);
        
        const processed = filtered.map(em => {
            const monthIndex = Number(em.month) - 1;
            const monthName = (typeof em.month === 'number' && monthIndex >= 0 && monthIndex < 12)
                ? monthOrder[monthIndex]
                : String(em.month);
            return {
                ...em,
                month: monthName,
                emissions: em.actual ?? em.projected,
                fill: em.actual !== null ? colorPalette.actual : colorPalette.projected
            };
        });
        
        return processed.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
    }, [data, selectedYear]);

    const yAxisMax = useMemo(() => {
        if (!data || !filteredAndSortedChartData || filteredAndSortedChartData.length === 0) {
            return 'auto';
        }
        const maxBarValue = Math.max(...filteredAndSortedChartData.map(entry => entry.emissions ?? 0));
        
        const targetValue = (data.monthly_tracking?.target_per_month !== null &&
                                     data.monthly_tracking?.target_per_month !== undefined &&
                                     isFinite(Number(data.monthly_tracking.target_per_month)))
                                     ? Number(data.monthly_tracking.target_per_month)
                                     : 0;
        const dataMax = Math.max(maxBarValue, targetValue);
        if (dataMax === 0) return 100;
        return Math.ceil((dataMax * 1.1) / 10) * 10;
    
    }, [data, filteredAndSortedChartData]);

    const evidenceCards: BenefitData[] = [
        { value: `${formatValue(data?.evidence?.metrics?.full_year_projection)} MT`, title: (<>Annual Emissions<br />(YTD + Projected)</>), description: <>YTD: <b>{formatValue(data?.evidence?.metrics?.actual_emissions)} MT</b><br />Projected: <b>{formatValue(data?.evidence?.metrics?.projected_emissions)} MT</b><br/><b>{formatValue(data?.evidence?.metrics?.actual_yoy_pct, 'percent')}</b> YoY | Over by: <b>{formatValue(data?.evidence?.metrics?.over_by)} MT</b><br/></>, watermark: '🔥' },
        { value: `${formatValue(data?.evidence?.metrics?.compliance_target)} MT`, title: (<>Compliance Target<br />by 2030</>), description: <>State: <b>{data?.evidence?.metrics?.compliance_jurisdiction}</b><br/>Required by law<br/><b>{formatValue(data?.evidence?.metrics?.required_reduction_pct, 'percent')}</b> reduction</>, watermark: '⚖️' },
        { value: `${formatValue(data?.evidence?.metrics?.bradley_solution)} MT`, title: 'Emission Compliance Energy Supply Configuration', description: <><b>{formatValue(data?.evidence?.metrics?.bradley_reduction_pct, 'percent')}</b> Reduction<br/>Saves: <b>{formatValue(data?.evidence?.metrics?.bradley_savings, 'currency')}/yr</b><br/>ROI: <b>{formatValue(data?.evidence?.metrics?.bradley_roi_years)} years</b></>, watermark: '💡' },
    ];
    
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
        content.body = (
            <>
                <Typography sx={{ mt: 1.5, mb: 2, color: '#555' }}>
                    This chart visualizes your monthly progress, comparing your actual emissions to critical benchmarks. Use it to track trends and validate your strategy.
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        <li><b><span style={{ color: colorPalette.actual }}>Dark Grey bars</span></b> show your recorded historical emissions.</li>
                        <li style={{ marginTop: '8px' }}><b><span style={{ color: colorPalette.projected }}>Light Grey bars</span></b> are our AI-powered forecasts for the upcoming months.</li>
                        <li style={{ marginTop: '8px' }}>The <b style={{ color: colorPalette.target }}>Red Target Line</b> represents your monthly compliance limit. Staying below this is key to avoiding penalties.</li>
                        <li style={{ marginTop: '8px' }}>The <b style={{ color: colorPalette.withBradley }}>Green {window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'} Line</b> shows your projected emissions if you adopt our recommended solution, keeping you safely under target.</li>
                    </ul>
                </Paper>
            </>
        );
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
                    This card summarizes your total emissions profile for the year, based on current data and future projections.
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                        <li style={{ marginTop: '8px' }}><b>YTD (Year-to-Date):</b> {formatValue(data?.evidence?.metrics?.actual_emissions)} MT. This is your actual, recorded emissions so far.</li>
                        <li style={{ marginTop: '8px' }}><b>Projected:</b> {formatValue(data?.evidence?.metrics?.projected_emissions)} MT. This is our AI-forecast for the rest of the year.</li>
                        <li style={{ marginTop: '8px' }}><b>Full Projection:</b> {formatValue(data?.evidence?.metrics?.full_year_projection)} MT. This is the (YTD + Projected) total.</li>
                        <li style={{ marginTop: '8px' }}><b>YoY (Year-over-Year):</b> {formatValue(data?.evidence?.metrics?.actual_yoy_pct, 'percent')}. Your emissions are tracking this much higher than the previous year.</li>
                        <li style={{ marginTop: '8px' }}><b>Over By:</b> {formatValue(data?.evidence?.metrics?.over_by)} MT. This is how much your full projection exceeds your annual compliance target.</li>
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
                    This card details the specific legal requirements you must meet by 2030.
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                        <li style={{ marginTop: '8px' }}><b>Target:</b> {formatValue(data?.evidence?.metrics?.compliance_target)} MT. Your annual emissions must be at or below this level by 2030.</li>
                        <li style={{ marginTop: '8px' }}><b>Jurisdiction:</b> {data?.evidence?.metrics?.compliance_jurisdiction}. This is the governing body (e.g., state, city) setting the mandate.</li>
                        <li style={{ marginTop: '8px' }}><b>Required Reduction:</b> {formatValue(data?.evidence?.metrics?.required_reduction_pct, 'percent')}. This is the total reduction required from your baseline to meet the 2030 target.</li>
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
                    This card outlines the high-level benefits of adopting the {window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'} recommended energy configuration.
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                        <li style={{ marginTop: '8px' }}><b>Projected Emissions:</b> {formatValue(data?.evidence?.metrics?.bradley_solution)} MT. Your new annual emissions after implementing the solution.</li>
                        <li style={{ marginTop: '8px' }}><b>Total Reduction:</b> {formatValue(data?.evidence?.metrics?.bradley_reduction_pct, 'percent')}. The percentage decrease from your current projected emissions.</li>
                        <li style={{ marginTop: '8px' }}><b>Annual Savings:</b> {formatValue(data?.evidence?.metrics?.bradley_savings, 'currency')}. This is the estimated amount you will save *per year* by avoiding penalties.</li>
                        <li style={{ marginTop: '8px' }}><b>ROI (Return on Investment):</b> {formatValue(data?.evidence?.metrics?.bradley_roi_years)} years. The estimated time it will take for the solution's savings to pay for its initial investment.</li>
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
                <Typography variant="h6" component="h2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>{content.title}</Typography>
                <Box sx={{ fontFamily: 'Nunito Sans, sans-serif' }}>{content.body}</Box>
            </>
        );
    };

    const utilizationPct = data?.verdict?.limit_utilization_pct ?? 0;
    const severity = data?.verdict?.severity || 'INFO';
    const status_banner = data?.verdict?.status_banner || 'Status not available';
    let complianceBannerBg: string;
    let complianceBannerBorder: string;
    let complianceBannerColor: string;
    let complianceIcon: string;
    let progressBarColor: string;
    let statusColor: string;
    let statusIcon: ReactNode;
    
    switch (severity) {
        case 'INFO':
            complianceBannerBg = '#e8f5e9';
            complianceBannerBorder = '#4caf50';
            complianceBannerColor = '#1b5e20';
            complianceIcon = '✅';
            progressBarColor = '#388E3C';
            statusColor = '#388E3C'; // Green
            statusIcon = <CheckCircle sx={{ fontSize: '1rem', verticalAlign: 'middle' }} />;
            break;
        case 'WARNING':
            complianceBannerBg = '#fffde7';
            complianceBannerBorder = '#fdd835';
            complianceBannerColor = '#f57f17';
            complianceIcon = '⚠️';
            progressBarColor = '#fdd835';
            statusColor = '#f57f17'; // Yellow/Orange
            statusIcon = <Warning sx={{ fontSize: '1rem', verticalAlign: 'middle' }} />;
            break;
        case 'CRITICAL':
            complianceBannerBg = '#fff3e0';
            complianceBannerBorder = '#ff9800';
            complianceBannerColor = '#e65100';
            complianceIcon = '❗';
            progressBarColor = '#ff9800';
            statusColor = '#e65100'; // Dark Orange
            statusIcon = <Error sx={{ fontSize: '1rem', verticalAlign: 'middle' }} />;
            break;
        case 'OVERLOAD':
        default:
            complianceBannerBg = '#ffebee';
            complianceBannerBorder = '#d32f2f';
            complianceBannerColor = '#b71c1c';
            complianceIcon = '☠️';
            progressBarColor = '#d32f2f';
            statusColor = '#d32f2f'; // Red
            statusIcon = <Error sx={{ fontSize: '1rem', verticalAlign: 'middle' }} />;
            break;
    }

    const initialEmissionFactor = data?.srec_metrics?.emission_factor_constant || 0.433;
    const initialReducedEmissions = data?.srec_metrics?.reduced_emissions_mtpy || 0;
    const initialCreditsNeeded = data?.srec_metrics?.srec_needed_mwh || 0;

    useEffect(() => {
        if (data?.srec_metrics?.percentage_needed && srecPercentage === 0) {
            const optimal = data.srec_metrics.percentage_needed;
            onSrecPercentageChange(optimal);
            // onSrecChangeCommitted(optimal); 
        }
    }, [data, srecPercentage, onSrecPercentageChange]);

    const currentMetrics = calculatedSrecMetrics || data?.srec_metrics;
    
    return (
        <Box>
            <Modal 
                open={modalOpen} 
                onClose={handleCloseModal}
            >
                <ModalBox>{renderModalContent()}</ModalBox>
            </Modal>
            
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
                                value={selectedLocation}
                                onChange={(e: SelectChangeEvent<string>) => onLocationChange(e.target.value)}
                                sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }}
                            >
                                {availableLocations.map(loc => <MenuItem
                                    key={loc}
                                    value={loc}
                                    sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }}
                                >
                                    {loc}
                                </MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl size="small">
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
                        </FormControl>
                    </Box>
                    <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1rem' }}>COMPLIANCE STATUS</Typography>
                    
                    <Paper 
    variant="outlined" 
    sx={{ 
        mt: 3, 
        backgroundColor: complianceBannerBg, 
        textAlign: 'center', 
        p:1, 
        borderColor: complianceBannerBorder,
        borderRadius: '8px',
        animation: (severity === 'OVERLOAD' || severity === 'CRITICAL') 
            ? `${severity === 'OVERLOAD' ? pulseWarning : pulseCritical} 2s infinite` 
            : 'none',
        position: 'relative',
    }}
>
    <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: complianceBannerColor, textAlign: 'left', pl: 1.5 }}>
        {complianceIcon} {status_banner}
    </Typography>
    <Button
        size="small"
        variant="contained"
        onClick={handleOpenQuickFix}
        sx={{
            position: 'absolute',
            right: 6,
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            bgcolor: severity === 'INFO' ? progressBarColor : 
                     severity === 'WARNING' ? progressBarColor : 
                     severity === 'CRITICAL' ? progressBarColor : 
                     progressBarColor,
            color: 'white',
            fontWeight: 'bold',
            px: 2,
            py: 0.5,
            '&:hover': {
                bgcolor: severity === 'INFO' ? '#2e7d32' : 
                         severity === 'WARNING' ? '#f9a825' : 
                         severity === 'CRITICAL' ? '#f57c00' : 
                         '#c62828',
                // transform: 'translateY(-50%) scale(1)',
            },
            transition: 'all 0.3s ease',
            boxShadow: `0 2px 8px ${
                severity === 'INFO' ? 'rgba(56, 142, 60, 0.3)' : 
                severity === 'WARNING' ? 'rgba(253, 216, 53, 0.3)' : 
                severity === 'CRITICAL' ? 'rgba(255, 152, 0, 0.3)' : 
                'rgba(211, 47, 47, 0.3)'
            }`,
            animation: (severity === 'OVERLOAD' || severity === 'CRITICAL') 
                ? `${severity === 'OVERLOAD' ? pulseWarning : pulseCritical} 2s infinite 1s` 
                : 'none',
        }}
        // startIcon={<span>💳</span>}
    >
        Purchase Credits
    </Button>
</Paper>

<Modal 
    open={quickFixModalOpen} 
    onClose={handleCloseQuickFix}
>
    <ModalBox sx={{ 
        width: 650, 
        maxWidth: '90vw',
        borderTop: `4px solid ${complianceBannerBorder}`,
        borderBottom: `4px solid ${complianceBannerBorder}`,
    }}>
        <IconButton onClick={handleCloseQuickFix} sx={{position: 'absolute', top: 8, right: 8}}>
            <Close />
        </IconButton>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h6" component="h2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: '#000' }}>
                Purchase Solar Renewable Energy Credits (SRECs)
            </Typography>
        </Box>
        
        <Typography sx={{ fontSize: '0.85rem', color: '#666', mb: 3, fontFamily: 'Nunito Sans, sans-serif' }}>
            Avoid {formatValue(data?.verdict?.penalty_risk_usd, 'currency')} penalty while you work on long-term solutions
        </Typography>

        <Paper 
            variant="outlined" 
            sx={{ 
                p: 2, 
                mb: 3, 
                bgcolor: complianceBannerBg,
                borderColor: complianceBannerBorder,
                borderWidth: 2,
            }}
        >
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '0.9rem', mb: 1.5, color: complianceBannerColor }}>
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
                    color: complianceBannerColor,
                    lineHeight: 1,
                }}>
                    {formatValue(initialCreditsNeeded)}
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', fontFamily: 'Nunito Sans, sans-serif', color: '#666', mt: 0.5 }}>
                    SRECs to get back to compliance
                </Typography>
            </Box>
            
            {<Box sx={{ mt: 2, p: 1.5, bgcolor: 'white', borderRadius: 1, border: `1px dashed ${complianceBannerBorder}` }}>
                <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', textAlign: 'center', color: '#666' }}>
                    <b>Calculation:</b> {formatValue(initialReducedEmissions)} MT/yr ÷ {initialEmissionFactor} = {formatValue(initialCreditsNeeded)} SRECs
                </Typography>
            </Box>}
        </Paper>

        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '0.9rem', mb: 1.5, display: 'flex', alignItems: 'center', gap: 0.5, color: '#000' }}>
            <span>🛒</span> CONFIGURE YOUR PURCHASE:
        </Typography>

        <Paper 
            variant="outlined" 
            sx={{ 
                p: 2.5,
                transition: 'all 0.3s ease',
                border: `2px solid ${complianceBannerBorder}`,
                bgcolor: 'white',
            }}
        >
            {/* Slider Section */}
            <Box sx={{ mb: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        ☀️ Solar RECs - Purchase Percentage
                    </Typography>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1.1rem', color: complianceBannerColor }}>
                        {srecPercentage}%
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Slider
                        value={srecPercentage}
                        onChange={(_, newValue) => onSrecPercentageChange(newValue as number)}
                        onChangeCommitted={(_, newValue) => onSrecChangeCommitted(newValue as number)}
                        sx={{ 
                            flex: 1,
                            '& .MuiSlider-thumb': { 
                                transition: 'all 0.1s ease'
                            }
                        }}
                    />
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                            const percentage = data?.srec_metrics?.percentage_needed || 0;
                            onSrecPercentageChange(percentage);
                            onSrecChangeCommitted(percentage);
                        }}
                        sx={{
                            fontFamily: 'Nunito Sans, sans-serif',
                            fontSize: '0.7rem',
                            whiteSpace: 'nowrap',
                            minWidth: '115px',
                            bgcolor: complianceBannerColor,
                            '&:hover': {
                                bgcolor: progressBarColor,
                            }
                        }}
                    >
                        Optimal {data?.srec_metrics?.percentage_needed || 0}%
                    </Button>
                </Box>
            </Box>

            {/* Metrics Grid - Balanced */}
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Nunito Sans, sans-serif', mb: 0.5 }}>
                            Total Cost (USD)
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Nunito Sans, sans-serif', color: complianceBannerColor }}>
                            {formatValue(currentMetrics?.total_srec_cost_usd, 'currency') === 'N/A' ? '$0.00' : formatValue(currentMetrics?.total_srec_cost_usd, 'currency')}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Nunito Sans, sans-serif', mb: 0.5 }}>
                            Emission Offset
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Nunito Sans, sans-serif', color: '#1b5e20' }}>
                            {formatValue(currentMetrics?.reduced_emissions_mtpy) === 'N/A' ? '0' : formatValue(currentMetrics?.reduced_emissions_mtpy)} MT/yr
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontSize: '0.7rem', color: '#666', fontFamily: 'Nunito Sans, sans-serif', mb: 0.5 }}>
                            SRECs Needed
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Nunito Sans, sans-serif' }}>
                            {formatValue(currentMetrics?.srec_needed_mwh) === 'N/A' ? '0' : formatValue(currentMetrics?.srec_needed_mwh)}
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
                    borderColor: complianceBannerBorder,
                    color: complianceBannerColor,
                    '&:hover': {
                        borderColor: progressBarColor,
                        bgcolor: `${complianceBannerBg}80`,
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
                    bgcolor: progressBarColor,
                    color: 'white',
                    fontWeight: 'bold',
                    '&:hover': { 
                        bgcolor: severity === 'INFO' ? '#2e7d32' : 
                                 severity === 'WARNING' ? '#f9a825' : 
                                 severity === 'CRITICAL' ? '#f57c00' : 
                                 '#c62828',
                    }
                }}
            >
                Purchase SRECs
            </Button>
        </Box>
    </ModalBox>
</Modal>

                    <Box sx={{ position: 'relative', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', margin: '16px auto', maxWidth: '100%' }}>
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
                    </Grid>
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
                                valueColor={index === 0 ? statusColor : index === 2 ? '#388E3C' : undefined}
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
                            value={tabValue}
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
                            <Tab label={<span>Interactive Emission<br />Modelling Dashboard</span>} />
                            <Tab label={<span>Simulated Emissions from<br />Alternate Energy Source(s)</span>} />
                            <Tab label={<span>Immediate Emission<br />Compliance Configuration</span>} />
                            <Tab label={<span>Energy Conservation &<br />Reduction Measures</span>} />
                        </Tabs>
                        
                        <TabPanel value={tabValue} index={0}>
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
                                                            sx={{ '& .MuiSlider-thumb': { transition: 'all 0.1s ease'}}}
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
                        <TabPanel value={tabValue} index={1}>
                            <StyledTabPanelBox>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2}}>
                                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>MONTHLY PERFORMANCE & FORECASTING</Typography>
                                    <HelpButton onClick={() => handleOpenModal(1)} />
                                </Box>
                                <Box sx={{ height: 350 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={filteredAndSortedChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" tick={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }} />
                                            <YAxis
                                                tick={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }}
                                                domain={[0, yAxisMax]}
                                            />
                                            <Tooltip 
                                                cursor={{fill: 'rgba(230, 230, 230, 0.4)'}} 
                                                contentStyle={{ fontFamily: 'Nunito Sans, sans-serif', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                            />
                                            <Legend
                                                wrapperStyle={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}
                                                payload={[
                                                    { value: 'Actual', type: 'square', color: colorPalette.actual },
                                                    { value: 'Projected', type: 'square', color: colorPalette.projected },
                                                    { value: 'Target', type: 'line', color: colorPalette.target },
                                                    { value: 'With EmissionCheckIQ+', type: 'line', color: colorPalette.withBradley },
                                                ]}
                                            />
                                            <Bar dataKey="emissions" name="Emissions" animationDuration={800}>
                                                {filteredAndSortedChartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Bar>
                                            { (data?.monthly_tracking?.target_per_month !== null &&
                                               data?.monthly_tracking?.target_per_month !== undefined &&
                                               data?.monthly_tracking?.target_per_month !== '' &&
                                               isFinite(Number(data.monthly_tracking.target_per_month))) &&
                                                <ReferenceLine
                                                    ifOverflow="extendDomain"
                                                    y={Number(data.monthly_tracking.target_per_month)}
                                                    stroke={colorPalette.target}
                                                    strokeDasharray="3 3"
                                                    strokeWidth={1.5}
                                                    label={{
                                                        value: `Target: ${formatValue(data.monthly_tracking.target_per_month)}`,
                                                        position: 'insideBottomRight',
                                                        fill: colorPalette.target,
                                                        fontFamily: 'Nunito Sans, sans-serif',
                                                        fontSize: 12,
                                                        fontWeight: 'bold'
                                                    }}
                                                    className="ref-line-target"
                                                />
                                            }
                                            { (data?.monthly_tracking?.with_bradley_der_per_month !== null &&
                                               data?.monthly_tracking?.with_bradley_der_per_month !== undefined &&
                                               data?.monthly_tracking?.with_bradley_der_per_month !== '' &&
                                               isFinite(Number(data.monthly_tracking.with_bradley_der_per_month))) &&
                                                <ReferenceLine
                                                    ifOverflow="extendDomain"
                                                    y={Number(data.monthly_tracking.with_bradley_der_per_month)}
                                                    stroke={colorPalette.withBradley}
                                                    strokeDasharray="3 3"
                                                    strokeWidth={1.5}
                                                    label={{
                                                        value: `With {window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'}: ${formatValue(data.monthly_tracking.with_bradley_der_per_month)}`,
                                                        position: 'insideTopRight',
                                                        fill: colorPalette.withBradley,
                                                        fontFamily: 'Nunito Sans, sans-serif',
                                                        fontSize: 12,
                                                        fontWeight: 'bold'
                                                    }}
                                                    className="ref-line-bradley"
                                                />
                                            }
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </StyledTabPanelBox>
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
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
                        <TabPanel value={tabValue} index={3}>
                            <StyledTabPanelBox sx={{maxHeight: 410, fontFamily: 'Nunito Sans, sans-serif', mb: 2}}>
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
                        </TabPanel>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};


// --- MAIN DASHBOARD COMPONENT ---
const EmissionsDashboard: React.FC<EmissionsDashboardProps> = (props) => {
    const { allData, selectedLocation, selectedSource, selectedYear } = props;
    const [viewMode, setViewMode] = useState<'individual' | 'aggregate'>('individual');

    const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newViewMode: 'individual' | 'aggregate' | null) => {
        if (newViewMode !== null) {
            setViewMode(newViewMode);
        }
    };
    
    const individualData = useMemo(() => {
        return allData?.find(d => d.location === selectedLocation && d.source === selectedSource);
    }, [allData, selectedLocation, selectedSource]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;900&display=swap');
                .ref-line-target .recharts-reference-line-line, .ref-line-bradley .recharts-reference-line-line { transition: all 0.2s ease-in-out; }
                .ref-line-target .recharts-reference-line-line:hover, .ref-line-bradley .recharts-reference-line-line:hover { stroke-width: 2.5; stroke-opacity: 1; }
            `}</style>
            
            <StyledTitle variant="h6">{window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'} Emissions Dashboard</StyledTitle>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <ToggleButtonGroup color="primary" value={viewMode} exclusive onChange={handleViewChange} aria-label="View mode">
                    <ToggleButton value="individual" sx={{fontFamily: 'Nunito Sans, sans-serif', textTransform: 'none'}}>Individual View</ToggleButton>
                    <ToggleButton value="aggregate" sx={{fontFamily: 'Nunito Sans, sans-serif', textTransform: 'none'}}>Aggregate View</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            
            {viewMode === 'individual' ? (
                <IndividualView {...props} data={individualData} />
            ) : (
                <AggregateView allData={allData} selectedYear={selectedYear} />
            )}
        </Box>
    );
};

export default EmissionsDashboard;