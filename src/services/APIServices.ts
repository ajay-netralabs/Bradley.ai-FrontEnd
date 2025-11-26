import { ORGANIZATION_DATA, ADDRESS_DATA, ENERGY_INTERVAL_DATA, THERMAL_ENERGY_NEEDS_I_DATA, THERMAL_ENERGY_NEEDS_II_DATA, THERMAL_ENERGY_NEEDS_III_DATA, THERMAL_ENERGY_NEEDS_IV_DATA, EXISTING_BOILER_COGENERATION_DATA } from './Constants';
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

export interface OrgDetailsResponse {
message: string;
organization_id: string;
}

export interface AddressPayload {
streetAddress: string;
city: string;
state: string;
zipCode: string;
organizationId: string;
areaSqFt: string;
operationalStart: string;
operationalEnd: string;
}

export interface BillMetadata {
id: string;
name: string;
size: string;
type: 'electric' | 'gas';
dateRange: { start: string; end: string };
addressId: string;
}

export interface ThermalEnergyNeedsI {
showSteam: boolean;
annualSteamUsage: string;
steamPressureRange: string;
exactSteamPressure: string;
steamUsageConsistency: string;
condensateReturn: string;
returnFLOW: string;
returnCondensateTemperature: string;
makeUpWater: string;
}

export interface ThermalEnergyNeedsII {
showHotWaterHVAC: boolean;
showHotWaterBoilers: boolean;
showSteam2HWDomestic: boolean;
showSteam2HWAHU: boolean;
showSteam4Washdowns: boolean;
hotWaterUsage: string;
hotWaterTemperature: string;
hotWaterUsageTypeAmount: string;
hotWaterUsageTypeReason: string;
preheatForSteam: string;
foodWashdowns: string;
otherUsage: string;
boilerCapacity: string;
boilerBHP: string;
boilerType: string;
boilerModulation: string;
boilerCount: string;
bhpBoilerCount: string;
}

export interface ThermalEnergyNeedsIII {
showChilledWater: boolean;
chilledCapacity: string;
coolingTonHours: string;
temperatureLeaving: string;
additionalDemand: string;
temperatureReturning: string;
pumpHp: string;
pumpCount: string;
}

export interface WasteHeatSource {
type: string;
temperature: string;
flowRate: string;
utilization: string;
}

export interface ThermalEnergyNeedsIV {
showWasteHeat: boolean;
wasteHeatSources: WasteHeatSource[];
benefitFromUtilization: string;
}

export interface BoilerCogenerationSource {
type: string;
capacity: string;
fuelSource: string;
efficiency: string;
age: string;
operatingPressure: string;
history: string;
utilization: string;
volume: string;
wasteHeatCaptured: string;
}

export interface ExistingBoilerCogeneration {
sources: BoilerCogenerationSource[];
}

// --- NEW: Custom HTTP Error Class ---
/**
 * A custom error class that includes the HTTP status code.
 */
class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

// --- NEW: Error Message Helper Function ---
/**
 * Generates a user-friendly error message based on the HTTP status code.
 * @param error The caught error object.
 * @param specialCodes A map of special status codes for this specific endpoint (e.g., { 409: "Specific message" }).
 * @returns A user-friendly error string.
 */
const getFriendlyErrorMessage = (error: any, specialCodes: { [key: number]: string } = {}): string => {
  if (error instanceof HttpError) {
    const status = error.status;

    // Check for special codes first
    if (specialCodes[status]) {
      return specialCodes[status];
    }

    // Check for common codes
    switch (status) {
      case 400:
        return "Invalid data provided for one or more fields.";
      case 422:
        return "Data provided in invalid format for one or more fields.";
      case 404:
        return "Resource not found.";
      case 415:
        return "File or uploaded data format not supported.";
      case 500:
        return "Something went wrong. Please try after some time.";
      default:
        return `An unexpected error occurred.`;
    }
  }
  // Fallback for non-HTTP errors
  return error.message || "An unknown error occurred.";
};


// --- API Service Functions (Updated) ---

// Organization Details
export const updateOrganizationDetails = async (data: OrganizationDetails): Promise<string> => {
try {
const response = await fetch(ORGANIZATION_DATA, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data),
});
if (!response.ok) {
// Throw custom error with status
throw new HttpError(`HTTP error! status: ${response.status}`, response.status);
}
const responseData: OrgDetailsResponse = await response.json();
console.log('Organization details updated successfully');
return responseData.organization_id;
} catch (error) {
// Generate friendly message and re-throw for the component to catch
const friendlyMessage = getFriendlyErrorMessage(error);
console.error('Error updating organization details:', friendlyMessage, error);
throw new Error(friendlyMessage);
}
};

export interface AddressUpdateResponse {
message: string;
facility_ids: string[];
}

