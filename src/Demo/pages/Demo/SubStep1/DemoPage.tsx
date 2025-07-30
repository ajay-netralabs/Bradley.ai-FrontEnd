import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Slider,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Container,
  styled,
  createTheme,
  ThemeProvider,
  CssBaseline
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, /* LineChart, */ Line, ComposedChart } from 'recharts';

// Inject Nunito Sans font
const nunitoSansUrl = 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap';

const theme = createTheme({
  typography: {
    fontFamily: '"Nunito Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    subtitle2: {
      fontWeight: 600,
    }
  },
});

// Styled components for custom styling
const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[2],
  width: '100%', // Ensure card fills its container
}));

const FilterCard = styled(Card)(({ theme }) => ({
  width: '100%', // Ensure card fills its container
  '& .MuiCardHeader-root': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '& .MuiTypography-root': {
      fontWeight: 'bold',
      fontSize: '0.875rem',
    }
  }
}));

const SummaryCard = styled(Card)(({ /* theme */ }) => ({
  width: '100%', // Ensure card fills its container
  '& .MuiCardHeader-root': {
    backgroundColor: '#fff3cd',
    '& .MuiTypography-root': {
      fontWeight: 'bold',
      fontSize: '0.875rem',
    }
  }
}));

const RedCell = styled(TableCell)(({ /* theme */ }) => ({
  backgroundColor: '#ffebee',
  color: '#c62828',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '0.75rem',
}));

const LabelCell = styled(TableCell)(({ /* theme */ }) => ({
  backgroundColor: '#f5f5f5',
  fontWeight: 600,
  textAlign: 'left',
  fontSize: '0.75rem',
  width: '40%'
}));

const StyledTableCell = styled(TableCell)({
  fontSize: '0.75rem',
  textAlign: 'center',
  padding: '8px',
});

const SubHeaderCell = styled(TableCell)(({ /* theme */ }) => ({
  backgroundColor: '#e0e0e0',
  fontWeight: 600,
  textAlign: 'center',
  fontSize: '0.75rem',
  padding: '8px',
}));

const HeaderCell = styled(TableCell)(({ /* theme */ }) => ({
  backgroundColor: '#bdbdbd',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '0.875rem',
  padding: '8px',
}));

interface DashboardState {
  location: string;
  source: string;
  co2eGoal: number;
  derAllocation: {
    [key: string]: number;
  };
}

