import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface StyledTableCellProps {
  isLarge: boolean;
}

const StyledTableCell = styled(TableCell)<StyledTableCellProps>(({ theme, isLarge }) => ({
  border: '1px solid #ddd',
  padding: isLarge ? theme.spacing(1.5, 2) : theme.spacing(2, 1.5),
}));

const LabelTypography = styled(Typography)<StyledTableCellProps>(({ /* theme, */ isLarge }) => ({
  fontWeight: 'medium',
  fontSize: isLarge ? '1rem' : '0.8rem',
	width: !isLarge ? '135px' : 'auto',
}));

const ValueTypography = styled(Typography)<StyledTableCellProps>(({ /* theme, */ isLarge }) => ({
  fontWeight: 'bold',
  fontSize: isLarge ? '1.2rem' : '1rem',
}));

export const IndicativeFinanceDetails: React.FC<{ size: 'small' | 'large' }> = ({
  size,
}) => {
  const isLarge = size === 'large';

  return (
    <TableContainer component={Paper} sx={{ border: '1px solid #ddd' }}>
      <Table aria-label="indicative finance details">
        <TableBody>
          <TableRow>
            <StyledTableCell isLarge={isLarge} align="left">
              <LabelTypography isLarge={isLarge}>INTEREST</LabelTypography>
            </StyledTableCell>
            <StyledTableCell isLarge={isLarge} align="left">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ValueTypography isLarge={isLarge}>6.25%</ValueTypography>
              </Box>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell isLarge={isLarge} align="left">
              <LabelTypography isLarge={isLarge}>TERM OF LOAN</LabelTypography>
            </StyledTableCell>
            <StyledTableCell isLarge={isLarge} align="left">
              <ValueTypography isLarge={isLarge}>20-yrs</ValueTypography>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell isLarge={isLarge} align="left" sx={{ verticalAlign: 'top' }}>
              <LabelTypography isLarge={isLarge}>INTERNAL RATE OF RETURN</LabelTypography>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontStyle: 'italic' }}
              >
                (EST. for financier)
              </Typography>
            </StyledTableCell>
            <StyledTableCell isLarge={isLarge} align="left">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ValueTypography isLarge={isLarge}>13.7%</ValueTypography>
              </Box>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};