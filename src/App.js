import React from 'react';
import './App.css';
import FiltroSelect from './components/FiltroSelect';
import SearchPlanetas from './components/Search';
import Table from './components/Table';
import PlanetProvider from './context/PlanetProvider';

function App() {
  return (
    <PlanetProvider>

      <div>
        <span>Hello, App!</span>
        <SearchPlanetas />
        <FiltroSelect />
        <Table />
      </div>

    </PlanetProvider>
  );
}
// Iniciando Projeto

export default App;
