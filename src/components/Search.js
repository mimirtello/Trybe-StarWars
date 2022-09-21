import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function SearchPlanetas() {
  const { filtroPlanetas, search } = useContext(PlanetContext);

  return (

    <div>
      <input
        data-testid="name-filter"
        name="name"
        type="text"
        onChange={ ({ target }) => filtroPlanetas(target.value) }
        value={ search.FilterByName }
      />

    </div>

  );
}
// { ({ target }) => filtroPlanetas(target.value) }
// { (event) => { handleChange(event, filtroPlanetas); } }

export default SearchPlanetas;
