import React, { useState, useMemo, useEffect } from 'react';
import {
    Box, Typography, Card, styled, CardContent, Paper, Tabs, Tab, FormControl,
    Select, MenuItem, Slider, Button, Grid, Table, TableBody, TableCell,
    TableContainer, TableRow, TableHead, Modal, IconButton, Stack
} from '@mui/material';
import { HelpOutline, Close } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend, Cell } from 'recharts';

// --- TYPE DEFINITIONS ---
interface DashboardDataObject {
    file_id: string;
    source: string;
    location: string;
    verdict: { compliance_status: string; status_banner: string; severity: string; penalty_risk_usd: number; time_left_months: number; limit_utilization_pct: number; }; // Added compliance_status
    evidence: { metrics: { actual_emissions: number; actual_yoy_pct: number | string; compliance_target: number; compliance_jurisdiction: string; required_reduction_pct: number; bradley_solution?: number; bradley_reduction_pct?: number; over_by: number; estimated_penalty_cost_usd_per_year: number; bradley_savings?: number; bradley_roi_years?: number; } };
    der_control_panel: { current_mix_pct: { [key: string]: number }; recommended_mix_pct: { [key: string]: number }; impact_by_der: { [key: string]: number }; };
    monthly_tracking: { target_per_month: number | string | null; with_bradley_der_per_month: number | string | null; monthly_emissions: { month: string | number; year: number | string; actual: number | null; projected: number | null; }[]; };
    action_center: {
        recommended_solution: { title: string; components: { type: string; size: string; }[]; investment_usd: number; payback_years: number; eliminates_penalties: boolean; };
        alternatives?: { title: string; investment_usd: number; reduction_pct: number; estimated_penalties_remaining_usd_per_year?: number; carbon_negative_by_year?: number; }[];
    };
}

// --- IMPROVED COLOR PALETTE FOR CHART ---
const colorPalette = {
    actual: '#424242',      // Dark Grey
    projected: '#BDBDBD',    // Light Grey
    target: '#d32f2f',      // Strong Red
    withBradley: '#388E3C', // Clear Green
};

// --- STYLED COMPONENTS ---
const StyledTitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'Nunito Sans, sans-serif', fontSize: '2rem', fontWeight: 'bold',
    textAlign: 'center', marginBottom: theme.spacing(1),
}));

const StyledBenefitCard = styled(Card)(({ theme }) => ({
    flex: 1, padding: theme.spacing(1), position: 'relative', overflow: 'hidden', textAlign: 'center',
    backgroundColor: '#f5f5f5', boxShadow: 'none', borderRadius: theme.shape.borderRadius,
    border: '1px solid #e9ecef', transition: 'all 0.3s ease',
    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
}));

const WatermarkIcon = styled('div')({
    position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%) rotate(-15deg)',
    fontSize: '4rem', opacity: 0.08, fontWeight: 'bold', color: '#333', zIndex: 1,
});

const AbsoluteValue = styled(Typography)({
    fontFamily: 'Nunito Sans, sans-serif', fontWeight: '900', fontSize: '1.2rem', color: '#333',
    position: 'relative', zIndex: 2, lineHeight: 2.2,
});

const BenefitDescription = styled(Typography)(({ theme }) => ({
    fontFamily: 'Nunito Sans, sans-serif', fontWeight: '600', fontSize: '0.7rem', color: theme.palette.grey[600],
    position: 'relative', zIndex: 2, lineHeight: 1.5,
}));

const ModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: 500, backgroundColor: 'white', border: '1px solid #ddd',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)', borderRadius: '12px', padding: theme.spacing(3),
}));

const StyledTabPanelBox = styled(Box)(({ theme }) => ({ position: 'relative', padding: theme.spacing(2), backgroundColor: theme.palette.grey[100], borderRadius: theme.shape.borderRadius }));

interface TabPanelProps { children?: React.ReactNode; index: number; value: number; }
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => ( <div role="tabpanel" hidden={value !== index}>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</div> );

