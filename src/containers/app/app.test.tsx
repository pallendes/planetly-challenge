import React from 'react';
import fetchMock from 'jest-fetch-mock';
import App from './app';
import {render, screen} from '../../test-utils';

describe('<App />', () => {
  beforeEach(() => {
    fetchMock.mockResponse(
      JSON.stringify([{data: {id: 'id', attributes: {}}}])
    );
  });

  afterEach(() => {
    fetchMock.mockClear();
  });

  test('should render all the elements', () => {
    render(<App />);

    expect(screen.getByText('Electricity Usage')).toBeInTheDocument();
  });
});
