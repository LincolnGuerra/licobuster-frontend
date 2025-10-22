import React, { useEffect } from 'react';
import './App.css';
import './styles/App.scss';
import './styles/Carousel.scss';
// ALTERAÇÃO: Importado React Slick para carrossels
import Slider from 'react-slick';

import Hero from './components/Hero';
import Rating from './components/Rating';
import DecorativeTicket from './components/DecorativeTicket';
import ScatteredLogo from './components/ScatteredLogo';

function App() {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: 'testuser', password: 'testpass' }),
        });
        if (!response.ok) throw new Error('Resposta da rede não foi ok');
        const data = await response.json();
        console.log('Dados recebidos:', data);
      } catch (error) {
        console.error('Erro na requisição:', error.message);
      }
    };

    fetchData();
  }, [apiUrl]);

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
    // Ajusta as posições considerando o tamanho dos tickets
    top: `${Math.min(Math.max(pos.y + (Math.random() * 10 - 5), 5), 75)}vh`,
    left: `${Math.min(Math.max(pos.x + (Math.random() * 10 - 5), 5), 75)}vw`,
  }));

  // ALTERAÇÃO: Config para carrossel Visto recente (draggable, sem bullets)
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
        <Hero /> {/* Hero com botões e carrossel */}
        {/* ALTERAÇÃO: Adicionada section Visto recente */}
        <section className="recent-section">
          <h2>Visto recente</h2>
          <div className="carousel-container">
            <Slider {...recentCarouselSettings}>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/uma-batalha-apos-a-outra.jpg')} alt="Uma Batalha Após a Outra" />
                </div>
                <div className="caption">Uma Batalha Após a Outra e Mais Algumas Batalhas Extras</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme2.jpg')} alt="Filme 2" />
                </div>
                <div className="caption">O Incrível Mundo de Jack e a Fantástica Fábrica de Chocolate</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme3.jpg')} alt="Filme 3" />
                </div>
                <div className="caption">Super Ultra Mega Power Rangers</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme4.jpg')} alt="Filme 4" />
                </div>
                <div className="caption">Homem Aranha</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme2.jpg')} alt="Filme 5" />
                </div>
                <div className="caption">Avatar: O Último Mestre do Ar e Seus Amigos</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme3.jpg')} alt="Filme 6" />
                </div>
                <div className="caption">Star Wars: O Império Contra Ataca Novamente</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme4.jpg')} alt="Filme 7" />
                </div>
                <div className="caption">Matrix</div>
              </div>
            </Slider>
          </div>
        </section>

        <section className="topfilmes">
          <h2>Top 10 Filmes</h2>
          <div className="carousel-container">
            <Slider {...recentCarouselSettings}>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/uma-batalha-apos-a-outra.jpg')} alt="O Poderoso Chefão" />
                </div>
                <div className="caption">O Poderoso Chefão e a História da Família Corleone</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme2.jpg')} alt="Pulp Fiction" />
                </div>
                <div className="caption">Pulp Fiction: Tempo de Violência</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme3.jpg')} alt="Interestelar" />
                </div>
                <div className="caption">Interestelar: Uma Jornada Pelo Espaço-Tempo</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme4.jpg')} alt="Cidade de Deus" />
                </div>
                <div className="caption">Cidade de Deus</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme2.jpg')} alt="O Senhor dos Anéis" />
                </div>
                <div className="caption">O Senhor dos Anéis: O Retorno do Rei - Versão Estendida</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme3.jpg')} alt="Bastardos Inglórios" />
                </div>
                <div className="caption">Bastardos Inglórios: Era Uma Vez na França Ocupada</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme4.jpg')} alt="Inception" />
                </div>
                <div className="caption">A Origem</div>
              </div>
            </Slider>
          </div>
        </section>

        <section className="topseries">
          <h2>Top 10 Séries</h2>
          <div className="carousel-container">
            <Slider {...recentCarouselSettings}>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/uma-batalha-apos-a-outra.jpg')} alt="Breaking Bad" />
                </div>
                <div className="caption">Breaking Bad: O Químico do Mal - A Série Completa</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme2.jpg')} alt="Game of Thrones" />
                </div>
                <div className="caption">Game of Thrones: A História Completa de Westeros</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme3.jpg')} alt="Stranger Things" />
                </div>
                <div className="caption">Stranger Things: Mistérios Sobrenaturais</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme4.jpg')} alt="Dark" />
                </div>
                <div className="caption">Dark</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme2.jpg')} alt="The Office" />
                </div>
                <div className="caption">The Office: A Vida Corporativa Nunca Mais Será a Mesma</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme3.jpg')} alt="Friends" />
                </div>
                <div className="caption">Friends: A Série Completa - Do Início ao Fim</div>
              </div>
              <div className="poster">
                <div className="poster-card">
                  <img src={require('./assets/filme4.jpg')} alt="Black Mirror" />
                </div>
                <div className="caption">Black Mirror</div>
              </div>
            </Slider>
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