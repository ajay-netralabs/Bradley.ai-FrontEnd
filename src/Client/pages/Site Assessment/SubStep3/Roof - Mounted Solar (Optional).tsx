import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Typography, /* Select, MenuItem, */ Button, Alert/* , SelectChangeEvent */ } from '@mui/material';
import { useRoofMountSolar } from '../../../../Context/Site Assessment/SubStep3/Roof - Mounted Solar (Optional) Context';

// declare global {
// 	interface Window { L: any; }
// 	namespace L {
// 		namespace Control { const Draw: any; }
// 		namespace Draw { const Event: any; }
// 		namespace GeometryUtil { function geodesicArea(latlngs: any[]): number; }
// 	}
// }

interface SelectedArea {
	coordinates: [number, number][];
	area: number;
}

const SubStep3: React.FC = () => {
	const { roofMountState, updateField, updateSelectedAreas, updateRoofArea } = useRoofMountSolar();
	const { roofArea, /* topography, */ address, showMap, selectedAreas } = roofMountState;

	const [mapLoaded, setMapLoaded] = useState<boolean>(false);
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<any>(null);
	const drawingLayerRef = useRef<any>(null);

	useEffect(() => {
		const loadLeaflet = async () => {
			if (!document.querySelector('link[href*="leaflet.css"]')) {
				const cssLink = document.createElement('link'); cssLink.rel = 'stylesheet'; cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(cssLink);
			}
			if (!document.querySelector('link[href*="leaflet.draw.css"]')) {
				const drawCSS = document.createElement('link'); drawCSS.rel = 'stylesheet'; drawCSS.href = 'https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.css'; document.head.appendChild(drawCSS);
			}
			if (!window.L || !(window.L.Control && window.L.Control.Draw)) {
				const script = document.createElement('script'); script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; script.async = true;
				script.onload = () => {
					const drawScript = document.createElement('script'); drawScript.src = 'https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.js'; drawScript.async = true;
					drawScript.onload = () => setMapLoaded(true);
					document.head.appendChild(drawScript);
				};
				document.head.appendChild(script);
			} else {
				setMapLoaded(true);
			}
		};
		loadLeaflet();
	}, []);

	useEffect(() => {
		if (mapLoaded && showMap && mapRef.current) {
			if (!mapInstanceRef.current) initializeMap(); else mapInstanceRef.current.invalidateSize();
		} else if (!showMap && mapInstanceRef.current) {
			mapInstanceRef.current.remove();
			mapInstanceRef.current = null;
			drawingLayerRef.current = null;
			updateSelectedAreas([]);
			updateRoofArea('');
		}
	}, [mapLoaded, showMap]);

	const initializeMap = () => {
		if (!mapRef.current) return;
		const map = window.L.map(mapRef.current).setView([25.7617, -80.1918], 18);
		window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Bradley.ai', maxZoom: 20 }).addTo(map);
		const streetOverlay = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors', opacity: 0.3 });
		const baseLayers = { "Satellite": window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles © Esri' }) };
		const overlayLayers = { "Street Labels": streetOverlay };
		window.L.control.layers(baseLayers, overlayLayers).addTo(map);
		const drawnItems = new window.L.FeatureGroup();
		map.addLayer(drawnItems);
		drawingLayerRef.current = drawnItems;
		const drawControl = new window.L.Control.Draw({ edit: { featureGroup: drawnItems, remove: true }, draw: { polygon: { allowIntersection: false, showArea: true, metric: false }, rectangle: { showArea: true, metric: false }, circle: false, circlemarker: false, marker: false, polyline: false } });
		map.addControl(drawControl);
		
		map.on(window.L.Draw.Event.CREATED, (event: any) => {
			const layer = event.layer;
			drawnItems.addLayer(layer);
			const area = calculateAreaInSqFt(layer);
			let coordinates: [number, number][] = [];
			if (layer instanceof window.L.Polygon || layer instanceof window.L.Rectangle) {
				coordinates = layer.getLatLngs()[0].map((latlng: any) => [latlng.lat, latlng.lng]);
			}
			const newArea: SelectedArea = { coordinates, area };
			const updatedAreas = [...selectedAreas, newArea];
			const totalArea = updatedAreas.reduce((sum, current) => sum + current.area, 0);
			updateSelectedAreas(updatedAreas);
			updateRoofArea(Math.round(totalArea).toString());
			layer.bindPopup(`Selected Area: ${Math.round(area).toLocaleString()} sq ft`).openPopup();
		});

		map.on(window.L.Draw.Event.DELETED, () => {
			const currentDrawnLayers: SelectedArea[] = [];
			if (drawingLayerRef.current) {
				drawingLayerRef.current.eachLayer((layer: any) => {
					const area = calculateAreaInSqFt(layer);
					let coordinates: [number, number][] = [];
					if (layer instanceof window.L.Polygon || layer instanceof window.L.Rectangle) {
						coordinates = layer.getLatLngs()[0].map((latlng: any) => [latlng.lat, latlng.lng]);
					}
					currentDrawnLayers.push({ coordinates, area });
				});
			}
			const totalArea = currentDrawnLayers.reduce((sum, current) => sum + current.area, 0);
			updateSelectedAreas(currentDrawnLayers);
			updateRoofArea(Math.round(totalArea).toString());
		});
		mapInstanceRef.current = map;
	};

	const calculateAreaInSqFt = (layer: any): number => {
		if (layer instanceof window.L.Polygon || layer instanceof window.L.Rectangle) {
			const latlngs = layer.getLatLngs()[0];
			const area = window.L.GeometryUtil ? window.L.GeometryUtil.geodesicArea(latlngs) : calculatePolygonArea(latlngs);
			return area * 10.764;
		}
		return 0;
	};

	const calculatePolygonArea = (latlngs: any[]): number => {
		let area = 0; const n = latlngs.length;
		for (let i = 0; i < n; i++) {
			const j = (i + 1) % n;
			area += latlngs[i].lat * latlngs[j].lng;
			area -= latlngs[j].lat * latlngs[i].lng;
		}
		return Math.abs(area) / 2 * 111319.9 * 111319.9;
	};

	const searchAddress = async () => {
		if (!address || !mapInstanceRef.current) return;
		try {
			const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
			const data = await response.json();
			if (data && data.length > 0) {
				const result = data[0]; const lat = parseFloat(result.lat); const lng = parseFloat(result.lon);
				mapInstanceRef.current.setView([lat, lng], 18);
				mapInstanceRef.current.eachLayer((layer: any) => { if (layer instanceof window.L.Marker) { mapInstanceRef.current.removeLayer(layer); } });
				window.L.marker([lat, lng]).addTo(mapInstanceRef.current).bindPopup(address).openPopup();
			} else { alert('Address not found. Please try a different address.'); }
		} catch (error) { console.error('Geocoding error:', error); alert('Error searching for address. Please try again.'); }
	};
	
	const getTotalSelectedArea = (): number => selectedAreas.reduce((sum, area) => sum + area.area, 0);
	const getEstimatedCapacity = (): number => (getTotalSelectedArea() / 43000) * 250;
	const getCoordinatesOfVertices = (coordinates: [number, number][]): string => coordinates.map(coord => `(${coord[0].toFixed(6)}, ${coord[1].toFixed(6)})`).join(', ');

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
			<style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');`}</style>
			<Typography variant="h6" sx={{ mb: 2.9, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
				<h2>Roof - Mounted Solar (Optional)</h2>
			</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.7 }}>
						<b>Available Roof Area:</b> (in Sq. Ft.)<br /><i>(43,000 sq. ft. of unobstructed roof can produce approx. 250kW of solar plant capacity)</i>
					</Typography>
					<TextField variant="outlined" size="small" type="number" placeholder='in Sq. Ft.' value={roofArea} onChange={(e) => updateRoofArea(e.target.value)} sx={{ flex: 0.3, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }} />
				</Box>
				{/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.7 }}><b>Land Topography:</b></Typography>
					<Select size="small" value={topography} onChange={(e: SelectChangeEvent) => updateField('topography', e.target.value)} sx={{ flex: 0.3, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '40px', '& .MuiInputBase-root': { padding: '0 6px' }, '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' } }}>
						<MenuItem value="default" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Select Topography</MenuItem>
						<MenuItem value="flat" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Flat</MenuItem>
						<MenuItem value="sloped" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Sloped</MenuItem>
						<MenuItem value="hilly" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Hilly</MenuItem>
						<MenuItem value="partially_covered" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>Partially Covered</MenuItem>
					</Select>
				</Box> */}
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2, mt: 1, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
					<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 'bold', pl: 0.3 }}>Locate Your Property</Typography>
					<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
						<TextField variant="outlined" size="small" placeholder="Enter your address" value={address} onChange={(e) => updateField('address', e.target.value)} onKeyPress={(e) => e.key === 'Enter' && searchAddress()} sx={{ flex: 1, fontFamily: 'Nunito Sans, sans-serif', '& .MuiInputBase-root': { height: '30px' }, '& input': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' } }} />
						<Button variant="contained" size="small" onClick={searchAddress} disabled={!address} sx={{ minWidth: '80px', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', height: '30px' }}>Search</Button>
					</Box>
					<Button variant="outlined" size="small" onClick={() => updateField('showMap', !showMap)} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', alignSelf: 'flex-start', height: '30px' }}>{showMap ? 'Hide Map' : 'Show Interactive Map'}</Button>
				</Box>
				{showMap && (
					<Box sx={{ mb: 2 }}>
						<Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', mb: 1 }}><b>Instructions:</b> Use the polygon or rectangle tools to select areas for solar installation. The selected area will automatically update the roof area field above.</Typography>
						<div ref={mapRef} style={{ height: '400px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }} />
						{selectedAreas.length > 0 && (
							<Alert severity="info" sx={{ mt: 1, fontFamily: 'Nunito Sans, sans-serif' }}>
								<Typography sx={{ fontSize: '0.75rem' }}>
									<b>Selected Areas:</b> {selectedAreas.length} area(s) totaling {Math.round(getTotalSelectedArea()).toLocaleString()} sq ft<br />
									<b>Estimated Capacity:</b> ~{Math.round(getEstimatedCapacity())} kW<br />
									<b>Coordinates of Vertices:</b> {selectedAreas.map(area => getCoordinatesOfVertices(area.coordinates)).join(' | ')}
								</Typography>
							</Alert>
						)}
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default SubStep3;