import React, { useState } from 'react';
import { Box, Typography, Collapse, Paper, Checkbox, FormControlLabel, Chip } from '@mui/material';
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { GoOrganization } from 'react-icons/go';
import { MdOutlineEnergySavingsLeaf } from 'react-icons/md';
import { LuGoal } from 'react-icons/lu';
import { MdOutlineWarehouse } from 'react-icons/md';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { IoEnterOutline } from "react-icons/io5";

import { useAppContext } from '../../../../Context/AppContext';
import { useOrganizationDetails } from '../../../../Context/Organizational Profile/SubStep2/Organization Details Context';
import { useAnnualEnergySpend } from '../../../../Context/Organizational Profile/SubStep2/Annual Energy Spend Context';
import { usePrioritizationI } from '../../../../Context/Goals & Priorities/SubStep2/Prioritization - I Context';
import { useBudgetGoals } from '../../../../Context/Financial Info/SubStep2/Own/What Are Your Budget & Investment Goals Context';
import { useSiteCharacteristicsI } from '../../../../Context/Site Assessment/SubStep2/Site Characteristics - I Context';
import { useSolarAssets } from '../../../../Context/Site Assessment/SubStep3/INPUTS TO MAXIMIZE SOLAR DER ASSETS Context';
import { useOwnershipPreference } from '../../../../Context/Financial Info/SubStep1/Ownership Preference Context';
import { useFinancialsI } from '../../../../Context/Goals & Priorities/SubStep3/Financials & Investment Information - I Context';

import { useThermalEnergyNeedsI } from '../../../../Context/Energy Profile/SubStep2/Thermal Energy Needs - I Context';
import { useThermalEnergyNeedsII } from '../../../../Context/Energy Profile/SubStep2/Thermal Energy Needs - II Context';
import { useThermalEnergyNeedsIII } from '../../../../Context/Energy Profile/SubStep2/Thermal Energy Needs - III Context';
import { useThermalEnergyNeedsIV } from '../../../../Context/Energy Profile/SubStep2/Thermal Energy Needs - IV Context';
import { useBoilerCogeneration } from '../../../../Context/Energy Profile/SubStep2/Existing Boiler Cogeneration Context';

import { useLOAStatus } from '../../../../Context/Energy Profile/SubStep3/LOA - Status Context';

interface SummarySectionProps {
  icon: React.ReactElement;
  title: string;
  data: { label: string; value: string }[];
  completionStatus: 'complete' | 'partial' | 'empty';
  isExpanded: boolean;
  onExpand: () => void;
  onEdit: () => void;
}

