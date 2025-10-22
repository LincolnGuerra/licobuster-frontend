import React, { useState } from 'react';
import '../styles/Hero.scss'; // Estilos SASS para Hero
// ALTERAÇÃO: Importado React Slick para carrossel
import Slider from 'react-slick';

const Hero = () => {
  // slides data - usando as imagens existentes no projeto
  const slides = [
    { src: require('../assets/uma-batalha-apos-a-outra.jpg'), alt: 'Uma Batalha Após a Outra' },
    { src: require('../assets/filme2.jpg'), alt: 'Filme 2' },
    { src: require('../assets/filme3.jpg'), alt: 'Filme 3' },
    { src: require('../assets/filme4.jpg'), alt: 'Filme 4' }
  ];

  const [active, setActive] = useState(0);

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
    // Customize os bullets para mostrar apenas um por filme
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

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${slides[active].src})`,
      }}
    >
      <h1>Bem-vindo ao LicoBuster Rating!</h1>
      <p>Avalie filmes e séries com estilo — como um verdadeiro crítico de licor!</p> {/* Corrigido "cerveja" para "licor" conforme tema */}
      {/* ALTERAÇÃO: Adicionada sub-section para botões pílulas */}
      <div className="pills-container">
        <button className="pill-button">Recomenda</button>
        <button className="pill-button">Filmes</button>
        <button className="pill-button">Séries</button>
        <button className="pill-button">Bullcrap</button>
      </div>
      {/* ALTERAÇÃO: Adicionado carrossel simples com 4 imagens */}
      <div className="carousel-container">
        <Slider {...heroCarouselSettings}>
          {slides.map((s, idx) => (
            <div key={idx} className="hero-slide">
              <img src={s.src} alt={s.alt} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Hero;