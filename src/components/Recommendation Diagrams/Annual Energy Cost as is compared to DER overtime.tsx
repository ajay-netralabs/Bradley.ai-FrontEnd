import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Paper,
    Stack,
} from '@mui/material';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// --- Data (Keep as is) ---
const energyCostsWithoutDERData = [
    { month: 'Jan', value: 125000 }, { month: 'Feb', value: 135000 },
    { month: 'Mar', value: 145000 }, { month: 'Apr', value: 140000 },
    { month: 'May', value: 125000 }, { month: 'Jun', value: 155000 },
    { month: 'Jul', value: 175000 }, { month: 'Aug', value: 170000 },
    { month: 'Sep', value: 175000 }, { month: 'Oct', value: 180000 },
    { month: 'Nov', value: 155000 }, { month: 'Dec', value: 145000 },
];

const projectedDERCostsData = [
    { month: 'Jan', value: 100000 }, { month: 'Feb', value: 108000 },
    { month: 'Mar', value: 118000 }, { month: 'Apr', value: 112000 },
    { month: 'May', value: 100000 }, { month: 'Jun', value: 124000 },
    { month: 'Jul', value: 140000 }, { month: 'Aug', value: 136000 },
    { month: 'Sep', value: 140000 }, { month: 'Oct', value: 144000 },
    { month: 'Nov', value: 124000 }, { month: 'Dec', value: 118000 },
];

const energyCostReductionData = [
    { month: 'Jan', value: 25000 }, { month: 'Feb', value: 27000 },
    { month: 'Mar', value: 28000 }, { month: 'Apr', value: 28000 },
    { month: 'May', value: 25000 }, { month: 'Jun', value: 31000 },
    { month: 'Jul', value: 35000 }, { month: 'Aug', value: 34000 },
    { month: 'Sep', value: 35000 }, { month: 'Oct', value: 36000 },
    { month: 'Nov', value: 31000 }, { month: 'Dec', value: 28000 },
];

// --- Helper Functions ---
const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

// Define keys and labels for easier management
const SERIES = [
    { key: 'AnnualEnergyCostsWithoutDER', label: 'Annual energy costs without DER' },
    { key: 'ProjectedAnnualDEREnergyCost', label: 'Projected annual DER energy cost' },
    { key: 'AnnualEnergyCostReductionWithDER', label: 'Annual energy cost reduction with DER' },
];

