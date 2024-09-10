import React from 'react';
import '../styles/Awareness.scss';
import latestPostImg1 from '../assets/irrigation.png';  // Use your actual image path
import latestPostImg2 from '../assets/production.jpg';  // Use your actual image path
import latestPostImg3 from '../assets/agronomy.jpg';  // Use your actual image path

const Awareness = () => {

  const main_content_posts = [
    {
      title: "The Future of Farming, Smart Irrigation Solutions",
      content: "Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. There are many variations of passages of Lorem Ipsum available, but the majority have alteration in some injected or randomised words. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassingly hidden in the middle of the text. Lorem ipsum has been the industry’s standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "05 July 2022",
      image: latestPostImg1,
    },
    {
      title: "Bringing Food Production Back to Cities",
      content: "Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. There are many variations of passages of Lorem Ipsum available, but the majority have alteration in some injected or randomised words. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassingly hidden in the middle of the text. Lorem ipsum has been the industry’s standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "05 July 2022",
      image: latestPostImg2,
    },
    {
      title: "Agronomy and Relation to Other Sciences",
      content: "Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. There are many variations of passages of Lorem Ipsum available, but the majority have alteration in some injected or randomised words. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassingly hidden in the middle of the text. Lorem ipsum has been the industry’s standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "05 July 2022",
      image: latestPostImg3,
    }
  ]

  return (
    <div className="awareness-page">
        {/* Main Content */}
      <div className='main-contents'>
        {main_content_posts.map((post, index) => (
          <div className="main-content" key={index}>
            <img src={post.image} alt="Main post" className="post-image" />
            <div className="post-date">
              <span>{post.date}</span> | <span className="author">by Dev Pandey</span> | <span className="comments">0 comments</span>
            </div>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-content">
              {post.content}
            </p>
            <p className="post-content">
              Lorem ipsum has been the industry’s standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
        ))}

    </div>

      {/* Sidebar */}
      <aside className="sidebar">
        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search here..." />
          <button type="button">&#128269;</button>
        </div>

        {/* Latest Posts */}
        <div className="latest-posts">
          <h3>Latest Posts</h3>
          <div className="post-item">
            <img src={latestPostImg1} alt="Post 1" />
            <div className="post-info">
              <h4 className="post-title">Bringing Food Production Back to Cities</h4>
              <span className="post-meta">by Dev Pandey</span>
            </div>
          </div>

          <div className="post-item">
            <img src={latestPostImg2} alt="Post 2" />
            <div className="post-info">
              <h4 className="post-title">The Future of Farming, Smart Irrigation Solutions</h4>
              <span className="post-meta">by Dev Pandey</span>
            </div>
          </div>

          <div className="post-item">
            <img src={latestPostImg3} alt="Post 3" />
            <div className="post-info">
              <h4 className="post-title">Agronomy and Relation to Other Sciences</h4>
              <span className="post-meta">by Dev Pandey</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="categories">
          <h3>Categories</h3>
          <ul>
            <li>Latest Agriculture News</li>
            <li>Nearby Warehouses</li>
            <li>Best Farming Practices</li>
            <li>How to get the best buyers</li>
            <li>Tips for more efficient farming techniques</li>
            <li>Organic Farming</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Awareness;