// Facility Address
export const updateFacilityAddresses = async (data: AddressPayload[]): Promise<AddressUpdateResponse> => {
try {
const response = await fetch(ADDRESS_DATA, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data),
});
if (!response.ok) {
// Throw custom error with status
throw new HttpError(`HTTP error! status: ${response.status}`, response.status);
}
const responseData: AddressUpdateResponse = await response.json();
console.log('Facility addresses updated successfully', responseData);
return responseData;
} catch (error) {
// Generate friendly message (with special 409 code) and re-throw
const friendlyMessage = getFriendlyErrorMessage(error, { 
  409: "Invalid ZipCode/Address data provided." 
});
console.error('Error updating facility addresses:', friendlyMessage, error);
throw new Error(friendlyMessage);
}
};

// Bill Upload
export const uploadBillData = async (Files: File[], sources: string[], uuids: string[]): Promise<DashboardData> => {
try {
const formData = new FormData();
Files.forEach(file => {
formData.append('files', file);
});
sources.forEach(source => {
formData.append('sources', source);
});
uuids.forEach(uuid => {
formData.append('uuids', uuid);
});

const response = await fetch(ENERGY_INTERVAL_DATA, {
method: 'POST',
body: formData,
});

if (!response.ok) {
// Throw custom error with status
throw new HttpError(`HTTP error! status: ${response.status}`, response.status);
}

const responseData: DashboardData = await response.json();
console.log('Bill data uploaded successfully');
return responseData;
} catch (error) {
// Generate friendly message (with special 415 code) and re-throw
const friendlyMessage = getFriendlyErrorMessage(error, { 
  415: "File or uploaded data format not supported." 
});
console.error('Error uploading bill data:', friendlyMessage, error);
throw new Error(friendlyMessage);
}
};

export const addThermalEnergyNeedsI = async (data: ThermalEnergyNeedsI, file_id: string): Promise<boolean> => {
try {
const payload = { ...data, file_id };
const response = await fetch(THERMAL_ENERGY_NEEDS_I_DATA, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
if (!response.ok) {
// Throw custom error with status
throw new HttpError(`HTTP error! status: ${response.status}`, response.status);
}
console.log('Thermal Energy Needs I data added successfully');
return true;
} catch (error) {
// Log friendly message and return false (as per original function's design)
const friendlyMessage = getFriendlyErrorMessage(error);
console.error('Error adding Thermal Energy Needs I data:', friendlyMessage, error);
return false;
}
};

export const addThermalEnergyNeedsII = async (data: ThermalEnergyNeedsII, file_id: string): Promise<boolean> => {
try {
const payload = { ...data, file_id };
const response = await fetch(THERMAL_ENERGY_NEEDS_II_DATA, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
if (!response.ok) {
// Throw custom error with status
throw new HttpError(`HTTP error! status: ${response.status}`, response.status);
}
console.log('Thermal Energy Needs II data added successfully');
return true;
} catch (error) {
// Log friendly message and return false
const friendlyMessage = getFriendlyErrorMessage(error);
console.error('Error adding Thermal Energy Needs II data:', friendlyMessage, error);
return false;
}
};

export const addThermalEnergyNeedsIII = async (data: ThermalEnergyNeedsIII, file_id: string): Promise<boolean> => {
try {
const payload = { ...data, file_id };
const response = await fetch(THERMAL_ENERGY_NEEDS_III_DATA, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
if (!response.ok) {
// Throw custom error with status
throw new HttpError(`HTTP error! status: ${response.status}`, response.status);
}
console.log('Thermal Energy Needs III data added successfully');
return true;
} catch (error) {
// Log friendly message and return false
const friendlyMessage = getFriendlyErrorMessage(error);
console.error('Error adding Thermal Energy Needs III data:', friendlyMessage, error);
return false;
}
};

export const addThermalEnergyNeedsIV = async (data: ThermalEnergyNeedsIV, file_id: string): Promise<boolean> => {
try {
const payload = { ...data, file_id };
const response = await fetch(THERMAL_ENERGY_NEEDS_IV_DATA, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
if (!response.ok) {
// Throw custom error with status
throw new HttpError(`HTTP error! status: ${response.status}`, response.status);
}
console.log('Thermal Energy Needs IV data added successfully');
return true;
} catch (error) {
// Log friendly message and return false
const friendlyMessage = getFriendlyErrorMessage(error);
console.error('Error adding Thermal Energy Needs IV data:', friendlyMessage, error);
return false;
}
};

export const addExistingBoilerCogeneration = async (data: ExistingBoilerCogeneration, file_id: string): Promise<boolean> => {
try {
const payload = { ...data, file_id };
const response = await fetch(EXISTING_BOILER_COGENERATION_DATA, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
if (!response.ok) {
// Throw custom error with status
throw new HttpError(`HTTP error! status: ${response.status}`, response.status);
}
console.log('Existing Boiler Cogeneration data added successfully');
return true;
} catch (error) {
// Log friendly message and return false
const friendlyMessage = getFriendlyErrorMessage(error);
console.error('Error adding Existing Boiler Cogeneration data:', friendlyMessage, error);
return false;
}
};
