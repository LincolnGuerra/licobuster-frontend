import React from 'react';
import '../styles/ScatteredLogo.scss';

const ScatteredLogo = ({ top, left }) => {
  const rotation = Math.random() * 360; // Rotação aleatória

  return (
    <img
      src={require('../assets/logoallpage.png')} // Troca para logoallpage.png
      alt="Logo flutuante"
      className="scattered-ticket"
      style={{
        top: top,
        left: left,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
};

export default ScatteredLogo;