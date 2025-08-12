import React, { useState, useEffect, useMemo } from 'react';
import {
    Box, Card, CardContent, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Slider, Select, MenuItem, FormControl, Grid, Container, styled, createTheme, ThemeProvider, CssBaseline, Modal, Fade, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

import { LocationData/* , EmissionDataPoint, CurrentYearSummary, TargetGoals, Penalty */ } from '../../../../Context/DashboardDataContext';

interface ChartDataRow {
    month: string;
    [key: string]: string | number;
}

// --- STYLING ---
const nunitoSansUrl = 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap';
const theme = createTheme({ typography: { fontFamily: '"Nunito Sans", "Roboto", "Helvetica", "Arial", sans-serif', h4: { fontWeight: 700 }, h5: { fontWeight: 700 }, subtitle2: { fontWeight: 600 } } });
const StyledCard = styled(Card)(({ theme }) => ({ boxShadow: theme.shadows[2], width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }));
const FilterCard = styled(Card)(({ theme }) => ({ width: '100%', '& .MuiCardHeader-root': { backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText, '& .MuiTypography-root': { fontWeight: 'bold', fontSize: '0.875rem' } } }));
const SummaryCard = styled(Card)(() => ({ width: '100%', height: '100%', '& .MuiCardHeader-root': { backgroundColor: '#fff3cd', '& .MuiTypography-root': { fontWeight: 'bold', fontSize: '0.875rem' } } }));
const RedCell = styled(TableCell)(() => ({ backgroundColor: '#ffebee', color: '#c62828', fontWeight: 'bold', textAlign: 'center', fontSize: '0.75rem' }));
const LabelCell = styled(TableCell)(() => ({ backgroundColor: '#f5f5f5', fontWeight: 600, textAlign: 'left', fontSize: '0.75rem', width: '40%' }));
const StyledTableCell = styled(TableCell)({ fontSize: '0.75rem', textAlign: 'center', padding: '8px' });
const SubHeaderCell = styled(TableCell)(() => ({ backgroundColor: '#e0e0e0', fontWeight: 600, textAlign: 'center', fontSize: '0.75rem', padding: '8px' }));
const HeaderCell = styled(TableCell)(() => ({ backgroundColor: '#bdbdbd', fontWeight: 'bold', textAlign: 'center', fontSize: '0.875rem', padding: '8px' }));

// --- COMPONENT INTERFACE ---
interface EmissionsDashboardProps {
    data: LocationData[];
}

interface DashboardState {
    selectedLocationName: string;
    selectedSource: 'electric' | 'gas' | '';
    selectedYear: number | string;
    co2eGoal: number;
    derAllocation: { [key: string]: number; };
}

// --- MAIN COMPONENT ---
const EmissionsDashboard: React.FC<EmissionsDashboardProps> = ({ data }) => {
    // --- STATE MANAGEMENT ---
    const [dashboardState, setDashboardState] = useState<DashboardState>({
        selectedLocationName: '',
        selectedSource: '',
        selectedYear: '',
        co2eGoal: 10,
        derAllocation: { 'PLANT': 100, 'Solar PV': 0, 'CHP': 0, 'Simple Cycle Turbines': 0, 'Fuel Cells': 0, 'Linear Generation': 0, 'Battery Storage': 0 },
    });
    const [expandedChart, setExpandedChart] = useState<{ key: string, title: string } | null>(null);

    // --- DATA DERIVATION & TRANSFORMATION ---
    // Get unique locations
    const uniqueLocations = useMemo(() => {
        if (!data || data.length === 0) return [];
        const locationSet = new Set(data.map(d => d.location));
        return Array.from(locationSet);
    }, [data]);

    const uniqueYears = useMemo(() => {
        if (!data) return [];
        const years = new Set<number>();
        data.forEach(loc => {
            loc.emissions?.forEach(em => {
                if (typeof em.Year === 'number') {
                    years.add(em.Year);
                }
            });
        });
        // Sort years in descending order (e.g., 2015, 2014, 2013)
        return Array.from(years).sort((a, b) => b - a);
    }, [data]);

    // Get available sources for selected location
    const availableSources = useMemo(() => {
        if (!data || !dashboardState.selectedLocationName) return [];
        return data
            .filter(d => d.location === dashboardState.selectedLocationName)
            .map(d => d.source);
    }, [data, dashboardState.selectedLocationName]);

    // Initialize location and source selection
    useEffect(() => {
        if (data && data.length > 0 && !dashboardState.selectedLocationName) {
            const firstLocation = uniqueLocations[0];
            const firstSource = data.find(d => d.location === firstLocation)?.source || '';
            const latestYear = uniqueYears[0];
            setDashboardState(prev => ({
                ...prev,
                selectedLocationName: firstLocation,
                selectedSource: firstSource,
                selectedYear: latestYear
            }));
        }
    }, [data, uniqueLocations, uniqueYears, dashboardState.selectedLocationName]);

    // Reset source when location changes
    useEffect(() => {
        if (dashboardState.selectedLocationName && availableSources.length > 0) {
            const currentSourceAvailable = availableSources.includes(dashboardState.selectedSource as 'electric' | 'gas');
            if (!currentSourceAvailable) {
                setDashboardState(prev => ({
                    ...prev,
                    selectedSource: availableSources[0]
                }));
            }
        }
    }, [dashboardState.selectedLocationName, availableSources, dashboardState.selectedSource]);

    const selectedLocationData = useMemo(() => {
    const baseData = data?.find(d =>
        d.location === dashboardState.selectedLocationName &&
        d.source === dashboardState.selectedSource
    ) || null;

    if (!baseData || !dashboardState.selectedYear) return baseData;

    // Dynamically calculate YTD emissions for the selected year
    const ytd_emissions_for_selected_year = baseData.emissions
        .filter(em => em.Year === dashboardState.selectedYear && typeof em.emissions === 'number')
        .reduce((sum, em) => sum + em.emissions, 0);

    // Create a dynamic summary object
    const dynamicSummary = {
        ...baseData.current_year_summary,
        ytd_emissions: ytd_emissions_for_selected_year,
    };

    return {
        ...baseData,
        current_year_summary: dynamicSummary
    };
}, [data, dashboardState.selectedLocationName, dashboardState.selectedSource, dashboardState.selectedYear]);

    const chartData = useMemo(() => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyAggregates: { [key: string]: { [locationSource: string]: number } } = {};

    const electricLocations = data?.filter(d => d.source === 'electric') ?? [];
    const gasLocations = data?.filter(d => d.source === 'gas') ?? [];

    data?.forEach(loc => {
        if (!loc.emissions) return;
        const locationSourceKey = `${loc.location} (${loc.source})`;

        // *** Filter emissions by the selected year before processing ***
        const yearlyEmissions = loc.emissions.filter(em => em.Year === dashboardState.selectedYear);

        yearlyEmissions.forEach(em => {
            if (typeof em.Month !== 'number' || typeof em.emissions !== 'number' || em.Month < 1 || em.Month > 12) return;

            const monthIndex = em.Month - 1;
            const monthName = monthNames[monthIndex];
            if (!monthName) return;

            if (!monthlyAggregates[monthName]) {
                monthlyAggregates[monthName] = {};
            }
            monthlyAggregates[monthName][locationSourceKey] = (monthlyAggregates[monthName][locationSourceKey] || 0) + em.emissions;
        });
    });

    const finalChartData: ChartDataRow[] = monthNames.map(monthName => ({
        month: monthName,
        ...(monthlyAggregates[monthName] || {}),
    }));

    const selectedLocationSourceKey = `${dashboardState.selectedLocationName} (${dashboardState.selectedSource})`;
    const derFactor = 1 - (Object.values(dashboardState.derAllocation).filter((_, i) => i > 0).reduce((acc, v) => acc + v, 0) / 100);

    const dataWithDer = finalChartData.map(d => ({
        ...d,
        'DER': (d[selectedLocationSourceKey] as number || 0) * derFactor,
    }));

    return { all: dataWithDer, electric: electricLocations, gas: gasLocations };
}, [data, dashboardState.selectedLocationName, dashboardState.selectedSource, dashboardState.derAllocation, dashboardState.selectedYear]); // Add selectedYear

    // --- EVENT HANDLERS ---
    const handleLocationChange = (event: any) => {
        setDashboardState(prev => ({ 
            ...prev, 
            selectedLocationName: event.target.value,
            selectedSource: '' // Reset source when location changes
        }));
    };

    const handleYearChange = (event: any) => {
        setDashboardState(prev => ({
            ...prev,
            selectedYear: event.target.value as number
        }));
    };

    const handleSourceChange = (event: any) => {
        setDashboardState(prev => ({ 
            ...prev, 
            selectedSource: event.target.value 
        }));
    };

    const handleDERAllocationChange = (name: string) => (_event: Event, newValue: number | number[]) => {
        const value = newValue as number;
        const oldValue = dashboardState.derAllocation[name];
        const difference = value - oldValue;
        const currentPlantValue = dashboardState.derAllocation.PLANT;
        if (difference > 0 && currentPlantValue < difference) return;
        setDashboardState(prev => ({ ...prev, derAllocation: { ...prev.derAllocation, [name]: value, PLANT: currentPlantValue - difference } }));
    };

    // --- ROBUST FORMATTING HELPERS ---
    const formatNumber = (num?: number | null, digits = 2) => num?.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: digits }) ?? 'N/A';
    const formatString = (str?: string | null) => str?.toString() || 'N/A';
    const formatPercent = (val?: number | null) => (val === null || val === undefined) ? 'N/A' : `${val.toFixed(1)}%`;
    const formatBoolean = (b?: boolean | null, yesNo = false) => b === null || b === undefined ? 'N/A' : (yesNo ? (b ? 'YES' : 'NO') : (b ? 'ON' : 'OFF'));

    // --- RENDER LOGIC ---
    const { target_goals, current_year_summary, targets_2030 } = selectedLocationData ?? {};
    const hasData = data && data.length > 0;
    const selectedLocationSourceKey = `${dashboardState.selectedLocationName} (${dashboardState.selectedSource})`;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <link href={nunitoSansUrl} rel="stylesheet" />
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', p: 3 }}>
                <Container maxWidth="xl">
                    <Typography variant="h4" component="h1" textAlign="center" fontWeight="bold" mb={4} color="text.primary">
                        EMISSIONS MONITORING DASHBOARD
                    </Typography>
                    
                    <Grid container spacing={3} mb={4}>
    {/* LEFT HALF: Filters Card */}
    <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
        <FilterCard>
            <CardHeader title={<Typography variant="subtitle2" fontWeight="bold">FILTERS</Typography>} sx={{ textAlign: 'center', py: 1 }} />
            <CardContent>
                <TableContainer component={Paper} elevation={0}>
                    <Table size="small" sx={{ tableLayout: 'fixed' }}>
                        <TableBody>
                            <TableRow>
                                <LabelCell>Location</LabelCell>
                                <StyledTableCell>
                                    <FormControl size="small" fullWidth>
                                        <Select
                                            value={dashboardState.selectedLocationName || ''}
                                            onChange={handleLocationChange}
                                            sx={{ fontSize: '0.75rem' }}
                                            disabled={!hasData}
                                            displayEmpty
                                        >
                                            {hasData ? (
                                                uniqueLocations.map(location => (
                                                    <MenuItem key={location} value={location}>
                                                        {location}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="" disabled>
                                                    No location found
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <LabelCell>Source</LabelCell>
                                <StyledTableCell>
                                    <FormControl size="small" fullWidth>
                                        <Select
                                            value={dashboardState.selectedSource || ''}
                                            onChange={handleSourceChange}
                                            sx={{ fontSize: '0.75rem' }}
                                            disabled={!hasData || availableSources.length === 0}
                                            displayEmpty
                                        >
                                            {availableSources.length > 0 ? (
                                                availableSources.map(source => (
                                                    <MenuItem key={source} value={source}>
                                                        {source}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="" disabled>
                                                    No source available
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <LabelCell>Year</LabelCell>
                                <StyledTableCell>
                                    <FormControl size="small" fullWidth>
                                        <Select
                                            value={dashboardState.selectedYear || ''}
                                            onChange={handleYearChange}
                                            sx={{ fontSize: '0.75rem' }}
                                            disabled={!hasData}
                                            displayEmpty
                                        >
                                            {uniqueYears.length > 0 ? (
                                                uniqueYears.map(year => (
                                                    <MenuItem key={year} value={year}>
                                                        {year}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="" disabled>
                                                    No year found
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box mt={2}>
                    <Typography variant="caption" fontWeight="medium" gutterBottom display="block">Current Year CO2e Reduction Goal %</Typography>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Slider disabled value={dashboardState.co2eGoal} min={0} max={100} size="small" sx={{ flexGrow: 1 }} />
                        <Typography variant="caption" color="text.secondary" minWidth="35px">{dashboardState.co2eGoal}%</Typography>
                    </Box>
                </Box>
            </CardContent>
        </FilterCard>
    </Grid>

    {/* RIGHT HALF: Plant and DER System Cards */}
    <Grid item xs={12} md={6}>
        <Grid container spacing={3} direction="column">
            <Grid item>
                <StyledCard>
                    <CardHeader title={<Typography variant="subtitle2" fontWeight="bold">PLANT ALLOCATION</Typography>} sx={{ textAlign: 'center', py: 1 }} />
                    <CardContent sx={{ p: '0 !important' }}>
                        <TableContainer>
                            <Table size="small" sx={{ tableLayout: 'fixed' }}>
                                <TableHead>
                                    <TableRow>
                                        <HeaderCell>System</HeaderCell>
                                        <HeaderCell>Allocation%</HeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <LabelCell>PLANT</LabelCell>
                                        <StyledTableCell>
                                            <Box display="flex" alignItems="center" gap={1} px={1}>
                                                <Slider value={dashboardState.derAllocation.PLANT} disabled size="small" sx={{ flexGrow: 1 }} />
                                                <Typography variant="caption" fontWeight="medium" minWidth="35px">{dashboardState.derAllocation.PLANT}%</Typography>
                                            </Box>
                                        </StyledTableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </StyledCard>
            </Grid>
            <Grid item>
                <StyledCard>
                    <CardHeader title={<Typography variant="subtitle2" fontWeight="bold">DER SYSTEM</Typography>} sx={{ textAlign: 'center', py: 1 }} />
                    <CardContent sx={{ p: '0 !important' }}>
                        <TableContainer>
                            <Table size="small" sx={{ tableLayout: 'fixed' }}>
                                <TableHead>
                                    <TableRow>
                                        <HeaderCell>DER System</HeaderCell>
                                        <HeaderCell>Allocation%</HeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.entries(dashboardState.derAllocation).filter(([name]) => name !== 'PLANT').map(([name, value]) => (
                                        <TableRow key={name}>
                                            <LabelCell>{name}</LabelCell>
                                            <StyledTableCell>
                                                <Box display="flex" alignItems="center" gap={1} px={1}>
                                                    <Slider value={value} onChange={handleDERAllocationChange(name)} size="small" sx={{ flexGrow: 1 }} />
                                                    <Typography variant="caption" fontWeight="medium" minWidth="35px">{value}%</Typography>
                                                </Box>
                                            </StyledTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </StyledCard>
            </Grid>
        </Grid>
    </Grid>

    {/* LEFT HALF: 2030 Targets Card */}
    <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
        <StyledCard>
            <CardHeader title={<Typography variant="subtitle2" fontWeight="bold">2030 TARGETS</Typography>} sx={{ textAlign: 'center', py: 1 }} />
            <CardContent sx={{ p: '0 !important' }}>
                <TableContainer>
                    <Table size="small" sx={{ tableLayout: 'fixed' }}>
                        <TableHead>
                            <TableRow>
                                <SubHeaderCell></SubHeaderCell>
                                <SubHeaderCell>COUNTY</SubHeaderCell>
                                <SubHeaderCell>STATE</SubHeaderCell>
                                <SubHeaderCell>CORP</SubHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <LabelCell>Location</LabelCell>
                                <StyledTableCell>{targets_2030?.location?.county}</StyledTableCell>
                                <StyledTableCell>{formatString(targets_2030?.location?.state)}</StyledTableCell>
                                <RedCell>{formatString(targets_2030?.location?.corp)}</RedCell>
                            </TableRow>
                            <TableRow>
                                <LabelCell>Penalty Rule ($/kg CO2e)</LabelCell>
                                <StyledTableCell>{formatString(targets_2030?.penalty_rule?.county)}</StyledTableCell>
                                <StyledTableCell>${formatString(targets_2030?.penalty_rule?.state)}kg</StyledTableCell>
                                <StyledTableCell>{formatString(targets_2030?.penalty_rule?.corp)}</StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </StyledCard>
    </Grid>

    {/* RIGHT HALF: Target Goals Card */}
    <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
        <StyledCard>
            <CardHeader title={<Typography variant="subtitle2" fontWeight="bold">TARGET GOALS</Typography>} sx={{ textAlign: 'center', py: 1 }} />
            <CardContent sx={{ p: '0 !important' }}>
                <TableContainer>
                    <Table size="small">
                        <TableBody>
                            <TableRow>
                                <StyledTableCell colSpan={4} sx={{ fontSize: '0.75rem', p: 1 }}>2030 Reduction kg CO2e goals by sector</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <SubHeaderCell>Baseline CO2 (Tons)</SubHeaderCell>
                                <SubHeaderCell>YTD</SubHeaderCell>
                                <SubHeaderCell>Forecast</SubHeaderCell>
                                <SubHeaderCell>Previous Year</SubHeaderCell>
                            </TableRow>
                            <TableRow>
                                {/* Note: First cell is empty to align with the columns */}
                                <LabelCell></LabelCell>
                                <RedCell>{formatNumber(current_year_summary?.ytd_emissions)}</RedCell>
                                <RedCell>{formatNumber(target_goals?.baseline_co2?.forecast)}</RedCell>
                                <StyledTableCell>{formatNumber(target_goals?.baseline_co2?.previous_year)}</StyledTableCell>
                            </TableRow>
                            {/* <TableRow>
                                <LabelCell>Reduction Amount</LabelCell>
                                <StyledTableCell>{formatNumber(target_goals?.["Reduction Amount"]?.YTD)}</StyledTableCell>
                                <StyledTableCell>{formatNumber(target_goals?.["Reduction Amount"]?.Forecast)}</StyledTableCell>
                                <StyledTableCell>{formatNumber(target_goals?.["Reduction Amount"]?.["Previous Year"])}</StyledTableCell>
                            </TableRow> */}
                            {/* <TableRow>
                                <TableCell colSpan={4} sx={{ p: 0.5, border: 0, borderTop: 1, borderColor: 'divider' }}></TableCell>
                            </TableRow> */}
                            <TableRow>
                                <SubHeaderCell></SubHeaderCell>
                                <SubHeaderCell>COUNTY</SubHeaderCell>
                                <SubHeaderCell>STATE</SubHeaderCell>
                                <SubHeaderCell>CORP</SubHeaderCell>
                            </TableRow>
                            <TableRow>
                                <LabelCell>Reduction Amount</LabelCell>
                                <StyledTableCell>{formatNumber(target_goals?.reduction_amount?.county)}</StyledTableCell>
                                <StyledTableCell>{formatNumber(target_goals?.reduction_amount?.state)}</StyledTableCell>
                                <StyledTableCell>{formatNumber(target_goals?.reduction_amount?.corp)}</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <LabelCell>Reduction %</LabelCell>
                                <StyledTableCell>{formatPercent(target_goals?.reduction_percentage?.county)}</StyledTableCell>
                                <StyledTableCell>{formatPercent(target_goals?.reduction_percentage?.state)}</StyledTableCell>
                                <RedCell>{formatPercent(target_goals?.reduction_percentage?.corp)}</RedCell>
                            </TableRow>
                            <TableRow>
                                <LabelCell>Target (ON/OFF)</LabelCell>
                                <StyledTableCell>{target_goals?.target_on_off?.county}</StyledTableCell>
                                <StyledTableCell>{target_goals?.target_on_off?.state}</StyledTableCell>
                                <StyledTableCell>{target_goals?.target_on_off?.corp}</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <LabelCell>Action Needed</LabelCell>
                                <RedCell>{formatBoolean(target_goals?.action_needed?.county === 'YES', true)}</RedCell>
                                <RedCell>{formatBoolean(target_goals?.action_needed?.state === 'YES', true)}</RedCell>
                                <RedCell>{formatBoolean(target_goals?.action_needed?.corp === 'YES', true)}</RedCell>
                            </TableRow>
                            <TableRow>
                                <LabelCell>Penalty</LabelCell>
                                <StyledTableCell>${formatNumber(target_goals?.penalty?.county)}</StyledTableCell>
                                <RedCell>${formatNumber(target_goals?.penalty?.state)}</RedCell>
                                <StyledTableCell>${formatNumber(target_goals?.penalty?.corp)}</StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </StyledCard>
    </Grid>

    {/* LEFT HALF: Current Year Summary Card */}
<Grid item xs={12} md={6}>
    <SummaryCard>
        <CardHeader title={<Typography variant="subtitle2" fontWeight="bold">CURRENT YEAR SUMMARY</Typography>} sx={{ textAlign: 'center', py: 1 }} />
        <CardContent sx={{ p: '0 !important' }}>
            <TableContainer>
                <Table size="small" sx={{ tableLayout: 'fixed' }}>
                    <TableBody>
                        <TableRow>
                            <StyledTableCell colSpan={3} sx={{ textAlign: 'right', py: 0.5 }}>YTD: {formatString(current_year_summary?.current_month)}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <LabelCell>YTD CO2e</LabelCell>
                            <RedCell>{formatNumber(current_year_summary?.ytd_emissions)}</RedCell>
                            <StyledTableCell>Metric Tons</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <LabelCell>Current Month</LabelCell>
                            <StyledTableCell>{formatString(current_year_summary?.current_month)}</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <LabelCell>Up/Down from previous month</LabelCell>
                            <RedCell>{formatNumber(current_year_summary?.difference_from_last_month, 1)}% ({formatString(current_year_summary?.up_or_down)})</RedCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <LabelCell>Current Year CO2e Reduction Goal Amount</LabelCell>
                            <StyledTableCell>{formatNumber(current_year_summary?.emission_reduction_goal)}</StyledTableCell>
                            <StyledTableCell>Metric Tons</StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
    </SummaryCard>
</Grid>

{/* RIGHT HALF: Emissions by Scope Card */}
<Grid item xs={12} md={6}>
    <StyledCard>
        <CardHeader title={<Typography variant="subtitle2" fontWeight="bold">EMISSIONS BY SCOPE</Typography>} sx={{ textAlign: 'center', py: 1 }}/>
        <CardContent sx={{ p: '0 !important' }}>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <HeaderCell>SCOPE 1</HeaderCell>
                            <HeaderCell>SCOPE 2</HeaderCell>
                            <HeaderCell>SCOPE 3</HeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <StyledTableCell>
                                {selectedLocationData?.source === 'gas' ? 
                                    <RedCell>{formatNumber(current_year_summary?.ytd_emissions)}</RedCell> : 
                                    'N/A'
                                }
                            </StyledTableCell>
                            <StyledTableCell>
                                {selectedLocationData?.source === 'electric' ? 
                                    <RedCell>{formatNumber(current_year_summary?.ytd_emissions)}</RedCell> : 
                                    'N/A'
                                }
                            </StyledTableCell>
                            <StyledTableCell>N/A</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell sx={{ fontSize: '0.75rem', p: 1, textAlign: 'left' }}>
                                Direct Emissions that are owned or controlled by you. Ex. Company fleet vehicles
                            </StyledTableCell>
                            <StyledTableCell sx={{ fontSize: '0.75rem', p: 1, textAlign: 'left' }}>
                                Emissions that you directly caused. Ex. Emissions from the purchase of electricity
                            </StyledTableCell>
                            <StyledTableCell sx={{ fontSize: '0.75rem', p: 1, textAlign: 'left' }}>
                                Emissions products purchased by you, uses and disposes of.
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
    </StyledCard>
</Grid>
</Grid>

                    <Box mb={4}>
                        <Typography variant="h5" component="h2" textAlign="center" fontWeight="bold" mb={3} color="text.primary">EMISSIONS MONITORING</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={6}>
                                <StyledCard>
                                    <CardHeader title={
                                        <Box display="flex" justifyContent="center" alignItems="center">
                                            <Typography noWrap variant="subtitle2" fontWeight="bold" sx={{flexGrow:1}}>
                                                {`CO2e - ${dashboardState.selectedLocationName || 'Location'} (${dashboardState.selectedSource || 'Source'})`}
                                            </Typography>
                                            <IconButton size="small" onClick={() => setExpandedChart({ key: 'combo', title: 'Composite View' })}>
                                                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                                            </IconButton>
                                        </Box>
                                    } sx={{ textAlign: 'center', py: 1 }}/>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <ComposedChart data={chartData.all}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey={selectedLocationSourceKey} fill="#FF9F40" />
                                                <Bar dataKey="DER" fill="#4BC0C0" />
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <StyledCard>
                                    <CardHeader title={
                                        <Box display="flex" justifyContent="center" alignItems="center">
                                            <Typography noWrap variant="subtitle2" fontWeight="bold" sx={{flexGrow:1}}>CO2e - Electricity Only</Typography>
                                            <IconButton size="small" onClick={() => setExpandedChart({ key: 'electricity', title: 'CO2e - Electricity Only' })}>
                                                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                                            </IconButton>
                                        </Box>
                                    } sx={{ textAlign: 'center', py: 1 }}/>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <BarChart data={chartData.all}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                {chartData.electric.map((loc, i) => {
                                                    const locationSourceKey = `${loc.location} (${loc.source})`;
                                                    return <Bar key={locationSourceKey} dataKey={locationSourceKey} stackId="a" fill={`hsl(${i * 60}, 70%, 50%)`} />
                                                })}
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <StyledCard>
                                    <CardHeader title={
                                        <Box display="flex" justifyContent="center" alignItems="center">
                                            <Typography noWrap variant="subtitle2" fontWeight="bold" sx={{flexGrow:1}}>CO2e - All Locations</Typography>
                                            <IconButton size="small" onClick={() => setExpandedChart({ key: 'allLocations', title: 'CO2e - All Locations' })}>
                                                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                                            </IconButton>
                                        </Box>
                                    } sx={{ textAlign: 'center', py: 1 }}/>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <BarChart data={chartData.all}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                {(data ?? []).map((loc, i) => {
                                                    const locationSourceKey = `${loc.location} (${loc.source})`;
                                                    return <Bar key={locationSourceKey} dataKey={locationSourceKey} stackId="a" fill={`hsl(${i * 60}, 70%, 50%)`} />
                                                })}
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <StyledCard>
                                    <CardHeader title={
                                        <Box display="flex" justifyContent="center" alignItems="center">
                                            <Typography noWrap variant="subtitle2" fontWeight="bold" sx={{flexGrow:1}}>CO2e - Natural Gas Only</Typography>
                                            <IconButton size="small" onClick={() => setExpandedChart({ key: 'naturalGas', title: 'CO2e - Natural Gas Only' })}>
                                                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                                            </IconButton>
                                        </Box>
                                    } sx={{ textAlign: 'center', py: 1 }}/>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <BarChart data={chartData.all}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                {chartData.gas.map((loc, i) => {
                                                    const locationSourceKey = `${loc.location} (${loc.source})`;
                                                    return <Bar key={locationSourceKey} dataKey={locationSourceKey} stackId="a" fill={`hsl(${180 + i * 60}, 70%, 50%)`} />
                                                })}
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                        </Grid>
                    </Box>

                    <Modal open={!!expandedChart} onClose={() => setExpandedChart(null)} closeAfterTransition sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Fade in={!!expandedChart}>
                            <Paper sx={{ width: '90vw', height: '90vh', p: 3, display: 'flex', flexDirection: 'column', borderRadius: '12px' }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>
                                        {expandedChart?.title}
                                    </Typography>
                                    <IconButton onClick={() => setExpandedChart(null)} aria-label="Close expanded chart">
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ flexGrow: 1, height: 'calc(100% - 48px)' }}>
                                    {expandedChart?.key === 'combo' && (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <ComposedChart data={chartData.all}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey={selectedLocationSourceKey} fill="#FF9F40" />
                                                <Bar dataKey="DER" fill="#4BC0C0" />
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    )}
                                    {expandedChart?.key === 'electricity' && (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={chartData.all}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                {chartData.electric.map((loc, i) => {
                                                    const locationSourceKey = `${loc.location} (${loc.source})`;
                                                    return <Bar key={locationSourceKey} dataKey={locationSourceKey} stackId="a" fill={`hsl(${i * 60}, 70%, 50%)`} />
                                                })}
                                            </BarChart>
                                        </ResponsiveContainer>
                                    )}
                                    {expandedChart?.key === 'allLocations' && (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={chartData.all}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                {(data ?? []).map((loc, i) => {
                                                    const locationSourceKey = `${loc.location} (${loc.source})`;
                                                    return <Bar key={locationSourceKey} dataKey={locationSourceKey} stackId="a" fill={`hsl(${i * 60}, 70%, 50%)`} />
                                                })}
                                            </BarChart>
                                        </ResponsiveContainer>
                                    )}
                                    {expandedChart?.key === 'naturalGas' && (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={chartData.all}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                {chartData.gas.map((loc, i) => {
                                                    const locationSourceKey = `${loc.location} (${loc.source})`;
                                                    return <Bar key={locationSourceKey} dataKey={locationSourceKey} stackId="a" fill={`hsl(${180 + i * 60}, 70%, 50%)`} />
                                                })}
                                            </BarChart>
                                        </ResponsiveContainer>
                                    )}
                                </Box>
                            </Paper>
                        </Fade>
                    </Modal>

                    {/* <StyledCard>
                        <CardHeader title={<Typography variant="subtitle2" fontWeight="bold">EMISSIONS BY SCOPE</Typography>} sx={{ textAlign: 'center', py: 1 }}/>
                        <CardContent sx={{ p: '0 !important' }}>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <HeaderCell>SCOPE 1</HeaderCell>
                                            <HeaderCell>SCOPE 2</HeaderCell>
                                            <HeaderCell>SCOPE 3</HeaderCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <StyledTableCell>
                                                {selectedLocationData?.source === 'gas' ? 
                                                    <RedCell>{formatNumber(current_year_summary?.ytd_emissions)}</RedCell> : 
                                                    'N/A'
                                                }
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {selectedLocationData?.source === 'electric' ? 
                                                    <RedCell>{formatNumber(current_year_summary?.ytd_emissions)}</RedCell> : 
                                                    'N/A'
                                                }
                                            </StyledTableCell>
                                            <StyledTableCell>N/A</StyledTableCell>
                                        </TableRow>
                                        <TableRow>
                                            <StyledTableCell sx={{ fontSize: '0.75rem', p: 1, textAlign: 'left' }}>
                                                Direct Emissions that are owned or controlled by you. Ex. Company fleet vehicles
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ fontSize: '0.75rem', p: 1, textAlign: 'left' }}>
                                                Emissions that you directly caused. Ex. Emissions from the purchase of electricity
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ fontSize: '0.75rem', p: 1, textAlign: 'left' }}>
                                                Emissions products purchased by you, uses and disposes of.
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </StyledCard> */}
                
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default EmissionsDashboard;