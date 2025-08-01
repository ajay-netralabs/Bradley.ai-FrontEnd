import React, {useState} from 'react'; 
import { Box, TextField, Typography, Select, MenuItem, Tooltip, Autocomplete, Paper } from '@mui/material';
import { useOrganizationDetails } from '../../../../Context/Organizational Profile/SubStep2/Organization Details Context';

const companyOptions = [
  "Adobe", "Airbnb", "Alibaba", "Alphabet", "Amazon", "AMD", "Apple", "ASUS", "Atlassian", "Autodesk",
  "Baidu", "Bitdefender", "Block", "Bloomberg", "Broadcom", "Bytedance",
  "Canonical", "Cisco", "Cloudflare", "Coinbase", "Coursera", "Cruise", "CyberArk",
  "Databricks", "Datadog", "Dell", "DigitalOcean", "Discord", "DoorDash", "Dropbox",
  "eBay", "Epic Games", "Ericsson", "Etsy", "Evernote", "Expedia",
  "Figma", "FireEye", "Fortinet", "Foxconn",
  "GitHub", "GitLab", "GoDaddy", "Google", "GoPro", "Grab",
  "Hewlett Packard Enterprise", "Hitachi", "Honeywell", "Huawei", "Hulu",
  "IBM", "Infosys", "Intel", "Intuit", "iRobot",
  "JD.com", "JetBrains",
  "Kaspersky", "Keyence", "Kickstarter",
  "Lenovo", "LG", "Lyft",
  "Magic Leap", "Mastercard", "Match Group", "McAfee", "Meta", "Microsoft", "MicroStrategy", "MongoDB",
  "NCR", "NEC", "Netflix", "Nokia", "Nutanix", "Nvidia",
  "Okta", "Olympus", "Onfido", "OpenAI", "Oracle",
  "Palantir", "Panasonic", "PayPal", "Philips", "Pinterest", "Pivotal", "PlayStation", "Pure Storage",
  "Qualcomm", "Quora",
  "Rakuten", "Rapid7", "Red Hat", "Reddit", "Ripple", "Roblox", "Roku",
  "Salesforce", "Samsung", "SAP", "Seagate", "ServiceNow", "Shopify", "Siemens", "Slack", "Snapchat", "Snowflake", "SoftBank", "Sony", "SpaceX", "Spotify", "Square", "Stripe", "SUSE", "Synopsys",
  "T-Mobile", "Tableau", "Tencent", "Tesla", "TikTok", "Toshiba", "Toyota", "Trello", "TripAdvisor", "Twitch", "Twitter",
  "Uber", "Unity", "Upwork",
  "Verizon", "VMware", "Vimeo",
  "WeChat", "Western Digital", "WhatsApp", "Wix",
  "Xiaomi", "Xilinx",
  "Yahoo", "Yandex", "YouTube",
  "Zebra Technologies", "Zillow", "Zoom", "Zscaler"
];

const SubStep2: React.FC = () => { 

  const { organizationDetailsState, updateOrganizationDetails } = useOrganizationDetails();

  const handleEmployeeCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (!/^\d*$/.test(rawValue)) return; // Allow only numbers
    const formatted = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    updateOrganizationDetails({ employeeCount: formatted });
  };

  const [company, _setCompany] = useState<string | null>(null);
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
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}>
    <b>Organization Name:</b> 
  </Typography>
  <Tooltip title="Enter the name of your organization" placement='top-end' arrow>
    <Autocomplete
      options={['Select your Organization Name', ...companyOptions]}
      getOptionDisabled={(option) => option === 'Select your Organization Name'}
      value={organizationDetailsState.organizationName || null} // Read value from context
      onChange={(_event: any, newValue: string | null) => {
        updateOrganizationDetails({ organizationName: newValue || '' }); // Update context
      }}
      disableClearable={company === 'Select your Organization Name'}
      noOptionsText="No options available"
      renderInput={(params) => (
        <TextField 
          {...params} 
          sx={{
            '& .MuiInputBase-input': { 
              fontFamily: 'Nunito Sans, sans-serif',
              paddingLeft: 2,
              fontSize: '0.7rem',
            },
            '& .MuiInputBase-root': { 
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              height: '40px', 
              padding: '0 2px', 
            }
          }}
        />
      )}
      ListboxProps={{ 
        sx: { 
          maxHeight: '200px',
          fontFamily: 'Nunito Sans, sans-serif', 
          fontSize: '0.7rem', 
          scrollbarWidth: 'none', 
          '&::-webkit-scrollbar': { display: 'none' },
          borderRadius: '4px',
          padding: '4px 0',
        } 
      }}
      PaperComponent={({ children }) => (
        <Paper sx={{ 
          fontFamily: 'Nunito Sans, sans-serif', 
          fontSize: '0.7rem',
          padding: '4px 0',
          textAlign: 'center'
        }}>
          {children}
        </Paper>
      )}
      sx={{
        flex: 0.498,
        minWidth: '414px',
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '0.7rem',
        '& .MuiAutocomplete-input': { padding: '4px 6px', fontSize: '0.7rem' }
      }}
    />
  </Tooltip>
