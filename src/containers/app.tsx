import React from 'react';
import {
  Container,
  Typography,
  Paper,
  CssBaseline,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import Form from './form';
import Chart from './chart';

const App: React.FC = () => {
  return (
    <React.Fragment>
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
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{mt: 7}}>
        <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
          <Typography component="h2" variant="h3" align="center" sx={{p: 2}}>
            Electricity Usage
          </Typography>
          <Form />
        </Paper>
        <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
          <Typography component="h2" variant="h3" align="center" sx={{p: 2}}>
            Chart
          </Typography>
          <Chart />
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default App;
