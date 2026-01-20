import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


export const brandMapping = {
  "Reciprocating (Piston) Engines": ['Aggreko', 'AKSA', 'AP Electric & Generators', 'Briggs & Stratton', 'Caterpillar', 'Cummins', 'Deutz', 'Doosan', 'Generac', 'INNIO (Jenbacher, Waukesha)', 'Kohler', 'Kubota', 'MAN', 'MTU', 'Rolls-Royce', 'Taylor Power Systems', 'Wärtsilä'],
  "Gas Turbines (Aero-Derivative)": ['GE (General Electric)', 'MAN', 'Mitsubishi Hitachi Power Systems', 'MTU', 'Rolls-Royce', 'Siemens', 'Solar Turbines (Caterpillar)'],
  "Simple Cycle Gas Turbines": ['Caterpillar', 'GE', 'MAN', 'MTU', 'Rolls-Royce', 'Siemens', 'WR Grace'],
  "Linear Generators": ['Econiq', 'Linear Labs', 'Mainspring'],
  "Microreactors (Very Small SMRs)": ['Areva/Framatome', 'China National Nuclear Corporation (CNNC)', 'GE-Hitachi Nuclear', 'Korea Hydro & Nuclear Power (KHNP)', 'Rolls-Royce SMR (UK)', 'Rosatom', 'Westinghouse'],
  "Small nuclear (Light-Water SMRs - LWR-SMRs)": ['Areva/Framatome', 'China National Nuclear Corporation (CNNC)', 'GE-Hitachi Nuclear', 'Korea Hydro & Nuclear Power (KHNP)', 'Rolls-Royce SMR (UK)', 'Rosatom', 'Westinghouse'],
};
export const controlsBrands = ['ABB', 'Eaton', 'Emerson', 'GE', 'Honeywell', 'Mitsubishi Electric', 'Phoenix Contact', 'Rockwell Automation', 'Schneider Electric', 'Schweitzer Engineering Laboratories', 'Siemens', 'Yaskawa', 'Yokogawa'];
export const switchgearBrands = ['ABB', 'Baypower', 'Eaton', 'GE', 'Mitsubishi Electric', 'North American Switchgear', 'Phoenix Electric', 'Schneider Electric', 'Siemens', 'Switchgear Power Systems', 'Whatoop'];
export const standardsOptions = ['All (Default)', 'IEEE 1547', 'IEEE 1547.2-2023', 'NFPA 70', 'DFAR 252', 'UL 1741', 'IEEE 2800'];
export const primeMoverOptions = [
    { name: "Reciprocating (Piston) Engines", sizeRange: "50 kW – 5 MW" }, { name: "Gas Turbines (Aero-Derivative)", sizeRange: "1 MW – 50 MW" }, { name: "Simple Cycle Gas Turbines", sizeRange: "Varies" }, { name: "Linear Generators", sizeRange: "250 kW – 5 MW" }, { name: "Microreactors (Very Small SMRs)", sizeRange: "1 – 20 MW" }, { name: "Small nuclear (Light-Water SMRs - LWR-SMRs)", sizeRange: "60 – 470 MW" }, { name: "Microturbines", sizeRange: "25 kW – 500 kW" }, { name: "Micro-Engines / Stirling Engines", sizeRange: "1 kW – 50 kW" }, { name: "Fuel Cells", sizeRange: "100 kW – 10 MW" }, { name: "Steam Turbines (Gas-Fired Boiler)", sizeRange: "500 kW – 50 MW" }, { name: "Other", sizeRange: "" }
];

interface EquipmentPreferencesState {
  primeMover: string;
  primeMoverOther: string;
  primeMoverBrand: string;
  controlsBrand: string;
  controlsBrandOther: string;
  switchgearBrand: string;
  switchgearBrandOther: string;
  standard: string;
  standardOther: string;
}

interface EquipmentPreferencesContextType {
  equipmentPreferencesState: EquipmentPreferencesState;
  updateField: (field: keyof EquipmentPreferencesState, value: string) => void;
}

const EquipmentPreferencesContext = createContext<EquipmentPreferencesContextType | undefined>(undefined);

export const useEquipmentPreferences = () => {
  const context = useContext(EquipmentPreferencesContext);
  if (!context) {
    throw new Error('useEquipmentPreferences must be used within an EquipmentPreferencesProvider');
  }
  return context;
};

const defaultState: EquipmentPreferencesState = {
  primeMover: 'default',
  primeMoverOther: '',
  primeMoverBrand: 'default',
  controlsBrand: 'default',
  controlsBrandOther: '',
  switchgearBrand: 'default',
  switchgearBrandOther: '',
  standard: 'All (Default)',
  standardOther: '',
};

export const EquipmentPreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [equipmentPreferencesState, setEquipmentPreferencesState] = useState<EquipmentPreferencesState>(() => {
    const savedState = localStorage.getItem('equipmentPreferencesState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('equipmentPreferencesState', JSON.stringify(equipmentPreferencesState));
  }, [equipmentPreferencesState]);

  const updateField = (field: keyof EquipmentPreferencesState, value: string) => {
    setEquipmentPreferencesState(prevState => {
      const newState = { ...prevState, [field]: value };
      if (field === 'primeMover') {
        newState.primeMoverBrand = 'default';
        newState.primeMoverOther = '';
      }
      return newState;
    });
  };

  return (
    <EquipmentPreferencesContext.Provider value={{ equipmentPreferencesState, updateField }}>
      {children}
    </EquipmentPreferencesContext.Provider>
  );
};