</Box>




<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Name of the User:</b> 
  </Typography>
  <Tooltip title="Enter your name" placement='top-end' arrow>
  <TextField
    fullWidth
    placeholder='Enter your name'
    variant="outlined"
    size="small"
    type="text"
                value={organizationDetailsState.userName} // Read value from context
                onChange={(e) => updateOrganizationDetails({ userName: e.target.value })}
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  /></Tooltip>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Email Address of the User:</b> 
  </Typography>
  <Tooltip title="Enter your email address" placement='top-end' arrow>
  <TextField
    fullWidth
    placeholder='Enter your email address'
    variant="outlined"
    size="small"
    type="email"
                value={organizationDetailsState.userEmail} // Read value from context
                onChange={(e) => updateOrganizationDetails({ userEmail: e.target.value })}
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  /></Tooltip>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Title of the User:</b> 
  </Typography>
  <Tooltip title="Enter your title" placement='top-end' arrow>
  <TextField
    fullWidth
    placeholder='Enter your title'
    variant="outlined"
    size="small"
    type="text"
                value={organizationDetailsState.userTitle} // Read value from context
                onChange={(e) => updateOrganizationDetails({ userTitle: e.target.value })}
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  /></Tooltip>
</Box>


<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Organization Type:</b> 
  </Typography>
  <Tooltip title="Select the type of your organization" placement='top-end' arrow>
  <Select
  fullWidth
  size="small"
  variant="outlined"
                value={organizationDetailsState.organizationType || "default"} // Read from context, provide default for placeholder
                onChange={(e) => updateOrganizationDetails({ organizationType: e.target.value })}
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
  <MenuItem value="Select" disabled>
    Select your Organization Type
  </MenuItem>
  <MenuItem value="Business (For Profit)">Business (For Profit)</MenuItem>
  <MenuItem value="Non Profit">Non Profit</MenuItem>
  <MenuItem value="Government Entity">Government Entity</MenuItem>
  <MenuItem value="Educational Institution">Educational Institution</MenuItem>
  <MenuItem value="Healthcare Provider">Healthcare Provider</MenuItem>
  <MenuItem value="Residential">Residential</MenuItem>
  <MenuItem value="Other">Other</MenuItem>
</Select></Tooltip>

</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Industry Selection:</b>
  </Typography>
  <Tooltip title="Select the industry your organization belongs to" placement='top-end' arrow>
  <Select
  fullWidth
  size="small"
  variant="outlined"
                value={organizationDetailsState.industry || "default"} // Read from context
                onChange={(e) => updateOrganizationDetails({ industry: e.target.value })}
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
  <MenuItem value="Select" disabled>
  Select your Industry
