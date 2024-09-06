import { useRef } from 'react';
import Herosection from './Herosection';
import Introduction from './Introduction';
import Navbar from './Navbar';
import Services from './Services';
import Carousel from './Carousel';

const Dashboard = () => {
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const servicesRef = useRef(null);
  const carouselRef = useRef(null);

  return (
    <div>
      <Navbar heroRef={heroRef} introRef={introRef} servicesRef={servicesRef} carouselRef={carouselRef} />
      <div ref={heroRef}>
        <Herosection />
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
    </div>
  );
};

export default Dashboard;