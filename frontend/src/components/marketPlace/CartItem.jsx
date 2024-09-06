import './CartItem.scss';
import Tomato from '../../assets/tomato.png';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartItem = ({ cartItem }) => {
  const { imageUrl, price, name, quantity } = cartItem;
  const { clearItemFromCart } = useContext(CartContext); 

  const handleRemove = () => {
    clearItemFromCart(cartItem);
  };

  return (
    <div className='cart-item-container'>
      <img src={Tomato} alt={`${name}`} />
      <div className='item-details'>
        <span className='name'>{name}</span>
        <span className='price'>
          {quantity} x ₹{price}
        </span>
      </div>
      <button className='remove-button' onClick={handleRemove}>
        ✕
      </button>
    </div>
  );
};

export default CartItem;