// --- Main Component ---
export const AnnualEnergyCostAsIsComparedToDEROvertime: React.FC<{ size: 'small' | 'large' }> = ({ size }) => {
    // const theme = useTheme();
    const isLarge = size === 'large';
    const chartHeight = isLarge ? 400 : 280;
    // const titleFontSize = isLarge ? '1.2rem' : '1.0rem'; // Title removed
    const paperPadding = isLarge ? 3 : 2;
    const legendFontSize = isLarge ? '0.8rem' : '0.7rem';

    // State to control visibility of each area
    const [visibility, setVisibility] = useState<{ [key: string]: boolean }>({
				AnnualEnergyCostsWithoutDER: true,
        ProjectedAnnualDEREnergyCost: true,
        AnnualEnergyCostReductionWithDER: true,
    });

    // Merge data
    const mergedData = useMemo(() => {
        return energyCostsWithoutDERData.map((item, index) => ({
            month: item.month,
            AnnualEnergyCostsWithoutDER: item.value,
            ProjectedAnnualDEREnergyCost: projectedDERCostsData[index]?.value ?? 0,
            AnnualEnergyCostReductionWithDER: energyCostReductionData[index]?.value ?? 0,
        }));
    }, []);

    const handleToggle = (key: string) => {
        setVisibility(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Define NEW colors - Red, Blue, Green variations
    const colors: { [key: string]: string } = {
				AnnualEnergyCostsWithoutDER: "#d9534f", // Red-ish
        ProjectedAnnualDEREnergyCost: "#428bca",    // Blue
        AnnualEnergyCostReductionWithDER: "#5cb85c",   // Green
    };
    // Use slightly darker/different shades for strokes if desired
    const strokeColors: { [key: string]: string } = {
				AnnualEnergyCostsWithoutDER: "#b94a48",
        ProjectedAnnualDEREnergyCost: "#357ebd",
        AnnualEnergyCostReductionWithDER: "#4cae4c",
    }

    // Opacity for area fills to see overlaps
    const fillOpacity = 0.6;

    return (
        <Box sx={{ width: '100%', p: isLarge ? 2 : 1 }}>
            <Paper elevation={3} sx={{ p: paperPadding, borderRadius: 2 }}>
                {/* Removed Title Typography */}

                {/* Clickable Legend Toggles - Positioned Top Center, Horizontal */}
                <Stack
                    direction="row" // ** Changed to row **
                    spacing={2}       // Increased spacing for horizontal layout
                    justifyContent="center" // Center items horizontally
                    sx={{
                        mb: 2, // Add margin-bottom to separate from chart
                        flexWrap: 'wrap', // Allow wrapping on smaller screens if needed
                    }}
                >
                    {SERIES.map((series) => (
                        <Box
                            key={series.key}
                            onClick={() => handleToggle(series.key)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                opacity: visibility[series.key] ? 1 : 0.5,
                                transition: 'opacity 0.2s ease-in-out',
                                '&:hover': {
                                    opacity: 1,
                                }
                            }}
                            role="button"
                            aria-pressed={visibility[series.key]}
                            tabIndex={0}
                            onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleToggle(series.key); }}
                        >
                            <Box
                                sx={{
                                    width: isLarge ? 12 : 10,
                                    height: isLarge ? 12 : 10,
                                    backgroundColor: colors[series.key],
                                    mr: 0.75, // Adjusted margin slightly
                                    borderRadius: '2px',
                                    flexShrink: 0,
                                }}
                            />
                            <Typography variant="caption" sx={{ fontSize: legendFontSize, userSelect: 'none' }}>
                                {series.label}
                            </Typography>
                        </Box>
                    ))}
                </Stack>

                {/* Chart Area */}
                <Box sx={{ height: chartHeight }}> {/* Removed top margin (mt) */}
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={mergedData}
                            margin={{
                                top: 5, // Reduced top margin as title is gone
                                right: 30,
                                left: 20,
                                bottom: 30,
                            }}
                        >
                            <defs>
                                {SERIES.map(series => (
                                    <linearGradient key={`grad-${series.key}`} id={`color${series.key}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors[series.key]} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={colors[series.key]} stopOpacity={0.1} />
                                    </linearGradient>
                                ))}
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: isLarge ? 11 : 9 }}
                                label={{ value: 'Month', position: 'insideBottom', offset: -15, fontSize: isLarge ? 12 : 10 }}
                                dy={10}
                            />
                            <YAxis
                                tick={{ fontSize: isLarge ? 11 : 9 }}
                                tickFormatter={(value) => `$${value / 1000}k`}
                                label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft', offset: -5, fontSize: isLarge ? 12 : 10 }}
                                domain={[0, 'auto']}
                                allowDataOverflow={false}
                            />
                            <Tooltip formatter={(value: number, name: string) => {
                                const seriesInfo = SERIES.find(s => s.key === name);
                                return [formatCurrency(value), seriesInfo ? seriesInfo.label : name];
                            }} />

                            {/* Conditionally render Areas based on visibility state */}
                            {SERIES.map(series => (
                                visibility[series.key] && (
                                    <Area
                                        key={series.key}
                                        type="monotone"
                                        dataKey={series.key}
                                        name={series.label}
                                        stroke={strokeColors[series.key]}
                                        strokeWidth={2}
                                        fillOpacity={fillOpacity}
                                        fill={`url(#color${series.key})`}
                                        isAnimationActive={false}
                                    />
                                )
                            ))}
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </Paper>
        </Box>
    );
};