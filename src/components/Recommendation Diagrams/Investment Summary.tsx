import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList,
  AreaChart, Area
} from 'recharts';

// --- Data Definitions (needed for charts) ---

// Section 1: Project Cost & Incentives
const projectCostData = [
  { name: 'Material', value: 4155096.55, percentage: '55%' },
  { name: 'Labor', value: 1737585.83, percentage: '23%' },
  { name: 'Taxes', value: 453283.26, percentage: '6%' },
  { name: 'Engineering', value: 604377.68, percentage: '8%' },
  { name: 'Construction', value: 604377.68, percentage: '8%' },
];
// const totalProjectCost = 7554721.00; // Kept for potential future use, not displayed

const incentivesData = [
  { name: 'Utility rebate', value: 775000.00, percentage: '55%' },
  { name: 'State Grant', value: 550000.00, percentage: '23%' },
  { name: 'Investment Tax Credit', value: 1813133.04, percentage: '24%' },
];
// const totalIncentives = 3138133.04; // Kept for potential future use, not displayed

const projectCostPieColors = ['#0070c0', '#ed7d31', '#70ad47', '#5b9bd5', '#ffc000', '#a5a5a5'];
const incentivesPieColors = ['#4472c4', '#ed7d31', '#2e75b6', '#a5a5a5'];

// Section 2: Cost After Incentives & Depreciation
// Note: Pie chart for "Total project cost after incentives" uses the original projectCostData breakdown visually
// const totalProjectCostAfterIncentives = 4416587.96; // Kept for potential future use, not displayed
// const depreciableBasis = 4416587.96; // Kept for potential future use, not displayed

const macrsData = [
  { name: 'Year 1', value: 883317.59, percentage: '20%' },
  { name: 'Year 2', value: 1413308.15, percentage: '32%' },
  { name: 'Year 3', value: 847984.89, percentage: '19.20%' },
  { name: 'Year 4', value: 508790.93, percentage: '11.52%' },
  { name: 'Year 5', value: 508790.93, percentage: '11.52%' },
  { name: 'Year 6', value: 254395.47, percentage: '5.76%' },
];

// Section 3: Energy Costs
const energyCostsWithoutDER = [
  { month: 'January', value: 125000 }, { month: 'February', value: 135000 },
  { month: 'March', value: 145000 }, { month: 'April', value: 140000 },
  { month: 'May', value: 125000 }, { month: 'June', value: 155000 },
  { month: 'July', value: 175000 }, { month: 'August', value: 170000 },
  { month: 'September', value: 175000 }, { month: 'October', value: 180000 },
  { month: 'November', value: 155000 }, { month: 'December', value: 145000 },
];
// const totalEnergyCostsWithoutDER = 1825000; // Used in chart text

const projectedDERCosts = [
  { month: 'January', value: 100000 }, { month: 'February', value: 108000 },
  { month: 'March', value: 118000 }, { month: 'April', value: 112000 },
  { month: 'May', value: 100000 }, { month: 'June', value: 124000 },
  { month: 'July', value: 140000 }, { month: 'August', value: 136000 },
  { month: 'September', value: 140000 }, { month: 'October', value: 144000 },
  { month: 'November', value: 124000 }, { month: 'December', value: 118000 },
];
// const totalProjectedDERCosts = 1460000; // Used in chart text

const energyCostReduction = [
  { month: 'January', value: 25000 }, { month: 'February', value: 27000 },
  { month: 'March', value: 28000 }, { month: 'April', value: 28000 },
  { month: 'May', value: 25000 }, { month: 'June', value: 31000 },
  { month: 'July', value: 35000 }, { month: 'August', value: 34000 },
  { month: 'September', value: 35000 }, { month: 'October', value: 36000 },
  { month: 'November', value: 31000 }, { month: 'December', value: 28000 },
];
// const totalEnergyCostReduction = 365000; // Used in chart text


