import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';


interface Bill {
  id: string;
  name: string;
  size: string;
  type: 'grid' | 'gas' | 'water';
  dateRange: { start: string; end: string };
  addressId?: string; // addressId is now part of the bill
}

interface Address {
  id: string;
  address: string;
}

interface BillAddressContextType {
  bills: Bill[];
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
  addBill: (bill: Omit<Bill, 'id' | 'dateRange' | 'addressId'>) => void;
  removeBill: (billId: string) => void;
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
  assignAddressToBill: (billId: string, addressId: string) => void;
  getAssignedAddress: (billId: string) => string | undefined;
  isNextDisabled: () => boolean;
  updateBillDateRange: (billId: string, dateRange: { start: string; end: string }) => void;
}

const BillAddressContext = createContext<BillAddressContextType | undefined>(undefined);

interface BillAddressProviderProps {
  children: ReactNode;
  appPrefix: string;
}

export const BillAddressProvider = ({ children, appPrefix }: BillAddressProviderProps) => {
  const [bills, setBills] = useState<Bill[]>(() => {
    const saved = localStorage.getItem(`${appPrefix}_bills`);
    if (saved) {
      try {
        const parsedBills = JSON.parse(saved);
        return parsedBills.map((bill: any) => ({
          ...bill,
          dateRange: bill.dateRange || { start: '', end: '' },
        }));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem(`${appPrefix}_addresses`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(`${appPrefix}_bills`, JSON.stringify(bills));
  }, [bills, appPrefix]);

  useEffect(() => {
    localStorage.setItem(`${appPrefix}_addresses`, JSON.stringify(addresses));
  }, [addresses, appPrefix]);

  const addBill = (bill: Omit<Bill, 'id' | 'dateRange' | 'addressId'>) => {
    const newBill: Bill = { ...bill, id: `bill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, dateRange: { start: '', end: '' } };
    setBills(prev => [...prev, newBill]);
  };

  const removeBill = (billId: string) => {
    setBills(prev => prev.filter(b => b.id !== billId));
  };

  const assignAddressToBill = (billId: string, addressId: string) => {
    setBills(prevBills =>
      prevBills.map(bill =>
        bill.id === billId ? { ...bill, addressId: addressId } : bill
      )
    );
  };

  const getAssignedAddress = (billId: string) => {
    return bills.find(b => b.id === billId)?.addressId;
  };

  const isNextDisabled = () => {
    const hasUnassignedBill = bills.some(bill => !bill.addressId);
    const assignedAddressIds = new Set(bills.map(bill => bill.addressId).filter(Boolean));
    const hasUnassignedAddress = addresses.some(address => !assignedAddressIds.has(address.id));
    return hasUnassignedBill || hasUnassignedAddress;
  };

  const updateBillDateRange = (billId: string, dateRange: { start: string; end: string }) => {
    setBills(prev => prev.map(b => b.id === billId ? { ...b, dateRange } : b));
  };

  return (
    <BillAddressContext.Provider value={{
      bills,
      setBills,
      addBill,
      removeBill,
      addresses,
      setAddresses,
      assignAddressToBill,
      getAssignedAddress,
      isNextDisabled,
      updateBillDateRange,
    }}>
      {children}
    </BillAddressContext.Provider>
  );
};

export const useBillAddress = () => {
  const context = useContext(BillAddressContext);
  if (!context) {
    throw new Error('useBillAddress must be used within a BillAddressProvider');
  }
  return context;
};