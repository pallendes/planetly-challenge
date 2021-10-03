import React from 'react';
import {Formik, Field, FieldProps, Form as FormComponent} from 'formik';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {
  Button,
  Grid,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import {ElectricityUnits} from 'types';
import {availableCountries} from './utils';
import {useCreateEstimationMutation} from 'services/estimation-api';
import {actions} from './slice';

interface EstimationForm {
  location: string;
  electricityUsage: number;
  electricityUnit: ElectricityUnits;
}

const Form: React.FC = () => {
  const [createEstimation] = useCreateEstimationMutation();
  const dispatch = useDispatch();

  const initialValues: EstimationForm = {
    location: '',
    electricityUsage: 0,
    electricityUnit: 'kwh',
  };

  const formSchema = Yup.object().shape({
    location: Yup.string().required('Please select a location'),
    electricityUsage: Yup.number().required(
      'Please enter a value for your electricity usage'
    ),
    electricityUnit: Yup.string().required('Please select a measurment unit'),
  });

  const onSubmit = async (data: EstimationForm) => {
    try {
      const createdEstimation = await createEstimation({
        type: 'electricity',
        country: data.location,
        electricity_unit: data.electricityUnit,
        electricity_value: data.electricityUsage,
      }).unwrap();

      dispatch(actions.saveEstimation(createdEstimation.data));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >
      <Grid container spacing={3} component={FormComponent} noValidate>
        <Grid item xs={12}>
          <Field name="location">
            {({field, meta: {error, touched}}: FieldProps) => (
              <FormControl
                variant="standard"
                sx={{width: '100%'}}
                error={!!error}
              >
                <InputLabel id="location-label">Location</InputLabel>
                <Select
                  labelId="location-label"
                  id="location"
                  label="Location"
                  {...field}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {availableCountries.map(({value, name}, i) => (
                    <MenuItem key={`${value}-${i}`} value={value}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched && error ? error : ''}</FormHelperText>
              </FormControl>
            )}
          </Field>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name="electricityUsage">
            {({field, meta: {error, touched}}: FieldProps) => (
              <TextField
                required
                id="electricityUsage"
                label="Electricity usage"
                fullWidth
                variant="standard"
                helperText={touched && error ? error : ''}
                error={!!error}
                {...field}
              />
            )}
          </Field>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name="electricityUnit">
            {({field}: FieldProps) => (
              <FormControl variant="standard" sx={{width: '100%'}}>
                <InputLabel id="electricity-unit-label">
                  Unit of measurement
                </InputLabel>
                <Select
                  labelId="electricity-unit-label"
                  id="electricityUnit"
                  label="Unit of measurement"
                  {...field}
                >
                  <MenuItem value="kwh">KWH</MenuItem>
                  <MenuItem value="mwh">MWH</MenuItem>
                </Select>
              </FormControl>
            )}
          </Field>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end" flexDirection="row">
            <Button sx={{mr: 2}}>Reset</Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Formik>
  );
};

export default Form;
