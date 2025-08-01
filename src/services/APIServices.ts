import { ORGANIZATION_DATA, ADDRESS_DATA, ENERGY_INTERVAL_DATA } from './Constants';

// --- Interfaces for Data Structures (simplified for API interaction) ---

export interface OrganizationDetails {
  organizationName: string;
  userName: string;
  userEmail: string;
  userTitle: string;
  organizationType: string;
  industry: string;
  irsCategory: string;
  employeeCount: string;
}

export interface AddressData {
  id: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface BillMetadata {
  id: string;
  name: string;
  size: string;
  type: 'electric' | 'gas';
  dateRange: { start: string; end: string };
  addressId: string;
}

// --- API Service Functions ---

// Organization Details
export const updateOrganizationDetails = async (data: OrganizationDetails): Promise<void> => {
  try {
    const response = await fetch(ORGANIZATION_DATA, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('Organization details updated successfully');
  } catch (error) {
    console.error('Error updating organization details:', error);
  }
};

// Facility Address
export const updateFacilityAddresses = async (data: AddressData[]): Promise<void> => {
  try {
    const response = await fetch(ADDRESS_DATA, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('Facility addresses updated successfully');
  } catch (error) {
    console.error('Error updating facility addresses:', error);
  }
};

// Bill Upload
export const uploadBillData = async (Files: File[]/* , electricBillMetadataList: BillMetadata[], */ /* gasFiles: File[], */ /* gasBillMetadataList: BillMetadata[] */): Promise<void> => {
  try {
    const formData = new FormData();
    Files.forEach(file => {
      formData.append('files', file);
    });
    // formData.append('electric_bill_metadata_list_json', JSON.stringify(electricBillMetadataList));
    // gasFiles.forEach(file => {
    //   formData.append('files', file);
    // });
    // formData.append('gas_bill_metadata_list_json', JSON.stringify(gasBillMetadataList));

    console.log("Form data: ", formData);

    const response = await fetch(ENERGY_INTERVAL_DATA, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('Bill data uploaded successfully');
  } catch (error) {
    console.error('Error uploading bill data:', error);
  }
};
