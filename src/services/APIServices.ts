import { ORGANIZATION_DATA, ADDRESS_DATA, ENERGY_INTERVAL_DATA } from './Constants';
import { DashboardData } from '../Context/DashboardDataContext'; // Import the interface

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
            headers: { 'Content-Type': 'application/json' },
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

let globalResponse: any = null;

// Facility Address
export const updateFacilityAddresses = async (data: AddressData[]): Promise<void> => {
    try {
        const response = await fetch(ADDRESS_DATA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        globalResponse = await response.json();
        console.log('Facility addresses updated successfully', globalResponse);
    } catch (error) {
        console.error('Error updating facility addresses:', error);
    }
};

// Bill Upload
export const uploadBillData = async (Files: File[], sources: string[]): Promise<DashboardData | null> => {
    try {
        const uuids: string[] = globalResponse.mapping;
        const formData = new FormData();

        // Append each file
        Files.forEach(file => {
            formData.append('files', file);
        });

        // Append each corresponding source
        sources.forEach(source => {
            formData.append('sources', source);
        });

        // Append UUIDs
        uuids.forEach(uuid => {
            formData.append('uuids', uuid);
        });

        console.log("Form data being sent:", formData);

        const response = await fetch(ENERGY_INTERVAL_DATA, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData: DashboardData = await response.json();
        console.log('Bill data uploaded successfully');
        return responseData; // Return the parsed JSON data

    } catch (error) {
        console.error('Error uploading bill data:', error);
        return null; // Return null on error
    }
};