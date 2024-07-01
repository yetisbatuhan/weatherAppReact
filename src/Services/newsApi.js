import axios from 'axios';



const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=';
const MAIN_URL = 'https://newsapi.org/v2/everything';

const fetchTopHeadlines = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${API_KEY}`, {
        params: {        
          apiKey: API_KEY,
        },
      });
      
      return response.data.articles;
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      throw error;
    }
  };
  const mainNews = async (query) => {
    try {
        const response = await axios.get(MAIN_URL, {
            params: {
                q: query, 
                apiKey: API_KEY,
                
              },
        });
        // console.log(query)
        
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching main news:', error);
        throw error;
    }
};
  

  export default {
    fetchTopHeadlines,
    mainNews
  };
 