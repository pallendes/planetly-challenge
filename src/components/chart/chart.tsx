import React, {useState, useEffect} from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Grid,
  SelectChangeEvent,
  Typography,
  CircularProgress,
} from '@mui/material';
import _get from 'lodash/get';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import {
  availableUnits,
  dedupEstimations,
  getCountryFromISOCode,
} from '../utils';
import {useGetEstimationsQuery} from 'services/estimation-api';
import {ChartData, ChartProps, DetailsText} from './types';

const Chart: React.FC<ChartProps> = ({selectedBar}) => {
  const {data, isFetching} = useGetEstimationsQuery();

  const [selectedUnit, setSelectedUnit] = useState<string>('carbon_kg');
  const [selectedUnitLabel, setSelectedUnitLabel] = useState<string>('Kg');
  const [selectedBarIndex, setSelectedBarIndex] = useState<number>(-1);
  const [chartData, setChartData] = useState<Array<ChartData>>([]);
  const [details, setDetails] = useState<DetailsText | null>(null);

  useEffect(() => {
    const data = buildData();
    setChartData(data);

    if (selectedBar && !isFetching) {
      setSelectedBarIndex(Number(selectedBar));
      setDetails({
        country: getCountryFromISOCode(data[0].name),
        emissions: data[0].CO2,
      });
    }
  }, [selectedBar, isFetching, data, selectedUnit]);

  const buildData = (): Array<ChartData> => {
    if (!data) {
      return [];
    }

    const estimations = dedupEstimations(data);

    return estimations.map(({attributes}) => ({
      name: attributes.country.toUpperCase(),
      CO2: _get(attributes, selectedUnit),
    }));
  };

  const handleUnitSelection = (e: SelectChangeEvent) => {
    setSelectedUnit(e.target.value);
    setSelectedUnitLabel(
      availableUnits.find((unit) => unit.value === e.target.value)?.name || ''
    );
  };

  const handleBarClick = (data: ChartData, index: number) => {
    const countryName = getCountryFromISOCode(data.name);

    setDetails({country: countryName, emissions: data.CO2});
    setSelectedBarIndex(index);
  };

  return (
    <Grid
      container
      spacing={2}
      component="section"
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      {isFetching ? (
        <Grid item xs={12} sx={{height: 400}}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{height: '100%'}}
          >
            <CircularProgress aria-label="Chart loading animation" />
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <Typography component="h3" variant="h6" sx={{textAlign: 'center'}}>
              Carbon emissions ({selectedUnitLabel})
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} data-testid="chart-container">
            <ResponsiveContainer
              width={process.env.NODE_ENV === 'test' ? 400 : '100%'}
              height={500}
            >
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" allowDuplicatedCategory={false} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="CO2" onClick={handleBarClick}>
                  {chartData.map((entry, index) => (
                    <Cell
                      cursor="pointer"
                      fill={index === selectedBarIndex ? '#82ca9d' : '#8884d8'}
                      key={`cell-${index}`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} sm={4} alignSelf="flex-start">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl variant="standard" sx={{width: '100%'}}>
                  <InputLabel id="chart-unit-label">
                    Unit of measurement
                  </InputLabel>
                  <Select
                    labelId="chart-unit-label"
                    id="chartUnit"
                    label="Unit of measurement"
                    value={selectedUnit}
                    onChange={handleUnitSelection}
                  >
                    {availableUnits.map(({value, name}, i) => (
                      <MenuItem key={`${value}-${i}`} value={value}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography component="h3" variant="h5">
                  Details:
                </Typography>
                {details === null ? (
                  <Typography>Click on any graph to see details</Typography>
                ) : (
                  <>
                    <Typography>
                      <b>Country:</b> {details.country}
                    </Typography>
                    <Typography>
                      <b>Emissions:</b> {details.emissions}
                      {selectedUnitLabel}
                    </Typography>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Chart;
