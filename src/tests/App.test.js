import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import PlanetProvider from '../context/PlanetProvider';
import testData from '../../cypress/mocks/testData';
import fetch from '../../cypress/mocks/fetch';

describe ('Carrega tela', () => {
  it('Testa se chama a api', async() => {

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData) }));

    render(<PlanetProvider><App /></PlanetProvider>);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');

    // const loading = (screen.findByRole('h1', { name: /Loading.../i }));
    // await waitFor(() => {
    //   expect(loading).not.toBeInTheDocument();
    // });

    const planetaAlderaan = await screen.findByText('Alderaan');
    expect(planetaAlderaan).toBeInTheDocument();
  });
  jest.clearAllMocks();
});
