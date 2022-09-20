const API_STAR_WARS = 'https://swapi.dev/api/planets';

async function getStarWarsPlanets() {
  const response = await fetch(API_STAR_WARS);
  const { results } = await response.json();
  delete results.residents;
  console.log(results);
  return results;
}

export default getStarWarsPlanets;
