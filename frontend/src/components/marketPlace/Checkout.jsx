import "./Checkout.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "./CheckoutItem";

const Checkout = () => {
    const { cartItems } = useContext(CartContext);
    const total = cartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);

    return (
        <div className="checkout-page-container">
            <div className="checkout-page-header">
                <div className="checkout-page-header-block">
                    <span>Product</span>
                </div>
                <div className="checkout-page-header-block">
                    <span>Description</span>
                </div>
                <div className="checkout-page-header-block">
                    <span>Quantity</span>
                </div>
                <div className="checkout-page-header-block">
                    <span>Price</span>
                </div>
                <div className="checkout-page-header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.length === 0 ? (
                <div className="checkout-page-empty">Your cart is empty</div>
            ) : (
                cartItems.map((cartItem) => (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                ))
            )}
            <div className="checkout-page-total">
                <span>Total: ₹{total}</span>
            </div>
            <button className="checkout-page-pay-button">Pay Now</button>
        </div>
    );
};

export default Checkout;
