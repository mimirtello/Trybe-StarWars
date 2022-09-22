import React, { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const { getPlanets, planets,
    loading, search, filtroSelect } = useContext(PlanetContext);

  const filtro = (search.filterByName.name.length > 0)
    ? planets.filter((planeta) => (planeta.name)
      .toLowerCase().includes(search.filterByName.name))

    : planets;

  // const acaoFiltrar = (retornoDoFiltro) => retornoDoFiltro.map(search
  //   .filterByNumericValues.map(({ column, comparison, value }) => {

  //   });

  const comparacao = ({ comparison, column, value }, Numberfilter) => {
    switch (comparison) {
    case 'maior que':
      return (Numberfilter.filter((planeta) => Number(planeta[column]) > Number(value)));
    case 'menor que':
      return (Numberfilter.filter((planeta) => Number(planeta[column]) < Number(value)));
    case 'igual a':
      return (Numberfilter
        .filter((planeta) => Number(planeta[column]) === Number(value)));
    default:
      return Numberfilter;
    }
  };
  console.log(filtro);
  const acaoFiltrar = () => {
    let arrayFiltrado = filtro || [];
    if (search.filterByNumericValues) {
      search.filterByNumericValues.forEach((filtroDeComparacao) => {
        arrayFiltrado = comparacao(filtroDeComparacao, arrayFiltrado);
      });
    }
    return arrayFiltrado || [];
  };

  useEffect(() => {
    getPlanets();
    filtroSelect();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  return (

    <section>
      <h1> Star Wars Project Planets Search</h1>
      <div>
        {search.filterByNumericValues && search.filterByNumericValues.map((e, index) => (
          <div key={ index }>
            <span>{ e.column }</span>
            <span>{e.comparison}</span>
            <span>{e.value}</span>
          </div>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Pediod </th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>

          {acaoFiltrar().map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{ planet.films.map((filme) => filme) }</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          )) }

        </tbody>

      </table>
    </section>

  );
}

export default Table;
