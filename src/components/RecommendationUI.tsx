import React from 'react';
import {
  Box,
  Typography,
  Card,
  styled,
  Modal,
  Button,
  CardContent
} from '@mui/material';
import { EnergyProductionBreakdown } from './Recommendation Diagrams/Energy Production Breakdown';
import { EnergyFlowDiagram } from './Recommendation Diagrams/Energy Flow Diagram';
import { IndicativeFinanceDetails } from './Recommendation Diagrams/IIR, ToF & IRR';
import { FinancialIncentives } from './Recommendation Diagrams/Financial Incentives';
import { FinanceOptions } from './Recommendation Diagrams/Finance Options';
import { Resources } from './Recommendation Diagrams/Resources';
import { GeneralArrangement } from './Recommendation Diagrams/General Arrangement';
import { SystemDiagram } from './Recommendation Diagrams/System Diagram';
import { InvestmentSummary } from './Recommendation Diagrams/Investment Summary';
import { ProjectSchedule } from './Recommendation Diagrams/Project Schedule';
import { AnnualEnergyCostAsIsComparedToDEROvertime } from './Recommendation Diagrams/Annual Energy Cost as is compared to DER overtime';
import { EnergySpecifications } from './Recommendation Diagrams/Energy Specifications';
import { AiOutlineFall, AiOutlineRise } from "react-icons/ai";

export const StyledTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito Sans, sans-serif',
  fontSize: '0.85rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: theme.spacing(1),
}));

export const StyledRecommendation = styled(Typography)(({}) => ({
  fontFamily: 'Nunito Sans,sans-serif',
  fontSize: '0.8rem',
  textAlign: 'center',
}));

export const StyledKeyBenefitsTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(-1),
  marginTop: theme.spacing(1),
  fontFamily: 'Nunito Sans,sans-serif',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  textAlign: 'center',
}));

// Enhanced Benefit Card Components
export const StyledBenefitCard = styled(Card)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1),
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
  boxShadow: theme.shadows[0],
  borderRadius: theme.shape.borderRadius,
  paddingBottom: theme.spacing(0),
  // border: '1px solid #e9ecef',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-0.25px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  },
}));

const WatermarkIcon = styled('div')<{ type: 'financial' | 'environmental' | 'utility' }>(({ type }) => ({
  position: 'absolute',
  right: '-10px',
  top: '50%',
  transform: 'translateY(-50%) rotate(-15deg)',
  fontSize: '4rem',
  opacity: 0.15,
  fontWeight: 'bold',
  color: '#333',
  zIndex: 1,
  ...(type === 'financial' && {
    fontSize: '6.5rem',
    left: '-150px',
  }),
  ...(type === 'environmental' && {
    fontSize: '6.5rem',
    left: '-100px',
  }),
  ...(type === 'utility' && {
    fontSize: '6.5rem',
    left: '-135px',
  }),
}));

const PercentageValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito Sans, sans-serif',
  fontWeight: '900',
  fontSize: '1.4rem',
  color: '#2bad31',
  marginBottom: theme.spacing(0.5),
  position: 'relative',
  zIndex: 2,
}));

const AbsoluteValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito Sans, sans-serif',
  fontWeight: 'bold',
  fontSize: '0.95rem',
  color: '#333',
  marginBottom: theme.spacing(0.5),
  position: 'relative',
  zIndex: 2,
}));

const BenefitDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito Sans, sans-serif',
  fontWeight: '600',
  fontSize: '0.7rem',
  color: theme.palette.grey[600],
  position: 'relative',
  zIndex: 2,
  lineHeight: 1.3,
}));

interface BenefitData {
  percentage?: string;
  value: string;
  description: string;
  type: 'financial' | 'environmental' | 'utility';
  watermark: string;
}

export const EnhancedBenefitCard: React.FC<{ benefit: BenefitData }> = ({ benefit }) => (
  <StyledBenefitCard>
    <WatermarkIcon type={benefit.type}>
      {benefit.watermark}
    </WatermarkIcon>
    <CardContent sx={{ position: 'relative', zIndex: 2, py: 2.5 }}>
      {benefit.percentage && (
        <PercentageValue>
          {benefit.percentage}
          {(benefit.value.includes('Gain') || benefit.value.includes('Investment')) ? (
            <AiOutlineRise style={{ fontSize: '1.8rem', color: '#2bad31', verticalAlign: 'middle' }} />
          ) : (
            <AiOutlineFall style={{ fontSize: '1.8rem', color: '#2bad31', verticalAlign: 'middle' }} />
          )}
        </PercentageValue>
      )}
      <AbsoluteValue style={{fontSize: '1.019rem'}}>{benefit.value}</AbsoluteValue>
      <BenefitDescription>
        {benefit.description}
      </BenefitDescription>
    </CardContent>
  </StyledBenefitCard>
);

export const StyledBenefitValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito Sans,sans-serif',
  fontWeight: 'bold',
  fontSize: '1rem',
  paddingBottom: theme.spacing(1),
}));

export const StyledBenefitDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito Sans,sans-serif',
  fontWeight: 'bold',
  fontSize: '0.7rem',
  color: theme.palette.grey[600],
  paddingTop: theme.spacing(1),
}));

export const StyledTabPanelBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
}));

export const StyledTabPanelTitle = styled(Typography)(({}) => ({
  fontFamily: 'Nunito Sans,sans-serif',
  fontSize: '0.9rem',
  fontWeight: 'bold',
}));

