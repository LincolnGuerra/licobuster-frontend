import React, { useState, useEffect } from 'react';
import '../styles/Hero.scss';
import Slider from 'react-slick';
import { getPopularMovies } from '../services/tmdbAPI';

const Hero = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  // Buscar filmes populares para o Hero
  useEffect(() => {
    const fetchHeroMovies = async () => {
      try {
        const movies = await getPopularMovies();
        setPopularMovies(movies.slice(0, 4)); // Pegar apenas 4 filmes para o Hero
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar filmes para o Hero:', error);
        setLoading(false);
      }
    };

    fetchHeroMovies();
  }, []);

  // Função para construir URL da imagem
  const getImageUrl = (path, size = 'w500') => {
    if (!path) {
      return require('../assets/uma-batalha-apos-a-outra.jpg');
    }
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  // Config para carrossel Hero (com bullets)
  const heroCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
    focusOnSelect: true,
    afterChange: (i) => setActive(i),
    dotsClass: "slick-dots hero-dots",
    customPaging: (i) => (
      <button
        aria-label={`Ir para slide ${i + 1}`}
        className={i === active ? 'active' : ''}
      />
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '40px',
        }
      }
    ]
  };

  // Se ainda está carregando, mostrar um placeholder
  if (loading) {
    return (
      <section className="hero loading">
        <div className="loading-hero">
          <div className="loading-spinner"></div>
          <p>Carregando...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="hero"
      style={{
        backgroundImage: popularMovies[active]?.poster_path 
          ? `url(${getImageUrl(popularMovies[active].poster_path, 'w1280')})`
          : `url(${require('../assets/uma-batalha-apos-a-outra.jpg')})`
      }}
    >
      <h1>Bem-vindo ao LicoBuster Rating!</h1>
      <p>Avalie filmes e séries com estilo — como um verdadeiro crítico de licor!</p>
      
      <div className="pills-container">
        <button className="pill-button">Recomenda</button>
        <button className="pill-button">Filmes</button>
        <button className="pill-button">Séries</button>
        <button className="pill-button">Bullcrap</button>
      </div>

      <div className="carousel-container">
        <Slider {...heroCarouselSettings}>
          {popularMovies.map((movie, idx) => (
            <div key={movie.id} className="hero-slide">
              <img 
                src={getImageUrl(movie.poster_path)} 
                alt={movie.title || 'Filme sem título'}
                onError={(e) => {
                  e.target.src = require('../assets/uma-batalha-apos-a-outra.jpg');
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Hero;