// --- Helper Functions ---
const formatCurrency = (value: number): string => {
  // Basic currency formatting, adjust if needed
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
};
const formatCurrencyWithCents = (value: number): string => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
};


const renderCustomizedPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, /* index, */ value }: any) => {
    const RADIAN = Math.PI / 180;
    // Position label slightly further out for less clutter
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Simple threshold to avoid tiny labels overlapping
    if (percent < 0.06) return null; // Slightly increased threshold

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize={isLarge ? 11 : 9} // Made font slightly larger for large view
            fontWeight="bold"
            style={{ pointerEvents: 'none' }} // Prevent label text from blocking tooltips
        >
            {formatCurrencyWithCents(value)}
        </text>
    );
};


// --- Main Component ---
// Declare isLarge outside for helper function scope if needed, though not strictly necessary here
let isLarge: boolean;

export const InvestmentSummary: React.FC<{ size: 'small' | 'large' }> = ({ size }) => {
  isLarge = size === 'large'; // Assign here
  // Adjusted chart height for better vertical space
  const chartHeight = isLarge ? 320 : 220;
  const titleFontSize = isLarge ? '1.1rem' : '0.9rem'; // Slightly larger titles
  // Increased grid spacing for more visual separation
  const gridSpacing = isLarge ? 4 : 2;
  const paperPadding = isLarge ? 3 : 2; // Increased internal padding within paper


  return (
    <Box sx={{ width: '100%', p: isLarge ? 3 : 1 }}> {/* Added overall padding */}
      <Grid container spacing={gridSpacing}> {/* Increased spacing */}

        {/* --- Row 1: Project Cost & Incentives Charts --- */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: paperPadding, height: '90%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}> {/* Added border radius */}
            <Typography variant="h6" gutterBottom sx={{ fontSize: titleFontSize, fontWeight: 'bold', textAlign: 'center', mb: 1.5 }}> {/* Added margin bottom */}
              Total Project Cost
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <ResponsiveContainer width="100%" height={chartHeight}>
                <PieChart margin={{ top: 0, right: 10, bottom: (isLarge ? 20 : 5), left: 10 }}> {/* Adjusted margins */}
                    <Pie
                    data={projectCostData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedPieLabel} // Use the updated label function
                    outerRadius={isLarge ? 120 : 80} // Slightly larger radius
                    innerRadius={isLarge ? 40: 0} // Add inner radius for donut effect on large
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    >
                    {projectCostData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={projectCostPieColors[index % projectCostPieColors.length]} stroke="#fff" strokeWidth={isLarge? 1 : 0} /> // Added stroke for separation
                    ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrencyWithCents(value)} />
                    {isLarge && <Legend iconSize={10} wrapperStyle={{ fontSize: '0.8rem', paddingTop: '15px' }} />}
                </PieChart>
                </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: paperPadding, height: '90%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: titleFontSize, fontWeight: 'bold', textAlign: 'center', mb: 1.5 }}>
              Total incentives
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <ResponsiveContainer width="100%" height={chartHeight}>
                <PieChart margin={{ top: 0, right: 10, bottom: (isLarge ? 20 : 5), left: 10 }}>
                    <Pie
                    data={incentivesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedPieLabel}
                    outerRadius={isLarge ? 120 : 80}
                    innerRadius={isLarge ? 40: 0}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    >
                    {incentivesData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={incentivesPieColors[index % incentivesPieColors.length]} stroke="#fff" strokeWidth={isLarge? 1 : 0} />
                    ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrencyWithCents(value)} />
                    {isLarge && <Legend iconSize={10} wrapperStyle={{ fontSize: '0.8rem', paddingTop: '15px' }} />}
                </PieChart>
                </ResponsiveContainer>
             </Box>
          </Paper>
        </Grid>

        {/* --- Row 2: Cost After Incentives (Pie) & Depreciation (Bar) Charts --- */}
         <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: paperPadding, height: '90%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
             <Typography variant="h6" gutterBottom sx={{ fontSize: titleFontSize, fontWeight: 'bold', textAlign: 'center', mb: 1.5 }}>
              Project Cost Breakdown {/* Title clarified as breakdown */}
             </Typography>
             {/* Re-using Project Cost Pie Chart visual */}
             <Box sx={{ flexGrow: 1 }}>
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <PieChart margin={{ top: 0, right: 10, bottom: (isLarge ? 20 : 5), left: 10 }}>
                        <Pie
                        data={projectCostData} // Using original cost breakdown for the pie visual
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedPieLabel}
                        outerRadius={isLarge ? 120 : 80}
                        innerRadius={isLarge ? 40: 0}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        >
                        {projectCostData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={projectCostPieColors[index % projectCostPieColors.length]} stroke="#fff" strokeWidth={isLarge? 1 : 0} />
                        ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrencyWithCents(value)} />
                        {isLarge && <Legend iconSize={10} wrapperStyle={{ fontSize: '0.8rem', paddingTop: '15px' }} />}
                    </PieChart>
                </ResponsiveContainer>
             </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: paperPadding, height: '90%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: titleFontSize, fontWeight: 'bold', textAlign: 'center', mb: 1.5 }}>
              5-year MACRS deduction value
            </Typography>
             <Box sx={{ flexGrow: 1 }}>
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <BarChart
                        data={macrsData}
                        margin={{ top: 30, right: isLarge ? 20 : 5, left: isLarge ? 0 : -15, bottom: 5 }} // Adjusted margins for labels/axis
                        barGap={isLarge? 8 : 4} // Add gap between bars
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <XAxis dataKey="name" tick={{ fontSize: isLarge ? 11 : 9 }} />
                        <YAxis tick={{ fontSize: isLarge ? 11 : 9 }} tickFormatter={(value) => `$${value / 1000}k`} />
                        <Tooltip formatter={(value: number) => formatCurrencyWithCents(value)}/>
                        <Bar dataKey="value" fill="#00b0f0" radius={[4, 4, 0, 0]} barSize={isLarge ? 40 : undefined}> {/* Add radius to bars */}
                            {/* Render labels on top only if large */}
                            {isLarge && <LabelList dataKey="value" position="top" formatter={(value: number) => formatCurrency(value)} style={{ fontSize: 10, fill: '#444' }} />}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* --- Row 3: Energy Cost Charts --- */}
        <Grid item xs={12} md={4}>
           <Paper elevation={2} sx={{ p: paperPadding, height: '90%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
             <Typography variant="h6" gutterBottom sx={{ fontSize: titleFontSize, fontWeight: 'bold', textAlign: 'center', mb: 1.5 }}>
               Annual energy costs without DER
             </Typography>
             <Box sx={{ flexGrow: 1 }}>
                <ResponsiveContainer width="100%" height={chartHeight}>
										<AreaChart data={energyCostsWithoutDER} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
										<defs>
											<linearGradient id="colorUvWithout" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#88a4d8" stopOpacity={0.8}/>
											<stop offset="95%" stopColor="#88a4d8" stopOpacity={0.1}/> {/* Fade out more */}
											</linearGradient>
										</defs>
										<Tooltip formatter={(value: number) => formatCurrency(value)} />
										<Area type="monotone" dataKey="value" stroke="#4472c4" strokeWidth={2} fillOpacity={1} fill="url(#colorUvWithout)" />
										<XAxis dataKey="month" tick={{ fontSize: isLarge ? 11 : 9 }} label={{ value: 'Month', position: 'bottom', offset: -5, fontSize: isLarge ? 12 : 10 }} />
										<YAxis tick={{ fontSize: isLarge ? 11 : 9 }} tickFormatter={(value) => `$${value / 1000}k`} label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft', fontSize: isLarge ? 12 : 10 }} />
										</AreaChart>
                </ResponsiveContainer>
             </Box>
           </Paper>
         </Grid>

        <Grid item xs={12} md={4}>
           <Paper elevation={2} sx={{ p: paperPadding, height: '90%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
             <Typography variant="h6" gutterBottom sx={{ fontSize: titleFontSize, fontWeight: 'bold', textAlign: 'center', mb: 1.5 }}>
               Projected annual DER energy cost
             </Typography>
              <Box sx={{ flexGrow: 1, position: 'relative' }}>
                <ResponsiveContainer width="100%" height={chartHeight}>
										<AreaChart data={projectedDERCosts} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
										<defs>
											<linearGradient id="colorUvProjected" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#2e75b6" stopOpacity={0.9}/>
											<stop offset="95%" stopColor="#2e75b6" stopOpacity={0.2}/> {/* Fade out more */}
											</linearGradient>
										</defs>
										<Tooltip formatter={(value: number) => formatCurrency(value)} />
										<Area type="monotone" dataKey="value" stroke="#1f4e79" strokeWidth={2} fillOpacity={1} fill="url(#colorUvProjected)" />
										 <XAxis dataKey="month" tick={{ fontSize: isLarge ? 11 : 9 }} label={{ value: 'Month', position: 'bottom', offset: -5, fontSize: isLarge ? 12 : 10 }} />
										 <YAxis tick={{ fontSize: isLarge ? 11 : 9 }} tickFormatter={(value) => `$${value / 1000}k`} label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft', fontSize: isLarge ? 12 : 10 }} />
										{/* Adding total label inside chart */}
										{/* <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize={isLarge ? 28 : 20} fontWeight="bold" fill="#ffffff" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>
											 {formatCurrency(totalProjectedDERCosts)}
										</text> */}
										</AreaChart>
                </ResponsiveContainer>
             </Box>
           </Paper>
         </Grid>

        <Grid item xs={12} md={4}>
           <Paper elevation={2} sx={{ p: paperPadding, height: '90%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
             <Typography variant="h6" gutterBottom sx={{ fontSize: titleFontSize, fontWeight: 'bold', textAlign: 'center', mb: 1.5 }}>
               Annual energy cost reduction with DER
             </Typography>
              <Box sx={{ flexGrow: 1, position: 'relative' }}>
                <ResponsiveContainer width="100%" height={chartHeight}>
										<AreaChart data={energyCostReduction} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
											<defs>
											<linearGradient id="colorUvReduction" x1="0" y1="0" x2="0" y2="1">
												 <stop offset="5%" stopColor="#2e75b6" stopOpacity={0.9}/>
												 <stop offset="95%" stopColor="#2e75b6" stopOpacity={0.2}/> {/* Fade out more */}
											</linearGradient>
										</defs>
										<Tooltip formatter={(value: number) => formatCurrency(value)} />
										<Area type="monotone" dataKey="value" stroke="#1f4e79" strokeWidth={2} fillOpacity={1} fill="url(#colorUvReduction)" />
										 <XAxis dataKey="month" tick={{ fontSize: isLarge ? 11 : 9 }} label={{ value: 'Month', position: 'bottom', offset: -5, fontSize: isLarge ? 12 : 10 }} />
										 <YAxis tick={{ fontSize: isLarge ? 11 : 9 }} tickFormatter={(value) => `$${value / 1000}k`} label={{ value: 'Cost Reduction ($)', angle: -90, position: 'insideLeft', fontSize: isLarge ? 12 : 10 }} />
										{/* Adding total label inside chart */}
										{/* <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize={isLarge ? 28 : 20} fontWeight="bold" fill="#ffffff" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>
											 {formatCurrency(totalEnergyCostReduction)}
										</text> */}
										</AreaChart>
                </ResponsiveContainer>
             </Box>
           </Paper>
         </Grid>

      </Grid>
    </Box>
  );
};