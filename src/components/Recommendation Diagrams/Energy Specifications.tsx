import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  Chip,
  Divider,
  IconButton,
  Modal,
  Paper,
} from '@mui/material';
import {
  Memory,
  SettingsPower,
  PrecisionManufacturing,
  TrendingUp,
  SolarPower,
  BatterySaver,
  LocalGasStation,
  Factory,
  AttachMoney,
  Schedule,
  VerifiedUser,
  Notes,
  HeatPump,
  EvStation,
  Hvac,
  Close,
} from '@mui/icons-material';

interface ComponentSpecPro {
  id: number;
  component: string;
  technology: string;
  manufacturer: string;
  efficiency?: string;
  equipmentModel?: string;
  serialNumber?: string;
  powerRating?: string;
  capacity?: string;
  fuelType?: string;
  heatRate?: string;
  roundTripEfficiency?: string;
  thermalOutput?: string;
  copOrEer?: string;
  chargingLevels?: string[];
  numberOfUnits?: number;
  warranty?: string;
  installationDate?: string;
  lastMaintenance?: string;
  notes?: string;
  estimatedUpfrontCost?: string;
  annualSavings?: string;
  roiYears?: string;
}

export const componentDataPro: ComponentSpecPro[] = [
  {
    id: 1,
    component: 'PV System',
    technology: 'Monocrystalline',
    manufacturer: 'SunPower',
    efficiency: '20%',
    equipmentModel: 'SunPower Performance 3 UPP',
    serialNumber: 'SPPVX001P001',
    powerRating: '350 kWp',
    warranty: '25-year power and product warranty',
    installationDate: '2023-03-10',
    lastMaintenance: '2024-02-01 (Panel Cleaning & Inspection)',
    estimatedUpfrontCost: '$700,000',
    annualSavings: '$85,000',
    roiYears: '8.2 years',
    notes: 'Standard efficiency Monocrystalline system by SunPower, suitable for large roof areas. System consists of 1000 panels (350W each) and 5x 70kW inverters.'
  },
  {
    id: 2,
    component: 'Battery Storage',
    technology: 'Lithium-Ion',
    manufacturer: 'Tesla',
    efficiency: '90%',
    equipmentModel: 'Tesla Powerpack 2',
    serialNumber: 'TSLBP002S002',
    powerRating: '250 kW (Discharge/Charge)',
    capacity: '1 MWh (Usable)',
    roundTripEfficiency: '90.0%',
    numberOfUnits: 4,
    warranty: '15-year performance warranty, 10-year product',
    installationDate: '2023-05-15',
    lastMaintenance: '2024-01-15 (System Health Check & Software Update)',
    estimatedUpfrontCost: '$600,000',
    annualSavings: '$50,000 (Demand charge management & TOU arbitrage)',
    roiYears: '12 years',
    notes: 'Tesla Lithium-Ion battery system for peak shaving and grid support. Round Trip Efficiency (RTE) of 90%. Scalable modular design.'
  },
  {
    id: 3,
    component: 'Natural Gas Generator',
    technology: 'Simple Cycle',
    manufacturer: 'Cummins',
    efficiency: '35%',
    equipmentModel: 'Cummins QSK60 G-Drive',
    serialNumber: 'CMNSG003G003',
    powerRating: '1.25 MW (Standby)',
    fuelType: 'Natural Gas (Pipeline)',
    heatRate: '~9750 BTU/kWh (LHV)',
    numberOfUnits: 1,
    warranty: '2-year / 1000 hours standby rating warranty',
    installationDate: '2022-11-20',
    lastMaintenance: '2024-03-01 (Quarterly Service: Oil, Filters, Coolant)',
    estimatedUpfrontCost: '$800,000',
    annualSavings: '$20,000 (Avoided outage costs & demand response participation)',
    roiYears: 'N/A (Primarily for resilience)',
    notes: 'Cummins Simple Cycle Natural Gas Generator for backup power. Electrical efficiency of 35%. EPA Tier 2 certified.'
  },
  {
    id: 4,
    component: 'PV System (Alt)',
    technology: 'Thin Film (CIGS)',
    manufacturer: 'Solar Frontier',
    efficiency: '15%',
    equipmentModel: 'Solar Frontier SF170-S',
    serialNumber: 'SFPVX004A004',
    powerRating: '200 kWp',
    warranty: '10-year product, 25-year linear power output warranty',
    installationDate: '2023-08-01',
    lastMaintenance: '2024-02-10 (Visual Inspection)',
    estimatedUpfrontCost: '$450,000',
    annualSavings: '$35,000',
    roiYears: '12.8 years',
    notes: 'Alternative PV system using Solar Frontier CIGS thin-film technology, offering good performance in low-light conditions. Efficiency 15%.'
  },
  {
    id: 5,
    component: 'Flow Battery',
    technology: 'Zinc-Bromine',
    manufacturer: 'Redflow',
    efficiency: '75%',
    equipmentModel: 'Redflow ZBM3 (10 kWh unit)',
    serialNumber: 'RDFLB005Z005',
    powerRating: '50 kW (System, 5x units)',
    capacity: '100 kWh (System, 10x units)',
    roundTripEfficiency: '75.0%',
    numberOfUnits: 10,
    warranty: '10-year or 36,500 kWh throughput warranty per battery',
    installationDate: '2023-09-25',
    lastMaintenance: '2024-03-15 (Electrolyte Check & System Diagnostics)',
    estimatedUpfrontCost: '$150,000',
    annualSavings: '$12,000 (Energy arbitrage & demand management)',
    roiYears: '12.5 years',
    notes: 'Redflow Zinc-Bromine flow battery system, offering 100% depth of discharge and long cycle life. Round Trip Efficiency (RTE) of 75%.'
  },
  {
    id: 6,
    component: 'Combined Heat & Power (CHP)',
    technology: 'Reciprocating Engine',
    manufacturer: 'Caterpillar',
    efficiency: '85% (Total)',
    equipmentModel: 'Caterpillar G3512H (CHP Configured)',
    serialNumber: 'CATCP006R006',
    powerRating: '750 kW (Electrical Output)',
    fuelType: 'Natural Gas',
    heatRate: '~9800 BTU/kWh (Electrical, LHV based on ~35% elec. eff.)',
    thermalOutput: '900 kWth (Hot Water/Steam)',
    numberOfUnits: 1,
    warranty: '5-year major components, 2-year full system warranty',
    installationDate: '2023-01-15',
    lastMaintenance: '2024-01-20 (Annual Service: Spark plugs, oil, heat exchanger inspection)',
    estimatedUpfrontCost: '$1,800,000',
    annualSavings: '$250,000 (Combined electricity and thermal savings)',
    roiYears: '7.2 years',
    notes: 'Caterpillar Reciprocating Engine CHP system. Total efficiency of 85% (approx. 35% electrical, 50% thermal). Provides on-site electricity and process heat.'
  },
];

