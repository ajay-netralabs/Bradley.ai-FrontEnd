const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const ORGANIZATION_DATA = `${BASE_URL}/api/organization-data/`;
export const ADDRESS_DATA = `${BASE_URL}/api/address-data/`;
export const ENERGY_INTERVAL_DATA = `${BASE_URL}/api/energy-interval-data/`;
export const THERMAL_ENERGY_NEEDS_I_DATA = `${BASE_URL}/api/thermal-energy-needs-i/`;
export const THERMAL_ENERGY_NEEDS_II_DATA = `${BASE_URL}/api/thermal-energy-needs-ii/`;
export const THERMAL_ENERGY_NEEDS_III_DATA = `${BASE_URL}/api/thermal-energy-needs-iii/`;
export const THERMAL_ENERGY_NEEDS_IV_DATA = `${BASE_URL}/api/thermal-energy-needs-iv/`;
export const EXISTING_BOILER_COGENERATION_DATA = `${BASE_URL}/api/existing-boiler-cogeneration/`;
