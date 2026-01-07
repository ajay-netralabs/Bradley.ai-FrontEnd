import React, { useEffect, useRef, useState } from 'react';
import {
  Box, Typography, TextField, Button, Tooltip, IconButton, Paper, Modal
} from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import L from 'leaflet';
import { FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
import { renderToStaticMarkup } from 'react-dom/server';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useFacilityAddress } from '../../Context/Organizational Profile/SubStep2/Facility Address Context';
import { useBillAddress } from '../../Context/Energy Profile/BillAddressContext';
import CloseIcon from '@mui/icons-material/Close';

// --- Custom Icon Creator ---
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

// --- Map Search Component ---
const MapSearch = () => {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    
    // Create the custom icon for search results
    const searchIcon = createCustomIcon(FaMapMarkerAlt, '#2196f3'); // Using the blue 'selected' color for search results

    const searchControl = new (GeoSearchControl as any)({
      provider: provider,
      style: 'button',
      autoClose: true,
      keepResult: true,
      searchLabel: 'Enter address to search...',
      marker: {
        icon: searchIcon, // Pass the custom icon here
        draggable: false,
      },
    });
    
    map.addControl(searchControl);
    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);
  return null;
};

// --- Map Markers Component ---
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

// --- Main Component ---
const SubStep2 = () => {
  const {
    facilityAddressState,
    addAddress,
    updateAddressField,
    deleteAddress,
    setSelectedAddress,
    getAddressById
  } = useFacilityAddress();
  const { setAddresses: setBillAddresses } = useBillAddress();
  
  const mapRef = useRef<L.Map | null>(null);
  const [openNonUSModal, setOpenNonUSModal] = useState(false);

  useEffect(() => {
    setBillAddresses(facilityAddressState.addresses.map(a => ({ id: a.id, address: `${a.streetAddress}, ${a.city}, ${a.state} ${a.zipCode}` })));
  }, [facilityAddressState.addresses, setBillAddresses]);

  const { addresses, selectedAddressId } = facilityAddressState;
  const defaultUSACenter: L.LatLngExpression = [39.8283, -98.5795];
  const initialCenter: L.LatLngExpression = selectedAddressId
    ? getAddressById(selectedAddressId)?.position || defaultUSACenter
    : (addresses.length > 0 ? addresses[0].position : defaultUSACenter);

  // --- Add Location Handler ---
  const handleAddLocation = (position: L.LatLng) => {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}`)
      .then(res => res.json())
      .then(data => {
        const country = data.address?.country_code?.toLowerCase();
        if (country !== 'us') {
          setOpenNonUSModal(true);
          return;
        }
        const newAddressId = addAddress({
          streetAddress: '', city: '', state: '', zipCode: '', areaSqFt: '', operationalStart: '', operationalEnd: '', position
        });
        handleFetchAddress(newAddressId, position);
      })
      .catch(err => console.error('Error checking country:', err));
  };

  const handleFetchAddress = (addressId: string, position: L.LatLng) => {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}`)
      .then(response => response.json())
      .then(data => {
        updateAddressField(addressId, 'streetAddress', data.address.road || '');
        updateAddressField(addressId, 'city', data.address.city || data.address.town || '');
        updateAddressField(addressId, 'state', data.address.state || '');
        updateAddressField(addressId, 'zipCode', data.address.postcode || '');
        updateAddressField(addressId, 'areaSqFt', '');
        updateAddressField(addressId, 'operationalStart', '');
        updateAddressField(addressId, 'operationalEnd', '');
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

  const handleSelectAddress = (addressId: string) => {
    const address = getAddressById(addressId);
    if (address && mapRef.current) {
      mapRef.current.setView(address.position, 13, { animate: true });
    }
    setSelectedAddress(addressId);
  };

  // Sleek modal styling (minimal, soft, smaller font)
  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 260,
    maxWidth: 320,
    bgcolor: '#f9f9fb',
    borderRadius: 2.5,
    boxShadow: '0 4px 20px rgba(60,60,60,0.10)',
    outline: 'none',
    p: 0,
    fontFamily: "'Nunito Sans', sans-serif",
    overflow: 'hidden'
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
          .leaflet-div-icon { background: transparent; border: none; }
          .leaflet-control-geosearch.bar { border: 2px solid rgba(0,0,0,0.2); border-radius: 4px; }
          .leaflet-control-geosearch.bar form input { font-family: 'Nunito Sans', sans-serif; font-size: 0.8rem; height: 30px; }
          .leaflet-control-geosearch .results > * { font-family: 'Nunito Sans', sans-serif; font-size: 0.75rem; }
          .leaflet-bar a, .leaflet-bar a:hover { height: 30px; width: 30px; line-height: 30px; }
        `}
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Facility Addresses</h2>
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, p: '10px', pl: '20px', pr: '20px', height: '600px' }}>
        {/* Map Section */}
        <Tooltip title="Search for an address or click the map to add a new location pin" placement="top" arrow>
          <Box sx={{ flex: 1, height: '100%', border: '1px solid lightgrey', borderRadius: 1 }}>
            <MapContainer 
              center={initialCenter} 
              zoom={5} 
              style={{ height: '100%', width: '100%' }} 
              ref={mapRef}
            >
              <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Street View">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Satellite View">
                  <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution='Tiles &copy; Esri'
                  />
                </LayersControl.BaseLayer>
              </LayersControl>
              <MapSearch />
              <MapMarkers
                addresses={addresses}
                onAddLocation={handleAddLocation}
                selectedAddressId={selectedAddressId}
              />
            </MapContainer>
          </Box>
        </Tooltip>
        {/* Addresses List Section */}
        <Box sx={{ flex: 1, border: '1px solid lightgrey', borderRadius: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', bgcolor: '#f5f5f5' }}>
            <Typography variant="subtitle2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 'bold' }}>
              Facility Locations ({addresses.length})
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', color: '#666' }}>
              Click on the map to add new locations
            </Typography>
          </Box>
          <Box sx={{
            flex: 1,
            overflow: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            '-ms-overflow-style': 'none', 'scrollbar-width': 'none'
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
                      mb: 2, p: 2,
                      border: address.id === selectedAddressId ? '2px solid #2196f3' : '1px solid #e0e0e0',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#f9f9f9' }
                    }}
                    onClick={() => handleSelectAddress(address.id)}
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
                            onClick={(e) => { e.stopPropagation(); handleRefetchAddress(address.id); }}
                            sx={{
                              fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.6rem',
                              minWidth: '50px', padding: '2px 4px', textTransform: 'none'
                            }}
                          >
                            Refresh
                          </Button>
                        </Tooltip>
                        <Tooltip title="Delete this location" arrow>
                          <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDeleteAddress(address.id); }} sx={{ color: '#f44336' }}>
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
                      { label: "Zip Code:", key: "zipCode", placeholder: "Enter zip code" },
                      { label: "Area (in sq ft):", key: "areaSqFt", placeholder: "Enter area in sq ft" },
                    ].map(({ label, key, placeholder }) => (
                      <Box key={key} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', fontWeight: 'bold' }}>
                          {label}
                        </Typography>
                        <TextField
                          variant="outlined"
                          size="small"
                          type="text"
                          value={address[key as keyof typeof address] || ""}
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

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography
                        sx={{
                          fontFamily: 'Nunito Sans, sans-serif',
                          fontSize: '0.7rem',
                          fontWeight: 'bold'
                        }}
                      >
                        Operational Hours:
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                          variant="outlined"
                          size="small"
                          type="time"
                          value={address.operationalStart || ""}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateAddressField(address.id, "operationalStart", e.target.value);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            width: "50%",
                            fontSize: '0.7rem',
                            fontFamily: 'Nunito Sans, sans-serif',
                            '& .MuiInputBase-root': { height: '28px', padding: '0 6px' },
                            '& input': { padding: 0, fontSize: '0.75rem' }
                          }}
                        />

                        <Typography
                          sx={{
                            fontFamily: 'Nunito Sans, sans-serif',
                            fontSize: '0.75rem',
                            color: '#444'
                          }}
                        >
                          to
                        </Typography>
                        
                        <TextField
                          variant="outlined"
                          size="small"
                          type="time"
                          value={address.operationalEnd || ""}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateAddressField(address.id, "operationalEnd", e.target.value);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            width: "50%",
                            fontSize: '0.7rem',
                            fontFamily: 'Nunito Sans, sans-serif',
                            '& .MuiInputBase-root': { height: '28px', padding: '0 6px' },
                            '& input': { padding: 0, fontSize: '0.75rem' }
                          }}
                        />
                      </Box>
                    </Box>
                        
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
      {/* Sleek, minimal Non-USA Location Modal */}
      <Modal
        open={openNonUSModal}
        onClose={() => setOpenNonUSModal(false)}
        aria-labelledby="non-us-modal-title"
        aria-describedby="non-us-modal-description"
        closeAfterTransition
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1.2,
              borderBottom: '1px solid #eee',
              fontFamily: "'Nunito Sans',sans-serif",
              fontWeight: 500,
              fontSize: '0.98rem',
              color: '#555',
              background: '#f6f6fa',
              position: 'relative'
            }}
          >
            Non-USA Location
            <IconButton
              aria-label="close"
              onClick={() => setOpenNonUSModal(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 7,
                padding: 0.3,
                color: '#8a8a8a'
              }}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{
            px: 2,
            pb: 2.2,
            pt: 1.3,
            fontFamily: "'Nunito Sans',sans-serif",
            bgcolor: '#f9f9fb'
          }}
          >
            <Typography
              sx={{
                fontFamily: "'Nunito Sans',sans-serif",
                color: '#666',
                fontSize: '0.85rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
                marginBottom: '0.2em'
              }}
              id="non-us-modal-description"
            >
              Only locations within the USA are allowed.<br /><br />
              Please select a point within United States borders.
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default SubStep2;