const SummarySection: React.FC<SummarySectionProps> = ({
  icon,
  title,
  data,
  completionStatus,
  isExpanded,
  onExpand,
  onEdit
}) => {
  const getStatusColor = () => {
    switch (completionStatus) {
      case 'complete': return '#4caf50';
      case 'partial': return '#ff9800';
      case 'empty': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getStatusLabel = () => {
    switch (completionStatus) {
      case 'complete': return 'Complete';
      case 'partial': return 'Partial';
      case 'empty': return 'Empty';
      default: return 'Unknown';
    }
  };

  return (
    <Paper elevation={2} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: '12px 16px',
          cursor: 'pointer',
          backgroundColor: '#f8f9fa',
          borderBottom: isExpanded ? '1px solid #e0e0e0' : 'none',
          '&:hover': {
            backgroundColor: '#f0f2f5',
          }
        }}
        onClick={onExpand}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {React.cloneElement(icon, { style: { color: '#1976d2', marginRight: '12px', fontSize: '1.2rem' }})}
          <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', fontFamily: 'Nunito Sans, sans-serif' }}>
            {title}
          </Typography>
          <Chip
            label={getStatusLabel()}
            size="small"
            sx={{
              ml: 2,
              backgroundColor: getStatusColor(),
              color: 'white',
              fontSize: '0.7rem',
              height: '20px'
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            sx={{
              '&:focus': { outline: 'none' },
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
            }}
          >
            <IoEnterOutline />
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); onExpand(); }}
            sx={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
              '&:focus': { outline: 'none' },
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={isExpanded} timeout="auto">
        <Box sx={{ p: '16px 24px', backgroundColor: '#fff' }}>
          {data.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', py: 0.5, lineHeight: 1.7 }}>
              <Typography sx={{
                fontWeight: 'bold',
                color: '#555',
                fontSize: '0.8rem',
                fontFamily: 'Nunito Sans, sans-serif',
                minWidth: '160px',
                flexShrink: 0,
                mr: 2,
              }}>
                {item.label}:
              </Typography>
              <Typography sx={{
                fontSize: '0.8rem',
                color: '#555',
                fontFamily: 'Nunito Sans, sans-serif',
              }}>
                {item.value || 'Not Provided'}
              </Typography>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Paper>
  );
};

const SubStep1: React.FC = () => {
  const { setCurrentStep, setCurrentSubStep } = useAppContext();
  const [expanded, setExpanded] = useState<number[]>([0, 1, 2, 3, 4]);

  const { organizationDetails } = useOrganizationDetails();
  const { annualEnergySpend } = useAnnualEnergySpend();
  const { prioritizationIState } = usePrioritizationI();
  const { budgetGoalsState } = useBudgetGoals();
  const { siteCharacteristicsIState } = useSiteCharacteristicsI();
  const { solarAssetsState } = useSolarAssets();
  const { ownershipPreference } = useOwnershipPreference();
  const { financialsIState } = useFinancialsI();

  const { thermalNeedsIState } = useThermalEnergyNeedsI();
  const { thermalNeedsIIState } = useThermalEnergyNeedsII();
  const { thermalNeedsIIIState } = useThermalEnergyNeedsIII();
  const { thermalNeedsIVState } = useThermalEnergyNeedsIV();
  const { boilerCogenerationState } = useBoilerCogeneration();

  const { loaStatusState } = useLOAStatus();

  const orgData = [
    { label: 'Company Name', value: organizationDetails.organizationName },
    { label: 'Industry', value: organizationDetails.industry },
    { label: 'Contact Email', value: organizationDetails.userEmail },
  ];

  const totalAnnualSpend =
    (parseFloat(String(annualEnergySpend.electricity).replace(/[^0-9.]/g, '')) || 0) +
    (parseFloat(String(annualEnergySpend.naturalGas).replace(/[^0-9.]/g, '')) || 0) +
    (parseFloat(String(annualEnergySpend.water).replace(/[^0-9.]/g, '')) || 0) +
    (parseFloat(String(annualEnergySpend.oil).replace(/[^0-9.]/g, '')) || 0) +
    (parseFloat(String(annualEnergySpend.propane).replace(/[^0-9.]/g, '')) || 0) +
    (parseFloat(String(annualEnergySpend.other).replace(/[^0-9.]/g, '')) || 0);

  const energySources = new Set<string>();
  // energySources.add("Grid Electricity");

  if(thermalNeedsIState.showSteam) energySources.add("Steam");
  if(thermalNeedsIIState.showHotWaterHVAC) energySources.add("Hot Water (HVAC)");
  if(thermalNeedsIIState.showHotWaterBoilers) energySources.add("Hot Water (Domestic)");
  if(thermalNeedsIIIState.showChilledWater) energySources.add("Chilled Water");

  if(thermalNeedsIVState.showWasteHeat && thermalNeedsIVState.wasteHeatSources.length > 0){
    thermalNeedsIVState.wasteHeatSources.forEach(source => {
      if (source.type) energySources.add(`Waste Heat (${source.type})`);
    });
  }

  if(boilerCogenerationState.sources.length > 0 && boilerCogenerationState.sources[0].type){
    boilerCogenerationState.sources.forEach(source => {
      if (source.type) energySources.add(source.type);
    });
  }

  const energyData = [
    { label: 'Total Annual Spend', value: `$${totalAnnualSpend.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` },
    { label: 'Energy Sources', value: [...energySources].join(', ') },
    { label: 'LOA Status', value: loaStatusState.status },
  ];

  const topPriority = prioritizationIState.selectedRanks[1] !== 'Select one'
    ? prioritizationIState.selectedRanks[1]
    : 'Not Set';

  const goalsData = [
    { label: 'Top Priority', value: topPriority },
    { label: 'Desired IRR', value: `${financialsIState.acceptableIRR}%` },
    { label: 'Preferred Payback', value: budgetGoalsState.simplePayback !== 'default' ? budgetGoalsState.simplePayback.replace('<', 'Less than ').replace('>', 'More than ') + ' Years' : 'Not Set' },
  ];

  const totalRoofSpace = solarAssetsState.roofSections.map(v => parseFloat(String(v).replace(/,/g, '')) || 0).reduce((a, b) => a + b, 0);

  const siteData = [
    { label: 'Facility Size', value: `${parseInt(siteCharacteristicsIState.overallFacilitySize || '0').toLocaleString()} sq. ft` },
    { label: 'Total Roof Space', value: `${totalRoofSpace.toLocaleString()} sq. ft` },
    { label: 'Open Breaker Space', value: siteCharacteristicsIState.isBreakerSpaceAvailable ? 'Yes' : 'No' },
  ];

  const financialData = [
    { label: 'Ownership Preference', value: ownershipPreference.preference ? (ownershipPreference.preference.charAt(0).toUpperCase() + ownershipPreference.preference.slice(1)).replace('-', ' ') : 'Not Set' },
    { label: 'Budget Available', value: budgetGoalsState.availableFunds === 'yes' ? 'Yes' : 'No' },
  ];

  const getCompletionStatus = (data: { label: string; value: string }[]): 'complete' | 'partial' | 'empty' => {
    const notProvidedCount = data.filter(item =>
      item.value === 'Not Provided' || item.value === 'Not Set' || item.value === 'Pending' || item.value === 'Pending Authorization'
    ).length;
    const totalFields = data.length;

    if (notProvidedCount === 0) return 'complete';
    if (notProvidedCount === totalFields) return 'empty';
    return 'partial';
  };

  const sections = [
    { title: "Organizational Profile", icon: <GoOrganization />, data: orgData, completionStatus: getCompletionStatus(orgData), onEdit: () => { setCurrentStep(0); setCurrentSubStep(1); } },
    { title: "Energy Profile", icon: <MdOutlineEnergySavingsLeaf />, data: energyData, completionStatus: getCompletionStatus(energyData), onEdit: () => { setCurrentStep(1); setCurrentSubStep(1); } },
    { title: "Goals & Priorities", icon: <LuGoal />, data: goalsData, completionStatus: getCompletionStatus(goalsData), onEdit: () => { setCurrentStep(2); setCurrentSubStep(1); } },
    { title: "Site Assessment", icon: <MdOutlineWarehouse />, data: siteData, completionStatus: getCompletionStatus(siteData), onEdit: () => { setCurrentStep(3); setCurrentSubStep(1); } },
    { title: "Financial Info", icon: <MdOutlineAccountBalanceWallet />, data: financialData, completionStatus: getCompletionStatus(financialData), onEdit: () => { setCurrentStep(4); setCurrentSubStep(0); } },
  ];

  const handleExpandClick = (index: number) => {
    setExpanded(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <Box sx={{ fontFamily: 'Nunito Sans, sans-serif', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');`}</style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>DATA VERIFICATION AND PROCESSING</h2><br />
        <h2>Overall Profile Summary</h2>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '10px', pb: '10px', px: '160px' }}>
        
        <Paper elevation={3} sx={{ p: '12px 16px', borderRadius: '12px', background: '#f0f4f8' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', color: '#01579b' }}>
            <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Processing Status</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip 
                label={`${Math.round((sections.filter(s => s.completionStatus === 'complete').length / sections.length) * 100)}% Complete`}
                sx={{ 
                  backgroundColor: '#4caf50',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}
              />
            </Box>
          </Box>
        </Paper>

        {sections.map((section, index) => (
          <SummarySection 
            key={index}
            data={section.data}
            title={section.title}
            icon={section.icon}
            completionStatus={section.completionStatus}
            isExpanded={expanded.includes(index)}
            onExpand={() => handleExpandClick(index)}
            onEdit={section.onEdit}
          />
        ))}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: '12px', bgcolor: '#fafafa' }}>
          <FormControlLabel 
            control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: '1.2rem' } }} />}
            label={
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 600 }}>
                I have reviewed the information above and confirm it is accurate.
              </Typography>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep1;