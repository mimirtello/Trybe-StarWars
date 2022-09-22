import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import getStarWarsPlanets from '../services/Api';

function PlanetProvider(props) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  // const handleChangeGenerico = ({ target: { name, value } }) => {
  //   setSearch((prevSearch) => ({
  //     ...prevSearch,
  //     [name]: value,
  //   }));
  // };

  const filtroPlanetas = (palavra) => {
    setSearch({
      filterByName: {
        name: palavra,
      },
    });
  };

  const filtroSelect = (coluna, operador, numero) => {
    setSearch((prevstate) => ({
      filterByName: { ...prevstate.filterByName },
      filterByNumericValues: prevstate.filterByNumericValues
        ? [...prevstate.filterByNumericValues,
          {
            column: coluna,
            comparison: operador,
            value: numero }] : [],
    }));
  };

  const servidorOk = () => {
    setLoading(false);
  };

  const getPlanets = async () => {
    try {
      const response = await getStarWarsPlanets();
      setPlanets(response);
      servidorOk();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const contextValue = { getPlanets,
    planets,
    loading,
    search,
    filtroPlanetas,
    filtroSelect,
  };
  const { children } = props;
  return (
    <PlanetContext.Provider value={ contextValue }>
      {children}
    </PlanetContext.Provider>
  );
}
PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
