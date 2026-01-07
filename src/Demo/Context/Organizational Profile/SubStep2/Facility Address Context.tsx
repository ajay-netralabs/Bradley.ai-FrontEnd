import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import L from 'leaflet';
import { v4 as uuidv4 } from 'uuid';

interface Address {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  areaSqFt: string;
  // otherAddress: string;
  operationalStart: string;
  operationalEnd: string;
}

interface AddressData {
  id: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  areaSqFt: string;
  // otherAddress: string;
  operationalStart: string;
  operationalEnd: string;
  position: L.LatLng;
}

interface FacilityAddressState {
  addresses: AddressData[];
  selectedAddressId: string | null;
}

interface FacilityAddressContextType {
  facilityAddressState: FacilityAddressState;
  updateFacilityAddress: (newState: Partial<FacilityAddressState>) => void;
  addAddress: (addressData: Omit<AddressData, 'id'>) => string;
  updateAddress: (addressId: string, updates: Partial<Omit<AddressData, 'id'>>) => void;
  updateAddressField: (addressId: string, field: keyof Address, value: string) => void;
  deleteAddress: (addressId: string) => void;
  setSelectedAddress: (addressId: string | null) => void;
  getAddressById: (addressId: string) => AddressData | undefined;
}

const FacilityAddressContext = createContext<FacilityAddressContextType | undefined>(undefined);

export const useFacilityAddress = () => {
  const context = useContext(FacilityAddressContext);
  if (!context) {
    throw new Error('useFacilityAddress must be used within a FacilityAddressProvider');
  }
  return context;
};

interface FacilityAddressProviderProps {
  children: ReactNode;
}

const defaultState: FacilityAddressState = {
  addresses: [],
  selectedAddressId: null,
};

const generateId = (): string => uuidv4();;

export const FacilityAddressProvider: React.FC<FacilityAddressProviderProps> = ({ children }) => {
  const [facilityAddressState, setFacilityAddressState] = useState<FacilityAddressState>(() => {
    const savedState = Cookies.get('emissioncheckiq_facilityAddressState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        if (parsedState && 
            typeof parsedState === 'object' && 
            Array.isArray(parsedState.addresses)) {
          
          const rehydratedAddresses = parsedState.addresses
            .map((addr: any) => ({
              ...addr,
              position: addr.position ? new L.LatLng(addr.position.lat, addr.position.lng) : null,
            }))
            .filter((addr: any) => addr.position !== null);

          return {
            addresses: rehydratedAddresses,
            selectedAddressId: parsedState.selectedAddressId || null,
          };
        }
      } catch (error) {
        console.error('Error parsing saved facility address state:', error);
      }
    }
    return defaultState;
  });

  useEffect(() => {
    if (!facilityAddressState.addresses || !Array.isArray(facilityAddressState.addresses)) {
      console.warn('facilityAddress.addresses is not an array, skipping save to cookies');
      return;
    }

    const stateToSave = {
      ...facilityAddressState,
      addresses: facilityAddressState.addresses.map(addr => ({
        ...addr,
        position: addr.position
          ? { lat: addr.position.lat, lng: addr.position.lng }
          : null,
      })),
    };
    Cookies.set('emissioncheckiq_facilityAddressState', JSON.stringify(stateToSave));
  }, [facilityAddressState]);

  const updateFacilityAddress = (newState: Partial<FacilityAddressState>) => {
    setFacilityAddressState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const addAddress = (addressData: Omit<AddressData, 'id'>): string => {
    const newId = generateId();
    const newAddress: AddressData = {
      ...addressData,
      id: newId,
    };

    setFacilityAddressState((prevState) => ({
      ...prevState,
      addresses: [...(prevState.addresses || []), newAddress],
      selectedAddressId: newId,
    }));

    return newId;
  };

  const updateAddress = (addressId: string, updates: Partial<Omit<AddressData, 'id'>>) => {
    setFacilityAddressState((prevState) => ({
      ...prevState,
      addresses: (prevState.addresses || []).map(addr =>
        addr.id === addressId ? { ...addr, ...updates } : addr
      ),
    }));
  };

  const updateAddressField = (addressId: string, field: keyof Address, value: string) => {
    setFacilityAddressState((prevState) => ({
      ...prevState,
      addresses: (prevState.addresses || []).map(addr =>
        addr.id === addressId ? { ...addr, [field]: value } : addr
      ),
    }));
  };

  const deleteAddress = (addressId: string) => {
    setFacilityAddressState((prevState) => {
      const currentAddresses = prevState.addresses || [];
      const filteredAddresses = currentAddresses.filter(addr => addr.id !== addressId);
      return {
        ...prevState,
        addresses: filteredAddresses,
        selectedAddressId: prevState.selectedAddressId === addressId 
          ? (filteredAddresses.length > 0 ? filteredAddresses[0].id : null)
          : prevState.selectedAddressId,
      };
    });
  };

  const setSelectedAddress = (addressId: string | null) => {
    setFacilityAddressState((prevState) => ({
      ...prevState,
      selectedAddressId: addressId,
    }));
  };

  const getAddressById = (addressId: string): AddressData | undefined => {
    return facilityAddressState.addresses?.find(addr => addr.id === addressId);
  };

  return (
    <FacilityAddressContext.Provider 
      value={{ 
        facilityAddressState, 
        updateFacilityAddress, 
        addAddress,
        updateAddress,
        updateAddressField, 
        deleteAddress,
        setSelectedAddress,
        getAddressById
      }}
    >
      {children}
    </FacilityAddressContext.Provider>
  );
};