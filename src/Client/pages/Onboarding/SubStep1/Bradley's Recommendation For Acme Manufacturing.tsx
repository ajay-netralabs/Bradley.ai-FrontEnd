import React, { useState } from 'react';
import {
  Box,
  Typography,
  // Card,
  CardContent,
  Tabs,
  Tab,
  Paper,
  // styled,
  // Modal,
  // Button
} from '@mui/material';
import { StyledTitle, StyledRecommendation, StyledKeyBenefitsTitle, StyledBenefitCard, StyledBenefitValue, StyledBenefitDescription, StyledTabPanelBox, StyledTabPanelTitle, StyledExpandButton, ExpandableModal, TabPanel, ExpandablePanelInfo, benefitDataTop, benefitDataBottom, EnergyProductionBreakdown, EnergyFlowDiagram, mockExpandedContent, IndicativeFinanceDetails, FinancialIncentives, FinanceOptions, Resources, GeneralArrangement, SystemDiagram, InvestmentSummary, ProjectSchedule } from '../../../../components/RecommendationUI';

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
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
        `}
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
              <Box sx={{ display: 'grid', gap: 2, height: '1390px', gridTemplateRows: '1fr 1fr 1fr' }}>
                <StyledTabPanelBox>
                  <StyledTabPanelTitle variant="h6">
                    System Diagram
                  </StyledTabPanelTitle>
                  <StyledExpandButton onClick={() => handleExpandClick('system-diagram', 'System Diagram')}>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                  </StyledExpandButton>
                  <Box sx={{ pt: 1.5, pb: 1, px: 1, height: 'calc(100% - 30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SystemDiagram size="small" />
                  </Box>
                </StyledTabPanelBox>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <StyledTabPanelBox>
                    <StyledTabPanelTitle variant="h6">
                      Energy Production Breakdown
                    </StyledTabPanelTitle>
                    <StyledExpandButton onClick={() => handleExpandClick('energy-production', 'Energy Production Breakdown')}>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                    </StyledExpandButton>
                    <Box sx={{ pt: 3, pb: 1, px: 1, height: 'calc(100% - 30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <EnergyProductionBreakdown size="small" />
                    </Box>
                  </StyledTabPanelBox>
                  <StyledTabPanelBox>
                    <StyledTabPanelTitle variant="h6">
                      Energy Flow Diagram
                    </StyledTabPanelTitle>
                    <StyledExpandButton onClick={() => handleExpandClick('energy-flow', 'Energy Flow Diagram')}>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                    </StyledExpandButton>
                    <div style={{ width: '100%', height: '300px' }}>
                      <EnergyFlowDiagram />
                    </div>
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
              <Box sx={{ display: 'grid', gap: 2, height: '2000px', gridTemplateRows: '1fr 1fr 1fr 1fr' }}>
                <StyledTabPanelBox>
                  <StyledTabPanelTitle variant="h6">
                    Investment Summary
                  </StyledTabPanelTitle>
                  <StyledExpandButton onClick={() => handleExpandClick('investment-summary', 'Investment Summary')}>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                  </StyledExpandButton>
                  <Box sx={{ pt: 1.5, pb: 1, px: 1, height: 'calc(100% - 30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <InvestmentSummary size="small" />
                  </Box>
                </StyledTabPanelBox>
                <Box sx={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 2 }}>
                    <StyledTabPanelBox>
                    <StyledTabPanelTitle variant="h6">
                      Indicative Interest Rate,<br />Term of Financing &<br />Internal Rate of Return
                    </StyledTabPanelTitle>
                    <StyledExpandButton onClick={() => handleExpandClick('interest-rate', 'Indicative Interest Rate, Term of Financing & Internal Rate of Return')}>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                    </StyledExpandButton>
                    <Box sx={{ pt: 0, pb: 1, px: 1, height: 'calc(100% - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IndicativeFinanceDetails size="small" />
                    </Box>
                    </StyledTabPanelBox>
                  <StyledTabPanelBox>
                  <StyledTabPanelTitle variant="h6">
                    Financial Incentives
                  </StyledTabPanelTitle>
                  <StyledExpandButton onClick={() => handleExpandClick('financial-incentives', 'Financial Incentives')}>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                  </StyledExpandButton>
                  <Box sx={{ pt: 1.5, pb: 1, px: 1, height: 'calc(100% - 30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FinancialIncentives size="small" />
                  </Box>
                </StyledTabPanelBox>
                </Box>
                <StyledTabPanelBox>
                    <StyledTabPanelTitle variant="h6">
                      Annual Energy Cost "as is" compared to DER overtime
                    </StyledTabPanelTitle>
                    <StyledExpandButton onClick={() => handleExpandClick('energy-cost', 'Annual Energy Cost "as is" compared to DER overtime')}>
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
                  <Box sx={{ pt: 1.5, pb: 1, px: 1, height: 'calc(100% - 30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FinanceOptions size="small" />
                  </Box>
                </StyledTabPanelBox>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box sx={{ display: 'grid', gap: 2, gridTemplateRows: '1fr 1fr', height: '1290px' }}>
              <StyledTabPanelBox>
                <StyledTabPanelTitle variant="h6">Project Schedule</StyledTabPanelTitle>
                <StyledExpandButton onClick={() => handleExpandClick('project-schedule', 'Project Schedule')}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                </StyledExpandButton>
                <Box sx={{ pt: 1.5, pb: 0, px: "100%", pl: 1, pr: 0, width: 'calc(100% - 30px)', height: 'calc(100% - 30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ProjectSchedule size="small" />
                </Box>
              </StyledTabPanelBox>
              <StyledTabPanelBox>
                <StyledTabPanelTitle variant="h6">General Arrangement</StyledTabPanelTitle>
                <StyledExpandButton onClick={() => handleExpandClick('general-arrangement', 'General Arrangement')}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                </StyledExpandButton>
                <Box sx={{ pt: 1.5, pb: 1, px: 1, height: 'calc(100% - 40px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GeneralArrangement size="small" />
                </Box>
              </StyledTabPanelBox>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <StyledTabPanelBox sx={{ height: '400px' }}>
                <StyledTabPanelTitle variant="h6">Resources</StyledTabPanelTitle>
                <StyledExpandButton onClick={() => handleExpandClick('resources', 'Resources')}>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                </StyledExpandButton>
                <Box sx={{ pt: 2, px: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#777', fontFamily: 'Nunito Sans, sans-serif' }}>
                  Bradley.ai uses the following AI methods to perfect the design and estimation for your DER project.
                </Typography></Box>
                <Box sx={{ px: 1, height: 'calc(100% - 40px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Resources size="small" />
                </Box>
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