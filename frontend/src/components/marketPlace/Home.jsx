import { useState } from "react";
import "./Home.css";
import HeroImg from "../../assets/ShopImage.png";
import { ProductCard } from "./ProductCard";
import MARKET_DATA from "../../utils/data";
import CartIcon from "./CartIcon";

export const Home = () => {
  const [priceRange, setPriceRange] = useState(500);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(MARKET_DATA);

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredProducts(MARKET_DATA);
    } else {
      const filteredData = MARKET_DATA.map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (product) =>
            product.price <= priceRange && cat.title === category
        ),
      })).filter((cat) => cat.items.length > 0);

      setFilteredProducts(filteredData);
    }
  };

  const handleApplyFilter = () => {
    const filteredData = MARKET_DATA.map((category) => ({
      ...category,
      items: category.items.filter(
        (product) =>
          product.price <= priceRange &&
          (selectedCategory === "All" || category.title === selectedCategory)
      ),
    })).filter((category) => category.items.length > 0);

    setFilteredProducts(filteredData);
  };

  return (
    <div className="shop-page">
    <CartIcon/>
      <div className="shop-page-hero">
        <div>
          <img
            className="shop-page-hero-image"
            src={HeroImg}
            alt="hero image"
          />
          <div className="shop-page-hero-heading-text">
            <div className="shop-page-hero-welcome">Home | Shop</div>
            <div className="shop-page-hero-heading">Our Shop</div>
          </div>
        </div>
      </div>

      <div className="shop-page-content">
        <aside className="shop-page-filters">
          <div className="shop-page-filter-section">
            <h3>Price: ₹{priceRange}</h3>
            <input
              type="range"
              min="20"
              max="500"
              value={priceRange}
              onChange={handlePriceRangeChange}
            />
            <button
              className="shop-page-filter-apply-button"
              onClick={handleApplyFilter}
            >
              Apply
            </button>
          </div>

          <div className="shop-page-filter-section">
            <h3>Categories</h3>
            <ul className="shop-page-filter-categories">
              {["All", "Fruits", "Vegetables", "Grains", "Dairy Products", "Pulses"].map((category) => (
                <li
                  key={category}
                  className={category === selectedCategory ? "active-category" : ""}
                  onClick={() => handleCategorySelection(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="shop-page-products">
  {filteredProducts.length === 0 || filteredProducts.every((category) => category.items.length === 0) ? (
    <div className="no-items-container">
      <h3 className="no-items-message">No Items Available</h3>
    </div>
  ) : (
    filteredProducts.map((category) => (
      <section key={category.title}>
        <h2 className="shop-page-category-title">{category.title}</h2>
        <div className="shop-page-products-grid">
          {category.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    ))
  )}
</main>

      </div>
    </div>
  );
};
