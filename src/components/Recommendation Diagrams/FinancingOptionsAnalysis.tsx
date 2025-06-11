import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  ListItemIcon,
} from '@mui/material';
import { CheckCircleOutline, WorkspacePremium } from '@mui/icons-material';

// --- DATA ---
const projectMetrics = {
  incentives: 875000,
  netCost: 2415000,
};

const financeOptions = [
  {
    id: 0,
    lender: 'Hannon Armstrong',
    rate: 6.25,
    term: 20,
    annualPayment: 215432,
    irr: 14.1, // Using the IRR from your key benefits section
    isRecommended: true,
    rationale: 'Offers the highest Internal Rate of Return, maximizing the long-term value of the investment.',
  },
  {
    id: 1,
    lender: 'Bostonia',
    rate: 6.37,
    term: 22,
    annualPayment: 204118,
    irr: 13.2,
    isRecommended: false,
    rationale: 'A competitive option with a longer term, providing greater cash flow flexibility with a slightly lower IRR.',
  },
  {
    id: 2,
    lender: 'Bank of America',
    rate: 6.75,
    term: 25,
    annualPayment: 195650,
    irr: 12.8,
    isRecommended: false,
    rationale: 'Features the lowest annual payment, which is ideal for prioritizing immediate operational budgets over long-term returns.',
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

// --- MAIN COMPONENT ---
export const FinancingOptionsAnalysis: React.FC<{ size: 'small' | 'large' }> = ({ size }) => {
  const isLarge = size === 'large';
  const [selectedLenderId, setSelectedLenderId] = useState(
    financeOptions.find((opt) => opt.isRecommended)?.id ?? 0
  );

  const selectedOption = financeOptions.find((opt) => opt.id === selectedLenderId);
  if (!selectedOption) return null;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
      {/* Header with Key Project Metrics */}
      <Box sx={{ p: isLarge ? 3 : 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item>
            <Typography variant="caption" color="text.secondary">Available Incentives</Typography>
            <Typography variant={isLarge ? 'h6' : 'subtitle1'} sx={{ fontWeight: 'bold' }}>
              {formatCurrency(projectMetrics.incentives)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" color="text.secondary">Net Project Cost (Loan)</Typography>
            <Typography variant={isLarge ? 'h6' : 'subtitle1'} sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {formatCurrency(projectMetrics.netCost)}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Left Column: Lender List */}
        <Box sx={{ width: { xs: '100%', md: '300px' }, borderRight: { xs: 'none', md: '1px solid' }, borderColor: 'divider' }}>
          <List disablePadding>
            {financeOptions.map((option, index) => (
              <ListItem key={option.id} disablePadding sx={{ borderBottom: index < financeOptions.length -1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                <ListItemButton
                  selected={option.id === selectedLenderId}
                  onClick={() => setSelectedLenderId(option.id)}
                  sx={{ py: 2, px: 2.5 }}
                >
                  <ListItemText
                    primary={option.lender}
                    primaryTypographyProps={{ fontWeight: 'bold', fontSize: isLarge ? '1rem' : '0.9rem' }}
                  />
                  {option.isRecommended && (
                    <Chip
                      icon={<WorkspacePremium sx={{ fontSize: '1rem !important' }} />}
                      label="Recommended"
                      color="success"
                      size="small"
                      variant="outlined"
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right Column: Details */}
        <Box sx={{ p: isLarge ? 3 : 2.5, flex: 1 }}>
          <Typography variant={isLarge ? 'h5' : 'h6'} sx={{ fontWeight: 'bold', mb: 3 }}>
            {selectedOption.lender} Financing Details
          </Typography>
          
          {/* Key Metrics Grid */}
          <Grid container spacing={isLarge ? 3 : 2} sx={{ mb: 3 }}>
            <Grid item xs={6} md={3}>
              <Typography variant="body2" color="text.secondary">Project IRR</Typography>
              <Typography variant={isLarge ? 'h5' : 'h6'} sx={{ fontWeight: 900, color: 'success.main' }}>
                {selectedOption.irr}%
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body2" color="text.secondary">Interest Rate</Typography>
              <Typography variant={isLarge ? 'h5' : 'h6'} sx={{ fontWeight: 'bold' }}>
                {selectedOption.rate}%
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body2" color="text.secondary">Loan Term</Typography>
              <Typography variant={isLarge ? 'h5' : 'h6'} sx={{ fontWeight: 'bold' }}>
                {selectedOption.term} yrs
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body2" color="text.secondary">Annual Payment</Typography>
              <Typography variant={isLarge ? 'h5' : 'h6'} sx={{ fontWeight: 'bold' }}>
                {formatCurrency(selectedOption.annualPayment)}
              </Typography>
            </Grid>
          </Grid>
          
          <Divider sx={{ mb: 3 }} />

          {/* Rationale Section */}
          <Typography variant={isLarge ? 'subtitle1' : 'body1'} sx={{ fontWeight: 'bold', mb: 1 }}>
            Recommendation Rationale
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
              <CheckCircleOutline color="action" fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2" color="text.secondary">
              {selectedOption.rationale}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Footer Disclaimer */}
       <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'center', display: 'block' }}>
            Summaries of indicative offers from 3rd party lenders are shown above. Finance offers are from qualified lenders and not part of 8x Energy.
          </Typography>
       </Box>
    </Paper>
  );
};