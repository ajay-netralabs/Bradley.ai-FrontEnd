import React, { useState } from 'react';
import { Box, Typography, FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface SubStep1Props {
  onOwnershipSelect: (selection: string) => void;
}

const SubStep1: React.FC<SubStep1Props> = ({ onOwnershipSelect }) => {
  const [ownership, setOwnership] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setOwnership(value);
    onOwnershipSelect(value);
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
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Ownership Preference</h2>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', textAlign: 'justify', textAlignLast: 'center', lineHeight: 1.5 }}>
          <b>This prompt determines your preferred approach to owning, financing, or having a third party own/operate the DER system. Your choice will guide you to the most relevant financial questions.</b><br /><br />
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 0 }}>
          <Typography sx={{ mt: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', textAlign: 'center' }}>
            Would You Prefer To <b>Own</b> The DER System Or Have A <b>Third Party</b> Own And Operate It?
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep1;
