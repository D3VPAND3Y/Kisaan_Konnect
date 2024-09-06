import Herosection from './Herosection';
import Introduction from './Introduction';
import Services from './Services';
import Carousel from './Carousel';
import PropTypes from 'prop-types';

const Dashboard = ({ introRef, servicesRef, carouselRef}) => {

  return (
    <div>
      <div>
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

// Define prop types for validation
Dashboard.propTypes = {
  heroRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  introRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  servicesRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  carouselRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
};


export default Dashboard;