const EmissionsDashboard: React.FC = () => {
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    location: 'LOC1',
    source: 'Natural Gas',
    co2eGoal: 10,
    derAllocation: {
      PLANT: 60,
      'Solar PV': 10,
      CHP: 5,
      'Simple Cycle Turbines': 5,
      'Fuel Cells': 10,
      'Linear Generation': 8,
      'Battery Storage': 2,
    },
  });

  const [summary, setSummary] = useState<any>({});
  const [chartData, setChartData] = useState<any>({});

  useEffect(() => {
    // Simulated calculations
    const baselineCO2 = 4129.26;
    const derReductionFactor = Object.values(dashboardState.derAllocation).reduce((sum, val) => sum + val, 0) / 100 * 0.3;
    const annualForecast = baselineCO2 * (1 - derReductionFactor);
    const ytdCO2e = 2571.73;
    const reductionGoalAmount = baselineCO2 * (dashboardState.co2eGoal / 100);
    const exceedsAmount = annualForecast - (baselineCO2 - reductionGoalAmount);

    setSummary({
      ytdCO2e: ytdCO2e,
      annualForecast: annualForecast,
      upDown: -5.5,
      reductionGoalAmount: reductionGoalAmount,
      exceedsAmount: exceedsAmount > 0 ? exceedsAmount : 0,
      isExceeding: exceedsAmount > 0,
      baselineCO2: baselineCO2,
      previousYear: 4028.54,
    });

    // Chart data
    const months = [
      { month: '1', 'LOC1-S1': 325, 'DER': 275, 'LOC2-S1': 220, 'LOC2-S2': 150, 'County Target': 260, 'State Target': 228, 'Corp Target': 293 },
      { month: '2', 'LOC1-S1': 315, 'DER': 265, 'LOC2-S1': 215, 'LOC2-S2': 140, 'County Target': 252, 'State Target': 221, 'Corp Target': 284 },
      { month: '3', 'LOC1-S1': 350, 'DER': 295, 'LOC2-S1': 225, 'LOC2-S2': 160, 'County Target': 280, 'State Target': 245, 'Corp Target': 315 },
      { month: '4', 'LOC1-S1': 380, 'DER': 320, 'LOC2-S1': 280, 'LOC2-S2': 165, 'County Target': 304, 'State Target': 266, 'Corp Target': 342 },
      { month: '5', 'LOC1-S1': 405, 'DER': 340, 'LOC2-S1': 280, 'LOC2-S2': 180, 'County Target': 324, 'State Target': 284, 'Corp Target': 365 },
      { month: '6', 'LOC1-S1': 395, 'DER': 332, 'LOC2-S1': 275, 'LOC2-S2': 175, 'County Target': 316, 'State Target': 277, 'Corp Target': 356 },
      { month: '7', 'LOC1-S1': 370, 'DER': 311, 'LOC2-S1': 230, 'LOC2-S2': 165, 'County Target': 296, 'State Target': 259, 'Corp Target': 333 },
    ];

    setChartData({
      combo: months,
      electricity: months,
      allLocations: months,
      naturalGas: months.map(m => ({ month: m.month, 'LOC2-S2': m['LOC2-S2'] })),
    });
  }, [dashboardState]);

  const handleLocationChange = (event: any) => {
    setDashboardState(prev => ({ ...prev, location: event.target.value }));
  };

  const handleSourceChange = (event: any) => {
    setDashboardState(prev => ({ ...prev, source: event.target.value }));
  };

  const handleCO2GoalChange = (_event: Event, newValue: number | number[]) => {
    setDashboardState(prev => ({ ...prev, co2eGoal: newValue as number }));
  };

  const handleDERAllocationChange = (name: string) => (_event: Event, newValue: number | number[]) => {
    setDashboardState(prev => ({
      ...prev,
      derAllocation: { ...prev.derAllocation, [name]: newValue as number }
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <link href={nunitoSansUrl} rel="stylesheet" />
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', p: 3 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" component="h1" textAlign="center" fontWeight="bold" mb={4} color="text.primary">
            EMISSIONS MONITORING DASHBOARD
          </Typography>

          {/* Top & Middle Section: Optimized Layout */}
          <Grid container spacing={3} mb={4}>
            {/* LEFT COLUMN */}
            <Grid item xs={12} lg={7}>
              <Grid container spacing={3}>
                {/* Filters - MODIFIED FOR ALIGNMENT */}
                <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                  <FilterCard>
                    <CardHeader
                      title={<Typography variant="subtitle2" fontWeight="bold">FILTERS</Typography>}
                      sx={{ textAlign: 'center', py: 1 }}
                    />
                    <CardContent>
                      <TableContainer component={Paper} elevation={0}>
                        <Table size="small" sx={{ tableLayout: 'fixed' }}>
                          <TableBody>
                            <TableRow>
                              <LabelCell>Location</LabelCell>
                              <StyledTableCell>
                                <FormControl size="small" fullWidth>
                                  <Select
                                    value={dashboardState.location}
                                    onChange={handleLocationChange}
                                    sx={{ fontSize: '0.75rem' }}
                                  >
                                    <MenuItem value="LOC1">LOC1</MenuItem>
                                    <MenuItem value="LOC2">LOC2</MenuItem>
                                  </Select>
                                </FormControl>
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <LabelCell>Source</LabelCell>
                              <StyledTableCell>
                                <FormControl size="small" fullWidth>
                                  <Select
                                    value={dashboardState.source}
                                    onChange={handleSourceChange}
                                    sx={{ fontSize: '0.75rem' }}
                                  >
                                    <MenuItem value="Natural Gas">Natural Gas</MenuItem>
                                    <MenuItem value="Electricity">Electricity</MenuItem>
                                    <MenuItem value="All">All</MenuItem>
                                  </Select>
                                </FormControl>
                              </StyledTableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <Box mt={2}>
                        <Typography variant="caption" fontWeight="medium" gutterBottom display="block">
                          Current Year CO2e Reduction Goal %
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Slider
                            value={dashboardState.co2eGoal}
                            onChange={handleCO2GoalChange}
                            min={0}
                            max={100}
                            size="small"
                            sx={{ flexGrow: 1 }}
                          />
                          <Typography variant="caption" color="text.secondary" minWidth="35px">
                            {dashboardState.co2eGoal}%
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </FilterCard>
                </Grid>

                {/* 2030 Targets - MODIFIED FOR ALIGNMENT */}
                <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                  <StyledCard>
                    <CardHeader
                      title={<Typography variant="subtitle2" fontWeight="bold">2030 TARGETS</Typography>}
                      sx={{ textAlign: 'center', py: 1 }}
                    />
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
                              <StyledTableCell>Montgomery</StyledTableCell>
                              <StyledTableCell>MD</StyledTableCell>
                              <RedCell>50%</RedCell>
                            </TableRow>
                            <TableRow>
                              <LabelCell>Penalty Rule ($/kg CO2e)</LabelCell>
                              <StyledTableCell>None</StyledTableCell>
                              <StyledTableCell>($200k/ 10M)</StyledTableCell>
                              <StyledTableCell>None</StyledTableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </StyledCard>
                </Grid>

                {/* Target Goals */}
                <Grid item xs={12}>
                  <StyledCard>
                    <CardHeader
                      title={<Typography variant="subtitle2" fontWeight="bold">TARGET GOALS</Typography>}
                      sx={{ textAlign: 'center', py: 1 }}
                    />
                    <CardContent sx={{ p: '0 !important' }}>
                      <TableContainer>
                        <Table size="small">
                          <TableBody>
                            <TableRow>
                              <StyledTableCell colSpan={4} sx={{ fontSize: '0.75rem', p: 1 }}>
                                2030 Reduction kg CO2e goals by sector
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <SubHeaderCell>Baseline CO2 (Metric Tons)</SubHeaderCell>
                              <SubHeaderCell>YTD</SubHeaderCell>
                              <SubHeaderCell>Forecast</SubHeaderCell>
                              <SubHeaderCell>Previous Year</SubHeaderCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell>2,571.73</StyledTableCell>
                              <RedCell>2,571.73</RedCell>
                              <RedCell>4,129.26</RedCell>
                              <StyledTableCell>4,028.54</StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <LabelCell>Reduction Amount</LabelCell>
                              <StyledTableCell>825.85</StyledTableCell>
                              <StyledTableCell>1,238.78</StyledTableCell>
                              <StyledTableCell>2,064.63</StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={4} sx={{ p: 0.5, border: 0, borderTop: 1, borderColor: 'divider' }}></TableCell>
                            </TableRow>
                            <TableRow>
                              <SubHeaderCell></SubHeaderCell>
                              <SubHeaderCell>COUNTY</SubHeaderCell>
                              <SubHeaderCell>STATE</SubHeaderCell>
                              <SubHeaderCell>CORP</SubHeaderCell>
                            </TableRow>
                            <TableRow>
                              <LabelCell>Reduction %</LabelCell>
                              <StyledTableCell>20%</StyledTableCell>
                              <StyledTableCell>30%</StyledTableCell>
                              <RedCell>50%</RedCell>
                            </TableRow>
                            <TableRow>
                              <LabelCell>Target (ON/OFF)</LabelCell>
                              <StyledTableCell>OFF</StyledTableCell>
                              <StyledTableCell>OFF</StyledTableCell>
                              <StyledTableCell>OFF</StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <LabelCell>Action Needed</LabelCell>
                              <RedCell>YES</RedCell>
                              <RedCell>YES</RedCell>
                              <RedCell>YES</RedCell>
                            </TableRow>
                            <TableRow>
                              <LabelCell>Penalty</LabelCell>
                              <StyledTableCell>$ -</StyledTableCell>
                              <RedCell>$ 247,755.49</RedCell>
                              <StyledTableCell>$ -</StyledTableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </StyledCard>
                </Grid>
              </Grid>
            </Grid>

            {/* RIGHT COLUMN */}
            <Grid item xs={12} lg={5}>
                <Grid container spacing={3} direction="column">
                    {/* DER System */}
                    <Grid item xs>
                        <StyledCard>
                            <CardHeader
                                title={<Typography variant="subtitle2" fontWeight="bold">DER SYSTEM</Typography>}
                                sx={{ textAlign: 'center', py: 1 }}
                            />
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
                                    {Object.entries(dashboardState.derAllocation).map(([name, value]) => (
                                        <TableRow key={name}>
                                        <LabelCell>{name}</LabelCell>
                                        <StyledTableCell>
                                            <Box display="flex" alignItems="center" gap={1} px={1}>
                                            <Slider
                                                value={value}
                                                onChange={handleDERAllocationChange(name)}
                                                min={0}
                                                max={100}
                                                size="small"
                                                sx={{ flexGrow: 1 }}
                                            />
                                            <Typography variant="caption" fontWeight="medium" minWidth="35px">
                                                {value}%
                                            </Typography>
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

                    {/* Current Year Summary */}
                    <Grid item xs>
                        <SummaryCard>
                            <CardHeader
                                title={<Typography variant="subtitle2" fontWeight="bold">CURRENT YEAR SUMMARY</Typography>}
                                sx={{ textAlign: 'center', py: 1 }}
                            />
                            <CardContent sx={{ p: '0 !important' }}>
                                <TableContainer>
                                <Table size="small" sx={{ tableLayout: 'fixed' }}>
                                    <TableBody>
                                    <TableRow>
                                        <StyledTableCell colSpan={3} sx={{ textAlign: 'right', py: 0.5 }}>
                                        YTD: Jan - Jul 2015
                                        </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <LabelCell>YTD CO2e</LabelCell>
                                        <RedCell>{summary.ytdCO2e?.toLocaleString('en-US', { maximumFractionDigits: 2 })}</RedCell>
                                        <StyledTableCell>Metric Tons</StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <LabelCell>Annual Forecast</LabelCell>
                                        <RedCell>{summary.annualForecast?.toLocaleString('en-US', { maximumFractionDigits: 2 })}</RedCell>
                                        <StyledTableCell>Metric Tons</StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <LabelCell>Current Month</LabelCell>
                                        <StyledTableCell>Jul</StyledTableCell>
                                        <StyledTableCell></StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <LabelCell>Up/Down from previous month</LabelCell>
                                        <RedCell>{summary.upDown?.toFixed(1)}% (DOWN)</RedCell>
                                        <StyledTableCell></StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <LabelCell>Current Year CO2e Reduction Goal Amount</LabelCell>
                                        <StyledTableCell>{summary.reductionGoalAmount?.toLocaleString('en-US', { maximumFractionDigits: 2 })}</StyledTableCell>
                                        <StyledTableCell>Metric Tons</StyledTableCell>
                                    </TableRow>
                                    {summary.isExceeding && (
                                        <TableRow>
                                        <TableCell colSpan={3} sx={{
                                            backgroundColor: '#ffebee',
                                            color: '#c62828',
                                            textAlign: 'center',
                                            fontSize: '0.75rem',
                                            p: 1
                                        }}>
                                            Current forecast of {summary.annualForecast?.toLocaleString('en-US', { maximumFractionDigits: 2 })} EXCEEDS annual target by {summary.exceedsAmount?.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                        </TableCell>
                                        </TableRow>
                                    )}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            </CardContent>
                        </SummaryCard>
                    </Grid>
                </Grid>
            </Grid>
          </Grid>

          {/* Charts Section */}
          <Box mb={4}>
            <Typography variant="h5" component="h2" textAlign="center" fontWeight="bold" mb={3} color="text.primary">
              EMISSIONS MONITORING
            </Typography>

            <Grid container spacing={3}>
              {/* CO2e - LOC1 - Electricity */}
              <Grid item xs={12} lg={6}>
                <StyledCard>
                  <CardHeader
                    title={<Typography variant="subtitle2" fontWeight="bold">CO2e - LOC1 - Electricity</Typography>}
                    sx={{ textAlign: 'center', py: 1 }}
                  />
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <ComposedChart data={chartData.combo}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="LOC1-S1" fill="#FF9F40" />
                        <Bar dataKey="DER" fill="#4BC0C0" />
                        <Line type="monotone" dataKey="County Target" stroke="#36A2EB" strokeWidth={2} />
                        <Line type="monotone" dataKey="State Target" stroke="#9966FF" strokeWidth={2} />
                        <Line type="monotone" dataKey="Corp Target" stroke="#4BC0C0" strokeWidth={2} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </StyledCard>
              </Grid>

              {/* CO2e - Electricity Only */}
              <Grid item xs={12} lg={6}>
                <StyledCard>
                  <CardHeader
                    title={<Typography variant="subtitle2" fontWeight="bold">CO2e - Electricity Only</Typography>}
                    sx={{ textAlign: 'center', py: 1 }}
                  />
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={chartData.electricity}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="LOC2-S1" stackId="a" fill="#36A2EB" />
                        <Bar dataKey="LOC1-S1" stackId="a" fill="#FF9F40" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </StyledCard>
              </Grid>

              {/* CO2e - All Locations */}
              <Grid item xs={12} lg={6}>
                <StyledCard>
                  <CardHeader
                    title={<Typography variant="subtitle2" fontWeight="bold">CO2e - All Locations</Typography>}
                    sx={{ textAlign: 'center', py: 1 }}
                  />
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={chartData.allLocations}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="LOC1-S1" stackId="a" fill="#FF9F40" />
                        <Bar dataKey="LOC2-S1" stackId="a" fill="#36A2EB" />
                        <Bar dataKey="LOC2-S2" stackId="a" fill="#9966FF" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </StyledCard>
              </Grid>

              {/* CO2e - Natural Gas */}
              <Grid item xs={12} lg={6}>
                <StyledCard>
                  <CardHeader
                    title={<Typography variant="subtitle2" fontWeight="bold">CO2e - Natural Gas</Typography>}
                    sx={{ textAlign: 'center', py: 1 }}
                  />
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={chartData.naturalGas}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="LOC2-S2" fill="#9966FF" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>
          </Box>

          {/* Emissions By Scope */}
          <StyledCard>
            <CardHeader
              title={<Typography variant="subtitle2" fontWeight="bold">EMISSIONS BY SCOPE</Typography>}
              sx={{ textAlign: 'center', py: 1 }}
            />
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
                      <StyledTableCell>TBD</StyledTableCell>
                      <RedCell>2,571.73</RedCell>
                      <StyledTableCell>TBD</StyledTableCell>
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
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default EmissionsDashboard;