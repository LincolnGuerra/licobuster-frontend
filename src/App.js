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
          body: JSON.stringify({ username: 'testuser', password: 'testpass' }), // Dados de teste
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

  // Gera 5 posições base com deslocamento aleatório
  const basePositions = [
    { x: 10, y: 10 },  // Canto superior esquerdo
    { x: 70, y: 10 },  // Canto superior direito
    { x: 10, y: 50 },  // Meio esquerdo
    { x: 70, y: 50 },  // Meio direito
    { x: 40, y: 80 },  // Canto inferior central
  ];

  const floatingTickets = basePositions.map((pos, index) => ({
    id: index,
    top: `${pos.y + (Math.random() * 10 - 5)}vh`,
    left: `${pos.x + (Math.random() * 10 - 5)}vw`,
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

      <Hero />

      <section className="rating-section">
        <h2>Avalie seus Filmes e Séries Favoritos</h2>
        <Rating />
      </section>

      <footer>
        <p>&copy; 2025 LicoBuster Rating. Todos os direitos reservados.</p>
      </footer>

      {/* TICKETS FLUTUANTES NO FUNDO */}
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