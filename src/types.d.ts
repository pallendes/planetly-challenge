export type ElectricityUnits = 'mwh' | 'kwh';

export interface Estimation {
  id: string;
  type: string;
  attributes: {
    country: string;
    state: string;
    electricity_unit: ElectricityUnits;
    electricity_value: number;
    estimated_at: string;
    carbon_g: number;
    carbon_lb: number;
    carbon_kg: number;
    carbon_mt: number;
  };
}

export interface EstimationCreation {
  type: 'electricity';
  country: string;
  state?: string;
  electricity_unit: ElectricityUnits;
  electricity_value: number;
}
