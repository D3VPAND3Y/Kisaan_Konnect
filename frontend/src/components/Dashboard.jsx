import Herosection from './Herosection';
import Introduction from './Introduction';
import Services from './Services';
import Carousel from './Carousel';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { UserContext } from '../contexts/user.context';
const Dashboard = ({ introRef, servicesRef, carouselRef}) => {
  const { user } = useContext(UserContext);

  console.log(user);


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