import axios from 'axios';

const fruityviceApiUrl = 'https://www.fruityvice.com/api/fruit/all';
const spoonacularApiKey = '3e7dbe8787684bae8f0af73e2a0cdeb0'; // substitua pela sua chave de API
const spoonacularApiUrl = 'https://api.spoonacular.com/food/ingredients/search';

export const getFruits = async () => {
  try {
    const response = await axios.get(fruityviceApiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching fruits:', error);
    throw error;
  }
};


export const getFruitImages = async (fruitName: string) => {
  try {
    const response = await axios.get(spoonacularApiUrl, {
      params: {
        query: fruitName,
        number: 1,
        apiKey: spoonacularApiKey,
      },
    });
    return response.data.results[0]?.image || null;
  } catch (error) {
    console.error(`Error fetching image for ${fruitName}:`, error);
    throw error;
  }
};