</MenuItem>
<MenuItem value="Agriculture">Agriculture</MenuItem>
<MenuItem value="Automotive">Automotive</MenuItem>
<MenuItem value="Banking">Banking</MenuItem>
<MenuItem value="Construction">Construction</MenuItem>
<MenuItem value="Consumer Goods">Consumer Goods</MenuItem>
<MenuItem value="Education">Education</MenuItem>
<MenuItem value="Energy">Energy</MenuItem>
<MenuItem value="Entertainment">Entertainment</MenuItem>
<MenuItem value="Financial Services">Financial Services</MenuItem>
<MenuItem value="Food & Beverages">Food & Beverages</MenuItem>
<MenuItem value="Government">Government</MenuItem>
<MenuItem value="Healthcare">Healthcare</MenuItem>
<MenuItem value="Hospitality">Hospitality</MenuItem>
<MenuItem value="Insurance">Insurance</MenuItem>
<MenuItem value="Manufacturing">Manufacturing</MenuItem>
<MenuItem value="Media">Media</MenuItem>
<MenuItem value="Non-Profit">Non-Profit</MenuItem>
<MenuItem value="Pharmaceuticals">Pharmaceuticals</MenuItem>
<MenuItem value="Real Estate">Real Estate</MenuItem>
<MenuItem value="Retail">Retail</MenuItem>
<MenuItem value="Technology">Technology</MenuItem>
<MenuItem value="Telecommunications">Telecommunications</MenuItem>
<MenuItem value="Transportation">Transportation</MenuItem>
<MenuItem value="Utilities">Utilities</MenuItem>
<MenuItem value="Other">Other</MenuItem>
</Select></Tooltip>

</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
<Tooltip title="Bradley collects this information to properly apply any tax or incentives that might be available to your organization" placement='left' arrow>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>IRS Category:</b>
  </Typography></Tooltip>
   <Tooltip title="IRS (Internal Revenue Service) Category of your organization" placement='top-end' arrow>
  <Select
  fullWidth
  size="small"
  variant="outlined"
                value={organizationDetailsState.irsCategory || "default"} // Read from context
                onChange={(e) => updateOrganizationDetails({ irsCategory: e.target.value })}
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
          <MenuItem value="Select" disabled>
  Select your IRS Category
</MenuItem>
<MenuItem value="Unknown">Unknown</MenuItem>
<MenuItem value="501(c)(1) – Corporations Organized Under Act of Congress">
  501(c)(1) – Corporations Organized Under Act of Congress
</MenuItem>
<MenuItem value="501(c)(2) – Title Holding Corporations for Exempt Organizations">
  501(c)(2) – Title Holding Corporations for Exempt Organizations
</MenuItem>
<MenuItem value="501(c)(3) – Religious, Educational, Charitable Organizations">
  501(c)(3) – Religious, Educational, Charitable Organizations
</MenuItem>
<MenuItem value="501(c)(4) – Civic Leagues, Social Welfare Organizations">
  501(c)(4) – Civic Leagues, Social Welfare Organizations
</MenuItem>
<MenuItem value="501(c)(5) – Labor, Agricultural, Horticultural Organizations">
  501(c)(5) – Labor, Agricultural, Horticultural Organizations
</MenuItem>
<MenuItem value="501(c)(6) – Business Leagues, Chambers of Commerce">
  501(c)(6) – Business Leagues, Chambers of Commerce
</MenuItem>
<MenuItem value="501(c)(7) – Social and Recreational Clubs">
  501(c)(7) – Social and Recreational Clubs
</MenuItem>
<MenuItem value="501(c)(8) – Fraternal Beneficiary Societies and Associations">
  501(c)(8) – Fraternal Beneficiary Societies and Associations
</MenuItem>
<MenuItem value="501(c)(9) – Voluntary Employees' Beneficiary Associations">
  501(c)(9) – Voluntary Employees' Beneficiary Associations
</MenuItem>
<MenuItem value="501(c)(10) – Domestic Fraternal Societies and Associations">
  501(c)(10) – Domestic Fraternal Societies and Associations
</MenuItem>
<MenuItem value="501(c)(11) – Teachers’ Retirement Fund Associations">
  501(c)(11) – Teachers’ Retirement Fund Associations
</MenuItem>
<MenuItem value="501(c)(12) – Benevolent Life Insurance Associations, Mutual Ditch or Irrigation Companies, Mutual or Cooperative Telephone Companies">
  501(c)(12) – Benevolent Life Insurance Associations, Mutual Ditch or Irrigation Companies, Mutual or Cooperative Telephone Companies
</MenuItem>
<MenuItem value="501(c)(13) – Cemetery Companies">
  501(c)(13) – Cemetery Companies
</MenuItem>
<MenuItem value="501(c)(14) – State-Chartered Credit Unions, Mutual Reserve Funds">
  501(c)(14) – State-Chartered Credit Unions, Mutual Reserve Funds
</MenuItem>
<MenuItem value="501(c)(15) – Mutual Insurance Companies or Associations">
  501(c)(15) – Mutual Insurance Companies or Associations
