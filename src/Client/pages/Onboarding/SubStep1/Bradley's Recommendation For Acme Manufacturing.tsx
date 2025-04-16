import React, { useState } from 'react'; 
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Tabs, 
  Tab, 
  Paper, 
  styled,
  Modal,
  Button
} from '@mui/material'; 

interface TabPanelProps { 
  children?: React.ReactNode; 
  index: number; 
  value: number; 
} 

interface ExpandableModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const TabPanel = (props: TabPanelProps) => { 
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

const ExpandableModal: React.FC<ExpandableModalProps> = ({ open, onClose, title, content }) => {
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
        maxWidth: '1000px',
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

const StyledTitle = styled(Typography)(({ theme }) => ({ 
  fontFamily: 'Nunito Sans, sans-serif', 
  fontSize: '0.85rem', 
  fontWeight: 'bold', 
  textAlign: 'center', 
  marginBottom: theme.spacing(1), 
})); 

const StyledRecommendation = styled(Typography)(({ }) => ({ 
  fontFamily: 'Nunito Sans,sans-serif', 
  fontSize: '0.8rem', 
  textAlign: 'center', 
})); 

const StyledKeyBenefitsTitle = styled(Typography)(({ theme }) => ({ 
  marginBottom: theme.spacing(-1), 
  marginTop: theme.spacing(1), 
  fontFamily: 'Nunito Sans,sans-serif', 
  fontSize: '0.75rem', 
  fontWeight: 'bold', 
  textAlign: 'center', 
})); 

const StyledBenefitCard = styled(Card)(({ theme }) => ({ 
  flex: 1, 
  padding: theme.spacing(1), 
  textAlign: 'center', 
  backgroundColor: '#f5f5f5',
  boxShadow: theme.shadows[0], 
  borderRadius: theme.shape.borderRadius, 
  paddingBottom: theme.spacing(0), 
})); 

const StyledBenefitValue = styled(Typography)(({ theme }) => ({ 
  fontFamily: 'Nunito Sans,sans-serif', 
  fontWeight: 'bold', 
  fontSize: '1rem', 
  paddingBottom: theme.spacing(1), 
})); 

const StyledBenefitDescription = styled(Typography)(({ theme }) => ({ 
  fontFamily: 'Nunito Sans,sans-serif', 
  fontWeight: 'bold', 
  fontSize: '0.7rem', 
  color: theme.palette.grey[600], 
  paddingTop: theme.spacing(1), 
})); 

const StyledTabPanelBox = styled(Box)(({ theme }) => ({ 
  position: 'relative', 
  padding: theme.spacing(2), 
  backgroundColor: theme.palette.grey[100], 
  borderRadius: theme.shape.borderRadius, 
})); 

const StyledTabPanelTitle = styled(Typography)(({ }) => ({ 
  fontFamily: 'Nunito Sans,sans-serif', 
  fontSize: '0.9rem', 
  fontWeight: 'bold', 
})); 

const StyledExpandButton = styled(Box)(({ theme }) => ({ 
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

interface ExpandablePanelInfo {
  id: string;
  title: string;
}

const benefitDataTop = [ 
  { value: '11,809 Metric Tons', description: 'Of reduced annual carbon dioxide equivalents<br />(80% CO2 reduction)' }, 
  { value: '248 Thousand', description: 'Steam therms reduced<br />(35% reduction in steam use)' }, 
  { value: '8.1 Million', description: 'gallons of water reduced<br />(22% reduction in water use)' }, 
  { value: '4 Million', description: 'kWh of electricity reduced<br />(32% reduction in electric use)' }, 
]; 

const benefitDataBottom = [ 
  { value: '$1.583 million', description: 'annual reduction in utility costs' }, 
  { value: '$1.178 million', description: 'From Utility rebates' }, 
  { value: '$100 thousand', description: 'From Maryland Energy Administration grant' }, 
  { value: '$13.287 million', description: 'Invested in addressing deffered mechanical and electrical infrastructure' }, 
]; 

// Sample content for expanded panels
const mockExpandedContent = (title: string) => (
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

const SubStep1: React.FC = () => { 
  const [tabValue, setTabValue] = useState(0); 
  const [modalOpen, setModalOpen] = useState(false);
  const [currentExpandedPanel, setCurrentExpandedPanel] = useState<ExpandablePanelInfo | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => { 
    setTabValue(newValue); 
  }; 

  const handleExpandClick = (panelId: string, panelTitle: string) => {
    setCurrentExpandedPanel({ id: panelId, title: panelTitle });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return ( 
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      fontFamily: 'Nunito Sans, sans-serif', 
      fontSize: '0.75rem', 
      p: 1, 
      maxWidth: '1200px', 
      margin: '0 auto', 
      width: '100%' 
    }}> 
      <style> 
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap'); 
      </style> 
      <StyledTitle variant="h6"> 
        <h2>Bradley's Recommendation For Acme Manufacturing</h2> 
      </StyledTitle> 

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: { xs: '20px', md: '160px' } }}> 
        <StyledRecommendation> 
          <b>Bradley.ai</b> recommends a hybrid system for Acme Manufacturing. This system combines solar panels, battery storage, and a natural gas generator to optimize energy costs, reduce emissions, and provide reliable backup power. 
        </StyledRecommendation> 

        <StyledKeyBenefitsTitle variant="h1"> 
          <h2>Key Benefits:</h2> 
        </StyledKeyBenefitsTitle> 

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 1 }}> 
          {benefitDataTop.map((benefit, index) => ( 
            <StyledBenefitCard key={index}> 
              <CardContent> 
                <StyledBenefitValue><span style={{ color: '#2bad31' }}>{benefit.value}</span></StyledBenefitValue> 
                <StyledBenefitDescription dangerouslySetInnerHTML={{ __html: benefit.description }} /> 
              </CardContent> 
            </StyledBenefitCard> 
          ))} 
        </Box> 
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 1 }}> 
          {benefitDataBottom.map((benefit, index) => ( 
            <StyledBenefitCard key={index}> 
              <CardContent> 
                <StyledBenefitValue><span style={{ color: '#2bad31' }}>{benefit.value}</span></StyledBenefitValue> 
                <StyledBenefitDescription dangerouslySetInnerHTML={{ __html: benefit.description }} /> 
              </CardContent> 
            </StyledBenefitCard> 
          ))} 
        </Box> 
        <Paper elevation={0} sx={{ 
          width: '100%', 
          mt: 4, 
          backgroundColor: 'transparent' 
        }}> 
          <Box sx={{ 
            borderRadius: '8px', 
            overflow: 'hidden', 
            border: '1px solid #e0e0e0', 
            backgroundColor: 'white', 
            textAlign: 'center', 
          }}> 
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="recommendation tabs" 
              sx={{ 
                mt: 1, 
                borderBottom: 0, 
                borderColor: 'divider', 
                '& .MuiTabs-flexContainer': { 
                  justifyContent: 'center', 
                }, 
                '& .MuiTab-root': { 
                  textTransform: 'none', 
                  fontFamily: 'Nunito Sans,sans-serif', 
                  fontSize: '0.9rem', 
                  minWidth: 120, 
                  fontWeight: 'bold', 
                  '&:focus': { 
                    outline: 'none', 
                  }, 
                } 
              }} 
            > 
              <Tab label="Energy Mix" /> 
              <Tab label="Financial Projections" /> 
              <Tab label="Project Schedule & General Arrangement" /> 
              <Tab label="Resources" /> 
            </Tabs> 

