import axios from 'axios';

// Substitua com sua chave de API
const API_KEY = '9ff07612eemshfb8e28112def025p1bac06jsnd523332b248c';
const API_HOST = 'edamam-food-and-grocery-database.p.rapidapi.com';

export const searchFoods = async (query: string) => {
  try {
    const response = await axios.get('https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser', {
      params: { ingr: query },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
        'Content-Type': 'application/json'
      },
    });

    return response.data.hints.map((hint: any) => ({
      id: hint.food.foodId,
      name: hint.food.label,
      image: hint.food.image || 'https://via.placeholder.com/150', // Placeholder if no image
    }));
  } catch (error) {
    console.error("Erro ao buscar alimentos", error);
    return [];
  }
};