const SummaryDetailItem: React.FC<{
  icon?: React.ReactNode;
  label: string;
  value?: string;
  isLarge: boolean;
}> = ({ icon, label, value, isLarge }) => {
  if (!value) return null;
  const labelFont = isLarge ? '0.8rem' : '0.75rem';
  const valueFont = isLarge ? '0.9rem' : '0.85rem';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: isLarge ? 1 : 0.75 }}>
      {icon && <Box sx={{ mr: 1, display: 'flex', alignItems: 'center', color: 'text.secondary' }}>{icon}</Box>}
      <Typography
        variant="body2"
        sx={{ fontWeight: 500, fontSize: labelFont, color: 'text.secondary', mr: 0.5 }}
      >
        {label}:
      </Typography>
      <Typography sx={{ fontSize: valueFont, color: 'text.primary', fontWeight: 'medium' }}>
        {value}
      </Typography>
    </Box>
  );
};

const ProDetailItem: React.FC<{
  icon?: React.ReactNode;
  label: string;
  value?: string | number | string[];
  isLarge: boolean;
}> = ({ icon, label, value, isLarge }) => {
  if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) return null;
  const labelFont = isLarge ? '0.8rem' : '0.7rem';
  const valueFont = isLarge ? '0.9rem' : '0.8rem';

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: isLarge ? 0.75 : 0.5, py: 0.5 }}>
      {icon && <Box sx={{ mr: 1, mt: '2px', display: 'flex', alignItems: 'center', color: 'text.secondary' }}>{icon}</Box>}
      <Typography
        sx={{ fontWeight: 600, fontSize: labelFont, color: 'text.secondary', mr: 1, minWidth: isLarge? '130px' : '110px', flexShrink: 0 }}
      >
        {label}:
      </Typography>
      {Array.isArray(value) ? (
        <Box sx={{ textAlign: 'left', flexGrow: 1 }}>
          {value.map((item, index) => (
            <Typography key={index} sx={{ fontSize: valueFont, color: 'text.primary', lineHeight: 1.4, wordBreak: 'break-word' }}>
              {item}
            </Typography>
          ))}
        </Box>
      ) : (
        <Typography sx={{ fontSize: valueFont, color: 'text.primary', textAlign: 'left', lineHeight: 1.4, flexGrow: 1, wordBreak: 'break-word' }}>
          {String(value)}
        </Typography>
      )}
    </Box>
  );
};

