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
  padding: isLarge ? theme.spacing(1.5, 2) : theme.spacing(1.5, 1),
}));

const LabelTypography = styled(Typography)<StyledTableCellProps>(({ /* theme, */ isLarge }) => ({
  fontWeight: 'medium',
  fontSize: isLarge ? '1rem' : '0.8rem',
	width: !isLarge ? '269.7px' : 'auto',
}));

const ValueTypography = styled(Typography)<StyledTableCellProps>(({ /* theme, */ isLarge }) => ({
  fontWeight: 'bold',
  fontSize: isLarge ? '1.2rem' : '1rem',
}));

const SubLabelTypography = styled(Typography)<{ isLarge: boolean }>(({ theme, isLarge }) => ({
  fontSize: isLarge ? '0.8rem' : '0.6rem',
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
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
              <LabelTypography isLarge={isLarge}>INDICATIVE INTEREST RATE</LabelTypography>
            </StyledTableCell>
            <StyledTableCell isLarge={isLarge} align="left">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ValueTypography isLarge={isLarge}>6.25%</ValueTypography>
              </Box>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell isLarge={isLarge} align="left">
              <LabelTypography isLarge={isLarge}>TERM OF FINANCING (LOAN)</LabelTypography>
            </StyledTableCell>
            <StyledTableCell isLarge={isLarge} align="left">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ValueTypography isLarge={isLarge}>20-yrs</ValueTypography>
              </Box>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell isLarge={isLarge} align="left">
              <LabelTypography isLarge={isLarge}>INTERNAL RATE OF RETURN</LabelTypography>
              <SubLabelTypography isLarge={isLarge}>(EST. for financier)</SubLabelTypography>
            </StyledTableCell>
            <StyledTableCell isLarge={isLarge} align="left">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ValueTypography isLarge={isLarge}>13.7%</ValueTypography>
              </Box>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell isLarge={isLarge} align="left">
              <LabelTypography isLarge={isLarge}>RECOMMENDED INDICATIVE OFFER FROM</LabelTypography>
            </StyledTableCell>
            <StyledTableCell isLarge={isLarge} align="left">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ValueTypography isLarge={isLarge}></ValueTypography>
              </Box>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};