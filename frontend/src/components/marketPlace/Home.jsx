import { useState, useContext, useEffect } from "react";
import "./Home.css";
import HeroImg from "../../assets/ShopImage.png";
import { ProductCard } from "./ProductCard";
import CartIcon from "./CartIcon";
import CartDropdown from "./CartDropdown";
import { CartContext } from "../../contexts/cart.context";
import axios from "axios";

export const Home = () => {
  const [priceRange, setPriceRange] = useState(20000);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { isCartOpen } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
  }, []);

  // Handlers
  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
    applyFilters(e.target.value, selectedCategory, searchQuery);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    applyFilters(priceRange, category, searchQuery);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFilters(priceRange, selectedCategory, query);
  };

  const handleApplyFilter = () => {
    applyFilters(priceRange, selectedCategory, searchQuery);
  };

  // Apply all filters to the fetched products
  const applyFilters = (price, category, query) => {
    const filteredData = products.map((cat) => ({
      ...cat,
      items: cat.items.filter((product) => {
        const matchesPrice = product.price <= price;
        const matchesCategory =
          category === "All" || cat.title === category;
        const matchesSearch = product.name
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesPrice && matchesCategory && matchesSearch;
      }),
    })).filter((cat) => cat.items.length > 0);

    setFilteredProducts(filteredData);
  };


  return (
    <div className="shop-page">
      {/* Hero Section */}
      <div className="shop-page-hero">
        <div>
          <img className="shop-page-hero-image" src={HeroImg} alt="hero" />
          <div className="shop-page-hero-heading-text">
            <div className="shop-page-hero-welcome">Home | Shop</div>
            <div className="shop-page-hero-heading">Our Shop</div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="shop-page-navbar">
        <div className="shop-page-search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <CartIcon />
        {isCartOpen && <CartDropdown />}
      </div>

      {/* Content */}
      <div className="shop-page-content">
        {/* Sidebar Filters */}
        <aside className="shop-page-filters">
          <div className="shop-page-filter-section">
            <h3>Price: ₹{priceRange}</h3>
            <input
              type="range"
              min="500"
              max="20000"
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
              {["All", "Fertilizers", "Seeds", "Farm Equipment", "Pesticides", "Irrigation Equipment"].map((category) => (
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
          {filteredProducts.length === 0 ||
          filteredProducts.every((category) => category.items.length === 0) ? (
            <div className="no-items-container">
              <h3 className="no-items-message">No Items Available</h3>
            </div>
          ) : (
            filteredProducts.map((category) => (
              <section key={category.title}>
                <h2 className="shop-page-category-title">{category.title}</h2>
                <div className="shop-page-products-grid">
                  {category.items.map((product) => (
                    <ProductCard key={category.items._id} product={product} productId={category.items._id} />
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