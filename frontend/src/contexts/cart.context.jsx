import { createContext, useState, useReducer,useContext, useEffect } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';
import { UserContext } from './user.context';
import axios from 'axios';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === productToAdd._id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === productToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToRemove._id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem._id !== cartItemToRemove._id);
  }

  return cartItems.map((cartItem) =>
    cartItem._id === cartItemToRemove._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem._id !== cartItemToClear._id);

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { token, user } = useContext(UserContext);

  const loadCartItemsFromDB = async () => {
    if (user && user.userId) {
      try {
        const response = await axios.get(`http://localhost:3000/get-cart/${user.userId}`);
        updateCartItemsReducer(response.data.cart);

        dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: response.data.cart });
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
  };

  useEffect(() => {
    // Load cart items from DB when the user logs in or reloads
    if (user && user.userId) {
      loadCartItemsFromDB();
    }
  }, [user]);

  const [{ cartCount, cartTotal, cartItems }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartItemsReducer = (cartItems) => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    const payload = {
      cartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    };

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    if(token && user){
      axios.post(`http://localhost:3000/add-to-cart`, {productId: productToAdd._id, quantity: 1,userId:user.userId,name:productToAdd.name,imageUrl:productToAdd.imageUrl}, {headers
      : {Authorization: `Bearer ${token}`}})
      .then(res => {
        console.log(res.data);
        updateCartItemsReducer(newCartItems);
      })
      .catch(err => {
          console.log(err);
      })
  }
  };

  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    if(token && user){
      axios.post(`http://localhost:3000/remove-from-cart`, {productId: cartItemToRemove._id, userId:user.userId}, {headers
      : {Authorization: `Bearer ${token}`}})
      .then(res => {
        console.log(res.data);
        updateCartItemsReducer(newCartItems);
      })
      .catch(err => {
          console.log(err);
      })
  };
  }

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    if(token && user){
      axios.post(`http://localhost:3000/clear-item-from-cart`, {productId: cartItemToClear._id, userId:user.userId}, {headers
      : {
        Authorization: `Bearer ${token}`
      }})
      .then(res => {
        console.log(res.data);
        updateCartItemsReducer(newCartItems);
      })
      .catch(err => {
          console.log(err);
      })
  };
}

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    loadCartItemsFromDB,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
