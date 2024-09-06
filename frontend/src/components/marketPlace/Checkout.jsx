import "./Checkout.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "./CheckoutItem";
const Checkout = () => {
    const {cartItems} = useContext(CartContext);
    return(
        <div className="checkout-container">
        <div className="checkout-header">
        <span>Product</span>
        <span>Description</span>
        <span>Quantity</span>
        <span>Price</span>
        <span>Remove</span>
        </div>
        {
            cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))
        }

        <span className="total">Total: ${cartItems.reduce((acc,cartItem) => acc + cartItem.price * cartItem.quantity,0)}</span>
        Pay
        </div>
    );
}


export default Checkout;