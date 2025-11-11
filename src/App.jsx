import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { ItemListContainer } from './components/ItemListContainer';
import { ItemDetailContainer } from './components/ItemDetailContainer'; 
import './index.css'; 

export default function App() {
  const welcomeMessage = "¡Bienvenido/a a mi tienda virtual! Explora nuestro catálogo de productos.";
  
  const [cart, setCart] = useState([]); 

  const addItem = (item, quantity) => {
    const existingItemIndex = cart.findIndex(i => i.item.id === item.id);

    if (existingItemIndex !== -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart(prevCart => [...prevCart, { item, quantity }]);
    }
  };

  const getTotalItemsInCart = () => {
    return cart.reduce((acc, current) => acc + current.quantity, 0);
  };
  
  const totalItems = getTotalItemsInCart(); 
  
  const CartView = () => (
    <div className='item-list-card' style={{maxWidth: '800px', margin: '60px auto'}}>
      <h2>🛒 Tu Carrito de Compras ({totalItems} productos)</h2>
      {cart.length === 0 ? (
        <p style={{fontSize: '18px'}}>El carrito está vacío. ¡Añade algunos productos!</p>
      ) : (
        <ul>
          {cart.map((cartItem, index) => (
            <li key={index} style={{margin: '10px 0', padding: '10px', borderBottom: '1px solid #eee'}}>
              **{cartItem.quantity}x** {cartItem.item.name} - **${(cartItem.item.price * cartItem.quantity).toFixed(2)}**
            </li>
          ))}
          <li style={{marginTop: '20px', fontWeight: 'bold', fontSize: '20px'}}>
            Total: ${cart.reduce((acc, current) => acc + (current.item.price * current.quantity), 0).toFixed(2)}
          </li>
        </ul>
      )}
    </div>
  );

  return (
    <div className="app-container"> 
      
      <NavBar totalItemsInCart={totalItems} /> 
      
      <main> 
        <Routes>
          <Route 
            path="/" 
            element={<ItemListContainer greeting={welcomeMessage} />} 
          />
          
          <Route 
            path="/category/:categoryId" 
            element={<ItemListContainer greeting="Explora nuestros productos filtrados" />} 
          />
          
          <Route 
            path="/item/:itemId" 
            element={<ItemDetailContainer addItem={addItem} />} 
          />

          <Route 
            path="/cart" 
            element={<CartView />} 
          />

          <Route 
            path="*" 
            element={<div className='item-list-card' style={{maxWidth: '600px', margin: '60px auto'}}><h2>Error 404</h2><p>La página que buscas no existe.</p></div>} 
          />

        </Routes>
      </main>
      
      <footer className="app-footer"> 
        &copy; 2025 Entrega1-Guanca. Proyecto React Router.
      </footer>
    </div>
  );
}