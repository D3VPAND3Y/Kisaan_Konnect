import '../styles/Introduction.scss';
import LargeImage from '../assets/image.png';  // Replace with the actual image path
import SmallImage from '../assets/image.png';  // Replace with the actual image path

const Introduction = () => {
  return (
    <div className="agriculture-section">
      <div className="image-section">
        <img src={LargeImage} alt="Large agriculture scene" className="large-image" />
        <img src={SmallImage} alt="Small agriculture scene" className="small-image" />
      </div>
      <div className="text-section">
        <p className="introduction">Our Introduction</p>
        <h1 className="title">Agriculture & Organic Product Farm</h1>
        <h2 className="subtitle">Agrios is the largest global organic farm.</h2>
        <p className="description">
          There are many variations of passages of lorem ipsum available but the majority have suffered alteration in some form by injected humor or random word which don't look even.
        </p>
        <div className="features">
          <div className="feature">
            <i className="icon basket-icon"></i>
            <p>Growing fruits vegetables</p>
          </div>
          <div className="feature">
            <i className="icon tips-icon"></i>
            <p>Tips for ripening your fruits</p>
          </div>
        </div>
        <ul className="benefits">
          <li>✔ Lorem Ipsum is not simply random text.</li>
          <li>✔ Making this the first true generator on the internet.</li>
        </ul>
        <button className="discover-button">Discover More</button>
      </div>
    </div>
  );
};

export default Introduction;