export const StyledExpandButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  backgroundColor: theme.palette.grey[300],
  cursor: 'pointer',
}));

interface ExpandableModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export const ExpandableModal: React.FC<ExpandableModalProps> = ({ open, onClose, title, content }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="expanded-modal-title"
      aria-describedby="expanded-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: title === "IIR, ToF & IRR" ? '500px'
        : title === "Financial Incentives" ? '600px'
        : title === "System Diagram" ? '900px'
        : title === "Energy Production Breakdown" ? '850px'
        : title === "Energy Flow Diagram" ? '800px'
        : title === "Resources" ? '850px'
        : title === "General Arrangement" ? '1000px'
        : '1500px',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        pt: 2.5,
        maxHeight: '90vh',
        overflow: 'auto',
        scrollbarWidth: 'none', // Firefox
        '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography id="expanded-modal-title" variant="h6" component="h2" sx={{
        fontFamily: 'Nunito Sans, sans-serif',
        fontWeight: 'bold',
        color: '#333',
          }}>
        {title}
          </Typography>
          <Button onClick={onClose} sx={{ minWidth: 'auto', p: 1 }}>
        <Typography sx={{ fontSize: '1rem' }}>✕</Typography>
          </Button>
        </Box>
        <Box id="expanded-modal-description" sx={{ mt: 2, width: '100%', height: '100%' }}>
          {content}
        </Box>
      </Box>
    </Modal>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export interface ExpandablePanelInfo {
  id: string;
  title: string;
}

export const benefitDataTop: BenefitData[] = [
  { 
    percentage: '--%',
    value: '$1.583M Reduction', 
    description: 'in annual utility costs',
    type: 'financial',
    watermark: '$'
  },
  { 
    percentage: '--%',
    value: '$1.178M Gain', 
    description: 'from utility rebates',
    type: 'financial',
    watermark: '$'
  },
  { 
    percentage: '--%',
    value: '$100K Gain', 
    description: 'from XYZ Energy Administration grant',
    type: 'financial',
    watermark: '$'
  },
  { 
    percentage: '--%',
    value: '$13.287M Investment', 
    description: 'in addressing deferred mechanical and electrical infrastructure',
    type: 'financial',
    watermark: '$'
  },
];

export const benefitDataBottom: BenefitData[] = [
  { 
    percentage: '80%', 
    value: '11,809 MT Reduction', 
    description: 'in greenhouse gas emissions',
    type: 'environmental',
    watermark: '🌱'
  },
  { 
    percentage: '35%', 
    value: '248K Therms Reduction', 
    description: 'in steam usage',
    type: 'utility',
    watermark: '♨️'
  },
  { 
    percentage: '22%', 
    value: '8.1M Gal Reduction', 
    description: 'in water usage',
    type: 'utility',
    watermark: '💧'
  },
  { 
    percentage: '32%', 
    value: '4M kWh Reduction', 
    description: 'in electricity usage',
    type: 'utility',
    watermark: '⚡'
  },
];

// Sample content for expanded panels
export const mockExpandedContent = (title: string) => {
  if (title === "Energy Flow Diagram") {
    return (
      <Box sx={{ p: 0, height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <EnergyFlowDiagram />
      </Box>
    );
  }
  
  if (title === "Energy Production Breakdown") {
    return (
      <Box sx={{ p: 0, height: '590px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <EnergyProductionBreakdown size="large" />
      </Box>
    );
  }

  if (title === "IIR, ToF & IRR") {
    return (
      <Box sx={{ p: 0, height: '226px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <IndicativeFinanceDetails size="large" />
      </Box>
    );
  }

  if (title === "Financial Incentives") {
    return (
      <Box sx={{ p: 0, height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <FinancialIncentives size="large" />
      </Box>
    );
  }

  if (title === "Finance Options") {
    return (
      <Box sx={{ p: 0, height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <FinanceOptions size="large" />
      </Box>
    );
  }

  if (title === "Resources") {
    return (
      <Box sx={{ p: 0, height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Resources size="large" />
      </Box>
    );
  }

  if (title === "General Arrangement") {
    return (
      <Box sx={{ p: 0, height: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <GeneralArrangement size="large" />
      </Box>
    );
  }

  if (title === "System Diagram") {
    return (
      <Box sx={{ p: 0, height: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <SystemDiagram size="large" />
      </Box>
    );
  }

  if (title === "Investment Summary") {
    return (
      <Box sx={{ p: 0, height: '850px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <InvestmentSummary size="large" />
      </Box>
    );
  }

  if (title === "Project Schedule") {
    return (
      <Box sx={{ p: 0, height: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <ProjectSchedule size="large" />
      </Box>
    );
  }

  if (title === 'Annual Energy Cost "as is" compared to DER overtime') {
    return (
      <Box sx={{ p: 0, height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <AnnualEnergyCostAsIsComparedToDEROvertime size="large" />
      </Box>
    );
  }

  if (title === "Energy Specifications") {
    return (
      <Box sx={{ p: 0, height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <EnergySpecifications size="large" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 0, height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{
        width: '100%',
        height: '500px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px'
      }}>
        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', color: '#888' }}>
          {title} - Expanded View
        </Typography>
      </Box>
    </Box>
  );
};

export { EnergyProductionBreakdown, EnergyFlowDiagram, IndicativeFinanceDetails, FinancialIncentives, FinanceOptions, Resources, GeneralArrangement, SystemDiagram, InvestmentSummary, ProjectSchedule, AnnualEnergyCostAsIsComparedToDEROvertime, EnergySpecifications };
