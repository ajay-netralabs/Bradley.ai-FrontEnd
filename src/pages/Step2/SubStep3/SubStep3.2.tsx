import React from 'react';
import { Box, TextField, Typography, Select, MenuItem, FormControlLabel, Radio, RadioGroup, Table, TableBody, TableCell, TableRow } from '@mui/material';

const SubStep3: React.FC = () => {

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
				<h2>Letter of Authorization to receive data from regulated Utility Co.</h2>
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
                  width: '50%',
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
                  color: '#036CA1',
                  textAlign: 'left',
                  borderBottom: '1px solid #ccc',
                }}
              >
                Awaiting Approval
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
                  width: '50%',
                }}
              >
                Details:
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.75rem',
                  textAlign: 'justify',
                }}
              >
                Your Letter of Authorization has been signed and sent. It is now pending a response from your regulated Utility Co. You will be notified via email confirmation once the interval data has been received by Bradley.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default SubStep3;