            <TabPanel value={tabValue} index={0}> 
              <Box sx={{ display: 'grid', gap: 2, height: '1000px', gridTemplateRows: '1fr 1fr 1fr' }}> 
                <StyledTabPanelBox> 
                  <StyledTabPanelTitle variant="h6"> 
                    System Diagram 
                  </StyledTabPanelTitle> 
                  <StyledExpandButton onClick={() => handleExpandClick('system-diagram', 'System Diagram')}> 
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography> 
                  </StyledExpandButton> 
                </StyledTabPanelBox> 
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}> 
                  <StyledTabPanelBox> 
                    <StyledTabPanelTitle variant="h6"> 
                      Energy Production Breakdown 
                    </StyledTabPanelTitle> 
                    <StyledExpandButton onClick={() => handleExpandClick('energy-production', 'Energy Production Breakdown')}> 
                      <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography> 
                    </StyledExpandButton> 
                  </StyledTabPanelBox> 
                  <StyledTabPanelBox> 
                    <StyledTabPanelTitle variant="h6"> 
                      Energy Flow Diagram 
                    </StyledTabPanelTitle> 
                    <StyledExpandButton onClick={() => handleExpandClick('energy-flow', 'Energy Flow Diagram')}> 
                      <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography> 
                    </StyledExpandButton> 
                  </StyledTabPanelBox> 
                </Box> 
                <StyledTabPanelBox> 
                  <StyledTabPanelTitle variant="h6"> 
                    Energy Specifications 
                  </StyledTabPanelTitle> 
                  <StyledExpandButton onClick={() => handleExpandClick('energy-specs', 'Energy Specifications')}> 
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography> 
                  </StyledExpandButton> 
                </StyledTabPanelBox> 
              </Box> 
            </TabPanel> 

            <TabPanel value={tabValue} index={1}> 
              <Box sx={{ display: 'grid', gap: 2, height: '1340px', gridTemplateRows: '1fr 1fr 1fr 1fr' }}> 
                <StyledTabPanelBox> 
                  <StyledTabPanelTitle variant="h6"> 
                    Investment Summary 
                  </StyledTabPanelTitle> 
                  <StyledExpandButton onClick={() => handleExpandClick('investment-summary', 'Investment Summary')}> 
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography> 
                  </StyledExpandButton> 
                </StyledTabPanelBox> 
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}> 
                  <StyledTabPanelBox> 
                    <StyledTabPanelTitle variant="h6"> 
                      Indicative Interest Rate,<br />Term of Financing & Internal Rate of Return 
                    </StyledTabPanelTitle> 
                    <StyledExpandButton onClick={() => handleExpandClick('interest-rate', 'Indicative Interest Rate, Term of Financing & Internal Rate of Return')}> 
                      <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography> 
                    </StyledExpandButton> 
                  </StyledTabPanelBox> 
                  <StyledTabPanelBox> 
                    <StyledTabPanelTitle variant="h6"> 
                      Annual Energy Cost "as is"<br />compared to DER overtime 
                    </StyledTabPanelTitle> 
                    <StyledExpandButton onClick={() => handleExpandClick('energy-cost', 'Annual Energy Cost "as is" compared to DER overtime')}> 
                      <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography> 
                    </StyledExpandButton> 
                  </StyledTabPanelBox> 
                </Box> 
                <StyledTabPanelBox> 
                  <StyledTabPanelTitle variant="h6"> 
                    Financial Incentives 
                  </StyledTabPanelTitle> 
                  <StyledExpandButton onClick={() => handleExpandClick('financial-incentives', 'Financial Incentives')}> 
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography> 
                  </StyledExpandButton> 
                </StyledTabPanelBox> 
                <StyledTabPanelBox> 
                  <StyledTabPanelTitle variant="h6"> 
                    Finance Options 
                  </StyledTabPanelTitle> 
                  <StyledExpandButton onClick={() => handleExpandClick('finance-options', 'Finance Options')}> 
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography> 
                  </StyledExpandButton> 
                </StyledTabPanelBox> 
              </Box> 
            </TabPanel> 

            <TabPanel value={tabValue} index={2}> 
              <StyledTabPanelBox sx={{ height: '400px' }}> 
                <StyledTabPanelTitle variant="h6">Project Schedule & General Arrangement</StyledTabPanelTitle> 
                <StyledExpandButton onClick={() => handleExpandClick('project-schedule', 'Project Schedule & General Arrangement')}> 
                  <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography> 
                </StyledExpandButton> 
              </StyledTabPanelBox> 
            </TabPanel> 

            <TabPanel value={tabValue} index={3}> 
              <StyledTabPanelBox sx={{ height: '400px' }}> 
                <StyledTabPanelTitle variant="h6">Resources</StyledTabPanelTitle> 
                <StyledExpandButton onClick={() => handleExpandClick('resources', 'Resources')}> 
                  <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography> 
                </StyledExpandButton> 
              </StyledTabPanelBox> 
            </TabPanel> 
          </Box> 
        </Paper> 
      </Box>

      {/* Modal for expanded content */}
      {currentExpandedPanel && (
        <ExpandableModal
          open={modalOpen}
          onClose={handleModalClose}
          title={currentExpandedPanel.title}
          content={mockExpandedContent(currentExpandedPanel.title)}
        />
      )}
    </Box> 
  ); 
}; 

export default SubStep1;