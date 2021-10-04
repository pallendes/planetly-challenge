import {AlertColor} from '@mui/material';
import {ElectricityUnits} from 'types';

export interface EstimationForm {
  location: string;
  electricityUsage: string;
  electricityUnit: ElectricityUnits;
}

export interface NotificationSeverity {
  severity: AlertColor;
  message: string;
}
