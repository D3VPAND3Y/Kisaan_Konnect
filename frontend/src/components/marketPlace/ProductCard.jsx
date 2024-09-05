import { useState } from "react";
import PropTypes from "prop-types";
import Tomato from "../../assets/tomato.png";
import "./ProductCard.css";

export const ProductCard = ({ product }) => {
  const { id, name, price, image, rating } = product;
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="shop-page-product-card">
      <img src={Tomato} alt={name} className="shop-page-product-image" />
      <h3 className="shop-page-product-name">{name}</h3>
      <p className="shop-page-product-price">${price.toFixed(2)}</p>
      <div className="shop-page-product-rating">
        {Array(rating).fill("⭐")}
      </div>

      <div className="shop-page-product-cart-controls">
        <button onClick={handleDecrement} className="shop-page-decrement">-</button>
        <span className="shop-page-quantity">{quantity}</span>
        <button onClick={handleIncrement} className="shop-page-increment">+</button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};
