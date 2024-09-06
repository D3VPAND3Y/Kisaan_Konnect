import { useContext } from "react";
import { CartContext } from '../../contexts/cart.context';
import "./CartDropdown.scss";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
    const {cartItems,CartProvider,cartTotal} = useContext(CartContext);
    const {setIsCartOpen} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckout = () => {
        setIsCartOpen(false);
        navigate("/checkout");
    }

    return <div className="cart-dropdown-container">
    <div className="cart-items">
    {
        cartItems.length === 0 ? <span className="empty-message">Your cart is empty</span> :
        cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
        ))
    }


    </div>
    <span className="total">Total: ${cartTotal}</span>
    <button onClick={goToCheckout}>Checkout</button>
    </div>
    }

export default CartDropdown;