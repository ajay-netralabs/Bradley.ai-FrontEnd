import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface BreakerAmperageField {
  id: string;
  value: string;
}

interface Breaker {
  id: string;
  amperageFields: BreakerAmperageField[];
}

interface SiteCharacteristicsIState {
  isBreakerSpaceAvailable: boolean;
  overallFacilitySize: string;
  commonAreaSquareFootage: string;
  yearBuildingOperation: string;
  primaryUtilityEntry: string;
  secondaryUtilityEntry: string;
  numberOfOpenBreakers: string;
  breakers: Breaker[];
}

interface SiteCharacteristicsIContextType {
  siteCharacteristicsIState: SiteCharacteristicsIState;
  updateField: (field: keyof Omit<SiteCharacteristicsIState, 'breakers' | 'numberOfOpenBreakers'>, value: string | boolean) => void;
  handleNumberOfBreakersChange: (value: string) => void;
  addBreaker: () => void;
  removeBreaker: (breakerIndex: number) => void;
  // addAmperageField: (breakerIndex: number) => void;
  // removeAmperageField: (breakerIndex: number, fieldIndex: number) => void;
  updateAmperageField: (breakerIndex: number, fieldIndex: number, value: string) => void;
}

const SiteCharacteristicsIContext = createContext<SiteCharacteristicsIContextType | undefined>(undefined);

export const useSiteCharacteristicsI = () => {
  const context = useContext(SiteCharacteristicsIContext);
  if (!context) {
    throw new Error('useSiteCharacteristicsI must be used within a SiteCharacteristicsIProvider');
  }
  return context;
};

const defaultState: SiteCharacteristicsIState = {
  isBreakerSpaceAvailable: false,
  overallFacilitySize: '',
  commonAreaSquareFootage: '',
  yearBuildingOperation: '',
  primaryUtilityEntry: 'Option 1',
  secondaryUtilityEntry: 'Option 0',
  numberOfOpenBreakers: '',
  breakers: [],
};

export const SiteCharacteristicsIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteCharacteristicsIState, setSiteCharacteristicsIState] = useState<SiteCharacteristicsIState>(() => {
    const savedState = localStorage.getItem('siteCharacteristicsIState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('siteCharacteristicsIState', JSON.stringify(siteCharacteristicsIState));
  }, [siteCharacteristicsIState]);

  const updateField = (field: keyof Omit<SiteCharacteristicsIState, 'breakers' | 'numberOfOpenBreakers'>, value: string | boolean) => {
    setSiteCharacteristicsIState(prevState => ({ ...prevState, [field]: value }));
  };

  const handleNumberOfBreakersChange = (value: string) => {
    const numValue = parseInt(value, 10);
    if (value === '' || (numValue >= 1 && numValue <= 5)) {
        setSiteCharacteristicsIState(prevState => {
            const newBreakers: Breaker[] = [];
            if (value === '') {
                // Keep newBreakers as empty array
            } else {
                for (let i = 0; i < numValue; i++) {
                    const existingBreaker = prevState.breakers[i];
                    newBreakers.push({
                        id: existingBreaker?.id || `breaker-${Date.now()}-${i}`,
                        amperageFields: existingBreaker?.amperageFields || [{ id: `amperage-${Date.now()}-${i}-0`, value: '' }]
                    });
                }
            }
            return { ...prevState, numberOfOpenBreakers: value, breakers: newBreakers };
        });
    }
  };

  const addBreaker = () => {
    setSiteCharacteristicsIState(prevState => {
        if (prevState.breakers.length < 5) {
            const newBreaker: Breaker = { id: `breaker-${Date.now()}`, amperageFields: [{ id: `amperage-${Date.now()}-0`, value: '' }]};
            const newBreakers = [...prevState.breakers, newBreaker];
            return { ...prevState, breakers: newBreakers, numberOfOpenBreakers: newBreakers.length.toString() };
        }
        return prevState;
    });
  };

  const removeBreaker = (breakerIndex: number) => {
    setSiteCharacteristicsIState(prevState => {
        if (prevState.breakers.length > 0) {
            const newBreakers = prevState.breakers.filter((_, index) => index !== breakerIndex);
            return { ...prevState, breakers: newBreakers, numberOfOpenBreakers: newBreakers.length.toString() };
        }
        return prevState;
    });
  };

  // const addAmperageField = (breakerIndex: number) => {
  //   setSiteCharacteristicsIState(prevState => {
  //       const newBreakers = [...prevState.breakers];
  //       const breaker = newBreakers[breakerIndex];
  //       if (breaker && breaker.amperageFields.length < 3) {
  //           const newAmperageField: BreakerAmperageField = { id: `amperage-${breaker.id}-${breaker.amperageFields.length}`, value: '' };
  //           breaker.amperageFields.push(newAmperageField);
  //           return { ...prevState, breakers: newBreakers };
  //       }
  //       return prevState;
  //   });
  // };

  // const removeAmperageField = (breakerIndex: number, fieldIndex: number) => {
  //   setSiteCharacteristicsIState(prevState => {
  //       const newBreakers = [...prevState.breakers];
  //       const breaker = newBreakers[breakerIndex];
  //       if (breaker && breaker.amperageFields.length > 1) {
  //           breaker.amperageFields = breaker.amperageFields.filter((_, index) => index !== fieldIndex);
  //           return { ...prevState, breakers: newBreakers };
  //       }
  //       return prevState;
  //   });
  // };

  const updateAmperageField = (breakerIndex: number, fieldIndex: number, value: string) => {
    setSiteCharacteristicsIState(prevState => {
        const newBreakers = [...prevState.breakers];
        if (newBreakers[breakerIndex]?.amperageFields[fieldIndex]) {
            newBreakers[breakerIndex].amperageFields[fieldIndex].value = value;
            return { ...prevState, breakers: newBreakers };
        }
        return prevState;
    });
  };

  return (
    <SiteCharacteristicsIContext.Provider value={{ siteCharacteristicsIState, updateField, handleNumberOfBreakersChange, addBreaker, removeBreaker, /* addAmperageField, removeAmperageField, */ updateAmperageField }}>
      {children}
    </SiteCharacteristicsIContext.Provider>
  );
};