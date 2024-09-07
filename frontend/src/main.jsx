import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './contexts/cart.context.jsx'
import { UserProvider } from './contexts/user.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

  <UserProvider>
  <CartProvider>
    <App />
  </CartProvider>
  </UserProvider>
  </StrictMode>,
)
