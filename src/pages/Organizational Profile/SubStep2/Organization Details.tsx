import React from 'react'; 
import { Box, TextField, Button, Typography, Select, MenuItem } from '@mui/material'; 

const SubStep2: React.FC = () => { 
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Organization Details</h2>
      </Typography> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
    <b>Organization Name:</b>
  </Typography>
  <Select
      fullWidth
      size="small"
      variant="outlined"
      defaultValue="Option 1"
      sx={{
        flex: 0.3,
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '0.7rem',
        minWidth: '414px',
        pl: '1px',
        pr: '1px',
        height: '40px',
        '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
        '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
        '& .MuiPaper-root': {
          maxHeight: '200px',
          overflowY: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: '200px',
            '& .MuiMenuItem-root': {
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
            },
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          },
        },
      }}
    >
            <MenuItem value="Option 1" disabled>
              Look Up your Organization
            </MenuItem>
            <MenuItem value="Option 2">Business (For Profit)</MenuItem>
            <MenuItem value="Option 3">Non Profit</MenuItem>
            <MenuItem value="Option 4">Government Entity</MenuItem>
						<MenuItem value="Option 5">Educational Institution</MenuItem>
            <MenuItem value="Option 6">Healthcare Provider</MenuItem>
            <MenuItem value="Option 7">Other</MenuItem>
          </Select>
  <Button
    variant="outlined"
    sx={{
      flex: 0.14,
      height: '40px',
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '0.65rem',
      padding: '2px 1px',
      pr: '15px',
      pl: '15px',
      alignSelf: 'flex-end',
      textTransform: 'none'
    }}
  >
    Look Up
  </Button>
</Box>


<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Organization Type:</b></Typography>
  <Select
  fullWidth
  size="small"
  variant="outlined"
  defaultValue="Option 1"
  sx={{
    flex: 0.498,
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '0.7rem',
    minWidth: '414px',
    pl: '1px',
    pr: '1px',
    height: '40px',
    '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
    '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
  }}
  MenuProps={{
    PaperProps: {
      sx: {
        maxHeight: '200px',
        '& .MuiMenuItem-root': {
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.7rem',
        },
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      },
    },
  }}
>
  <MenuItem value="Option 1" disabled>
    Select your Organization Type
  </MenuItem>
  <MenuItem value="Option 2">Business (For Profit)</MenuItem>
  <MenuItem value="Option 3">Non Profit</MenuItem>
  <MenuItem value="Option 4">Government Entity</MenuItem>
  <MenuItem value="Option 5">Educational Institution</MenuItem>
  <MenuItem value="Option 6">Healthcare Provider</MenuItem>
  <MenuItem value="Option 7">Residential</MenuItem>
  <MenuItem value="Option 8">Other</MenuItem>
</Select>

</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Industry Selection:</b></Typography>
  <Select
  fullWidth
  size="small"
  variant="outlined"
  defaultValue="Option 1"
  sx={{
    flex: 0.498,
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '0.7rem',
    minWidth: '414px',
    pl: '1px',
    pr: '1px',
    height: '40px',
    '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
    '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
  }}
  MenuProps={{
    PaperProps: {
      sx: {
        maxHeight: '200px',
        '& .MuiMenuItem-root': {
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.7rem',
        },
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      },
    },
  }}
>
  <MenuItem value="Option 1" disabled>
    Select your Industry
  </MenuItem>
  <MenuItem value="Option 2">Agriculture</MenuItem>
  <MenuItem value="Option 3">Automotive</MenuItem>
  <MenuItem value="Option 4">Banking</MenuItem>
  <MenuItem value="Option 5">Construction</MenuItem>
  <MenuItem value="Option 6">Consumer Goods</MenuItem>
  <MenuItem value="Option 7">Education</MenuItem>
  <MenuItem value="Option 8">Energy</MenuItem>
  <MenuItem value="Option 9">Entertainment</MenuItem>
  <MenuItem value="Option 10">Financial Services</MenuItem>
  <MenuItem value="Option 11">Food & Beverages</MenuItem>
  <MenuItem value="Option 12">Government</MenuItem>
  <MenuItem value="Option 13">Healthcare</MenuItem>
  <MenuItem value="Option 14">Hospitality</MenuItem>
  <MenuItem value="Option 15">Insurance</MenuItem>
  <MenuItem value="Option 16">Manufacturing</MenuItem>
  <MenuItem value="Option 17">Media</MenuItem>
  <MenuItem value="Option 18">Non-Profit</MenuItem>
  <MenuItem value="Option 19">Pharmaceuticals</MenuItem>
  <MenuItem value="Option 20">Real Estate</MenuItem>
  <MenuItem value="Option 21">Retail</MenuItem>
  <MenuItem value="Option 22">Technology</MenuItem>
  <MenuItem value="Option 23">Telecommunications</MenuItem>
  <MenuItem value="Option 24">Transportation</MenuItem>
  <MenuItem value="Option 25">Utilities</MenuItem>
  <MenuItem value="Option 26">Other</MenuItem>
