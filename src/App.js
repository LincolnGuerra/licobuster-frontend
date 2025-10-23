import React, { useEffect, useState } from 'react';
import './App.css';
import './styles/App.scss';
import './styles/Carousel.scss';
import Slider from 'react-slick';

import Hero from './components/Hero';
import Rating from './components/Rating';
import DecorativeTicket from './components/DecorativeTicket';
import ScatteredLogo from './components/ScatteredLogo';
import { getPopularMovies, getPopularTVShows, getTopRatedTVShows, getTVShowsByGenre } from './services/tmdbAPI';

function App() {
  // Estados para os dados da API
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [topRatedTVShows, setTopRatedTVShows] = useState([]);
  const [actionTVShows, setActionTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Iniciando busca de dados da API...');
        
        // Buscar todos os dados em paralelo
        const [movies, tvShows, topTVShows, actionShows] = await Promise.all([
          getPopularMovies(),
          getPopularTVShows(),
          getTopRatedTVShows(),
          getTVShowsByGenre(10759) // Action & Adventure
        ]);

        console.log('Dados recebidos:', {
          movies: movies?.length,
          tvShows: tvShows?.length,
          topTVShows: topTVShows?.length,
          actionShows: actionShows?.length
        });

        // DEBUG: Verificar os primeiros filmes
        console.log('🎬 Primeiros filmes populares:', movies?.slice(0, 3)?.map(m => ({
          title: m.title,
          poster_path: m.poster_path,
          hasPoster: !!m.poster_path
        })));

        // Verificar se temos dados
        if (movies && movies.length > 0) {
          setPopularMovies(movies.slice(0, 10));
        } else {
          console.warn('Nenhum filme popular encontrado');
        }

        if (tvShows && tvShows.length > 0) {
          setPopularTVShows(tvShows.slice(0, 10));
        } else {
          console.warn('Nenhuma série popular encontrada');
        }

        if (topTVShows && topTVShows.length > 0) {
          setTopRatedTVShows(topTVShows.slice(0, 10));
        } else {
          console.warn('Nenhuma série bem avaliada encontrada');
        }

        if (actionShows && actionShows.length > 0) {
          setActionTVShows(actionShows.slice(0, 10));
        } else {
          console.warn('Nenhuma série de ação encontrada');
        }

      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        setError('Erro ao carregar dados. Verifique o console para mais detalhes.');
      } finally {
        setLoading(false);
        console.log('Busca de dados finalizada');
      }
    };

    fetchData();
  }, []);

  // Posições ajustadas para melhor distribuição na tela
  const basePositions = [
    { x: 10, y: 10 },  // Topo-esquerda
    { x: 70, y: 15 },  // Topo-direita
    { x: 40, y: 40 },  // Centro
    { x: 15, y: 65 },  // Baixo-esquerda
    { x: 65, y: 70 },  // Baixo-direita
  ];

  const floatingTickets = basePositions.map((pos, index) => ({
    id: index,
    top: `${Math.min(Math.max(pos.y + (Math.random() * 10 - 5), 5), 75)}vh`,
    left: `${Math.min(Math.max(pos.x + (Math.random() * 10 - 5), 5), 75)}vw`,
  }));

  // Config para carrossel
  const recentCarouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: true,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          centerPadding: '40px',
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: '40px',
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: '30px',
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
        }
      }
    ],
  };

  // Função MELHORADA para construir URL da imagem do TMDB
  const getImageUrl = (path, size = 'w500') => {
    // Se não tem path, use uma imagem real de fallback do TMDB
    if (!path) {
      return 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png';
    }
  
    // Fallback específico para John Wick 4 se o poster antigo estiver sendo usado
    if (path === "/r2RI1Vdbj5C2m3qW2HxHj0w2V2p.jpg") {
      console.log('🔄 Substituindo poster antigo do John Wick 4');
      path = "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg";
    }
  
    // Garantir que o path comece com /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `https://image.tmdb.org/t/p/${size}${cleanPath}`;
  };

  // Componente de Loading
  const LoadingCarousel = () => (
    <div className="loading-carousel">
      <div className="loading-spinner"></div>
      <p>Carregando...</p>
    </div>
  );

  // Componente de Erro
  const ErrorMessage = ({ message }) => (
    <div className="error-message">
      <p>❌ {message}</p>
      <p>Verifique se a API Key do TMDB está configurada corretamente.</p>
    </div>
  );

  // Componente de Dados Vazios
  const EmptyDataMessage = () => (
    <div className="empty-message">
      <p>Nenhum dado disponível no momento.</p>
    </div>
  );

  return (
    <div className="app">
      <header className="header">
        <img
          src={require('./assets/licobuster-ticket.png')}
          alt="LicoBuster Logo"
          className="logo"
        />
        <nav>
          <ul>
            <li>Home</li>
            <li>Avaliações</li>
            <li>Sobre</li>
          </ul>
        </nav>
      </header>

      <main>
        <Hero />

        {/* Mensagem de erro global */}
        {error && (
          <div className="global-error">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Primeiro Carrossel: Filmes Populares */}
        <section className="recent-section">
          <h2>Filmes Populares</h2>
          <div className="carousel-container">
            {loading ? (
              <LoadingCarousel />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : popularMovies.length > 0 ? (
              <Slider {...recentCarouselSettings}>
                {popularMovies.map((movie) => {
                  console.log(`🎬 Renderizando: ${movie.title} | Poster: ${movie.poster_path}`);
                  return (
                    <div key={movie.id} className="poster">
                      <div className="poster-card">
                        <img 
                          src={getImageUrl(movie.poster_path)} 
                          alt={movie.title || 'Filme sem título'}
                          onError={(e) => {
                            console.log(`❌ ERRO AO CARREGAR: ${movie.title} | Poster: ${movie.poster_path}`);
                            e.target.src = require('./assets/uma-batalha-apos-a-outra.jpg');
                          }}
                          onLoad={(e) => {
                            console.log(`✅ CARREGADO: ${movie.title}`);
                          }}
                        />
                      </div>
                      <div className="caption">{movie.title || 'Título não disponível'}</div>
                    </div>
                  );
                })}
              </Slider>
            ) : (
              <EmptyDataMessage />
            )}
          </div>
        </section>

        {/* Segundo Carrossel: Séries Populares */}
        <section className="topfilmes">
          <h2>Séries Populares</h2>
          <div className="carousel-container">
            {loading ? (
              <LoadingCarousel />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : popularTVShows.length > 0 ? (
              <Slider {...recentCarouselSettings}>
                {popularTVShows.map((show) => (
                  <div key={show.id} className="poster">
                    <div className="poster-card">
                      <img 
                        src={getImageUrl(show.poster_path)} 
                        alt={show.name || 'Série sem título'}
                        onError={(e) => {
                          console.log('Erro ao carregar imagem:', show.poster_path);
                          e.target.src = require('./assets/uma-batalha-apos-a-outra.jpg');
                        }}
                      />
                    </div>
                    <div className="caption">{show.name || 'Título não disponível'}</div>
                  </div>
                ))}
              </Slider>
            ) : (
              <EmptyDataMessage />
            )}
          </div>
        </section>

        {/* Terceiro Carrossel: Séries Mais Bem Avaliadas */}
        <section className="topseries">
          <h2>Séries Mais Bem Avaliadas</h2>
          <div className="carousel-container">
            {loading ? (
              <LoadingCarousel />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : topRatedTVShows.length > 0 ? (
              <Slider {...recentCarouselSettings}>
                {topRatedTVShows.map((show) => (
                  <div key={show.id} className="poster">
                    <div className="poster-card">
                      <img 
                        src={getImageUrl(show.poster_path)} 
                        alt={show.name || 'Série sem título'}
                        onError={(e) => {
                          console.log('Erro ao carregar imagem:', show.poster_path);
                          e.target.src = require('./assets/uma-batalha-apos-a-outra.jpg');
                        }}
                      />
                    </div>
                    <div className="caption">{show.name || 'Título não disponível'}</div>
                  </div>
                ))}
              </Slider>
            ) : (
              <EmptyDataMessage />
            )}
          </div>
        </section>

        {/* Quarto Carrossel: Séries de Ação e Aventura */}
        <section className="topseries">
          <h2>Séries de Ação e Aventura</h2>
          <div className="carousel-container">
            {loading ? (
              <LoadingCarousel />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : actionTVShows.length > 0 ? (
              <Slider {...recentCarouselSettings}>
                {actionTVShows.map((show) => (
                  <div key={show.id} className="poster">
                    <div className="poster-card">
                      <img 
                        src={getImageUrl(show.poster_path)} 
                        alt={show.name || 'Série sem título'}
                        onError={(e) => {
                          console.log('Erro ao carregar imagem:', show.poster_path);
                          e.target.src = require('./assets/uma-batalha-apos-a-outra.jpg');
                        }}
                      />
                    </div>
                    <div className="caption">{show.name || 'Título não disponível'}</div>
                  </div>
                ))}
              </Slider>
            ) : (
              <EmptyDataMessage />
            )}
          </div>
        </section>

        <section className="sec-rating">
          <h2>Avalie seus Filmes e Séries Favoritos</h2>
          <Rating />
        </section>
      </main>

      <footer>
        <p>&copy; 2025 LicoBuster Rating. Todos os direitos reservados.</p>
      </footer>

      {floatingTickets.map((ticket) => (
        <ScatteredLogo
          key={ticket.id}
          top={ticket.top}
          left={ticket.left}
        />
      ))}

      <DecorativeTicket />
    </div>
  );
}

export default App;