// --- HELPER FUNCTIONS & DATA ---
const formatValue = (value?: number | string | null, type: 'number' | 'currency' | 'percent' = 'number'): string => { if (value === null || value === undefined || value === "") return 'N/A'; const num = typeof value === 'string' ? parseFloat(value) : value; if (isNaN(num)) return 'N/A'; const options: Intl.NumberFormatOptions = { maximumFractionDigits: 2 }; if (type === 'currency') { options.style = 'currency'; options.currency = 'USD'; options.minimumFractionDigits = 2; } if (type === 'percent') { return `${num.toFixed(1)}%`; } return new Intl.NumberFormat('en-US', options).format(num); };
const derOrder = ['Solar PV', 'Battery Storage', 'CHP', 'Fuel Cells', 'Simple Turbines', 'Linear Generation', 'PLANT'];
const derNameMapping: {[key: string]: string} = { solar_pv: 'Solar PV', battery_storage: 'Battery Storage', chp: 'CHP', fuel_cells: 'Fuel Cells', simple_turbines: 'Simple Turbines', linear_generation: 'Linear Generation', grid: 'PLANT', efficiency_retrofit: 'Efficiency Retrofit' };

// --- CHILD COMPONENTS ---
interface BenefitData { value: string; title: string; description: React.ReactNode; watermark: string; }
const EnhancedBenefitCard: React.FC<{ benefit: BenefitData }> = ({ benefit }) => (
    <StyledBenefitCard>
        <WatermarkIcon>{benefit.watermark}</WatermarkIcon>
        <CardContent sx={{ position: 'relative', zIndex: 2, py: 0.1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <Typography sx={{fontFamily:'Nunito Sans, sans-serif', fontWeight:'bold', fontSize:'1rem', mb: 0.5}}>{benefit.title}</Typography>
            <AbsoluteValue>{benefit.value}</AbsoluteValue>
            <BenefitDescription>{benefit.description}</BenefitDescription>
        </CardContent>
    </StyledBenefitCard>
);

// --- MAIN DASHBOARD COMPONENT ---
interface EmissionsDashboardProps { 
    allData: DashboardDataObject[]; 
    onConfirmChanges: (userMix: {[key: string]: number}, location: string, source: string) => void;
    hasUnsavedChanges: boolean;
    setHasUnsavedChanges: (changed: boolean) => void;
    selectedLocation: string;
    onLocationChange: (location: string) => void;
    selectedSource: string;
    onSourceChange: (source: string) => void;
    selectedYear: number | string;
    onYearChange: (year: number | string) => void;
}

const EmissionsDashboard: React.FC<EmissionsDashboardProps> = ({ 
    allData, onConfirmChanges, setHasUnsavedChanges,
    selectedLocation, onLocationChange,
    selectedSource, onSourceChange,
    selectedYear, onYearChange
}) => {
    const [tabValue, setTabValue] = useState(0);
    const [userDerAllocation, setUserDerAllocation] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContentId, setModalContentId] = useState<number | null>(null);

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

    const data = useMemo(() => {
        return allData?.find(d => d.location === selectedLocation && d.source === selectedSource);
    }, [allData, selectedLocation, selectedSource]);
    
    const initialState = useMemo(() => {
        const current = data?.der_control_panel?.current_mix_pct;
        return {
            'Solar PV': current?.solar_pv ?? 0, 'Battery Storage': current?.battery_storage ?? 0, 'CHP': current?.chp ?? 0,
            'Fuel Cells': current?.fuel_cells ?? 0, 'Simple Turbines': current?.simple_turbines ?? 0,
            'Linear Generation': current?.linear_generation ?? 0, 'PLANT': current?.grid ?? 100,
        };
    }, [data]);

    useEffect(() => {
        setUserDerAllocation(initialState);
        setHasUnsavedChanges(false);
    }, [initialState, setHasUnsavedChanges]);

    const isChanged = useMemo(() => JSON.stringify(userDerAllocation) !== JSON.stringify(initialState), [userDerAllocation, initialState]);
    
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTabValue(newValue);

    const handleSliderChange = (name: string, value: number) => {
        const otherDersTotal = Object.entries(userDerAllocation).filter(([key]) => key !== 'PLANT' && key !== name).reduce((acc, [, val]) => acc + (val as number), 0);
        const newTotal = otherDersTotal + value;
        if (newTotal > 100) return;
        setUserDerAllocation(prev => ({ ...prev, [name]: value, PLANT: 100 - newTotal }));
    };
    
    const handleReset = () => setUserDerAllocation(initialState);
    
    const handleApplyRecommendation = () => {
        const recommended = data?.der_control_panel?.recommended_mix_pct;
        if (!recommended) return;
        setUserDerAllocation({
            'Solar PV': recommended.solar_pv ?? 0, 'Battery Storage': recommended.battery_storage ?? 0, 'CHP': recommended.chp ?? 0,
            'Fuel Cells': recommended.fuel_cells ?? 0, 'Simple Turbines': recommended.simple_turbines ?? 0,
            'Linear Generation': recommended.linear_generation ?? 0, 'PLANT': recommended.grid ?? 0,
        });
    };

    const handleConfirm = () => {
        const payloadMix = {
            grid: (userDerAllocation as any)['PLANT'] ?? 0, solar_pv: (userDerAllocation as any)['Solar PV'] ?? 0,
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
        { value: `${formatValue(data?.evidence?.metrics?.actual_emissions)} MT`, title: 'Actual Emissions', description: <><b>+{formatValue(data?.evidence?.metrics?.actual_yoy_pct, 'percent')}</b> YoY<br/>Over by: <b>{formatValue(data?.evidence?.metrics?.over_by)} MT</b><br/>Est. Penalty: <b>{formatValue(data?.evidence?.metrics?.estimated_penalty_cost_usd_per_year, 'currency')}/yr</b></>, watermark: '🔥' },
        { value: `${formatValue(data?.evidence?.metrics?.compliance_target)} MT`, title: 'Compliance Target', description: <>State: <b>{data?.evidence?.metrics?.compliance_jurisdiction}</b><br/>Required by law<br/><b>{formatValue(data?.evidence?.metrics?.required_reduction_pct, 'percent')}</b> reduction</>, watermark: '⚖️' },
        { value: `${formatValue(data?.evidence?.metrics?.bradley_solution)} MT`, title: 'Bradley Solution', description: <><b>-{formatValue(data?.evidence?.metrics?.bradley_reduction_pct, 'percent')}</b> Reduction<br/>Saves: <b>{formatValue(data?.evidence?.metrics?.bradley_savings, 'currency')}/yr</b><br/>ROI: <b>{formatValue(data?.evidence?.metrics?.bradley_roi_years)} years</b></>, watermark: '💡' },
    ];

    const renderModalContent = () => {
        const content: { title: React.ReactNode; body: React.ReactNode } = {
            title: '',
            body: <></>
        }
        
        switch (modalContentId) {
    case 0: 
        content.title = (
            <Typography variant="h6" sx={{ color: 'black' }}>
                How to Optimize Your Energy Mix
            </Typography>
        );
        content.body = (
            <>
                <Typography sx={{ mt: 1.5, mb: 2, color: '#555' }}>
                    This control panel is your sandbox for energy strategy. By adjusting the sliders for different Distributed Energy Resources (DERs), you can instantly model the financial and environmental impact.
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                    <Typography variant="body1"><strong>Bradley's Recommendation:</strong></Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        This is our AI-driven optimal mix to guarantee you meet compliance, based on your facility's unique profile. It's the most direct path to eliminating penalties.
                    </Typography>
                    <Typography variant="body1"><strong>Your Allocation & Impact:</strong></Typography>
                    <Typography variant="body2">
                        As you adjust the sliders, the 'PLANT' (grid energy) value auto-updates. The "Impact" column shows the real-time effect on emissions, helping you understand the trade-offs of each resource.
                    </Typography>
                </Paper>
            </>
        );
        break;

    case 1: 
        content.title = (
            <Typography variant="h6" sx={{ color: 'black' }}>
                Reading Your Performance Chart
            </Typography>
        );
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
                        <li style={{ marginTop: '8px' }}>The <b style={{ color: colorPalette.withBradley }}>Green Bradley Line</b> shows your projected emissions if you adopt our recommended solution, keeping you safely under target.</li>
                    </ul>
                </Paper>
            </>
        );
        break;

    case 2:
        content.title = (
            <Typography variant="h6" sx={{ color: 'black' }}>
                Understanding Your Action Plan
            </Typography>
        );
        content.body = (
            <>
                <Typography sx={{ mt: 1.5, mb: 2, color: '#555' }}>
                    Here, we turn data into a clear, actionable roadmap. Our goal is to provide a comprehensive solution that not only solves your compliance problem but also delivers long-term value.
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                    <Typography variant="body1"><strong>The Recommended Solution:</strong></Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        This is a complete, turnkey project designed to fully eliminate your penalty risk of <b>{formatValue(data?.evidence?.metrics?.estimated_penalty_cost_usd_per_year, 'currency')}/yr</b>. It offers a clear payback period and a significant return on investment.
                    </Typography>
                    <Typography variant="body1"><strong>Alternative Options:</strong></Typography>
                    <Typography variant="body2">
                        These are smaller, incremental steps you can take. While they offer partial emission reductions, they may not be sufficient to avoid penalties entirely and are best viewed as supplementary actions.
                    </Typography>
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

    const isCompliant = data?.verdict?.compliance_status === 'COMPLIANT';
    const complianceBannerBg = isCompliant ? '#e8f5e9' : '#fff3e0'; 
    const complianceBannerBorder = isCompliant ? '#4caf50' : '#ff9800'; 
    const complianceBannerColor = isCompliant ? '#1b5e20' : '#e65100'; 
    const complianceIcon = isCompliant ? '✅' : '⚠️'; 

    const utilizationPct = data?.verdict?.limit_utilization_pct ?? 0;
    const progressBarColor = isCompliant ? '#388E3C' : '#ff3b30'; 
    
    const statusColor = isCompliant ? '#388E3C' : '#d32f2f'; 
    const statusIcon = isCompliant ? '🟢' : '🔴'; 


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
            
            <Modal open={modalOpen} onClose={handleCloseModal}><ModalBox>{renderModalContent()}</ModalBox></Modal>

            <StyledTitle variant="h6">Bradley.ai Emissions Dashboard</StyledTitle>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: { xs: '20px', md: '80px' } }}>
                <Paper variant="outlined" sx={{ p: 2, position: 'relative' }}>
                    <Box sx={{ position: 'absolute', top: 16, right: 24, display: 'flex', gap: 2 }}>
                        <FormControl size="small">
                            <Select
                                value={selectedLocation}
                                onChange={(e) => onLocationChange(e.target.value)}
                                sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }} // <-- FONT ADDED
                            >
                                {availableLocations.map(loc => <MenuItem 
                                    key={loc} 
                                    value={loc} 
                                    sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }} // <-- FONT ADDED
                                >
                                    {loc}
                                </MenuItem>)}
                            </Select>
                        </FormControl>

                    <FormControl size="small">
                        <Select
                            value={selectedSource}
                            onChange={(e) => onSourceChange(e.target.value)}
                            sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }} // <-- FONT ADDED
                        >
                            {availableSources.map(src => <MenuItem 
                                key={src} 
                                value={src} 
                                sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }} // <-- FONT ADDED
                            >
                                {src.charAt(0).toUpperCase() + src.slice(1)}
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                        <FormControl size="small">
                            <Select 
                                value={selectedYear} 
                                onChange={(e) => onYearChange(e.target.value)} 
                                sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }}
                            >
                                {availableYears.map(year => <MenuItem 
                                    key={year} 
                                    value={year} 
                                    sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }} // <-- FONT ADDED
                                >
                                    {year}
                                </MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                    <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1rem' }}>COMPLIANCE STATUS</Typography>
                    
                    <Paper variant="outlined" sx={{ mt: 3, backgroundColor: complianceBannerBg, textAlign: 'center', p:1, borderColor: complianceBannerBorder }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: complianceBannerColor }}>
                            {complianceIcon} {data?.verdict?.status_banner}
                        </Typography>
                    </Paper>

                    <Box sx={{ position: 'relative', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', margin: '16px auto', maxWidth: '100%' }}>
                        <Box sx={{ 
                            width: `${utilizationPct > 100 ? 100 : utilizationPct}%`, 
                            height: '100%', 
                            backgroundColor: progressBarColor,
                            transition: 'width 0.4s ease-in-out'
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
                        <Grid item xs={4}><Typography sx={{fontSize: '0.8rem'}}>STATUS: <b style={{ color: statusColor }}>{statusIcon} {data?.verdict?.severity}</b></Typography></Grid>
                        <Grid item xs={4}><Typography sx={{fontSize: '0.8rem'}}>PENALTY RISK: <b>{formatValue(data?.verdict?.penalty_risk_usd, 'currency')}</b></Typography></Grid>
                        <Grid item xs={4}><Typography sx={{fontSize: '0.8rem'}}>TIME LEFT: <b>{data?.verdict?.time_left_months} MONTHS</b></Typography></Grid>
                    </Grid>
                </Paper>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>{evidenceCards.map((benefit, index) => <EnhancedBenefitCard key={index} benefit={benefit} />)}</Box>
                <Paper elevation={0} sx={{ width: '100%', mt: 4, backgroundColor: 'transparent' }}>
                    <Box sx={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e0e0e0', backgroundColor: 'white' }}>
                        <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ borderBottom: 1, borderColor: 'divider', '& .MuiTab-root': { fontFamily: 'Nunito Sans, sans-serif' } }}><Tab label="The Solution" /><Tab label="The Proof" /><Tab label="The Commitment" /></Tabs>
                        
                        <TabPanel value={tabValue} index={0}>
                            <StyledTabPanelBox>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2}}>
                                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>OPTIMIZE YOUR ENERGY MIX</Typography>
                                    <IconButton size="small" onClick={() => handleOpenModal(0)}><HelpOutline sx={{fontSize: '1.1rem'}} /></IconButton>
                                </Box>
                                <TableContainer component={Paper} variant="outlined">
                                    <Table size="small">
                                        <TableHead sx={{ backgroundColor: '#fafafa' }}><TableRow><TableCell sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>DER System</TableCell><TableCell align="center" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>Bradley Recommended</TableCell><TableCell align="center" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', width: '30%' }}>Your Allocation</TableCell><TableCell align="right" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>Impact (MT)</TableCell></TableRow></TableHead>
                                        <TableBody>{derOrder.map(name => {
                                            const backendKey = Object.keys(derNameMapping).find(key => derNameMapping[key] === name) || '';
                                            const recMix = data?.der_control_panel?.recommended_mix_pct;
                                            const impactValue = data?.der_control_panel?.impact_by_der?.[backendKey] ?? 0;
                                            const bradleyValue = recMix?.[backendKey] ?? 0;
                                            const userValue = (userDerAllocation as any)[name] ?? 0;
                                            const isPlant = name === 'PLANT';
                                            return (<TableRow key={name} sx={{ backgroundColor: isPlant ? '#f5f5f5' : '#fff' }}><TableCell sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 600 }}>{name}</TableCell><TableCell align="center" sx={{ fontFamily: 'Nunito Sans, sans-serif' }}>{formatValue(bradleyValue, 'percent')}</TableCell><TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Slider value={userValue} onChange={(_, v) => handleSliderChange(name, v as number)} disabled={isPlant} /><Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', width: '40px' }}>{formatValue(userValue, 'percent')}</Typography></Box></TableCell><TableCell align="right"><Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: impactValue < 0 ? '#34c759' : '#ff3b30' }}>{formatValue(impactValue)}</Typography></TableCell></TableRow>);
                                        })}</TableBody>
                                    </Table>
                                </TableContainer>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                                    <Button sx={{ fontFamily: 'Nunito Sans, sans-serif' }} size="small" variant="outlined" onClick={handleReset}>Reset to Current</Button>
                                    <Button sx={{ fontFamily: 'Nunito Sans, sans-serif' }} size="small" variant="contained" onClick={handleApplyRecommendation}>Apply Bradley Recommended</Button>
                                    <Button sx={{ fontFamily: 'Nunito Sans, sans-serif' }} size="small" variant="outlined" onClick={handleConfirm} disabled={!isChanged}>Confirm Changes</Button>
                                </Box>
                            </StyledTabPanelBox>
                        </TabPanel>

                        <TabPanel value={tabValue} index={1}>
                            <StyledTabPanelBox>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2}}>
                                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>MONTHLY PERFORMANCE & FORECASTING</Typography>
                                    <IconButton size="small" onClick={() => handleOpenModal(1)}><HelpOutline sx={{fontSize: '1.1rem'}} /></IconButton>
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
                                            <Tooltip cursor={{fill: 'rgba(230, 230, 230, 0.4)'}} contentStyle={{ fontFamily: 'Nunito Sans, sans-serif' }}/>
                                            
                                            <Legend
                                                wrapperStyle={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}
                                                payload={[
                                                    { value: 'Actual', type: 'square', color: colorPalette.actual },
                                                    { value: 'Projected', type: 'square', color: colorPalette.projected },
                                                    { value: 'Target', type: 'line', color: colorPalette.target },
                                                    { value: 'With Bradley', type: 'line', color: colorPalette.withBradley },
                                                ]}
                                            />
                                            
                                            <Bar dataKey="emissions" name="Emissions">
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
                                                        value: `With Bradley: ${formatValue(data.monthly_tracking.with_bradley_der_per_month)}`,
                                                        position: 'insideTopRight',
                                                        fill: colorPalette.withBradley,
                                                        fontFamily: 'Nunito Sans, sans-serif',
                                                        fontSize: 12,
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
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2}}>
                                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif',  textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>YOUR ACTION PLAN</Typography>
                                    <IconButton size="small" onClick={() => handleOpenModal(2)}><HelpOutline sx={{fontSize: '1.1rem'}} /></IconButton>
                                </Box>
                                <Grid container spacing={3} alignItems="stretch">
                                    <Grid item xs={12} md={7}>
                                        <Paper variant="outlined" sx={{ p: 2.5, height: '87%', display: 'flex', flexDirection: 'column' }}>
                                            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1rem', mb: 1.5 }}>RECOMMENDED SOLUTION</Typography>
                                            <Card variant="outlined" sx={{ flexGrow: 1 }}>
                                                <CardContent sx={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between'}}>
                                                    <div>
                                                        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>📋 {data?.action_center?.recommended_solution?.title}</Typography>
                                                        <ul style={{ fontSize: '0.9rem', margin: '12px 0', paddingLeft: '20px' }}>
                                                            {data?.action_center?.recommended_solution?.components?.map(c => <li key={c.type}>{`${c.size} ${derNameMapping[c.type] || c.type}`}</li>)}
                                                        </ul>
                                                        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif' }}><b>Investment:</b> {formatValue(data?.action_center?.recommended_solution?.investment_usd, 'currency')} | <b>Payback:</b> {data?.action_center?.recommended_solution?.payback_years} years</Typography>
                                                    
                                                        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}><Button sx={{fontFamily: 'Nunito Sans, sans-serif'}} variant="contained" size="small">Schedule Consultation</Button><Button sx={{fontFamily: 'Nunito Sans, sans-serif'}} variant="outlined" size="small">Email Proposal</Button></Box>
                                                </div></CardContent>
                                            </Card>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <Paper variant="outlined" sx={{ p: 2.5, height: '87%', display: 'flex', flexDirection: 'column' }}>
                                            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1rem', mb: 1.5 }}>ALTERNATIVE OPTIONS</Typography>
                                            <Stack spacing={2}>
                                                {data?.action_center?.alternatives?.map(alt => (
                                                    <Card key={alt.title} variant="outlined">
                                                        <CardContent sx={{py: 1.5, '&:last-child': { pb: 1.5 }}}>
                                                            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>{alt.title.includes("Quick") || alt.title.includes("Solar") ? '💡' : '🚀'} {alt.title}</Typography>
                                                            <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem'}}><b>Investment:</b> {formatValue(alt.investment_usd, 'currency')}<br /><b>Reduction:</b> {formatValue(alt.reduction_pct, 'percent')}</Typography>
                                                            {alt.estimated_penalties_remaining_usd_per_year != null && <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '0.85rem', color: alt.estimated_penalties_remaining_usd_per_year > 0 ? '#ff3b30' : '#34c759' }}>Penalties: {formatValue(alt.estimated_penalties_remaining_usd_per_year, 'currency')}/yr</Typography>}
                                                            {alt.carbon_negative_by_year != null && <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem' }}><b>Carbon -ve by year:</b> {alt.carbon_negative_by_year}</Typography>}
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </StyledTabPanelBox>
                        </TabPanel>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default EmissionsDashboard;