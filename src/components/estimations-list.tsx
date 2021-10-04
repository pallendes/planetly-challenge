import React, {useState, useEffect} from 'react';
import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  useMediaQuery,
} from '@mui/material';
import {useGetEstimationsQuery} from 'services/estimation-api';
import {availableCountries, getCountryFromISOCode} from './utils';

const EstimationsList: React.FC = () => {
  const {data, isFetching} = useGetEstimationsQuery();
  const notMobile = useMediaQuery(`(min-width:600px)`);

  const [selectedCountryFilter, setSelectedCountryFilter] =
    useState<string>('');
  const [rows, setRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    setRows(mapDataToRows());
  }, [data]);

  const buildColumns = () => {
    const columns: GridColDef[] = [
      {field: 'countryName', headerName: 'Country'},
      {field: 'electricity_unit', headerName: 'Unit'},
      {field: 'electricity_value', headerName: 'Value'},
      {field: 'carbon_g', headerName: 'CO2 G'},
      {field: 'carbon_kg', headerName: 'CO2 KG'},
      {field: 'carbon_lb', headerName: 'CO2 lb'},
      {field: 'carbon_mt', headerName: 'CO2 MT'},
    ];

    if (notMobile) {
      return columns.map((column) => ({
        ...column,
        flex: 1,
      }));
    }

    return columns;
  };

  const mapDataToRows = (): GridRowsProp => {
    if (!data) {
      return [];
    }

    return data.map(({attributes, id}) => ({
      ...attributes,
      id,
      countryName: getCountryFromISOCode(attributes.country),
    }));
  };

  const handleCountrySelectorFilter = (e: SelectChangeEvent) => {
    const filterValue = e.target.value;
    setSelectedCountryFilter(filterValue);

    if (filterValue === '') {
      setRows(mapDataToRows());
    } else {
      const filteredRows = mapDataToRows().filter(
        (row) => row.country === filterValue
      );

      setRows(filteredRows);
    }
  };

  return (
    <Grid container spacing={2} component="section">
      {isFetching ? (
        <Grid item xs={12} sx={{height: 400}}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{height: '100%'}}
          >
            <CircularProgress aria-label="Estimations loading indicator" />
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <Grid container justifyContent="flex-end" flexDirection="row">
              <Grid item xs={12} sm={4}>
                <FormControl variant="standard" sx={{width: '100%'}}>
                  <InputLabel id="electricity-unit-label">
                    Filter by country
                  </InputLabel>
                  <Select
                    labelId="electricity-unit-label"
                    id="electricityUnit"
                    label="Unit of measurement"
                    onChange={handleCountrySelectorFilter}
                    value={selectedCountryFilter}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {availableCountries.map(({value, name}, i) => (
                      <MenuItem
                        key={`${value}-${i}`}
                        value={value.toLowerCase()}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{height: 400}}>
            <DataGrid columns={buildColumns()} rows={rows} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default EstimationsList;
