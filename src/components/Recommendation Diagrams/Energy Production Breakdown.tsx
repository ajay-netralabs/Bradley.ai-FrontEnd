import React from 'react';
import {
  Box,
  Typography,
  Grid,
  useTheme,
  // Divider,
} from '@mui/material';

interface MetricBlock {
  title: string;
  value: string;
  bgColorTop: string;
  bgColorBottom: string;
  textColor: string;
}

interface EnergySourceDetails {
  id: string;
  capacityBlock: MetricBlock;
  generationBlock: MetricBlock;
}

interface EnergyProductionPageData {
  totalCapacityBlock: MetricBlock;
  totalGenerationBlock: MetricBlock;
  sources: EnergySourceDetails[];
}

// --- COLOR PALETTE DEFINITIONS ---
const BG_COLOR_TOP_COMMON = '#2745ad';

// Capacity Colors (Left Side)
const TOTAL_CAPACITY_BOTTOM_GREEN = '#00b050';
const COMPONENT_CAPACITY_BOTTOM_LIGHT_GREEN = '#90EE90';

// Generation Colors (Right Side)
const TOTAL_GENERATION_BOTTOM_YELLOW = '#FFD700';
const COMPONENT_GENERATION_BOTTOM_LIGHT_YELLOW = '#FFFACD';

// Text Colors
const TEXT_COLOR_WHITE = 'white';
const TEXT_COLOR_BLACK = 'black';

// Data (energyProductionPageData)
export const energyProductionPageData: EnergyProductionPageData = {
  totalCapacityBlock: {
    title: 'DER total system generation Capacity',
    value: '2,550 kW',
    bgColorTop: BG_COLOR_TOP_COMMON,
    bgColorBottom: TOTAL_CAPACITY_BOTTOM_GREEN,
    textColor: TEXT_COLOR_WHITE,
  },
  totalGenerationBlock: {
    title: 'DER total system kWh annual generation',
    value: '3,103,000 kWh',
    bgColorTop: BG_COLOR_TOP_COMMON,
    bgColorBottom: TOTAL_GENERATION_BOTTOM_YELLOW,
    textColor: TEXT_COLOR_BLACK,
  },
  sources: [
    {
      id: 'solar',
      capacityBlock: {
        title: 'DER Solar generation Capacity',
        value: '250 kW',
        bgColorTop: BG_COLOR_TOP_COMMON,
        bgColorBottom: COMPONENT_CAPACITY_BOTTOM_LIGHT_GREEN,
        textColor: TEXT_COLOR_BLACK,
      },
      generationBlock: {
        title: 'DER Solar kWh generation',
        value: '134,000 kWh',
        bgColorTop: BG_COLOR_TOP_COMMON,
        bgColorBottom: COMPONENT_GENERATION_BOTTOM_LIGHT_YELLOW,
        textColor: TEXT_COLOR_BLACK,
      },
    },
    {
      id: 'turbine',
      capacityBlock: {
        title: 'DER Combustion Turbine gen. Capacity',
        value: '1,550 kW',
        bgColorTop: BG_COLOR_TOP_COMMON,
        bgColorBottom: COMPONENT_CAPACITY_BOTTOM_LIGHT_GREEN,
        textColor: TEXT_COLOR_BLACK,
      },
      generationBlock: {
        title: 'DER Combustion Turbine kWh generation',
        value: '2,000,000 kWh',
        bgColorTop: BG_COLOR_TOP_COMMON,
        bgColorBottom: COMPONENT_GENERATION_BOTTOM_LIGHT_YELLOW,
        textColor: TEXT_COLOR_BLACK,
      },
    },
    {
      id: 'fuelcell',
      capacityBlock: {
        title: 'DER Fuel Cell generation Capacity',
        value: '750 kW',
        bgColorTop: BG_COLOR_TOP_COMMON,
        bgColorBottom: COMPONENT_CAPACITY_BOTTOM_LIGHT_GREEN,
        textColor: TEXT_COLOR_BLACK,
      },
      generationBlock: {
        title: 'DER Fuel Cell kWh generation',
        value: '969,000 kWh',
        bgColorTop: BG_COLOR_TOP_COMMON,
        bgColorBottom: COMPONENT_GENERATION_BOTTOM_LIGHT_YELLOW,
        textColor: TEXT_COLOR_BLACK,
      },
    },
  ],
};

const MetricBlockDisplay: React.FC<{ item: MetricBlock; isLarge: boolean }> = ({ item, isLarge }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      minHeight: isLarge ? '90px' : '60px',
      borderRadius: 1,
      overflow: 'hidden',
      width: '100%',
      boxShadow: isLarge ? '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)' : 'none',
    }}>
      <Box sx={{
        bgcolor: item.bgColorTop,
        color: 'white',
        width: '100%',
        p: isLarge ? 1 : 0.75,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: isLarge? '40px' : '25px',
      }}>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: isLarge ? '0.85rem' : '0.6rem',
            fontWeight: '600',
            lineHeight: 1.2,
          }}
        >
          {item.title}
        </Typography>
      </Box>
      <Box sx={{
        bgcolor: item.bgColorBottom,
        color: 'black',
        width: '100%',
        p: isLarge ? 1 : 0.75,
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: isLarge ? '1.6rem' : '0.9rem',
            fontWeight: 'bold',
          }}
        >
          {item.value}
        </Typography>
      </Box>
    </Box>
  );
};

export const EnergyProductionBreakdown: React.FC<{ size: 'small' | 'large' }> = ({ size }) => {
  const isLarge = size === 'large';
  const theme = useTheme();
  const data = energyProductionPageData;

  const gridItemSpacing = isLarge ? 2 : 1;

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      p: isLarge ? 1.5 : 0.75,
      boxSizing: 'border-box',
      overflowY: 'auto',
    }}>
      {/* Totals Section */}
      <Grid container spacing={gridItemSpacing}>
        <Grid item xs={6}>
          <MetricBlockDisplay item={data.totalCapacityBlock} isLarge={isLarge} />
        </Grid>
        <Grid item xs={6}>
          <MetricBlockDisplay item={data.totalGenerationBlock} isLarge={isLarge} />
        </Grid>
      </Grid>

      {/* Visual Connector / Divider */}
      <Box sx={{ display: 'flex', justifyContent: 'center', my: isLarge ? 1.5 : 0.75, alignItems: 'center' }}>
        <Box sx={{ width: '30%', height: '1px', bgcolor: theme.palette.divider }} />
        <Typography sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: isLarge ? '1.5rem' : '1rem',
            color: theme.palette.grey[400],
            mx: 1,
            fontWeight: 'bold',
            lineHeight: 1,
           }}
        >
          ↓
        </Typography>
        <Box sx={{ width: '30%', height: '1px', bgcolor: theme.palette.divider }} />
      </Box>

      {/* Component Breakdown Section */}
      <Box>
        <Typography
          variant={isLarge ? 'h6' : 'subtitle2'}
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: isLarge ? 1.5 : 1,
            color: theme.palette.text.secondary,
            fontSize: isLarge ? '1.1rem' : '0.85rem',
          }}
        >
          Component Breakdown
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: gridItemSpacing }}>
          {data.sources.map((source) => (
            <Grid container spacing={gridItemSpacing} key={source.id} alignItems="stretch">
              <Grid item xs={6}>
                <MetricBlockDisplay item={source.capacityBlock} isLarge={isLarge} />
              </Grid>
              <Grid item xs={6}>
                <MetricBlockDisplay item={source.generationBlock} isLarge={isLarge} />
              </Grid>
            </Grid>
          ))}
        </Box>
      </Box>
    </Box>
  );
};