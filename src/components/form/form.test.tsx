import React from 'react';
import userEvent from '@testing-library/user-event';
import Form from './form';
import {render, screen, waitFor} from '../../test-utils';
import fetchMock from 'jest-fetch-mock';
import {estimationApi} from '../../services/estimation-api';
import {store} from '../../store';

describe('<Form />', () => {
  beforeEach(() => {
    store.dispatch(estimationApi.util.resetApiState());
    fetchMock.resetMocks();
  });

  test('should save the estimation and show a notification', async () => {
    fetchMock.mockResponse(
      JSON.stringify([{data: {id: 'id', attributes: {}}}])
    );

    render(<Form />);

    userEvent.click(screen.getByRole('button', {name: 'Location ​'}));
    await screen.findByText('United Stated of America');
    userEvent.click(screen.getByText('United Stated of America'));
    userEvent.type(
      screen.getByRole('spinbutton', {name: 'Electricity usage'}),
      '123'
    );
    userEvent.click(screen.getByText('Save'));

    await waitFor(
      () => expect(screen.getByText('Estimation created!')).toBeInTheDocument(),
      {timeout: 4000}
    );
  });

  test('should display an alert if the estimation creation fails', async () => {
    fetchMock.mockIf(/estimate/, (req) => {
      if (req.method === 'POST') {
        return Promise.reject(new Error('ERROR!'));
      }

      return Promise.resolve(
        JSON.stringify([{data: {id: 'id', attributes: {}}}])
      );
    });

    render(<Form />);

    userEvent.click(screen.getByRole('button', {name: 'Location ​'}));
    await screen.findByText('United Stated of America');
    userEvent.click(screen.getByText('France'));
    userEvent.type(
      screen.getByRole('spinbutton', {name: 'Electricity usage'}),
      '123'
    );
    userEvent.click(screen.getByText('Save'));

    await waitFor(() =>
      expect(
        screen.getByText(
          'An error ocurred trying to save your estimation, please try again'
        )
      ).toBeInTheDocument()
    );
  });

  test('should close the notification', async () => {
    fetchMock.mockResponse(
      JSON.stringify([{data: {id: 'id', attributes: {}}}])
    );

    render(<Form />);

    userEvent.click(screen.getByRole('button', {name: 'Location ​'}));
    await screen.findByText('United Stated of America');
    userEvent.click(screen.getByText('United Stated of America'));
    userEvent.type(
      screen.getByRole('spinbutton', {name: 'Electricity usage'}),
      '123'
    );
    userEvent.click(screen.getByText('Save'));
    await screen.findByText('Estimation created!');
    userEvent.click(screen.getByRole('button', {name: 'Close'}));

    await waitFor(() =>
      expect(screen.queryByText('Estimation created!')).not.toBeInTheDocument()
    );
  });

  test('should validate the inputs', async () => {
    fetchMock.mockResponse(
      JSON.stringify([{data: {id: 'id', attributes: {}}}])
    );

    render(<Form />);

    userEvent.click(screen.getByText('Save'));

    await waitFor(() =>
      expect(screen.getByText('Please select a location')).toBeVisible()
    );
    expect(screen.getByText('Please enter a value')).toBeVisible();
  });
});
