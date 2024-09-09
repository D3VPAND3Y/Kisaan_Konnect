import "../styles/Awareness.scss"; // Import the SCSS file
import awarenessImage from "../assets/image.png"; // Replace with actual path

const posts = [
  {
    title: "Bringing Food Production Back To Cities",
    author: "Kevin Martin",
    date: "05 July 2022",
    image: awarenessImage,
  },
  {
    title: "The Future of Farming, Smart Irrigation Solutions",
    author: "Kevin Martin",
    date: "05 July 2022",
    image: awarenessImage,
  },
  {
    title: "Agronomy and Relation to Other Sciences",
    author: "Kevin Martin",
    date: "05 July 2022",
    image: awarenessImage,
  },
];

const categories = [
  "Agriculture",
  "Farm",
  "Farming",
  "Fresh Vegetables",
  "Harvest",
  "Organic Food",
];

const Awareness = () => {
  return (
    <div className="awareness-page">
      {/* Hero Section */}
      <div className="awareness-page__hero">
        <h1>The Future of Farming</h1>
        <p>Awareness</p>
      </div>

      {/* Content Section */}
      <div className="awareness-page__content">
        {/* Main Post */}
        <div className="awareness-page__main-post">
          <img src={awarenessImage} alt="Main Awareness" />
          <div className="main-post__details">
            <div className="main-post__date">05 July 2022</div>
            <h2>The Future of Farming, Smart Irrigation Solutions</h2>
            <p className="main-post__author">
              by Kevin Martin <span>0 comments</span>
            </p>
            <p>
              Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. 
              There are many variations of passages of Lorem Ipsum available...
            </p>
          </div>
        </div>

        {/* Sidebar Section */}
        <aside className="awareness-page__sidebar">
          {/* Search Box */}
          <div className="search-box">
            <input type="text" placeholder="Search here..." />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </div>

          {/* Latest Posts */}
          <div className="sidebar__section">
            <h3>Latest Posts</h3>
            <ul className="latest-posts">
              {posts.map((post, index) => (
                <li key={index} className="latest-post">
                  <img src={post.image} alt={post.title} />
                  <div className="post-details">
                    <p>{post.author}</p>
                    <h4>{post.title}</h4>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="sidebar__section">
            <h3>Categories</h3>
            <ul className="categories-list">
              {categories.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Awareness;