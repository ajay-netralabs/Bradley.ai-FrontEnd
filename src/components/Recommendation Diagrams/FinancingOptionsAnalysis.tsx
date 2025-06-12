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
import { CheckCircleOutline, WorkspacePremium, TrendingUp } from '@mui/icons-material';

// const projectMetrics = {
//   incentives: 875000,
//   netCost: 2415000,
// };

const financeOptions = [
  {
    id: 0,
    lender: 'Hannon Armstrong',
    rate: 6.25,
    term: 20,
    annualPayment: 215432,
    irr: 14.1,
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

export const FinancingOptionsAnalysis: React.FC<{ size: 'small' | 'large' }> = ({ size }) => {
  const isLarge = size === 'large';
  const [selectedLenderId, setSelectedLenderId] = useState(
    financeOptions.find((opt) => opt.isRecommended)?.id ?? 0
  );

  const selectedOption = financeOptions.find((opt) => opt.id === selectedLenderId);
  if (!selectedOption) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        overflow: 'hidden',
        borderRadius: 2,
        background: '#fff',
      }}
    >
      {/* <Box sx={{ p: isLarge ? 3 : 2, borderBottom: '1px solid', borderColor: 'grey.200' }}>
        <Grid container spacing={isLarge ? 3 : 2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{
              p: 2,
              borderRadius: 2,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
              border: '1px solid',
              borderColor: 'grey.200'
            }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                Available Incentives
              </Typography>
              <Typography variant={isLarge ? 'h6' : 'subtitle1'} sx={{
                fontWeight: 'bold',
                color: 'success.dark',
              }}>
                {formatCurrency(projectMetrics.incentives)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{
              p: 2,
              borderRadius: 2,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
              border: '1px solid',
              borderColor: 'grey.200'
            }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                Net Project Cost (Loan)
              </Typography>
              <Typography variant={isLarge ? 'h6' : 'subtitle1'} sx={{
                fontWeight: 'bold',
                color: 'primary.dark',
              }}>
                {formatCurrency(projectMetrics.netCost)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box> */}

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{
          width: { xs: '100%', md: '300px' },
          borderRight: { xs: 'none', md: '1px solid' },
          borderColor: 'grey.100',
          background: 'rgba(248, 250, 252, 0.5)'
        }}>
          <List disablePadding>
            {financeOptions.map((option, index) => (
              <ListItem
                key={option.id}
                disablePadding
                sx={{
                  borderBottom: index < financeOptions.length - 1 ? '1px solid' : 'none',
                  borderColor: 'grey.100'
                }}
              >
                <ListItemButton
                  selected={option.id === selectedLenderId}
                  onClick={() => setSelectedLenderId(option.id)}
                  sx={{
                    py: 2,
                    px: 2.5,
                    borderRadius: 2,
                    mx: 2.5,
                    my: 2.5,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.04)',
                      transform: 'translateX(4px)',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.15)',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      borderLeft: '4px solid',
                      borderLeftColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.12)',
                      }
                    }
                  }}
                >
                  <ListItemText
                    primary={option.lender}
                    primaryTypographyProps={{
                      fontWeight: option.id === selectedLenderId ? 'bold' : 600,
                      fontSize: isLarge ? '1rem' : '0.9rem',
                      color: option.id === selectedLenderId ? 'primary.main' : 'text.primary'
                    }}
                  />
                  {option.isRecommended && (
                    <Chip
                      icon={<WorkspacePremium sx={{ fontSize: '1rem !important' }} />}
                      label="Recommended"
                      color="success"
                      size="small"
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        '& .MuiChip-icon': {
                          color: 'success.main'
                        }
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ p: isLarge ? 3 : 2.5, flex: 1 }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 3,
            p: 2,
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)',
            border: '1px solid',
            borderColor: 'rgba(25, 118, 210, 0.1)'
          }}>
            <TrendingUp sx={{ color: 'primary.main', mr: 1.5, fontSize: '1.5rem' }} />
            <Typography variant={isLarge ? 'h5' : 'h6'} sx={{
              fontWeight: 'bold',
              color: 'primary.main'
            }}>
              {selectedOption.lender} Financing Details
            </Typography>
          </Box>

          <Grid container spacing={isLarge ? 3 : 2} sx={{ mb: 3 }}>
            <Grid item xs={6} md={3}>
              <Box sx={{
                p: 2,
                borderRadius: 2,
                background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.05) 0%, rgba(46, 125, 50, 0.02) 100%)',
                border: '1px solid',
                borderColor: 'rgba(46, 125, 50, 0.1)',
                textAlign: 'center',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(46, 125, 50, 0.15)',
                }
              }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Project IRR
                </Typography>
								<Typography
									variant={isLarge ? 'h5' : 'h6'}
									sx={{
										fontWeight: 'bold',
										color: selectedOption.isRecommended ? 'success.main' : 'text.primary',
										mt: 0.5
									}}
								>
									{selectedOption.irr}%
								</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{
                p: 2,
                borderRadius: 2,
                background: 'rgba(248, 250, 252, 0.8)',
                border: '1px solid',
                borderColor: 'grey.200',
                textAlign: 'center',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }
              }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Interest Rate
                </Typography>
								<Typography
									variant={isLarge ? 'h5' : 'h6'}
									sx={{
									fontWeight: 'bold',
									mt: 0.5,
									color:
										selectedOption.rate === Math.min(...financeOptions.map(opt => opt.rate))
										? 'success.main'
										: 'text.primary'
									}}
								>
                  {selectedOption.rate}%
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{
                p: 2,
                borderRadius: 2,
                background: 'rgba(248, 250, 252, 0.8)',
                border: '1px solid',
                borderColor: 'grey.200',
                textAlign: 'center',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }
              }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Loan Term
                </Typography>
								<Typography
									variant={isLarge ? 'h5' : 'h6'}
									sx={{
									fontWeight: 'bold',
									mt: 0.5,
									color:
										selectedOption.term === Math.max(...financeOptions.map(opt => opt.term))
										? 'success.main'
										: 'text.primary'
									}}
								>
                  {selectedOption.term} yrs
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{
                p: 2,
                borderRadius: 2,
                background: 'rgba(248, 250, 252, 0.8)',
                border: '1px solid',
                borderColor: 'grey.200',
                textAlign: 'center',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }
              }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Payment
                </Typography>
								<Typography
									variant={isLarge ? 'h5' : 'h6'}
									sx={{
									fontWeight: 'bold',
									mt: 0.5,
									color:
										selectedOption.annualPayment === Math.min(...financeOptions.map(opt => opt.annualPayment))
										? 'success.main'
										: 'text.primary'
									}}
								>
                  {formatCurrency(selectedOption.annualPayment)}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{
            mb: 3,
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.12) 50%, transparent 100%)'
          }} />

          <Box sx={{
            p: 2.5,
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.02) 0%, rgba(25, 118, 210, 0.01) 100%)',
            border: '1px solid',
            borderColor: 'rgba(25, 118, 210, 0.08)',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.04) 0%, rgba(25, 118, 210, 0.02) 100%)',
              borderColor: 'rgba(25, 118, 210, 0.15)',
            }
          }}>
            <Typography variant={isLarge ? 'subtitle1' : 'body1'} sx={{
              fontWeight: 'bold',
              mb: 1.5,
              color: 'primary.main'
            }}>
              Recommendation Rationale
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                <CheckCircleOutline color="primary" fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {selectedOption.rationale}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{
        p: 1.5,
        borderTop: '1px solid',
        borderColor: 'grey.100',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: '0 0 12px 12px'
      }}>
        <Typography variant="caption" color="text.secondary" sx={{
          fontStyle: 'italic',
          textAlign: 'center',
          display: 'block',
          fontWeight: 500
        }}>
          <b>*</b>Summaries of indicative offers from 3rd party lenders are shown above. Finance offers are from qualified lenders and not part of 8x Energy.
        </Typography>
      </Box>
    </Paper>
  );
};