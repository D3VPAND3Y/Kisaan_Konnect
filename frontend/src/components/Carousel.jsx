import { useState, useEffect } from 'react';
import '../styles/Carousel.scss';
import image from '../assets/image.png';
import { useLanguage } from '../contexts/LanguageContext';  // Import the LanguageContext

const newsData = [
  {
    id: 'news-1',
    titleKey: 'newsOneTitle',
    descriptionKey: 'newsOneDescription',
    image: image,
  },
  {
    id: 'news-2',
    titleKey: 'newsTwoTitle',
    descriptionKey: 'newsTwoDescription',
    image: image,
  },
  {
    id: 'news-3',
    titleKey: 'newsThreeTitle',
    descriptionKey: 'newsThreeDescription',
    image: image,
  },
  {
    id: 'news-4',
    titleKey: 'newsFourTitle',
    descriptionKey: 'newsFourDescription',
    image: image,
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { languageStrings } = useLanguage(); // Get language strings from context

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % newsData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + newsData.length) % newsData.length);
  };

  // Auto-slide feature using useEffect
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="carousel-section">
      <h1 className="carousel-heading">🌾 {languageStrings.latestNewsHeading} 🌾</h1>
      <div className="carousel">
        <div
          className="carousel-content"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {newsData.map((news, index) => (
            <div
              key={news.id}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={news.image} alt={languageStrings[news.titleKey]} className="carousel-image" />
              <div className="carousel-text">
                <h2>{languageStrings[news.titleKey]}</h2>
                <p>{languageStrings[news.descriptionKey]}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-btn prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="carousel-btn next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Carousel;