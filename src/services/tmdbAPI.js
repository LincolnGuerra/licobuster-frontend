import axios from 'axios';

// Use a variável de ambiente corretamente
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

console.log('API Key carregada:', API_KEY ? 'Sim' : 'Não');

const tmdbAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR'
  }
});

// Dados MOCK com poster_paths REAIS do TMDB que funcionam
const mockMovies = [
  {
    id: 1,
    title: "Duna: Parte Dois",
    poster_path: "/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    vote_average: 8.5
  },
  {
    id: 2,
    title: "Oppenheimer",
    poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    vote_average: 8.3
  },
  {
    id: 3,
    title: "Homem-Aranha: Através do Aranhaverso",
    poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    vote_average: 8.7
  },
  {
    id: 4,
    title: "Avatar: O Caminho da Água",
    poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    vote_average: 7.6
  },
  {
    id: 5,
    title: "John Wick 4: Baba Yaga",
    poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg", // POSTER CORRETO ATUALIZADO
    vote_average: 7.8
  },
  {
    id: 6,
    title: "Guardiões da Galáxia Vol. 3",
    poster_path: "/r2RI1Vdbj5C2m3qW2HxHj0w2V2p.jpg",
    vote_average: 7.9
  },
  {
    id: 7,
    title: "Super Mario Bros: O Filme",
    poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    vote_average: 7.0
  },
  {
    id: 8,
    title: "Velozes e Furiosos 10",
    poster_path: "/wDWAA5QApz5L5BKfFaaj8HJCAQM.jpg",
    vote_average: 6.3
  },
  {
    id: 9,
    title: "Missão: Impossível - Acerto de Contas",
    poster_path: "/gbPUEuu2MGzbVen3tB1S48HpgDP.jpg",
    vote_average: 7.8
  },
  {
    id: 10,
    title: "Woaaka",
    poster_path: "/uQWEomz2wLoijrvoFaJt2gUMXRu.jpg",
    vote_average: 7.2
  }
];

const mockTVShows = [
  {
    id: 1,
    name: "The Last of Us",
    poster_path: "/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    vote_average: 8.8
  },
  {
    id: 2,
    name: "Stranger Things",
    poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    vote_average: 8.7
  },
  {
    id: 3,
    name: "The Mandalorian",
    poster_path: "/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg",
    vote_average: 8.5
  },
  {
    id: 4,
    name: "Game of Thrones",
    poster_path: "/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg",
    vote_average: 9.2
  },
  {
    id: 5,
    name: "Breaking Bad",
    poster_path: "/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg",
    vote_average: 9.5
  },
  {
    id: 6,
    name: "The Witcher",
    poster_path: "/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
    vote_average: 8.2
  },
  {
    id: 7,
    name: "The Boys",
    poster_path: "/stTEycfG9928HYGEISBFaG1ngjM.jpg",
    vote_average: 8.7
  },
  {
    id: 8,
    name: "Loki",
    poster_path: "/voHUmluYmKyleFkTu3lOXQG702u.jpg",
    vote_average: 8.4
  },
  {
    id: 9,
    name: "The Crown",
    poster_path: "/1M876KPjulVwppEpldhdc8V4o68.jpg",
    vote_average: 8.6
  },
  {
    id: 10,
    name: "Wednesday",
    poster_path: "/jeGtaMwGxPmQN5xM4ClnwPQcNQz.jpg",
    vote_average: 8.2
  }
];

// Função para verificar se a API está funcionando
const isAPIWorking = async () => {
  try {
    console.log('Testando conexão com a API TMDB...');
    const response = await tmdbAPI.get('/movie/popular');
    console.log('✅ API TMDB está funcionando!');
    return response.status === 200;
  } catch (error) {
    console.log('❌ API TMDB não está funcionando, usando dados MOCK');
    console.log('Erro da API:', error.response?.data?.status_message || error.message);
    return false;
  }
};

// Buscar filmes populares - VERSÃO MELHORADA
export const getPopularMovies = async () => {
  try {
    console.log('🎬 FORÇANDO busca na API para filmes populares...');
    const response = await tmdbAPI.get('/movie/popular');
    console.log('✅ API - Filmes populares carregados:', response.data.results.length);
    
    // Filtrar apenas filmes que têm poster E garantir que o poster seja válido
    const moviesWithValidPosters = response.data.results.filter(movie => {
      const hasPoster = !!movie.poster_path;
      if (hasPoster) {
        console.log(`🎭 ${movie.title}: ${movie.poster_path}`);
      }
      return hasPoster;
    });
    
    console.log('🎭 Filmes com posters válidos:', moviesWithValidPosters.length);
    
    // Se a API retornou filmes com posters, usar eles
    if (moviesWithValidPosters.length > 0) {
      return moviesWithValidPosters.slice(0, 10);
    } else {
      // Se não, usar nossos MOCK com posters garantidos
      console.log('🔄 Nenhum poster válido da API, usando MOCK garantido');
      return mockMovies;
    }
    
  } catch (error) {
    console.error('❌ ERRO CRÍTICO na API, usando MOCK de emergência:', error.message);
    return mockMovies; // Usar MOCK completo como fallback
  }
};

// Buscar séries populares
export const getPopularTVShows = async () => {
  try {
    const apiWorking = await isAPIWorking();
    
    if (apiWorking) {
      const response = await tmdbAPI.get('/tv/popular');
      return response.data.results.slice(0, 10);
    } else {
      console.log('🔄 MOCK - Usando dados MOCK para séries populares');
      return mockTVShows;
    }
  } catch (error) {
    console.error('❌ Erro ao buscar séries populares, usando MOCK:', error.message);
    return mockTVShows;
  }
};

// Buscar séries mais bem avaliadas
export const getTopRatedTVShows = async () => {
  try {
    const apiWorking = await isAPIWorking();
    
    if (apiWorking) {
      const response = await tmdbAPI.get('/tv/top_rated');
      return response.data.results.slice(0, 10);
    } else {
      console.log('🔄 MOCK - Usando dados MOCK para séries bem avaliadas');
      return mockTVShows.map((show, index) => ({
        ...show,
        id: show.id + 100,
        name: `${show.name} (Top Rated)`
      }));
    }
  } catch (error) {
    console.error('❌ Erro ao buscar séries mais bem avaliadas, usando MOCK:', error.message);
    return mockTVShows.map((show, index) => ({
      ...show,
      id: show.id + 100,
      name: `${show.name} (Top Rated)`
    }));
  }
};

// Buscar séries por gênero
export const getTVShowsByGenre = async (genreId) => {
  try {
    const apiWorking = await isAPIWorking();
    
    if (apiWorking) {
      const response = await tmdbAPI.get('/discover/tv', {
        params: {
          with_genres: genreId,
          sort_by: 'popularity.desc'
        }
      });
      return response.data.results.slice(0, 10);
    } else {
      console.log('🔄 MOCK - Usando dados MOCK para séries de ação');
      return mockTVShows.map((show, index) => ({
        ...show,
        id: show.id + 200,
        name: `${show.name} (Ação)`
      }));
    }
  } catch (error) {
    console.error('❌ Erro ao buscar séries por gênero, usando MOCK:', error.message);
    return mockTVShows.map((show, index) => ({
      ...show,
      id: show.id + 200,
      name: `${show.name} (Ação)`
    }));
  }
};

export default tmdbAPI;