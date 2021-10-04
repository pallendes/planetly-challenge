import React from 'react';
import {
  Container,
  Typography,
  Paper,
  CssBaseline,
  AppBar,
  Toolbar,
} from '@mui/material';
import Form from 'components/form';
import Chart from 'components/chart';
import EstimationsList from 'components/estimations-list';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="h1" noWrap>
            Carbon Emissions Estimator
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{mt: 7}}>
        <Paper sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
          <Typography component="h2" variant="h4" align="center" sx={{p: 2}}>
            Electricity Usage
          </Typography>
          <Form />
        </Paper>
        <Paper sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
          <Typography component="h2" variant="h4" align="center" sx={{p: 2}}>
            Estimations
          </Typography>
          <EstimationsList />
        </Paper>
        <Paper sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
          <Typography component="h2" variant="h4" align="center" sx={{p: 2}}>
            Chart
          </Typography>
          <Chart />
        </Paper>
      </Container>
    </>
  );
};

export default App;
