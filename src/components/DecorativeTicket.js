import React from 'react';
import '../styles/DecorativeTicket.scss'; // Estilos SASS para Decorative

const DecorativeTicket = () => {
  return (
    <img 
      src={require('../assets/licobuster-ticket.png')} 
      alt="Decorative Ticket"
      className="decorative-ticket"
    />
  );
};

export default DecorativeTicket;