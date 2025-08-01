import React, { useState } from 'react';
import {
  Box,
  Typography,
  // Card,
  // CardContent,
  Tabs,
  Tab,
  Paper,
  // styled,
  // Modal,
  // Button 
} from '@mui/material';
import { StyledTitle, StyledRecommendation, StyledKeyBenefitsTitle, EnhancedBenefitCard, /* StyledBenefitValue, StyledBenefitDescription, */ StyledTabPanelBox, StyledTabPanelTitle, StyledExpandButton, ExpandableModal, TabPanel, ExpandablePanelInfo, benefitDataTop, benefitDataBottom, EnergyProductionBreakdown, EnergyFlowDiagram, mockExpandedContent, /* IndicativeFinanceDetails, FinancialIncentives, FinanceOptions, */ Resources, GeneralArrangement, SystemDiagram, InvestmentSummary, ProjectSchedule, AnnualEnergyCostAsIsComparedToDEROvertime, EnergySpecifications, FinancingOptionsAnalysis } from '../../../../components/RecommendationUI';
import { useOrganizationDetails } from '../../../../Context/Organizational Profile/SubStep2/Organization Details Context';

const SubStep1: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentExpandedPanel, setCurrentExpandedPanel] = useState<ExpandablePanelInfo | null>(null);

  const { organizationDetailsState } = useOrganizationDetails();
  const { userName, organizationName } = organizationDetailsState;

  const recommendationTitle = (userName && organizationName) 
    ? `Bradley's Recommendation For ${userName}, ${organizationName}` 
    : `Bradley's Recommendation For ${userName || organizationName || 'Your Facility'}`;

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
        <h2>{recommendationTitle}</h2>
      </StyledTitle>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: { xs: '20px', md: '80px' } }}>
        <StyledRecommendation>
          <b>Bradley.ai</b> recommends a hybrid system for {userName}, {organizationName}.<br /><br />This system combines solar panels, battery storage, and a natural gas generator to optimize energy costs, reduce emissions, and provide reliable backup power.
        </StyledRecommendation>

        <StyledKeyBenefitsTitle variant="h1">
          <h2>Key Benefits:</h2>
        </StyledKeyBenefitsTitle>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 1 }}>
          {benefitDataTop.map((benefit, index) => (
            <EnhancedBenefitCard key={index} benefit={benefit} />
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 1 }}>
          {benefitDataBottom.map((benefit, index) => (
            <EnhancedBenefitCard key={index} benefit={benefit} />
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
                  // gap: 7.9,
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontFamily: 'Nunito Sans,sans-serif',
                  fontSize: '0.9rem',
                  minWidth: 120,
                  fontWeight: 'bold',
                  // flexGrow: 1,
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
              <Box sx={{ display: 'grid', gap: 2, height: '1550px', gridTemplateRows: '1fr 1fr 1fr' }}>
                <StyledTabPanelBox>
                  <StyledTabPanelTitle variant="h6">
                    System Diagram
                  </StyledTabPanelTitle>
                  <StyledExpandButton onClick={() => handleExpandClick('system-diagram', 'System Diagram')}>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                  </StyledExpandButton>
                  <Box sx={{ pt: 1.5, pb: 1, px: 1, height: 'calc(100% - 35px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                    <Box sx={{ pt: 3, pb: 1, px: 1, height: 'calc(100% - 30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <EnergyFlowDiagram />
                    </Box>
                  </StyledTabPanelBox>
                </Box>
                <StyledTabPanelBox>
                  <StyledTabPanelTitle variant="h6">
                    Energy Specifications
                  </StyledTabPanelTitle>
                  <StyledExpandButton onClick={() => handleExpandClick('energy-specs', 'Energy Specifications')}>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                  </StyledExpandButton>
                  <Box sx={{ pt: 1.5, pb: 1, px: 1, height: 'calc(100% - 30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <EnergySpecifications size="small" />
                  </Box>
                </StyledTabPanelBox>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ display: 'grid', gap: 2, height: '1720px', gridTemplateRows: '1fr 1fr 1fr' }}>
                <StyledTabPanelBox>
                  <StyledTabPanelTitle variant="h6">
                    Investment Summary
                  </StyledTabPanelTitle>
                  <StyledExpandButton onClick={() => handleExpandClick('investment-summary', 'Investment Summary')}>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                  </StyledExpandButton>
                  <Box sx={{ pt: 1.5, pb: 3, px: 1, height: 'calc(100% - 30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <InvestmentSummary size="small" />
                  </Box>
                </StyledTabPanelBox>
                <StyledTabPanelBox>
                    <StyledTabPanelTitle variant="h6">
                      Annual Energy Cost "as is" compared to DER overtime
                    </StyledTabPanelTitle>
                    <StyledExpandButton onClick={() => handleExpandClick('energy-cost', 'Annual Energy Cost "as is" compared to DER overtime')}>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                    </StyledExpandButton>
                    <Box sx={{ pt: 1.5, pb: 0, px: 1, height: 'calc(100% - 30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnnualEnergyCostAsIsComparedToDEROvertime size="small" />
                    </Box>
                  </StyledTabPanelBox>
                  <StyledTabPanelBox>
                    <StyledTabPanelTitle variant="h6">
                      Financing Options Analysis
                    </StyledTabPanelTitle>
                    <StyledExpandButton onClick={() => handleExpandClick('financing-analysis', 'Financing Options Analysis')}>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                    </StyledExpandButton>
                    <Box sx={{ pt: 1.5, pb: 1, px: 1, height: 'calc(100% - 30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FinancingOptionsAnalysis size="small" />
                    </Box>
                  </StyledTabPanelBox>
                {/* <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <StyledTabPanelBox>
                    <StyledTabPanelTitle variant="h6">
                      IIR, ToF & IRR
                    </StyledTabPanelTitle>
                    <StyledExpandButton onClick={() => handleExpandClick('interest-rate', 'IIR, ToF & IRR')}>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                    </StyledExpandButton>
                    <Box sx={{ pt: 0, pb: 1, px: 1, height: 'calc(100% - 30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                </Box> */}
                {/* <StyledTabPanelBox>
                  <StyledTabPanelTitle variant="h6">
                    Finance Options
                  </StyledTabPanelTitle>
                  <StyledExpandButton onClick={() => handleExpandClick('finance-options', 'Finance Options')}>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                  </StyledExpandButton>
                  <Box sx={{ pt: 1.5, pb: 1, px: 1, height: 'calc(100% - 30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FinanceOptions size="small" />
                  </Box>
                </StyledTabPanelBox> */}
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box sx={{ display: 'grid', gap: 2, gridTemplateRows: '1fr 1fr', height: '1590px' }}>
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
              <StyledTabPanelBox sx={{ height: '460px' }}>
                <StyledTabPanelTitle variant="h6">Resources</StyledTabPanelTitle>
                <StyledExpandButton onClick={() => handleExpandClick('resources', 'Resources')}>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                </StyledExpandButton>
                <Box sx={{ pt: 2, px: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#777', fontFamily: 'Nunito Sans, sans-serif' }}>
                  Bradley.ai uses the following AI methods to perfect the design and estimation for your DER project.
                </Typography></Box>
                <Box sx={{ px: 1, height: 'calc(100% - 50px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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