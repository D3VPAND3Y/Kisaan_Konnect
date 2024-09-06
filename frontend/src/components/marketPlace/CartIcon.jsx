import { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './CartIcon.scss';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
  const { cartCount, setIsCartOpen } = useContext(CartContext);

  const toggleCart = () => {
    setIsCartOpen((prevIsCartOpen) => !prevIsCartOpen);
  };

  return (
    <div className="cart-icon" onClick={toggleCart}>
      <FaShoppingCart className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