</Select>

</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>IRS Category:</b></Typography>
  <Select
  fullWidth
  size="small"
  variant="outlined"
  defaultValue="Option 1"
  sx={{
    flex: 0.498,
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '0.7rem',
    minWidth: '414px',
    pl: '1px',
    pr: '1px',
    height: '40px',
    '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
    '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
  }}
  MenuProps={{
    PaperProps: {
      sx: {
        maxHeight: '200px',
        '& .MuiMenuItem-root': {
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.7rem',
        },
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      },
    },
  }}
>
          <MenuItem value="Option 1" disabled>
            Select your IRS Category
          </MenuItem>
          <MenuItem value="Option 2">501(c)(1) – Corporations Organized Under Act of Congress</MenuItem>
          <MenuItem value="Option 3">501(c)(2) – Title Holding Corporations for Exempt Organizations</MenuItem>
          <MenuItem value="Option 4">501(c)(3) – Religious, Educational, Charitable Organizations</MenuItem>
          <MenuItem value="Option 5">501(c)(4) – Civic Leagues, Social Welfare Organizations</MenuItem>
          <MenuItem value="Option 6">501(c)(5) – Labor, Agricultural, Horticultural Organizations</MenuItem>
          <MenuItem value="Option 7">501(c)(6) – Business Leagues, Chambers of Commerce</MenuItem>
          <MenuItem value="Option 8">501(c)(7) – Social and Recreational Clubs</MenuItem>
          <MenuItem value="Option 9">501(c)(8) – Fraternal Beneficiary Societies and Associations</MenuItem>
          <MenuItem value="Option 10">501(c)(9) – Voluntary Employees' Beneficiary Associations</MenuItem>
          <MenuItem value="Option 11">501(c)(10) – Domestic Fraternal Societies and Associations</MenuItem>
          <MenuItem value="Option 12">501(c)(11) – Teachers’ Retirement Fund Associations</MenuItem>
          <MenuItem value="Option 13">501(c)(12) – Benevolent Life Insurance Associations, Mutual Ditch or Irrigation Companies, <br />Mutual or Cooperative Telephone Companies</MenuItem>
          <MenuItem value="Option 14">501(c)(13) – Cemetery Companies</MenuItem>
          <MenuItem value="Option 15">501(c)(14) – State-Chartered Credit Unions, Mutual Reserve Funds</MenuItem>
          <MenuItem value="Option 16">501(c)(15) – Mutual Insurance Companies or Associations</MenuItem>
          <MenuItem value="Option 17">501(c)(16) – Cooperative Organizations to Finance Crop Operations</MenuItem>
          <MenuItem value="Option 18">501(c)(17) – Supplemental Unemployment Benefit Trusts</MenuItem>
          <MenuItem value="Option 19">501(c)(18) – Employee Funded Pension Trusts</MenuItem>
          <MenuItem value="Option 20">501(c)(19) – Post or Organization of Past or Present Members of the Armed Forces</MenuItem>
          <MenuItem value="Option 21">501(c)(20) – Group Legal Services Plan Organizations</MenuItem>
          <MenuItem value="Option 22">501(c)(21) – Black Lung Benefit Trusts</MenuItem>
          <MenuItem value="Option 23">501(c)(22) – Withdrawal Liability Payment Funds</MenuItem>
          <MenuItem value="Option 24">501(c)(23) – Veterans Organization (created before 1880)</MenuItem>
          <MenuItem value="Option 25">501(c)(24) – Trusts described in section 4049 of ERISA</MenuItem>
          <MenuItem value="Option 26">501(c)(25) – Title Holding Corporations or Trusts with Multiple Parents</MenuItem>
          <MenuItem value="Option 27">501(c)(26) – State-Sponsored Organization Providing Health Coverage for High-Risk Individuals</MenuItem>
          <MenuItem value="Option 28">501(c)(27) – State-Sponsored Workers' Compensation Reinsurance Organization</MenuItem>
          <MenuItem value="Option 29">501(c)(28) – National Railroad Retirement Investment Trust</MenuItem>
          <MenuItem value="Option 30">501(d) – Religious and Apostolic Associations</MenuItem>
          <MenuItem value="Option 31">501(e) – Cooperative Hospital Service Organizations</MenuItem>
          <MenuItem value="Option 32">501(f) – Cooperative Service Organizations of Operating Educational Organizations</MenuItem>
          <MenuItem value="Option 33">501(k) – Child Care Organizations</MenuItem>
          <MenuItem value="Option 34">501(n) – Charitable Risk Pools</MenuItem>
          <MenuItem value="Option 35">501(q) – Credit Counseling Organizations</MenuItem>
        </Select>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Number of Employees at Facility:</b></Typography>
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    type="number"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  />
</Box>
        </Box>
      </Box>
    </Box> 
  ); 
}; 

export default SubStep2;
