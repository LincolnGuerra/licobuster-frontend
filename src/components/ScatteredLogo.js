import React from 'react';
import '../styles/ScatteredLogo.scss';

const ScatteredLogo = ({ top, left }) => {
  const rotation = Math.random() * 360; // Rotação aleatória

  // ALTERAÇÃO: Usar variáveis CSS --top e --left para clamp em ScatteredLogo.scss
  // Removendo 'vh' e 'vw' pois já vêm formatados do App.js
  return (
    <img
      src={require('../assets/logoallpage.png')}
      alt="Logo flutuante"
      className="scattered-ticket"
      style={{
        top: top, // Aplicando diretamente as posições
        left: left,
        '--rotation': `${rotation}deg`,
      }}
    />
  );
};

export default ScatteredLogo;