import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import testData from '../../cypress/mocks/testData';


describe ('Carrega tela', () => {
  it('Testa se chama a api', async() => {

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData) }));

    render(<App />);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');

    const planetaAlderaan = await screen.findByText('Alderaan');
    expect(planetaAlderaan).toBeInTheDocument();

    jest.clearAllMocks();
  });
  it('Testa fitro de nome', async() => {

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData) }));
    render(<App />);
    const FilterByName= screen.getByTestId('name-filter');
    userEvent.type(FilterByName, 'ta');

    expect(FilterByName).toBeInTheDocument();
    expect(screen.findByRole('td', {name: /Tatooine/i }));
    jest.clearAllMocks();

  });

  it('Testa fitro de comparacao', async() => {

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData) }));
    render(<App />);
  
    const filtroColuna = screen.getByTestId('column-filter');
    const filtroOperador = screen.getByTestId('comparison-filter');
    const filtroValor = screen.getByTestId('value-filter');
    const filtroBotao = screen.getByTestId('button-filter');

    userEvent.selectOptions(filtroColuna, 'rotation_period');
    userEvent.selectOptions(filtroOperador, 'maior que');
    userEvent.type(filtroValor, '23');
    userEvent.click(filtroBotao);


    expect(filtroColuna).toBeInTheDocument();
    expect(filtroOperador).toBeInTheDocument();
    expect(filtroValor).toBeInTheDocument();
    expect(filtroBotao).toBeInTheDocument();
    expect(screen.findByRole('td', {name: /Alderaan/i }));
    expect(screen.findByRole('td', {name: /Yavin/i }));
    expect(screen.findByRole('td', {name: /Naboo/i }));
    expect(screen.findByRole('td', {name: /Coruscant/i }));
    expect(screen.findByRole('td', {name: /Kamino/i }));

    jest.clearAllMocks();
  });
  it('Testa deletar filtro', async() => {

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData) }));
    render(<App />);
  
    const filtroColuna = screen.getByTestId('column-filter');
    const filtroOperador = screen.getByTestId('comparison-filter');
    const filtroValor = screen.getByTestId('value-filter');
    const filtroBotao = screen.getByTestId('button-filter');
    const botaoExcluir = screen.findByRole('button', { name: 'X' });

    userEvent.selectOptions(filtroColuna, 'rotation_period');
    userEvent.selectOptions(filtroOperador, 'maior que');
    userEvent.type(filtroValor, '24');
    userEvent.selectOptions(filtroColuna, 'orbital_period');
    userEvent.selectOptions(filtroOperador, 'menor que');
    userEvent.type(filtroValor, '402');
    userEvent.click(filtroBotao);

    await waitFor(() => {
      expect(screen.getByText('X')).toBeInTheDocument();
     
    });
    fireEvent.click(await screen.findByRole('button', {name:'X'}))

    expect(screen.findByRole('td', {name: /Tatooine/i }));
    expect(screen.findByRole('td', {name: /Alderaan/i }));
    expect(screen.findByRole('td', {name: /Yavin/i }));
    expect(screen.findByRole('td', {name: /Hoth/i }));
    expect(screen.findByRole('td', {name: /Dagobah/i }));
    expect(screen.findByRole('td', {name: /Bespin/i }));
    expect(screen.findByRole('td', {name: /Endor/i }));
    expect(screen.findByRole('td', {name: /Naboo/i }));
    expect(screen.findByRole('td', {name: /Coruscant/i }));
    expect(screen.findByRole('td', {name: /Kamino/i }));

    jest.clearAllMocks();

  });

});
