import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface Bill {
  id: string;
  name: string;
  size: string;
  type: 'electric' | 'gas';
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
  getUnassignedAddresses: () => Address[];
  isAddressAssigned: (addressId: string) => boolean;
  updateBillDateRange: (billId: string, dateRange: { start: string; end: string }) => void;
}

const BillAddressContext = createContext<BillAddressContextType | undefined>(undefined);

interface BillAddressProviderProps {
  children: ReactNode;
  appPrefix: string;
}

export const BillAddressProvider = ({ children, appPrefix }: BillAddressProviderProps) => {
  const [bills, setBills] = useState<Bill[]>(() => {
    const saved = Cookies.get(`${appPrefix}_bills`);
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
    const saved = Cookies.get(`${appPrefix}_addresses`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    Cookies.set(`${appPrefix}_bills`, JSON.stringify(bills));
  }, [bills, appPrefix]);

  useEffect(() => {
    Cookies.set(`${appPrefix}_addresses`, JSON.stringify(addresses));
  }, [addresses, appPrefix]);

  const addBill = (bill: Omit<Bill, 'id' | 'dateRange' | 'addressId'>) => {
    const newBill: Bill = { ...bill, id: `bill_${Date.now()}`, dateRange: { start: '', end: '' } };
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

  const isAddressAssigned = (addressId: string) => {
    return bills.some(bill => bill.addressId === addressId);
  };

  const getUnassignedAddresses = () => {
    const assignedAddressIds = bills.map(bill => bill.addressId).filter(Boolean);
    return addresses.filter(a => !assignedAddressIds.includes(a.id));
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
      getUnassignedAddresses,
      isAddressAssigned,
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