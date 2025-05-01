import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  Chip,
  Divider,
} from '@mui/material';
import {
  Memory,
  SettingsPower,
  PrecisionManufacturing,
  TrendingUp,
} from '@mui/icons-material';

// Define the structure for each component's data
interface ComponentSpec {
  id: number;
  component: string;
  technology: string;
  manufacturer: string;
  efficiency: string;
}

// Dummy data
const componentData: ComponentSpec[] = [
  { id: 1, component: 'PV System', technology: 'Monocrystalline', manufacturer: 'SunPower', efficiency: '20%' },
  { id: 2, component: 'Battery Storage', technology: 'Lithium-Ion', manufacturer: 'Tesla', efficiency: '90%' },
  { id: 3, component: 'Natural Gas Generator', technology: 'Simple Cycle', manufacturer: 'Cummins', efficiency: '35%' },
  { id: 4, component: 'PV System (Alt)', technology: 'Thin Film (CIGS)', manufacturer: 'Solar Frontier', efficiency: '15%' },
  { id: 5, component: 'Flow Battery', technology: 'Zinc-Bromine', manufacturer: 'Redflow', efficiency: '75%' },
  { id: 6, component: 'Combined Heat & Power (CHP)', technology: 'Reciprocating Engine', manufacturer: 'Caterpillar', efficiency: '85% (Total)' },
];

// Define the props interface
interface EnergySpecificationsProps {
  size: 'small' | 'large';
}

export const EnergySpecifications: React.FC<EnergySpecificationsProps> = ({ size }) => {
  const isLarge = size === 'large';
  const theme = useTheme();

  const spacing = isLarge ? 3 : 2;
  const padding = isLarge ? 3 : 2;
  const labelFont = isLarge ? '0.85rem' : '0.8rem';
  const valueFont = isLarge ? '1rem' : '0.9rem';
  const chipSize = isLarge ? 'medium' : 'small';

  const getIcon = (label: string) => {
    switch (label) {
      case 'Component':
        return <SettingsPower fontSize="small" sx={{ color: theme.palette.primary.main, mr: 0.5 }} />;
      case 'Technology':
        return <Memory fontSize="small" sx={{ color: theme.palette.secondary.main, mr: 0.5 }} />;
      case 'Manufacturer':
        return <PrecisionManufacturing fontSize="small" sx={{ color: theme.palette.warning.main, mr: 0.5 }} />;
      case 'Efficiency':
        return <TrendingUp fontSize="small" sx={{ color: theme.palette.success.main, mr: 0.5 }} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', p: isLarge ? 4 : 2 }}>
      <Grid container spacing={spacing}>
        {componentData.map((spec) => (
          <Grid item xs={12} sm={6} md={4} key={spec.id}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                borderRadius: 3,
                background: `linear-gradient(to bottom right, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
                boxShadow: theme.shadows[4],
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                  transform: 'scale(1.015)',
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              <CardContent sx={{ p: padding }}>
                {/* Top label as a Chip */}
                <Chip
                  label={spec.component}
                  color="primary"
                  variant="filled"
                  size={chipSize}
                  sx={{ mb: 2, fontWeight: 'bold' }}
                />

                <Divider sx={{ mb: 2 }} />

                {/* Technology */}
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                  {getIcon('Technology')}
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, fontSize: labelFont, color: 'text.secondary', mr: 1 }}
                  >
                    Technology:
                  </Typography>
                  <Typography sx={{ fontSize: valueFont, color: 'text.primary' }}>
                    {spec.technology}
                  </Typography>
                </Box>

                {/* Manufacturer */}
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                  {getIcon('Manufacturer')}
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, fontSize: labelFont, color: 'text.secondary', mr: 1 }}
                  >
                    Manufacturer:
                  </Typography>
                  <Typography sx={{ fontSize: valueFont, color: 'text.primary' }}>
                    {spec.manufacturer}
                  </Typography>
                </Box>

                {/* Efficiency */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {getIcon('Efficiency')}
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, fontSize: labelFont, color: 'text.secondary', mr: 1 }}
                  >
                    Efficiency:
                  </Typography>
                  <Typography sx={{ fontSize: valueFont, color: 'text.primary' }}>
                    {spec.efficiency}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
