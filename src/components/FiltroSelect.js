import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function FiltroSelect() {
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [value, setValue] = useState(0);
  const { filtroSelect } = useContext(PlanetContext);
  return (
    <div>
      <section>
        Coluna
        <select
          name="coluna"
          id="searchSelect"
          data-testid="column-filter"
          onChange={ ({ target }) => setColumn(target.value) }
        >
          <option value="population">
            population
          </option>
          <option value="orbital_period">
            orbital_period
          </option>
          <option value="diameter">
            diameter
          </option>
          <option value="rotation_period">
            rotation_period
          </option>
          <option value="surface_water">
            surface_water
          </option>
        </select>
      </section>
      Operador

      <section>
        Coluna
        <select
          name="operador"
          id="searchComparison"
          data-testid="comparison-filter"
          onChange={ ({ target }) => setOperator(target.value) }
        >
          <option value="maior que">
            maior que
          </option>
          <option value="menor que">
            menor que
          </option>
          <option value="igual a">
            igual a
          </option>
        </select>
      </section>

      <input
        type="text"
        data-testid="value-filter"
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
      />

      <button
        type="submit"
        data-testid="button-filter"
        onClick={ () => filtroSelect(column, operator, value) }
      >
        Filtrar

      </button>
    </div>
  );
}

export default FiltroSelect;
