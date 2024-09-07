import React, { useState, useEffect } from 'react';
import Herosection from './Herosection';
import Introduction from './Introduction';
import Services from './Services';
import Carousel from './Carousel';
import PropTypes from 'prop-types';
import '../styles/Dashboard.scss'; // Import custom styles

const Dashboard = ({ introRef, servicesRef, carouselRef }) => {
  const [showScroll, setShowScroll] = useState(false);

  // Show scroll-to-top button when scrolling down
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 300) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 300) {
      setShowScroll(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  return (
    <div className='dashboard_sections'>
      <div>
        <Herosection introRef={introRef} />
      </div>
      <div ref={introRef}>
        <Introduction />
      </div>
      <div ref={servicesRef}>
        <Services />
      </div>
      <div ref={carouselRef}>
        <Carousel />
      </div>

      {/* Scroll-to-Top Button */}
      <button
        className="scroll-to-top"
        onClick={scrollToTop}
        style={{ display: showScroll ? 'block' : 'none' }}
      >
        ↑
      </button>
    </div>
  );
};

Dashboard.propTypes = {
  heroRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  introRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  servicesRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  carouselRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

export default Dashboard;