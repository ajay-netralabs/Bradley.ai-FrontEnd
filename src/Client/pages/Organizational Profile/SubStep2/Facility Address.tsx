import React, { useRef } from 'react';
import { Box, Typography, TextField, Button, Tooltip, IconButton, Paper } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
import { renderToStaticMarkup } from 'react-dom/server';
import { useFacilityAddress } from '../../../../Context/Organizational Profile/SubStep2/Facility Address Context';

const createCustomIcon = (IconComponent: React.ElementType, color: string = '#e74c3c') => {
  const iconMarkup = renderToStaticMarkup(
    <IconComponent style={{ fontSize: '30px', color }} />
  );
  return L.divIcon({
    html: iconMarkup,
    className: 'custom-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

const MapMarkers = ({ 
  addresses, 
  onAddLocation, 
  selectedAddressId 
}: { 
  addresses: any[];
  onAddLocation: (pos: L.LatLng) => void;
  selectedAddressId: string | null;
}) => {
  const customIcon = createCustomIcon(FaMapMarkerAlt);
  const selectedIcon = createCustomIcon(FaMapMarkerAlt, '#2196f3');

  useMapEvents({
    click(e) {
      onAddLocation(e.latlng);
    },
  });

  return (
    <>
      {addresses.map((address) => (
        <Marker 
          key={address.id} 
          position={address.position} 
          icon={address.id === selectedAddressId ? selectedIcon : customIcon}
        />
      ))}
    </>
  );
};

const SubStep2 = () => {
  const { 
    facilityAddress, 
    addAddress, 
    updateAddressField, 
    deleteAddress, 
    setSelectedAddress,
    getAddressById 
  } = useFacilityAddress();
  
  const { addresses, selectedAddressId } = facilityAddress;
  const mapRef = useRef<L.Map | null>(null);

  const handleAddLocation = (position: L.LatLng) => {
    const newAddressId = addAddress({
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      position
    });
    
    handleFetchAddress(newAddressId, position);
  };

  const handleFetchAddress = (addressId: string, position: L.LatLng) => {
    const { lat, lng } = position;
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
      .then(response => response.json())
      .then(data => {
        updateAddressField(addressId, 'streetAddress', data.address.road || '');
        updateAddressField(addressId, 'city', data.address.city || data.address.town || '');
        updateAddressField(addressId, 'state', data.address.state || '');
        updateAddressField(addressId, 'zipCode', data.address.postcode || '');
      })
      .catch(error => console.error('Error fetching address:', error));
  };

  const handleDeleteAddress = (addressId: string) => {
    deleteAddress(addressId);
  };

  const handleRefetchAddress = (addressId: string) => {
    const address = getAddressById(addressId);
    if (address) {
      handleFetchAddress(addressId, address.position);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
          .leaflet-div-icon {
            background: transparent;
            border: none;
          }
        `}
      </style>
      
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Facility Addresses</h2>
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, p: '10px', pl: '20px', pr: '20px', height: '600px' }}>
        {/* Map Section */}
        <Tooltip title="Click anywhere on the map to add a new location pin" placement="top" arrow>
          <Box sx={{ flex: 1, height: '100%', border: '1px solid lightgrey', borderRadius: 1 }}>
            <MapContainer 
              center={[51.505, -0.09]} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }} 
              ref={mapRef}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapMarkers
                addresses={addresses}
                onAddLocation={handleAddLocation}
                selectedAddressId={selectedAddressId}
              />
            </MapContainer>
          </Box>
        </Tooltip>

        {/* Addresses List Section */}
        <Box sx={{ 
          flex: 1, 
          border: '1px solid lightgrey', 
          borderRadius: 1, 
          height: '100%', 
          display: 'flex',          // <-- CHANGED
          flexDirection: 'column'   // <-- CHANGED
        }}>
          {/* This is the static header */}
          <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', bgcolor: '#f5f5f5' }}>
            <Typography variant="subtitle2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 'bold' }}>
              Facility Locations ({addresses.length})
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', color: '#666' }}>
              Click on the map to add new locations
            </Typography>
          </Box>
          
          {/* This is the new scrollable content area */}
          <Box sx={{
            flex: 1,                  // <-- ADDED
            overflow: 'auto',         // <-- MOVED
            '&::-webkit-scrollbar': { // <-- MOVED
              display: 'none'
            },
            '-ms-overflow-style': 'none', // <-- MOVED
            'scrollbar-width': 'none'     // <-- MOVED
          }}>
            {addresses.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center', color: '#666' }}>
                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }}>
                  No locations added yet. Click on the map to add your first location.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ p: 1 }}>
                {addresses.map((address, index) => (
                  <Paper 
                    key={address.id} 
                    sx={{ 
                      mb: 2, 
                      p: 2, 
                      border: address.id === selectedAddressId ? '2px solid #2196f3' : '1px solid #e0e0e0',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#f9f9f9' }
                    }}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        Location {index + 1}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Refetch address from map coordinates" arrow>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRefetchAddress(address.id);
                            }}
                            sx={{
                              fontFamily: 'Nunito Sans, sans-serif',
                              fontSize: '0.6rem',
                              minWidth: '50px',
                              padding: '2px 4px',
                              textTransform: 'none'
                            }}
                          >
                            Refresh
                          </Button>
                        </Tooltip>
                        <Tooltip title="Delete this location" arrow>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAddress(address.id);
                            }}
                            sx={{ color: '#f44336' }}
                          >
                            <FaTrash size={12} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {[
                        { label: "Street Address:", key: "streetAddress", placeholder: "Enter street address" },
                        { label: "City:", key: "city", placeholder: "Enter city name" },
                        { label: "State:", key: "state", placeholder: "Enter state" },
                        { label: "Zip Code:", key: "zipCode", placeholder: "Enter zip code" }
                      ].map(({ label, key, placeholder }) => (
                        <Box key={key} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', fontWeight: 'bold' }}>
                            {label}
                          </Typography>
                          <TextField
                            variant="outlined"
                            size="small"
                            type="text"
                            value={address[key as keyof typeof address]}
                            onChange={(e) => {
                              e.stopPropagation();
                              updateAddressField(address.id, key as any, e.target.value);
                            }}
                            placeholder={placeholder}
                            onClick={(e) => e.stopPropagation()}
                            sx={{
                              fontSize: '0.7rem',
                              fontFamily: 'Nunito Sans, sans-serif',
                              '& .MuiInputBase-root': { height: '28px', padding: '0 6px' },
                              '& input': { padding: 0, fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif' }
                            }}
                          />
                        </Box>
                      ))}
                    </Box>

                    <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid #e0e0e0' }}>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.65rem', color: '#666' }}>
                        Coordinates: {address.position.lat.toFixed(6)}, {address.position.lng.toFixed(6)}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;