import { useState, useEffect } from 'react';
import '../styles/Carousel.scss';
import reform from '../assets/reforms.avif';
import climate from '../assets/climate.jpg';
import organic from '../assets/organic.jpg';
import subsidy from '../assets/subsidy.jpg';
import { useLanguage } from '../contexts/LanguageContext';  // Import the LanguageContext

const newsData = [
  {
    id: 'news-1',
    titleKey: 'newsOneTitle',
    descriptionKey: 'newsOneDescription',
    image: reform,
  },
  {
    id: 'news-2',
    titleKey: 'newsTwoTitle',
    descriptionKey: 'newsTwoDescription',
    image: climate,
  },
  {
    id: 'news-3',
    titleKey: 'newsThreeTitle',
    descriptionKey: 'newsThreeDescription',
    image: organic,
  },
  {
    id: 'news-4',
    titleKey: 'newsFourTitle',
    descriptionKey: 'newsFourDescription',
    image: subsidy,
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
    <div className="awareness_page__carousel-section">
      <h1 className="awareness_page__carousel-heading">🌾 {languageStrings.latestNewsHeading} 🌾</h1>
      <div className="awareness_page__carousel">
        <div
          className="awareness_page__carousel-content"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {newsData.map((news, index) => (
            <div
              key={news.id}
              className={`awareness_page__carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={news.image} alt={languageStrings[news.titleKey]} className="awareness_page__carousel-image" />
              <div className="awareness_page__carousel-text">
                <h2>{languageStrings[news.titleKey]}</h2>
                <p>{languageStrings[news.descriptionKey]}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="awareness_page__carousel-btn awareness_page__prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="awareness_page__carousel-btn awareness_page__next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Carousel;