import React from 'react';
import { Box, Button, Checkbox, TextField, Typography, Chip } from '@mui/material';
import { useLOA } from '../../../Context/Energy Profile/SubStep2/Letter Of Authorization Context';
import { useOrganizationDetails } from '../../../Context/Organizational Profile/SubStep2/Organization Details Context';
import { useFacilityAddress } from '../../../Context/Organizational Profile/SubStep2/Facility Address Context';

const SubStep3: React.FC = () => {
  const { loaState, updateField, updateNestedField } = useLOA();
  const { utilityCompanyName, textFields, contactDetails, signature, agreed } = loaState;

  const { organizationDetailsState, updateOrganizationDetails } = useOrganizationDetails();
  const { userName, organizationName, userEmail } = organizationDetailsState;

  const { facilityAddressState, updateAddressField, getAddressById } = useFacilityAddress();
  const { addresses, selectedAddressId } = facilityAddressState;

  // Get the selected address for individual field editing
  const currentAddress = selectedAddressId 
    ? getAddressById(selectedAddressId) 
    : addresses && addresses.length > 0 ? addresses[0] : null;

  // Provide default values if no address is available
  const address = currentAddress || {
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    // otherAddress: ''
  };

  const customerNameDisplay = (userName && organizationName) ? `${userName}, ${organizationName}` : (userName || organizationName || '');
  
  // Create address components for display
  const AddressBoxes: React.FC<{ addresses: any[] }> = ({ addresses }) => {
    if (!addresses || addresses.length === 0) return null;
    
    return (
      <Box sx={{ 
        display: 'flex', 
        gap: 0.5, 
        alignItems: 'center',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        '&::-webkit-scrollbar': {
          height: '4px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#c4c4c4',
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#a0a0a0',
        }
      }}>
        {addresses.map((addr, index) => {
          const addressText = [addr.streetAddress, addr.city, addr.state, addr.zipCode].filter(Boolean).join(', ');
          return addressText ? (
            <Chip
              key={index}
              label={addressText}
              variant="outlined"
              size="small"
              sx={{
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.65rem',
                height: '20px',
                borderRadius: '12px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #d0d0d0',
                flexShrink: 0,
                '& .MuiChip-label': {
                  padding: '0 6px',
                  fontSize: '0.65rem',
                  whiteSpace: 'nowrap'
                }
              }}
            />
          ) : null;
        })}
      </Box>
    );
  };

  const CityStateBoxes: React.FC<{ addresses: any[] }> = ({ addresses }) => {
    if (!addresses || addresses.length === 0) return null;
    
    return (
      <Box sx={{ 
        display: 'flex', 
        gap: 0.5, 
        alignItems: 'center',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        '&::-webkit-scrollbar': {
          height: '4px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#c4c4c4',
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#a0a0a0',
        }
      }}>
        {addresses.map((addr, index) => {
          const cityStateText = [addr.city, addr.state].filter(Boolean).join(', ');
          return cityStateText ? (
            <Chip
              key={index}
              label={cityStateText}
              variant="outlined"
              size="small"
              sx={{
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.65rem',
                height: '20px',
                borderRadius: '12px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #d0d0d0',
                flexShrink: 0,
                '& .MuiChip-label': {
                  padding: '0 6px',
                  fontSize: '0.65rem',
                  whiteSpace: 'nowrap'
                }
              }}
            />
          ) : null;
        })}
      </Box>
    );
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const numValue = parseInt(value, 10);
      if (value === '' || (numValue >= 1 && numValue <= 31)) {
        updateNestedField('textFields', 'day', value);
      }
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    if (value === '' || monthNames.some(name => name.startsWith(formattedValue))) {
       updateNestedField('textFields', 'month', value);
    }
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      updateField('signature', value);
    }
  };

  // Helper function to update address fields safely
  const handleAddressFieldUpdate = (field: string, value: string) => {
    if (currentAddress?.id) {
      updateAddressField(currentAddress.id, field as keyof typeof address, value);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>LETTER OF AUTHORIZATION FOR ELECTRIC DATA</h2>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', fontWeight: 'bold', mb: 1 }}>
              Enter your Utility Company Name (the name of the regulated supplier of electricity, do not enter any third-party commodity provider) :
            </Typography>
            <TextField fullWidth variant="outlined" size="small" placeholder="Utility Company Name" value={utilityCompanyName} onChange={(e) => updateField('utilityCompanyName', e.target.value)} sx={{ mb: 2, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', '& .MuiInputBase-root': { height: '24px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', textAlign: 'justify' }}>
              Please complete this form in its entirety and press the Authorize & Send Request button, This will automatically send the request to your regulated utility. This request only authorizes {window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'} to recieve an excel or CVS data file containing your usage profile.
            </Typography>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', mt: 3, textAlign: 'justify', lineHeight: 1.8 }}>
              On this <TextField variant="standard" type="text" placeholder="(DAY)" value={textFields.day} onChange={handleDayChange} inputProps={{ maxLength: 2 }} sx={{ width: '50px', fontFamily: 'Nunito Sans, sans-serif', '& .MuiInputBase-root': { padding: 0, marginBottom: '-2px' }, '& input': { textAlign: 'center', fontSize: '0.8rem', padding: 0 }, '& .MuiInputBase-input::placeholder': { fontSize: '0.7rem' } }} />
              {' '}day of{' '}<TextField variant="standard" type="text" placeholder="(MONTH)" value={textFields.month} onChange={handleMonthChange} sx={{ width: '80px', fontFamily: 'Nunito Sans, sans-serif', '& .MuiInputBase-root': { padding: 0, marginBottom: '-2px' }, '& input': { textAlign: 'center', fontSize: '0.8rem', padding: 0 }, '& .MuiInputBase-input::placeholder': { fontSize: '0.7rem' } }} />
              , 2025, the{' '}<TextField variant="standard" type="text" placeholder="(CUSTOMER NAME)" value={customerNameDisplay} onChange={(e) => updateOrganizationDetails({ organizationName: e.target.value.split(',')[1]?.trim(), userName: e.target.value.split(',')[0]?.trim() })} sx={{ width: '150px', fontFamily: 'Nunito Sans, sans-serif', '& .MuiInputBase-root': { padding: 0, marginBottom: '-2px' }, '& input': { textAlign: 'center', fontSize: '0.8rem', padding: 0 }, '& .MuiInputBase-input::placeholder': { fontSize: '0.7rem' } }} />
              {' '} (Customer) appoints {window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'} as its Agent to obtain any and all usage information {window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'} deems necessary to EVALUATE the Customer electricity, gas, or all steam supply at our location in{' '}
              <Box component="span" sx={{ display: 'inline-block', width: '200px', borderBottom: '1px solid #000', pb: 0.5, mb: 1 }}>
                <AddressBoxes addresses={addresses || []} />
              </Box>
              . Customer Point of Contact is Mr./Mrs.{' '}<TextField variant="standard" type="text" placeholder="(NAME)" value={textFields.contactName} onChange={(e) => updateNestedField('textFields', 'contactName', e.target.value)} sx={{ width: '120px', fontFamily: 'Nunito Sans, sans-serif', '& .MuiInputBase-root': { padding: 0, marginBottom: '-2px' }, '& input': { textAlign: 'center', fontSize: '0.8rem', padding: 0 }, '& .MuiInputBase-input::placeholder': { fontSize: '0.7rem' } }} />
              {' '} listed below with their contact information and the information identifying our accounts.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center', mt: 3 }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Name:</b></Typography>
            <TextField fullWidth variant="outlined" size="small" type="text" placeholder='Customer / Company Name Here' value={customerNameDisplay} onChange={(e) => updateOrganizationDetails({ userName: e.target.value.split(',')[0]?.trim(), organizationName: e.target.value.split(',')[1]?.trim() || '' })} sx={{ flex: 0.5, fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif', '& .MuiInputBase-root': { height: '24px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Service Address:</b></Typography>
            <TextField fullWidth variant="outlined" size="small" type="text" placeholder='1212 USA Lane' value={contactDetails.serviceAddress} onChange={(e) => updateNestedField('contactDetails', 'serviceAddress', e.target.value)} sx={{ flex: 0.5, fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif', '& .MuiInputBase-root': { height: '24px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Full Address:</b></Typography>
            <Box sx={{ 
              flex: 0.5, 
              minHeight: '24px', 
              maxWidth: '200px', // Added width constraint
              border: '1px solid #c4c4c4', 
              borderRadius: '4px', 
              padding: '2px 6px', 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: 'white' 
            }}>
              <AddressBoxes addresses={addresses || []} />
            </Box>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>City/State:</b></Typography>
            <Box sx={{ 
              flex: 0.5, 
              minHeight: '24px', 
              maxWidth: '200px', // Added width constraint
              border: '1px solid #c4c4c4', 
              borderRadius: '4px', 
              padding: '2px 6px', 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: 'white' 
            }}>
              <CityStateBoxes addresses={addresses || []} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Ph. No.:</b></Typography>
            <TextField fullWidth variant="outlined" size="small" type="tel" placeholder='Enter Contact No. Here' value={contactDetails.phoneNo} onChange={(e) => updateNestedField('contactDetails', 'phoneNo', e.target.value)} sx={{ flex: 0.5, fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif', '& .MuiInputBase-root': { height: '24px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Zip:</b></Typography>
            <TextField fullWidth variant="outlined" size="small" placeholder='07036' value={address.zipCode} onChange={(e) => handleAddressFieldUpdate('zipCode', e.target.value)} sx={{ flex: 0.5, fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif', '& .MuiInputBase-root': { height: '24px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Email Address:</b></Typography>
            <TextField fullWidth variant="outlined" size="small" placeholder='Enter Email Here' type="email" value={userEmail} onChange={(e) => updateOrganizationDetails({ userEmail: e.target.value })} sx={{ flex: 0.5, fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif', '& .MuiInputBase-root': { height: '24px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Service Acc. No.:</b></Typography>
            <TextField fullWidth variant="outlined" size="small" type="number" placeholder='12345678910111213' value={contactDetails.serviceAccountNo} onChange={(e) => updateNestedField('contactDetails', 'serviceAccountNo', e.target.value)} sx={{ flex: 0.5, fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif', '& .MuiInputBase-root': { height: '24px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
          </Box>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', mt: 3, textAlign: 'justify' }}>
            I/We authorize {window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'} to retrieve/receive demand/consumption/billing information through applicable means for the electricity account numbers specified below as well as any future accounts that Customer requests to add to the applicable electricity supply agreement. I/We authorize {window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'} to complete any web-based authorization form on the relevant electric distribution company website(s) for the electricity account numbers specified below as well as any future accounts that Customer requests to add to the applicable electricity supply agreement. Unless otherwise required by state regulation, this authorization shall be effective immediately and remain in effect for as long as there is an electricity supply agreement between Customer and {window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'}. {window.location.pathname === '/demo' ? 'EmissionCheckIQ+' : 'Bradley.ai'} may assign this Letter of Authorization to other entities.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.5 }}><b>Electronic Signature:</b></Typography>
            <TextField fullWidth variant="outlined" size="small" value={signature} onChange={handleSignatureChange} sx={{ flex: 0.5, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', minWidth: '414px', pl: '1px', pr: '1px', '& .MuiInputBase-root': { height: '24px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} placeholder="Sign Here..." />
            <Button variant="outlined" onClick={() => updateField('signature', '')} sx={{ flex: 0.24, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.65rem', padding: '2px 1px', pr: '15px', pl: '15px', alignSelf: 'flex-end', textTransform: 'none', '&:focus': { outline: 'none' } }}>
              Clear Signature
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-start', mt: 1 }}>
            <Checkbox checked={agreed} onChange={(e) => updateField('agreed', e.target.checked)} sx={{ padding: '0 0', '& .MuiSvgIcon-root': { fontSize: '1.1rem' } }} />
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }}>
              I have read and agreed to the terms of this Letter of Authorization.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep3;