const DetailModal: React.FC<{
  open: boolean;
  onClose: () => void;
  spec: ComponentSpecPro;
  isLarge: boolean;
}> = ({ open, onClose, spec, isLarge }) => {
  const theme = useTheme();

  const getProDetailIcon = (label: string) => {
    const iconFontSize = (isLarge ? 'small' : 'small') as 'small' | 'medium';
    const iconProps = { fontSize: iconFontSize, sx: { opacity: 0.8 } };
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('model')) return <Factory {...iconProps} />;
    if (lowerLabel.includes('serial')) return <SettingsPower {...iconProps} />;
    if (lowerLabel.includes('rating') || lowerLabel.includes('capacity') || lowerLabel.includes('output') || lowerLabel.includes('thermal')) return <SolarPower {...iconProps} />;
    if (lowerLabel.includes('fuel')) return <LocalGasStation {...iconProps} />;
    if (lowerLabel.includes('round trip') || lowerLabel.includes('heat rate') || lowerLabel.includes('cop') || lowerLabel.includes('eer')) return <TrendingUp {...iconProps} />;
    if (lowerLabel.includes('warranty')) return <VerifiedUser {...iconProps} />;
    if (lowerLabel.includes('date') || lowerLabel.includes('maintenance')) return <Schedule {...iconProps} />;
    if (lowerLabel.includes('cost') || lowerLabel.includes('saving') || lowerLabel.includes('roi')) return <AttachMoney {...iconProps} />;
    if (lowerLabel.includes('notes')) return <Notes {...iconProps} />;
    if (lowerLabel.includes('unit') || lowerLabel.includes('level')) return <EvStation {...iconProps}/>;
    return null;
  };

  const getSummaryIcon = (componentType: string) => {
    const iconProps = { fontSize: 'medium' as const, sx: { mr: 0.75 } };
    const type = componentType.toLowerCase();
    if (type.includes('pv') || type.includes('solar')) return <SolarPower {...iconProps} />;
    if (type.includes('battery') || type.includes('storage')) return <BatterySaver {...iconProps} />;
    if (type.includes('generator')) return <LocalGasStation {...iconProps} />;
    if (type.includes('chp') || type.includes('combined heat')) return <Hvac {...iconProps} />;
    if (type.includes('geothermal') || type.includes('heat pump')) return <HeatPump {...iconProps} />;
    if (type.includes('ev') || type.includes('charging')) return <EvStation {...iconProps} />;
    return <SettingsPower {...iconProps} />;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        sx={{
          width: '90%',
          maxWidth: 600,
          maxHeight: '90vh',
          overflow: 'hidden',
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
          boxShadow: theme.shadows[24],
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ 
          flex: 1, 
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Chip
                icon={getSummaryIcon(spec.component)}
                label={spec.component}
                color="primary"
                variant="filled"
                size="medium"
                sx={{ fontWeight: 'bold', fontSize: '1rem' }}
              />
              <IconButton onClick={onClose} size="small">
                <Close />
              </IconButton>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Detailed Specifications
            </Typography>

            <ProDetailItem icon={getProDetailIcon('Technology')} label="Technology" value={spec.technology} isLarge={true} />
            <ProDetailItem icon={getProDetailIcon('Manufacturer')} label="Manufacturer" value={spec.manufacturer} isLarge={true} />
            {spec.efficiency && <ProDetailItem icon={getProDetailIcon('Efficiency')} label="Efficiency" value={spec.efficiency} isLarge={true} />}
            <ProDetailItem icon={getProDetailIcon('Model')} label="Model" value={spec.equipmentModel} isLarge={true} />
            <ProDetailItem icon={getProDetailIcon('Serial')} label="Serial #" value={spec.serialNumber} isLarge={true} />
            <ProDetailItem icon={getProDetailIcon('Power Rating')} label="Power Rating" value={spec.powerRating} isLarge={true} />
            {spec.capacity && <ProDetailItem icon={getProDetailIcon('Capacity')} label="Capacity" value={spec.capacity} isLarge={true} />}
            {spec.fuelType && <ProDetailItem icon={getProDetailIcon('Fuel Type')} label="Fuel Type" value={spec.fuelType} isLarge={true} />}
            {spec.heatRate && <ProDetailItem icon={getProDetailIcon('Heat Rate')} label="Heat Rate" value={spec.heatRate} isLarge={true} />}
            {spec.roundTripEfficiency && <ProDetailItem icon={getProDetailIcon('RTE')} label="Round Trip Eff." value={spec.roundTripEfficiency} isLarge={true} />}
            {spec.thermalOutput && <ProDetailItem icon={getProDetailIcon('Thermal Output')} label="Thermal Output" value={spec.thermalOutput} isLarge={true} />}
            {spec.copOrEer && <ProDetailItem icon={getProDetailIcon('COP/EER')} label="COP / EER" value={spec.copOrEer} isLarge={true} />}
            {spec.numberOfUnits && <ProDetailItem icon={getProDetailIcon('Units')} label="Number of Units" value={spec.numberOfUnits} isLarge={true} />}
            {spec.chargingLevels && <ProDetailItem icon={getProDetailIcon('Charging Levels')} label="Charging Levels" value={spec.chargingLevels} isLarge={true} />}
            <ProDetailItem icon={getProDetailIcon('Warranty')} label="Warranty" value={spec.warranty} isLarge={true} />
            <ProDetailItem icon={getProDetailIcon('Install Date')} label="Install Date" value={spec.installationDate} isLarge={true} />
            {spec.lastMaintenance && <ProDetailItem icon={getProDetailIcon('Maintenance')} label="Last Maintenance" value={spec.lastMaintenance} isLarge={true} />}

            {(spec.estimatedUpfrontCost || spec.annualSavings || spec.roiYears) && (
              <>
                <Divider sx={{ my: 2, mt: 2.5 }} />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Financials
                </Typography>
                <ProDetailItem icon={getProDetailIcon('Upfront Cost')} label="Upfront Cost" value={spec.estimatedUpfrontCost} isLarge={true} />
                <ProDetailItem icon={getProDetailIcon('Annual Savings')} label="Annual Savings" value={spec.annualSavings} isLarge={true} />
                <ProDetailItem icon={getProDetailIcon('ROI')} label="ROI" value={spec.roiYears} isLarge={true} />
              </>
            )}
            
            {spec.notes && (
              <>
                <Divider sx={{ my: 2, mt: 2.5 }} />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Notes
                </Typography>
                <ProDetailItem icon={getProDetailIcon('Notes')} label="" value={spec.notes} isLarge={true} />
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

interface EnergySpecificationsProps {
  size: 'small' | 'large';
  data?: ComponentSpecPro[];
}

export const EnergySpecifications: React.FC<EnergySpecificationsProps> = ({ size, data = componentDataPro }) => {
  const isLarge = size === 'large';
  const theme = useTheme();
  const [selectedSpec, setSelectedSpec] = useState<ComponentSpecPro | null>(null);

  const handleCardClick = (spec: ComponentSpecPro) => {
    setSelectedSpec(spec);
  };

  const handleCloseModal = () => {
    setSelectedSpec(null);
  };

  const getGridItemProps = (index: number, totalCount: number) => {
    const xs = 12;
    const sm = (totalCount === 1) ? 12 : 6;
    let md;
    const itemsPerRowMd = 3;

    if (totalCount === 1) md = 12;
    else if (totalCount === 2) md = 6;
    else {
      const remainderMd = totalCount % itemsPerRowMd;
      const itemsInLastRowMd = remainderMd === 0 ? itemsPerRowMd : remainderMd;
      const isPotentiallyInLastRowGroup = index >= totalCount - itemsInLastRowMd;
      if (isPotentiallyInLastRowGroup) {
        if (itemsInLastRowMd === 1) md = 12;
        else if (itemsInLastRowMd === 2) md = 6;
        else md = 4;
      } else {
        md = 4;
      }
    }
    return { xs, sm, md };
  };

  const spacing = isLarge ? 3 : 2;
  const cardPadding = isLarge ? 2 : 1.5;
  const chipSize = isLarge ? 'medium' : 'small';

  const getSummaryIcon = (componentType: string) => {
    const iconProps = { fontSize: (isLarge ? 'medium' : 'small') as 'medium' | 'small', sx: { mr: 0.75 } };
    const type = componentType.toLowerCase();
    if (type.includes('pv') || type.includes('solar')) return <SolarPower {...iconProps} />;
    if (type.includes('battery') || type.includes('storage')) return <BatterySaver {...iconProps} />;
    if (type.includes('generator')) return <LocalGasStation {...iconProps} />;
    if (type.includes('chp') || type.includes('combined heat')) return <Hvac {...iconProps} />;
    if (type.includes('geothermal') || type.includes('heat pump')) return <HeatPump {...iconProps} />;
    if (type.includes('ev') || type.includes('charging')) return <EvStation {...iconProps} />;
    return <SettingsPower {...iconProps} />;
  };
  
  const getSummaryDetailIcon = (label: string) => {
    const iconFontSize = (isLarge ? 'small' : 'small') as 'small' | 'medium';
    const iconProps = { fontSize: iconFontSize, sx: { opacity: 0.9} };
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('technology')) return <Memory {...iconProps} color="secondary" />;
    if (lowerLabel.includes('manufacturer')) return <PrecisionManufacturing {...iconProps} color="warning" />;
    if (lowerLabel.includes('efficiency')) return <TrendingUp {...iconProps} color="success" />;
    return null;
  };

  return (
    <Box sx={{ width: '100%', p: isLarge ? 2 : 1 }}>
      <Grid container spacing={spacing}>
        {data.map((spec, index) => {
          const gridProps = getGridItemProps(index, data.length);
          return (
            <Grid item xs={gridProps.xs} sm={gridProps.sm} md={gridProps.md} key={spec.id}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
                  transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: theme.shadows[6],
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
                onClick={() => handleCardClick(spec)}
              >
                <CardContent sx={{ p: cardPadding }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: isLarge ? 1.5 : 1 }}>
                    <Chip
                      icon={getSummaryIcon(spec.component)}
                      label={spec.component}
                      color="primary"
                      variant="filled"
                      size={chipSize}
                      sx={{ fontWeight: 'bold', fontSize: isLarge ? '0.9rem' : '0.8rem' }}
                    />
                    <IconButton
                      size={isLarge ? 'medium' : 'small'}
                      sx={{ ml: 'auto', fontSize: isLarge ? '1.2rem' : '1rem' }}
                    >
                      ⛶
                    </IconButton>
                  </Box>

                  <Divider sx={{ mb: isLarge ? 1.5 : 1 }} />

                  <SummaryDetailItem icon={getSummaryDetailIcon('Technology')} label="Technology" value={spec.technology} isLarge={isLarge} />
                  <SummaryDetailItem icon={getSummaryDetailIcon('Manufacturer')} label="Manufacturer" value={spec.manufacturer} isLarge={isLarge} />
                  {spec.efficiency && <SummaryDetailItem icon={getSummaryDetailIcon('Efficiency')} label="Efficiency" value={spec.efficiency} isLarge={isLarge} />}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {selectedSpec && (
        <DetailModal
          open={!!selectedSpec}
          onClose={handleCloseModal}
          spec={selectedSpec}
          isLarge={isLarge}
        />
      )}
    </Box>
  );
};