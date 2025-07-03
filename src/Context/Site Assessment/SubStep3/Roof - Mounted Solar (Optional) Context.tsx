import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface SelectedArea {
	coordinates: [number, number][];
	area: number;
}

interface RoofMountSolarState {
	roofArea: string;
	// topography: string;
	address: string;
	showMap: boolean;
	selectedAreas: SelectedArea[];
}

interface RoofMountSolarContextType {
	roofMountState: RoofMountSolarState;
	updateField: (field: keyof Omit<RoofMountSolarState, 'selectedAreas' | 'roofArea'>, value: string | boolean) => void;
	updateRoofArea: (value: string) => void;
	updateSelectedAreas: (areas: SelectedArea[]) => void;
}

const RoofMountSolarContext = createContext<RoofMountSolarContextType | undefined>(undefined);

export const useRoofMountSolar = () => {
	const context = useContext(RoofMountSolarContext);
	if (!context) {
		throw new Error('useRoofMountSolar must be used within a RoofMountSolarProvider');
	}
	return context;
};

const defaultState: RoofMountSolarState = {
	roofArea: '',
	// topography: 'default',
	address: '',
	showMap: false,
	selectedAreas: [],
};

export const RoofMountSolarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [roofMountState, setRoofMountState] = useState<RoofMountSolarState>(() => {
		const savedState = Cookies.get('roofMountSolarState');
		return savedState ? JSON.parse(savedState) : defaultState;
	});

	useEffect(() => {
		Cookies.set('roofMountSolarState', JSON.stringify(roofMountState));
	}, [roofMountState]);

	const updateField = (field: keyof Omit<RoofMountSolarState, 'selectedAreas' | 'roofArea'>, value: string | boolean) => {
		setRoofMountState(prevState => ({ ...prevState, [field]: value }));
	};
	
	const updateRoofArea = (value: string) => {
		setRoofMountState(prevState => ({ ...prevState, roofArea: value }));
	};

	const updateSelectedAreas = (areas: SelectedArea[]) => {
		setRoofMountState(prevState => ({ ...prevState, selectedAreas: areas }));
	};

	return (
		<RoofMountSolarContext.Provider value={{ roofMountState, updateField, updateSelectedAreas, updateRoofArea }}>
			{children}
		</RoofMountSolarContext.Provider>
	);
};