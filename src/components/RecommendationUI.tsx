import React from 'react';
import {
  Box,
  Typography,
  Card,
  styled,
  Modal,
  Button
} from '@mui/material';
import { EnergyProductionBreakdown } from './Recommendation Diagrams/Energy Production Breakdown';
import { EnergyFlowDiagram } from './Recommendation Diagrams/Energy Flow Diagram';
import { IndicativeFinanceDetails } from './Recommendation Diagrams/Indicative Interest Rate, Term of Financing & Internal Rate of Return';
import { FinancialIncentives } from './Recommendation Diagrams/Financial Incentives';
import { FinanceOptions } from './Recommendation Diagrams/Finance Options';
import { Resources } from './Recommendation Diagrams/Resources';
import { GeneralArrangement } from './Recommendation Diagrams/General Arrangement';
import { SystemDiagram } from './Recommendation Diagrams/System Diagram';

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

export const StyledBenefitCard = styled(Card)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1),
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
  boxShadow: theme.shadows[0],
  borderRadius: theme.shape.borderRadius,
  paddingBottom: theme.spacing(0),
}));

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
        maxWidth: title === "Indicative Interest Rate, Term of Financing & Internal Rate of Return" ? '500px' : title === "Financial Incentives" ? '600px' : '1000px',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        pt: 2.5,
        maxHeight: '90vh',
        overflow: 'auto'
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

export const benefitDataTop = [
  { value: '11,809 Metric Tons', description: 'Of reduced annual carbon dioxide equivalents<br />(80% CO2 reduction)' },
  { value: '248 Thousand', description: 'Steam therms reduced<br />(35% reduction in steam use)' },
  { value: '8.1 Million', description: 'gallons of water reduced<br />(22% reduction in water use)' },
  { value: '4 Million', description: 'kWh of electricity reduced<br />(32% reduction in electric use)' },
];

export const benefitDataBottom = [
  { value: '$1.583 million', description: 'annual reduction in utility costs' },
  { value: '$1.178 million', description: 'From Utility rebates' },
  { value: '$100 thousand', description: 'From Maryland Energy Administration grant' },
  { value: '$13.287 million', description: 'Invested in addressing deffered mechanical and electrical infrastructure' },
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
      <Box sx={{ p: 0, height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <EnergyProductionBreakdown size="large" />
      </Box>
    );
  }

  if (title === "Indicative Interest Rate, Term of Financing & Internal Rate of Return") {
    return (
      <Box sx={{ p: 0, height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
      <Box sx={{ p: 0, height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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

export { EnergyProductionBreakdown, EnergyFlowDiagram, IndicativeFinanceDetails, FinancialIncentives, FinanceOptions, Resources, GeneralArrangement, SystemDiagram };
