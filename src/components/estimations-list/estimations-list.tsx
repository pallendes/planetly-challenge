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
import {availableCountries, getCountryFromISOCode} from '../utils';

const EstimationsList: React.FC = () => {
  const {data, isFetching} = useGetEstimationsQuery();
  const notMobile = useMediaQuery(`(min-width:600px)`);

  const [selectedCountryFilter, setSelectedCountryFilter] =
    useState<string>('');
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [columns, setColumns] = useState<Array<GridColDef>>([]);

  useEffect(() => {
    const coldefs: GridColDef[] = [
      {field: 'countryName', headerName: 'Country'},
      {field: 'electricity_value', headerName: 'Value'},
      {field: 'electricity_unit', headerName: 'Unit'},
      {field: 'carbon_g', headerName: 'CO2 (g)'},
      {field: 'carbon_kg', headerName: 'CO2 (Kg)'},
      {field: 'carbon_lb', headerName: 'CO2 (lb)'},
      {field: 'carbon_mt', headerName: 'CO2 (MT)'},
    ];

    if (notMobile) {
      const autoSizedColsDef = coldefs.map((column) => ({
        ...column,
        flex: 1,
      }));

      setColumns(autoSizedColsDef);
    } else {
      setColumns(coldefs);
    }

    setRows(mapDataToRows());
  }, [data, notMobile]);

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
                  <InputLabel id="country-filter-label">
                    Filter by country
                  </InputLabel>
                  <Select
                    labelId="country-filter-label"
                    id="countryFilter"
                    label="Filter by country"
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
            <DataGrid columns={columns} rows={rows} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default EstimationsList;
