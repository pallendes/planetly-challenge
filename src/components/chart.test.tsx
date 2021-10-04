import React from 'react';
import {render, screen, waitFor} from '../test-utils';
import Chart from './chart';
import fetchMock from 'jest-fetch-mock';
import userEvent from '@testing-library/user-event';

describe('<Chart />', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponse(
      JSON.stringify([
        {
          data: {
            id: 'id',
            attributes: {
              country: 'US',
              carbon_g: 16710476,
              carbon_lb: 36840.29,
              carbon_kg: 16710.48,
              carbon_mt: 16.71,
            },
          },
        },
      ])
    );
  });

  test('should render the chart', async () => {
    render(<Chart />);

    await waitFor(() =>
      expect(screen.getByTestId('chart-container')).toBeInTheDocument()
    );
  });

  test('should display detail information of a bar', async () => {
    render(<Chart selectedBar="0" />);
    await screen.findByText('US');

    await waitFor(() =>
      expect(screen.getByText('United Stated of America')).toBeInTheDocument()
    );
    expect(screen.getByText('16710.48Kg')).toBeInTheDocument();
  });

  test('should change the measurement unit', async () => {
    render(<Chart selectedBar="0" />);
    await screen.findByText('US');

    userEvent.click(
      screen.getByRole('button', {name: 'Unit of measurement Kg'})
    );
    await screen.findByText('Mt');
    userEvent.click(screen.getByText('Mt'));

    expect(screen.getByText('16710.48Mt')).toBeInTheDocument();
  });
});
