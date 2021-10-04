import React from 'react';
import {
  createMatchMedia,
  render,
  screen,
  waitForElementToBeRemoved,
} from '../test-utils';
import EstimationsList from './estimations-list';
import fetchMock from 'jest-fetch-mock';
import {estimationApi} from '../services/estimation-api';
import {store} from '../store';
import userEvent from '@testing-library/user-event';

describe('<EstimationsList />', () => {
  beforeEach(() => {
    store.dispatch(estimationApi.util.resetApiState());
    fetchMock.resetMocks();
    fetchMock.mockResponse(
      JSON.stringify([
        {
          data: {
            id: 1,
            attributes: {
              country: 'fr',
              electricity_unit: 'mwh',
              electricity_value: '42.0',
            },
          },
        },
        {
          data: {
            id: 2,
            attributes: {
              country: 'ca',
              electricity_unit: 'kwh',
              electricity_value: '31.0',
            },
          },
        },
      ])
    );
  });

  test('should render a grid with the estimations', async () => {
    render(<EstimationsList />);
    await waitForElementToBeRemoved(
      screen.getByLabelText('Estimations loading indicator')
    );

    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('Unit')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByRole('cell', {name: 'France'})).toBeInTheDocument();
    expect(screen.getByRole('cell', {name: '42.0'})).toBeInTheDocument();
    expect(screen.getByRole('cell', {name: 'mwh'})).toBeInTheDocument();
    expect(screen.getByRole('cell', {name: 'Canada'})).toBeInTheDocument();
    expect(screen.getByRole('cell', {name: '31.0'})).toBeInTheDocument();
    expect(screen.getByRole('cell', {name: 'kwh'})).toBeInTheDocument();
  });

  test('should set a dynamic size of the columns for tablet and desktop devices', async () => {
    window.matchMedia = createMatchMedia(1440);

    render(<EstimationsList />);
    await waitForElementToBeRemoved(
      screen.getByLabelText('Estimations loading indicator')
    );

    expect(screen.getAllByRole('columnheader')[0].style.width).toBe('50px');
    expect(screen.getAllByRole('columnheader')[0].style.maxWidth).toBe('50px');
  });

  test('should adjust the to the default fixed size the columns for mobile devices', async () => {
    window.matchMedia = createMatchMedia(480);

    render(<EstimationsList />);
    await waitForElementToBeRemoved(
      screen.getByLabelText('Estimations loading indicator')
    );

    expect(screen.getAllByRole('columnheader')[0].style.width).toBe('100px');
    expect(screen.getAllByRole('columnheader')[0].style.maxWidth).toBe('100px');
  });

  test('should display just the rows with the selected country', async () => {
    render(<EstimationsList />);
    await waitForElementToBeRemoved(
      screen.getByLabelText('Estimations loading indicator')
    );

    userEvent.click(screen.getByRole('button', {name: 'Filter by country ​'}));
    await screen.findByRole('option', {name: 'France'});
    userEvent.click(screen.getByRole('option', {name: 'France'}));

    expect(screen.getByRole('cell', {name: 'France'})).toBeInTheDocument();
    expect(screen.getByRole('cell', {name: '42.0'})).toBeInTheDocument();
    expect(screen.getByRole('cell', {name: 'mwh'})).toBeInTheDocument();
    expect(
      screen.queryByRole('cell', {name: 'Canada'})
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('cell', {name: '31.0'})).not.toBeInTheDocument();
    expect(screen.queryByRole('cell', {name: 'kwh'})).not.toBeInTheDocument();
  });

  test('should display all the rows if the selected filter is the empty one', async () => {
    render(<EstimationsList />);
    await waitForElementToBeRemoved(
      screen.getByLabelText('Estimations loading indicator')
    );

    userEvent.click(screen.getByRole('button', {name: 'Filter by country ​'}));
    await screen.findByRole('option', {name: 'France'});
    userEvent.click(screen.getByRole('option', {name: 'France'}));
    userEvent.click(
      screen.getByRole('button', {name: 'Filter by country France'})
    );
    await screen.findByRole('option', {name: 'None'});
    userEvent.click(screen.getByRole('option', {name: 'None'}));

    expect(screen.getByRole('cell', {name: 'France'})).toBeInTheDocument();
    expect(screen.getByRole('cell', {name: '42.0'})).toBeInTheDocument();
    expect(screen.getByRole('cell', {name: 'mwh'})).toBeInTheDocument();
    expect(screen.getByRole('cell', {name: 'Canada'})).toBeInTheDocument();
    expect(screen.getByRole('cell', {name: '31.0'})).toBeInTheDocument();
    expect(screen.getByRole('cell', {name: 'kwh'})).toBeInTheDocument();
  });
});
