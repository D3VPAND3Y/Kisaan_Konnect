import "./CheckoutItem.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Tomato from "../../assets/tomato.png";

const CheckoutItem = ({ cartItem }) => {
  const { name, price, quantity } = cartItem;
  const { addItemToCart, removeItemToCart, clearItemFromCart } = useContext(CartContext);

  return (
    <div className="checkout-page-item-container">
      <div className="checkout-page-image-container">
        <img src={Tomato} alt={name} />
      </div>
      <span className="checkout-page-item-name">{name}</span>
      <span className="checkout-page-item-quantity">
        <div className="checkout-page-arrow" onClick={() => removeItemToCart(cartItem)}>&#10094;</div>
        <span className="checkout-page-value">{quantity}</span>
        <div className="checkout-page-arrow" onClick={() => addItemToCart(cartItem)}>&#10095;</div>
      </span>
      <span className="checkout-page-item-price">{`₹${price * quantity}`}</span>
      <div className="checkout-page-remove-button" onClick={() => clearItemFromCart(cartItem)}>&#10005;</div>
    </div>
  );
};

export default CheckoutItem;
