import { FiShoppingBag } from 'react-icons/fi'; // Feather Icons shopping bag
import './CartIcon.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div className="cart-icon" onClick={toggleCart}>
            <FiShoppingBag className="shopping-icon" size={30} />
            <span className="item-count">{cartCount}</span>
        </div>
    );
};

export default CartIcon;
