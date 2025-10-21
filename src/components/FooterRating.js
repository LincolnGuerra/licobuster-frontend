import React from 'react';
import '../styles/FooterRating.scss';

const FooterRating = () => {
  const canecas = [
    { src: require('../assets/caneca-vazia.png'), alt: 'Vazia' },
    { src: require('../assets/caneca-1-5.png'), alt: '1/5 Cheia' },
    { src: require('../assets/caneca-2-5.png'), alt: '2/5 Cheia' },
    { src: require('../assets/caneca-3-5.png'), alt: '3/5 Cheia' },
    { src: require('../assets/caneca-4-5.png'), alt: '4/5 Cheia' },
    { src: require('../assets/caneca-cheia.png'), alt: 'Cheia' },
  ];

  return (
    <div className="footer-rating">
      {canecas.map((caneca, index) => (
        <img key={index} src={caneca.src} alt={caneca.alt} className="caneca" />
      ))}
    </div>
  );
};

export default FooterRating;