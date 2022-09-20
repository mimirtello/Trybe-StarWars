import React, { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const { getPlanets, planets, loading } = useContext(PlanetContext);

  useEffect(() => {
    getPlanets();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  return (

    <section>
      <h1> Star Wars Project Planets Search</h1>
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
          {planets.map((planet) => (
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
