import React, { useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button, Tooltip, IconButton, Paper } from '@mui/material';
// ADDED: Imports for search and layer control
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, LayersControl } from 'react-leaflet'; 
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css'; // ADDED: Styles for search
import L from 'leaflet';
import { FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
import { renderToStaticMarkup } from 'react-dom/server';
// ADDED: Imports for search functionality
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'; 
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { 
    addAddress, 
    updateAddressField, 
    deleteAddress, 
    setSelectedAddress,
} from '../../../../store/slices/organizationalProfileSlice';
import { setAddresses as setBillAddresses } from '../../../../store/slices/energyProfileSlice';

// ADDED: Helper component for the search bar
const MapSearch = () => {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new (GeoSearchControl as any)({
      provider: provider,
      style: 'button', // Using 'button' style as in the previous example
      autoClose: true,
      keepResult: true,
      searchLabel: 'Enter address to search...',
    });
    map.addControl(searchControl);
    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);
  return null;
};

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
  const dispatch = useAppDispatch();
  const reduxFacilityAddress = useAppSelector((state) => state.organizationalProfile.facilityAddress);
  
  // Transform Redux state to component compatible format if necessary (Leaflet LatLng)
  // But for simple markers we can construct LatLng on the fly or keep data as POJO in Redux.
  // The MapMarkers expects addresses with position: L.LatLng or similar.
  // We need to map the POJO position {lat, lng} to L.LatLng for Leaflet if required, 
  // or just pass {lat, lng} if Leaflet accepts it (it usually does as Expression).
  // However, existing code used L.LatLng. Let's adapt.
  
  const addresses = reduxFacilityAddress.addresses.map(a => ({
      ...a,
      // @ts-ignore
      position: a.position ? new L.LatLng(a.position.lat, a.position.lng) : null
  })).filter(a => a.position !== null) as any[];

  const { selectedAddressId } = reduxFacilityAddress;
  
  useEffect(() => {
    dispatch(setBillAddresses(addresses.map(a => ({ id: a.id, address: `${a.streetAddress}, ${a.city}, ${a.state} ${a.zipCode}` }))));
  }, [reduxFacilityAddress.addresses, dispatch]);
  
  const mapRef = useRef<L.Map | null>(null);

  const getAddressById = (id: string) => addresses.find(a => a.id === id);

  const handleAddLocation = (position: L.LatLng) => {
    // We need to generate ID here or let reducer do it? 
    // The reducer logic for addAddress (checked earlier) simply pushes payload.
    // We need to generate ID.
    // Importing uuid or simple random.
    const newId = `addr_${Date.now()}`;
    const newAddress = {
      id: newId,
      streetAddress: '', city: '', state: '', zipCode: '', 
      position: { lat: position.lat, lng: position.lng }, // Store as POJO
      areaSqFt: '',
      operationalStart: '',
      operationalEnd: ''
    };
    dispatch(addAddress(newAddress));
    handleFetchAddress(newId, position);
  };

  const handleFetchAddress = (addressId: string, position: L.LatLng) => {
    const { lat, lng } = position;
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
      .then(response => response.json())
      .then(data => {
        dispatch(updateAddressField({ id: addressId, field: 'streetAddress', value: data.address.road || '' }));
        dispatch(updateAddressField({ id: addressId, field: 'city', value: data.address.city || data.address.town || '' }));
        dispatch(updateAddressField({ id: addressId, field: 'state', value: data.address.state || '' }));
        dispatch(updateAddressField({ id: addressId, field: 'zipCode', value: data.address.postcode || '' }));
      })
      .catch(error => console.error('Error fetching address:', error));
  };

  const handleDeleteAddress = (addressId: string) => {
    dispatch(deleteAddress(addressId));
  };

  const handleRefetchAddress = (addressId: string) => {
    const address = getAddressById(addressId);
    if (address) {
      handleFetchAddress(addressId, address.position);
    }
  };

  const handleUpdateAddressField = (id: string, field: any, value: string) => {
      dispatch(updateAddressField({ id, field, value }));
  };

  const handleSetSelectedAddress = (id: string) => {
      dispatch(setSelectedAddress(id));
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
          /* --- Style overrides for leaflet-geosearch --- */
          .leaflet-control-geosearch.bar {
            border: 2px solid rgba(0,0,0,0.2);
            border-radius: 4px;
          }
          .leaflet-control-geosearch.bar form input {
            font-family: 'Nunito Sans', sans-serif;
            font-size: 0.8rem;
            height: 30px;
          }
          .leaflet-control-geosearch .results > * {
            font-family: 'Nunito Sans', sans-serif;
            font-size: 0.75rem;
          }
          .leaflet-bar a, .leaflet-bar a:hover {
            height: 32px;
            width: 32px;
            line-height: 32px;
          }
        `}
      </style>
      
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Confirm / Edit Your Pre-Entered Site Location</h2>
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, p: '10px', pl: '20px', pr: '20px', height: '600px' }}>
        {/* Map Section */}
        <Tooltip title="Search for an address or click the map to add a new location pin" placement="top" arrow>
          <Box sx={{ flex: 1, height: '100%', border: '1px solid lightgrey', borderRadius: 1 }}>
            <MapContainer 
              center={[51.505, -0.09]} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }} 
              ref={mapRef}
            >
              {/* ADDED: LayersControl for map types */}
              <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Street View">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Satellite View">
                  <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                  />
                </LayersControl.BaseLayer>
              </LayersControl>

              {/* ADDED: Search component */}
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
        <Box sx={{ 
          flex: 1, border: '1px solid lightgrey', borderRadius: 1, height: '100%', 
          display: 'flex', flexDirection: 'column' 
        }}>
          <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', bgcolor: '#f5f5f5' }}>
            <Typography variant="subtitle2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 'bold' }}>
              Facility Locations ({addresses.length})
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', color: '#666' }}>
              Click on the map to add new locations
            </Typography>
          </Box>
          <Box sx={{
            flex: 1, overflow: 'auto',
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
                    sx={{ mb: 2, p: 2, border: address.id === selectedAddressId ? '2px solid #2196f3' : '1px solid #e0e0e0', cursor: 'pointer', '&:hover': { bgcolor: '#f9f9f9' } }}
                    onClick={() => handleSetSelectedAddress(address.id)}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        Location {index + 1}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Refetch address from map coordinates" arrow>
                          <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); handleRefetchAddress(address.id); }}
                            sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.6rem', minWidth: '50px', padding: '2px 4px', textTransform: 'none' }}
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
                        { label: "Zip Code:", key: "zipCode", placeholder: "Enter zip code" }
                      ].map(({ label, key, placeholder }) => (
                        <Box key={key} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', fontWeight: 'bold' }}>
                            {label}
                          </Typography>
                          <TextField
                            variant="outlined" size="small" type="text"
                            value={address[key as keyof typeof address]}
                            onChange={(e) => { e.stopPropagation(); handleUpdateAddressField(address.id, key as any, e.target.value); }}
                            placeholder={placeholder}
                            onClick={(e) => e.stopPropagation()}

                            sx={{ fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif', '& .MuiInputBase-root': { height: '28px', padding: '0 6px' }, '& input': { padding: 0, fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif' } }}
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