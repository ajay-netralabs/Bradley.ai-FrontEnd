import React from 'react'; 
import { Box, TextField, Button, Typography, Select, MenuItem, Radio, RadioGroup, FormControlLabel } from '@mui/material'; 

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
  {/* <TextField
    fullWidth
    variant="outlined"
    size="small"
    sx={{
      flex: 0.3,
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '0.7rem', minWidth:'414px', pl: '1px', pr: '1px',
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
    select
    placeholder="Lookup your Organization"
  /> */}
  <Select
            fullWidth
            size="small"
            variant="outlined"
            defaultValue="Option 1"
            sx={{
              flex: 0.3,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem', minWidth:'414px', pl: '1px', pr: '1px',
              height: '24px',
              '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Option 1" disabled sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Look Up your Organization</MenuItem>
            <MenuItem value="Option 2" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Business (For Profit)</MenuItem>
            <MenuItem value="Option 3" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Non Profit</MenuItem>
            <MenuItem value="Option 4" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Government Entity</MenuItem>
						<MenuItem value="Option 5" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Educational Institution</MenuItem>
            <MenuItem value="Option 6" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Healthcare Provider</MenuItem>
            <MenuItem value="Option 7" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Other</MenuItem>
          </Select>
  <Button
    variant="outlined"
    sx={{
      flex: 0.14,
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
              fontSize: '0.7rem', minWidth:'414px', pl: '1px', pr: '1px',
              height: '24px',
              '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Option 1" disabled sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Select your Organization Type</MenuItem>
            <MenuItem value="Option 2" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Business (For Profit)</MenuItem>
            <MenuItem value="Option 3" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Non Profit</MenuItem>
            <MenuItem value="Option 4" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Government Entity</MenuItem>
						<MenuItem value="Option 5" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Educational Institution</MenuItem>
            <MenuItem value="Option 6" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Healthcare Provider</MenuItem>
            <MenuItem value="Option 6" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Residential</MenuItem>
            <MenuItem value="Option 7" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem',}}>Other</MenuItem>
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
              fontSize: '0.7rem', minWidth:'414px', pl: '1px', pr: '1px',
              height: '24px',
              '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Option 1" disabled sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Select your Industry</MenuItem>
            <MenuItem value="Option 2" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Agriculture</MenuItem>
            <MenuItem value="Option 3" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Automotive</MenuItem>
            <MenuItem value="Option 4" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Banking</MenuItem>
            <MenuItem value="Option 5" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Construction</MenuItem>
            <MenuItem value="Option 6" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Consumer Goods</MenuItem>
            <MenuItem value="Option 7" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Education</MenuItem>
            <MenuItem value="Option 8" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Energy</MenuItem>
            <MenuItem value="Option 9" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Entertainment</MenuItem>
            <MenuItem value="Option 10" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Financial Services</MenuItem>
            <MenuItem value="Option 11" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Food & Beverages</MenuItem>
            <MenuItem value="Option 12" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Government</MenuItem>
            <MenuItem value="Option 13" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Healthcare</MenuItem>
            <MenuItem value="Option 14" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Hospitality</MenuItem>
            <MenuItem value="Option 15" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Insurance</MenuItem>
            <MenuItem value="Option 16" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Manufacturing</MenuItem>
            <MenuItem value="Option 17" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Media</MenuItem>
            <MenuItem value="Option 18" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Non-Profit</MenuItem>
            <MenuItem value="Option 19" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Pharmaceuticals</MenuItem>
            <MenuItem value="Option 20" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Real Estate</MenuItem>
            <MenuItem value="Option 21" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Retail</MenuItem>
            <MenuItem value="Option 22" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Technology</MenuItem>
            <MenuItem value="Option 23" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Telecommunications</MenuItem>
            <MenuItem value="Option 24" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Transportation</MenuItem>
            <MenuItem value="Option 25" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Utilities</MenuItem>
            <MenuItem value="Option 26" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Other</MenuItem>
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
              fontSize: '0.7rem', minWidth:'414px', pl: '1px', pr: '1px',
              height: '24px',
              '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
              '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
            }}
          >
            <MenuItem value="Option 1" disabled sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>Select your IRS Category</MenuItem>
            <MenuItem value="Option 2" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(1) – Corporations Organized Under Act of Congress</MenuItem>
            <MenuItem value="Option 3" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(2) – Title Holding Corporations for Exempt Organizations</MenuItem>
            <MenuItem value="Option 4" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(3) – Religious, Educational, Charitable Organizations</MenuItem>
            <MenuItem value="Option 5" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(4) – Civic Leagues, Social Welfare Organizations</MenuItem>
            <MenuItem value="Option 6" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(5) – Labor, Agricultural, Horticultural Organizations</MenuItem>
            <MenuItem value="Option 7" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(6) – Business Leagues, Chambers of Commerce</MenuItem>
            <MenuItem value="Option 8" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(7) – Social and Recreational Clubs</MenuItem>
            <MenuItem value="Option 9" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(8) – Fraternal Beneficiary Societies and Associations</MenuItem>
            <MenuItem value="Option 10" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(9) – Voluntary Employees' Beneficiary Associations</MenuItem>
            <MenuItem value="Option 11" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(10) – Domestic Fraternal Societies and Associations</MenuItem>
            <MenuItem value="Option 12" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(11) – Teachers’ Retirement Fund Associations</MenuItem>
            <MenuItem value="Option 13" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(12) – Benevolent Life Insurance Associations, Mutual Ditch or Irrigation Companies, Mutual or Cooperative Telephone Companies</MenuItem>
            <MenuItem value="Option 14" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(13) – Cemetery Companies</MenuItem>
            <MenuItem value="Option 15" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(14) – State-Chartered Credit Unions, Mutual Reserve Funds</MenuItem>
            <MenuItem value="Option 16" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(15) – Mutual Insurance Companies or Associations</MenuItem>
            <MenuItem value="Option 17" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(16) – Cooperative Organizations to Finance Crop Operations</MenuItem>
            <MenuItem value="Option 18" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(17) – Supplemental Unemployment Benefit Trusts</MenuItem>
            <MenuItem value="Option 19" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(18) – Employee Funded Pension Trusts</MenuItem>
            <MenuItem value="Option 20" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(19) – Post or Organization of Past or Present Members of the Armed Forces</MenuItem>
            <MenuItem value="Option 21" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(20) – Group Legal Services Plan Organizations</MenuItem>
            <MenuItem value="Option 22" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(21) – Black Lung Benefit Trusts</MenuItem>
            <MenuItem value="Option 23" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(22) – Withdrawal Liability Payment Funds</MenuItem>
            <MenuItem value="Option 24" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(23) – Veterans Organization (created before 1880)</MenuItem>
            <MenuItem value="Option 25" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(24) – Trusts described in section 4049 of ERISA</MenuItem>
            <MenuItem value="Option 26" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(25) – Title Holding Corporations or Trusts with Multiple Parents</MenuItem>
            <MenuItem value="Option 27" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(26) – State-Sponsored Organization Providing Health Coverage for High-Risk Individuals</MenuItem>
            <MenuItem value="Option 28" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(27) – State-Sponsored Workers' Compensation Reinsurance Organization</MenuItem>
            <MenuItem value="Option 29" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(c)(28) – National Railroad Retirement Investment Trust</MenuItem>
            <MenuItem value="Option 30" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(d) – Religious and Apostolic Associations</MenuItem>
            <MenuItem value="Option 31" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(e) – Cooperative Hospital Service Organizations</MenuItem>
            <MenuItem value="Option 32" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(f) – Cooperative Service Organizations of Operating Educational Organizations</MenuItem>
            <MenuItem value="Option 33" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(k) – Child Care Organizations</MenuItem>
            <MenuItem value="Option 34" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(n) – Charitable Risk Pools</MenuItem>
            <MenuItem value="Option 35" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem'}}>501(q) – Credit Counseling Organizations</MenuItem>
          </Select>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Number of Employees at Facility:</b></Typography>
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  />
</Box>


          {/* <Box sx={{ border: '1px solid lightgrey', p: 0.5, borderRadius: 1, mt: 1 }}>
            <Typography variant="subtitle2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', fontWeight: 'bold', mb: 0.5 }}>
              Annual Energy Spend
            </Typography>
<br/>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', width: '150px', flex: 0.5 }}>Electricity:</Typography>
                <TextField 
                  variant="outlined" 
                  size="small" 
                  type="number" 
                  sx={{ 
                    flex: 0.75,
                    fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif', 
                    '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
                    '& input': { padding: 0 }
                  }} 
                />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', width: '150px', flex: 0.5 }}>Natural Gas:</Typography>
                <TextField 
                  variant="outlined" 
                  size="small" 
                  type="number" 
                  sx={{ 
                    flex: 0.75,
                    fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif', 
                    '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
                    '& input': { padding: 0 }
                  }} 
                />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', width: '150px', flex: 0.5 }}>Water:</Typography>
                <TextField 
                  variant="outlined" 
                  size="small" 
                  type="number" 
                  sx={{ 
                    flex: 0.75,
                    fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif', 
                    '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
                    '& input': { padding: 0 }
                  }} 
                />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', width: '150px', flex: 0.5 }}>Other: (Oil, Propane, PPAs, Steam, etc...)</Typography>
                <TextField 
                  variant="outlined" 
                  size="small" 
                  type="number" 
                  sx={{ 
                    flex: 0.75,
                    fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif', 
                    '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
                    '& input': { padding: 0 }
                  }} 
                />
              </Box>
            </Box>
          </Box> */}

          {/* <Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }}><b>Facility Operation Description:</b></Typography>
          <TextField
            fullWidth
            multiline
            rows={14.8}
            variant="outlined"
            placeholder="Describe your facility operations"
            sx={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              },
            }}
          /> */}
        {/* </Box> */}

        {/* Column 2 */}
        {/* <Box sx={{ flex: 0.48, display: 'flex', flexDirection: 'column', gap: 2}}> */}
          {/* <Box sx={{ height: '280px', border: '1px solid lightgrey', mb: 0.5 }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086238560343!2d-122.41941548468154!3d37.77492977975966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c2e5b1bff%3A0xdbf30509b4e22a90!2sGoogle!5e0!3m2!1sen!2sus!4v1666474302084!5m2!1sen!2sus" 
              width="100%" height="100%" style={{ border: 0 }} 
              allowFullScreen={false} loading="lazy"
            ></iframe>
          </Box> */}

          {/* <Box sx={{ border: '1px solid lightgrey', p: 1, borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
              <b>Facility Address</b>
              <Button variant='outlined' size="small" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', minWidth: '60px', padding: '2px 4px', textTransform: 'none' }}>
                Confirm Location
              </Button>
            </Typography>
            <br/>
            <Box sx={{ fontFamily: 'Nunito Sans, sans-serif', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {["Street Address:", "City:", "State:", "Zip Code:"].map((label, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', width: '150px', flex: 0.5 }}>{label}</Typography>
                  <TextField 
                    variant="outlined" 
                    size="small" 
                    type="text" 
                    sx={{ 
                      flex: 0.75,
                      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif', 
                      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
                      '& input': { padding: 0 }
                    }} 
                  />
                </Box>
              ))}
            </Box>
          
          <br/>

          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
          <Typography variant="subtitle2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
          <b>Property Ownership</b> </Typography>
          <Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  Do you own the property?
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0 }}>
    <FormControlLabel value="yes" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</Typography>} />
    <FormControlLabel value="no" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{  fontFamily: 'Nunito Sans, sans-serif',fontSize: '0.7rem' }}>No</Typography>} />
  </RadioGroup>
</Typography>

<Typography sx={{ mt: 1,mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  Do you lease space?
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0 }}>
    <FormControlLabel value="yes" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</Typography>} />
    <FormControlLabel value="no" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{  fontFamily: 'Nunito Sans, sans-serif',fontSize: '0.7rem' }}>No</Typography>} />
  </RadioGroup>
</Typography>

<Typography variant="subtitle2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
<b>Long - Term Site Occupancy</b> </Typography>
<Typography sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
Do you plan to occupy this site for the next 15-20 years?
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0 }}>
    <FormControlLabel value="yes" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Yes</Typography>} />
    <FormControlLabel value="no" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{  fontFamily: 'Nunito Sans, sans-serif',fontSize: '0.7rem' }}>No</Typography>} />
  </RadioGroup>
</Typography>
          </Box></Box> */}
        </Box>
      </Box>
    </Box> 
  ); 
}; 

export default SubStep2;
