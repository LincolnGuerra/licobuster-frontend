import React from 'react';
import '../styles/Rating.scss';

const Rating = () => {
  const canecas = [
    { src: require('../assets/caneca-vazia.png'), alt: '0/5 - Vazia' },
    { src: require('../assets/caneca-1-5.png'), alt: '1/5' },
    { src: require('../assets/caneca-2-5.png'), alt: '2/5' },
    { src: require('../assets/caneca-3-5.png'), alt: '3/5' },
    { src: require('../assets/caneca-4-5.png'), alt: '4/5' },
    { src: require('../assets/caneca-cheia.png'), alt: '5/5 - Cheia' },
  ];

  return (
    <div className="rating-container">
      <div className="rating">
        {canecas.map((caneca, index) => (
          <img key={index} src={caneca.src} alt={caneca.alt} className="caneca" />
        ))}
      </div>
    </div>
  );
};

export default Rating;