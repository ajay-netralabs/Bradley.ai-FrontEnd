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
} from 'recharts';

const projectCostData = [
  { name: 'Material', value: 4155096.55, percentage: '55%' },
  { name: 'Labor', value: 1737585.83, percentage: '23%' },
  { name: 'Taxes', value: 453283.26, percentage: '6%' },
  { name: 'Engineering', value: 604377.68, percentage: '8%' },
  { name: 'Construction', value: 604377.68, percentage: '8%' },
];
// const totalProjectCost = 7554721.00;

const incentivesData = [
  { name: 'Utility rebate', value: 775000.00, percentage: '55%' },
  { name: 'State Grant', value: 550000.00, percentage: '23%' },
  { name: 'Investment Tax Credit', value: 1813133.04, percentage: '24%' },
];
// const totalIncentives = 3138133.04;

const projectCostPieColors = ['#0070c0', '#ed7d31', '#70ad47', '#5b9bd5', '#ffc000', '#a5a5a5'];
const incentivesPieColors = ['#4472c4', '#ed7d31', '#2e75b6', '#a5a5a5'];

const macrsData = [
  { name: 'Year 1', value: 883317.59, percentage: '20%' },
  { name: 'Year 2', value: 1413308.15, percentage: '32%' },
  { name: 'Year 3', value: 847984.89, percentage: '19.20%' },
  { name: 'Year 4', value: 508790.93, percentage: '11.52%' },
  { name: 'Year 5', value: 508790.93, percentage: '11.52%' },
  { name: 'Year 6', value: 254395.47, percentage: '5.76%' },
];

const formatCurrency = (value: number): string => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
};
const formatCurrencyWithCents = (value: number): string => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
};


const renderCustomizedPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, /* index, */ value }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.06) return null;

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

let isLarge: boolean;

export const InvestmentSummary: React.FC<{ size: 'small' | 'large' }> = ({ size }) => {
  isLarge = size === 'large';
  // Adjusted chart height for better vertical space
  const chartHeight = isLarge ? 320 : 220;
  const titleFontSize = isLarge ? '1.1rem' : '0.9rem';
  const gridSpacing = isLarge ? 4 : 2;
  const paperPadding = isLarge ? 3 : 2;


  return (
    <Box sx={{ width: '100%', p: isLarge ? 3 : 1 }}>
      <Grid container spacing={gridSpacing}>

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
                    <Legend iconSize={10} wrapperStyle={{ fontSize: isLarge ? '0.8rem' : '0.7rem', paddingTop: '15px' }} />
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
                    <Legend iconSize={10} wrapperStyle={{ fontSize: isLarge ? '0.8rem' : '0.7rem', paddingTop: '15px' }} />
                </PieChart>
                </ResponsiveContainer>
             </Box>
          </Paper>
        </Grid>

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
                        <Legend iconSize={10} wrapperStyle={{ fontSize: isLarge ? '0.8rem' : '0.7rem', paddingTop: '15px' }} />
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

      </Grid>
    </Box>
  );
};