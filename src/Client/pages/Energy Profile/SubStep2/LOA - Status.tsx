import React, { useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useLOA } from '../../../../Context/Energy Profile/SubStep2/Letter Of Authorization Context';
import { useLOAStatus } from '../../../../Context/Energy Profile/SubStep2/LOA - Status Context';

const SubStep3: React.FC = () => {
  const { loaState } = useLOA();
  const { utilityCompanyName, agreed, signature } = loaState;
  
  const { loaStatusState, updateLOAStatus } = useLOAStatus();
  const { status } = loaStatusState;

  useEffect(() => {
    if (agreed && signature) {
        if (status !== 'Approved' && status !== 'Declined') {
            updateLOAStatus('Awaiting Approval');
        }
    } else {
        updateLOAStatus('LOA Not Signed');
    }
  }, [agreed, signature, status, updateLOAStatus]);

  const getStatusColor = () => {
    switch (status) {
      case 'Approved': return '#4caf50';
      case 'Awaiting Approval': return '#036CA1';
      case 'Declined': return '#f44336';
      case 'LOA Not Signed': return '#ff9800';
      default: return '#000';
    }
  };

  const getDetailsText = () => {
    const company = utilityCompanyName || 'your regulated Utility Co.';
    switch (status) {
      case 'Approved':
        return `Congratulations! Your Letter of Authorization has been approved by ${company}. ${window.location.pathname.includes('/demo') ? 'EmissionCheckIQ+' : 'Bradley.ai'} now has access to your interval data.`;
      case 'Awaiting Approval':
        return `Your Letter of Authorization has been signed and sent. It is now pending a response from ${company}. You will be notified via email confirmation once the interval data has been received by ${window.location.pathname.includes('/demo') ? 'EmissionCheckIQ+' : 'Bradley.ai'}.`;
      case 'Declined':
        return `Unfortunately, your Letter of Authorization was declined by ${company}. Please review the LOA details and resubmit, or contact support for assistance.`;
      case 'LOA Not Signed':
        return `The Letter of Authorization has not been signed and submitted yet. Please go back to the previous step to complete and sign the form.`;
      default:
        return '';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '0.75rem',
        p: 1,
        pr: 4,
        pl: 1,
        pt: 1,
      }}
    >
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
      </style>
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <h2>LETTER OF AUTHORIZATION - STATUS</h2><br />
        <h2>Letter of Authorization to receive data from {utilityCompanyName || 'your regulated Utility Co.'}</h2>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>

        <Table
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  backgroundColor: '#f9f9f9',
                  textAlign: 'right',
                  width: '25%',
                  borderBottom: '1px solid #ccc',
                }}
              >
                Current Status:
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: getStatusColor(),
                  textAlign: 'justify',
                  width: '75%',
                  borderBottom: '1px solid #ccc',
                }}
              >
                {status}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  backgroundColor: '#f9f9f9',
                  textAlign: 'right',
                  width: '25%',
                }}
              >
                Details:
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.75rem',
                  textAlign: 'justify',
                  width: '75%',
                }}
              >
                {getDetailsText()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

      </Box>
    </Box>
  );
};

export default SubStep3;