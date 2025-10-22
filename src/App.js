import React, { useEffect } from 'react';
import './App.css';
import './styles/App.scss';

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

  // ALTERAÇÃO: Confirmado 2 tickets flutuantes com posições ajustadas
  const basePositions = [
    { x: 5, y: 15 }, // Topo-esquerda
    { x: 55, y: 15 }, // Topo-direita
    { x: 35, y: 25 }, // Topo-direita

    { x: 5, y: 55 }, // Baixo-esquerda
    { x: 55, y: 55 }, // Baixo-direita
  ];

  const floatingTickets = basePositions.map((pos, index) => ({
    id: index,
    top: `${pos.y + (Math.random() * 10 - 5)}vh`,
    right: `${pos.y + (Math.random() * 10 - 5)}vh`,
    center: `${pos.y + (Math.random() * 10 - 5)}vh`,
    left: `${pos.x + (Math.random() * 10 - 5)}vw`,
    bottom: `${pos.y + (Math.random() * 10 - 5)}vh`,
  }));

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
        <section className="rating-section">
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