</MenuItem>
<MenuItem value="501(c)(16) – Cooperative Organizations to Finance Crop Operations">
  501(c)(16) – Cooperative Organizations to Finance Crop Operations
</MenuItem>
<MenuItem value="501(c)(17) – Supplemental Unemployment Benefit Trusts">
  501(c)(17) – Supplemental Unemployment Benefit Trusts
</MenuItem>
<MenuItem value="501(c)(18) – Employee Funded Pension Trusts">
  501(c)(18) – Employee Funded Pension Trusts
</MenuItem>
<MenuItem value="501(c)(19) – Post or Organization of Past or Present Members of the Armed Forces">
  501(c)(19) – Post or Organization of Past or Present Members of the Armed Forces
</MenuItem>
<MenuItem value="501(c)(20) – Group Legal Services Plan Organizations">
  501(c)(20) – Group Legal Services Plan Organizations
</MenuItem>
<MenuItem value="501(c)(21) – Black Lung Benefit Trusts">
  501(c)(21) – Black Lung Benefit Trusts
</MenuItem>
<MenuItem value="501(c)(22) – Withdrawal Liability Payment Funds">
  501(c)(22) – Withdrawal Liability Payment Funds
</MenuItem>
<MenuItem value="501(c)(23) – Veterans Organization (created before 1880)">
  501(c)(23) – Veterans Organization (created before 1880)
</MenuItem>
<MenuItem value="501(c)(24) – Trusts described in section 4049 of ERISA">
  501(c)(24) – Trusts described in section 4049 of ERISA
</MenuItem>
<MenuItem value="501(c)(25) – Title Holding Corporations or Trusts with Multiple Parents">
  501(c)(25) – Title Holding Corporations or Trusts with Multiple Parents
</MenuItem>
<MenuItem value="501(c)(26) – State-Sponsored Organization Providing Health Coverage for High-Risk Individuals">
  501(c)(26) – State-Sponsored Organization Providing Health Coverage for High-Risk Individuals
</MenuItem>
<MenuItem value="501(c)(27) – State-Sponsored Workers' Compensation Reinsurance Organization">
  501(c)(27) – State-Sponsored Workers' Compensation Reinsurance Organization
</MenuItem>
<MenuItem value="501(c)(28) – National Railroad Retirement Investment Trust">
  501(c)(28) – National Railroad Retirement Investment Trust
</MenuItem>
<MenuItem value="501(d) – Religious and Apostolic Associations">
  501(d) – Religious and Apostolic Associations
</MenuItem>
<MenuItem value="501(e) – Cooperative Hospital Service Organizations">
  501(e) – Cooperative Hospital Service Organizations
</MenuItem>
<MenuItem value="501(f) – Cooperative Service Organizations of Operating Educational Organizations">
  501(f) – Cooperative Service Organizations of Operating Educational Organizations
</MenuItem>
<MenuItem value="501(k) – Child Care Organizations">
  501(k) – Child Care Organizations
</MenuItem>
<MenuItem value="501(n) – Charitable Risk Pools">
  501(n) – Charitable Risk Pools
</MenuItem>
<MenuItem value="501(q) – Credit Counseling Organizations">
  501(q) – Credit Counseling Organizations
</MenuItem>
        </Select></Tooltip>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
<Tooltip title="It is important to configure the DER solution with the number of employees in mind. Employees and the hours they work impact how much energy is used and when." placement='bottom' arrow>
  <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Number of Employees at Facility:</b> 
  </Typography></Tooltip>
  <Tooltip title="Enter the number of employees at your facility" placement='top-end' arrow>
    <TextField
      fullWidth
      placeholder='Enter the number of employees at your facility'
      variant="outlined"
      size="small"
                value={organizationDetailsState.employeeCount} // Read from context
                onChange={handleEmployeeCountChange}
      type="text"
      inputProps={{
        inputMode: 'numeric',
        pattern: '[0-9,]*',
      }}
      // onChange={(e) => {
      //   const rawValue = e.target.value.replace(/,/g, '');
      //   if (!/^\d*$/.test(rawValue)) return;
      //   const formatted = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      //   e.target.value = formatted;
      // }}
      sx={{
        flex: 0.5,
        fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
        '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
        '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
      }}
    />
  </Tooltip>
</Box>
        </Box>
      </Box>
    </Box> 
  ); 
}; 

export default SubStep2;
